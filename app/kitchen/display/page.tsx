'use client'
import { useState, useEffect } from 'react'
import { kitchenTickets } from '@/lib/mockData'
import { Clock, Flame, AlertTriangle, RefreshCw, ChevronLeft, RotateCcw } from 'lucide-react'

const priorityConfig: Record<string, { label: string; color: string; bg: string; icon: any }> = {
  normal: { label: 'Normal', color: 'var(--text-muted)',    bg: '#f5f5f5',              icon: null           },
  high:   { label: 'High',   color: 'var(--accent-orange)', bg: 'var(--accent-orange-light)', icon: Flame   },
  urgent: { label: 'Urgent', color: 'var(--accent-red)',    bg: 'var(--accent-red-light)',    icon: AlertTriangle },
}

const statusConfig: Record<string, { label: string; bg: string; border: string; headerBg: string }> = {
  to_cook:   { label: 'To Cook',   bg: '#fff5f5', border: '#e22134', headerBg: '#fde8ea' },
  preparing: { label: 'Preparing', bg: '#fffbf0', border: '#f5a623', headerBg: '#fff3cd' },
  completed: { label: 'Completed', bg: '#f0fdf6', border: '#00b259', headerBg: '#dcfce7' },
}

const STATUS_ORDER = ['to_cook', 'preparing', 'completed'] as const
type TicketStatus = typeof STATUS_ORDER[number]

function cloneTickets() {
  return kitchenTickets.map(t => ({
    ...t, status: t.status as string,
    items: t.items.map(i => ({ ...i })),
    elapsedSeconds: parseElapsed(t.elapsed),
  }))
}

function parseElapsed(elapsed: string): number {
  const [mm, ss] = elapsed.split(':').map(Number)
  return (mm || 0) * 60 + (ss || 0)
}

function formatElapsed(sec: number): string {
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

export default function KitchenDisplayPage() {
  const [tickets, setTickets] = useState(cloneTickets)
  const [kitchenFilter, setKitchenFilter] = useState('All Kitchens')
  const [lastReset, setLastReset] = useState<Date>(new Date())
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('kitchen_tickets_state')
    if (saved) { try { setTickets(JSON.parse(saved)) } catch (err) {} }
    const savedDate = localStorage.getItem('kitchen_last_reset')
    if (savedDate) setLastReset(new Date(savedDate))
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'kitchen_tickets_state' && e.newValue) {
        try { setTickets(JSON.parse(e.newValue)) } catch(err) {}
      }
    }
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('kitchen_tickets_state', JSON.stringify(tickets))
      localStorage.setItem('kitchen_last_reset', lastReset.toISOString())
    }
  }, [tickets, lastReset, isLoaded])

  useEffect(() => {
    if (!isLoaded) return
    const interval = setInterval(() => {
      setTickets(prev => prev.map(t => t.status !== 'completed' ? { ...t, elapsedSeconds: t.elapsedSeconds + 1 } : t))
    }, 1000)
    return () => clearInterval(interval)
  }, [isLoaded])

  const advance = (id: string) => {
    setTickets(prev => prev.map(t => {
      if (t.id !== id) return t
      const idx = STATUS_ORDER.indexOf(t.status as TicketStatus)
      if (idx === STATUS_ORDER.length - 1) return { ...t, status: 'served' }
      return { ...t, status: STATUS_ORDER[idx + 1] }
    }).filter(t => t.status !== 'served'))
  }

  const goBack = (id: string) => {
    setTickets(prev => prev.map(t => {
      if (t.id !== id) return t
      const idx = STATUS_ORDER.indexOf(t.status as TicketStatus)
      if (idx <= 0) return t
      return { ...t, status: STATUS_ORDER[idx - 1] }
    }))
  }

  const resetTicket = (id: string) => {
    const original = kitchenTickets.find(t => t.id === id)
    if (!original) return
    setTickets(prev => prev.map(t =>
      t.id !== id ? t : { ...t, status: original.status, items: original.items.map(i => ({ ...i })), elapsedSeconds: parseElapsed(original.elapsed) }
    ))
  }

  const toggleItem = (ticketId: string, itemIdx: number) => {
    setTickets(prev => prev.map(t => {
      if (t.id !== ticketId) return t
      const newItems = [...t.items]
      newItems[itemIdx] = { ...newItems[itemIdx], done: !newItems[itemIdx].done }
      return { ...t, items: newItems }
    }))
  }

  const resetAll = () => { setTickets(cloneTickets()); setLastReset(new Date()) }

  const displayTickets = tickets
  const colCounts: Record<string, number> = {
    to_cook: displayTickets.filter(t => t.status === 'to_cook').length,
    preparing: displayTickets.filter(t => t.status === 'preparing').length,
    completed: displayTickets.filter(t => t.status === 'completed').length,
  }

  const getEffectivePriority = (t: typeof tickets[0]) => {
    if (t.status === 'to_cook' && t.elapsedSeconds > 600) return 'urgent'
    return t.priority
  }

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Kitchen Display</h1>
          <div className="page-subtitle">
            Live ticket board — last reset {lastReset.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
        <div className="header-actions">
          <select className="form-input form-select" style={{ width: 164, padding: '6px 12px', fontSize: 13 }}
            value={kitchenFilter} onChange={e => setKitchenFilter(e.target.value)} id="kitchen-filter">
            <option value="All Kitchens">All Kitchens</option>
            <option value="Main Kitchen">Main Kitchen</option>
            <option value="Beverage Station">Beverage Station</option>
          </select>
          <button onClick={resetAll} className="btn btn-secondary btn-sm" id="reset-all-btn" title="Reset all tickets">
            <RefreshCw size={13} /> Reset All
          </button>
          <span className="badge badge-green" style={{ fontSize: 12 }}>● Live</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
        {(Object.keys(statusConfig) as TicketStatus[]).map(col => {
          const colTickets = displayTickets.filter(t => t.status === col)
          const cfg = statusConfig[col]
          return (
            <div key={col}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, padding: '8px 12px', background: cfg.headerBg, borderRadius: 10, border: `1px solid ${cfg.border}33` }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: cfg.border, textTransform: 'uppercase', letterSpacing: '0.08em', flex: 1 }}>{cfg.label}</span>
                <span style={{ background: cfg.border, color: 'white', fontSize: 11, fontWeight: 800, borderRadius: 20, padding: '2px 9px', minWidth: 24, textAlign: 'center' }}>{colCounts[col]}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {colTickets.map(ticket => {
                  const effPri = getEffectivePriority(ticket)
                  const pri = priorityConfig[effPri]
                  const PriIcon = pri.icon
                  const canGoBack = STATUS_ORDER.indexOf(ticket.status as TicketStatus) > 0
                  const allDone = ticket.items.every(i => i.done)
                  const isOverdue = ticket.elapsedSeconds > 900

                  return (
                    <div key={ticket.id} id={`ticket-${ticket.id}`} style={{
                      background: cfg.bg, border: `1.5px solid ${isOverdue ? '#e22134' : cfg.border}`,
                      borderRadius: 12, overflow: 'hidden',
                      boxShadow: effPri === 'urgent' ? `0 0 0 2px ${pri.color}33` : 'none',
                    }}>
                      {effPri !== 'normal' && (
                        <div style={{ background: pri.bg, color: pri.color, padding: '4px 14px', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 5, borderBottom: `1px solid ${pri.color}33` }}>
                          {PriIcon && <PriIcon size={11} />} {pri.label} Priority {isOverdue && ' · ⚠️ Overdue'}
                        </div>
                      )}
                      <div style={{ padding: 14 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                          <div>
                            <div style={{ fontWeight: 800, fontSize: 15 }}>{ticket.table}</div>
                            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 1 }}>{ticket.orderId} · {ticket.id}</div>
                          </div>
                          {canGoBack && (
                            <button onClick={() => goBack(ticket.id)} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 8px', borderRadius: 6, border: '1px solid var(--border-default)', background: 'white', cursor: 'pointer', fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)' }} id={`back-ticket-${ticket.id}`}>
                              <ChevronLeft size={12} /> Back
                            </button>
                          )}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, fontWeight: 700, marginBottom: 10, color: isOverdue ? 'var(--accent-red)' : 'var(--text-secondary)' }}>
                          <Clock size={13} /> {formatElapsed(ticket.elapsedSeconds)}
                          {isOverdue && <span style={{ fontSize: 10, background: 'var(--accent-red-light)', color: 'var(--accent-red)', padding: '1px 6px', borderRadius: 10, fontWeight: 700 }}>OVERDUE</span>}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginBottom: 12 }}>
                          {ticket.items.map((item, i) => (
                            <div key={i} onClick={() => toggleItem(ticket.id, i)} style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: item.done ? 'line-through' : 'none', color: item.done ? 'var(--text-muted)' : 'var(--text-primary)', cursor: 'pointer', padding: '5px 6px', borderRadius: 6, userSelect: 'none' }}>
                              <div style={{ width: 18, height: 18, borderRadius: 4, flexShrink: 0, border: `1.5px solid ${item.done ? 'var(--accent-green)' : cfg.border}`, background: item.done ? 'var(--accent-green)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {item.done && <span style={{ color: 'white', fontSize: 10, fontWeight: 700 }}>✓</span>}
                              </div>
                              <span style={{ fontWeight: 500, fontSize: 13, flex: 1 }}>{item.qty}× {item.name}</span>
                            </div>
                          ))}
                        </div>
                        <div style={{ height: 4, background: '#e5e5e5', borderRadius: 10, overflow: 'hidden', marginBottom: 12 }}>
                          <div style={{ height: '100%', width: `${(ticket.items.filter(i => i.done).length / ticket.items.length) * 100}%`, background: cfg.border, borderRadius: 10, transition: 'width 0.4s ease' }} />
                        </div>
                        <div style={{ display: 'flex', gap: 8 }}>
                          <button onClick={() => resetTicket(ticket.id)} title="Reset" style={{ padding: '7px 10px', border: '1px solid var(--border-default)', borderRadius: 7, background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }} id={`reset-ticket-${ticket.id}`}>
                            <RotateCcw size={13} />
                          </button>
                          <button onClick={() => advance(ticket.id)} id={`advance-ticket-${ticket.id}`} style={{
                            flex: 1, padding: '8px 0',
                            background: ticket.status === 'completed' ? 'var(--accent-green)' : ticket.status === 'to_cook' ? '#e22134' : '#f5a623',
                            color: 'white', border: 'none', borderRadius: 7, fontSize: 13, fontWeight: 700, cursor: 'pointer',
                          }}>
                            {ticket.status === 'to_cook' ? '▶ Start Preparing' : ticket.status === 'preparing' ? '✓ Mark Complete' : '🍽 Mark Served'}
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
                {colTickets.length === 0 && (
                  <div style={{ padding: '32px 16px', textAlign: 'center', color: 'var(--text-muted)', fontSize: 13, border: '2px dashed var(--border-light)', borderRadius: 12, background: '#fafafa' }}>
                    <div style={{ fontSize: 24, marginBottom: 6 }}>{col === 'to_cook' ? '🍳' : col === 'preparing' ? '👨‍🍳' : '✅'}</div>
                    No tickets
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
