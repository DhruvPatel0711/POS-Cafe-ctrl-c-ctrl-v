'use client'
import { BarChart3, ShoppingBag, CreditCard, Users, TrendingUp, Clock, ChefHat, LayoutGrid } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { salesChartData, recentOrders, weeklyData, paymentBreakdown } from '@/lib/mockData'
import Link from 'next/link'

const statusMap: Record<string, string> = {
  paid:      'badge-green',
  kitchen:   'badge-orange',
  confirmed: 'badge-blue',
  draft:     'badge-gray',
}

export default function AdminDashboard() {
  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <div className="page-subtitle">Welcome back — here's today's overview</div>
        </div>
        <div className="header-actions">
          <Link href="/pos/floor" style={{ textDecoration: 'none' }}>
            <button className="btn btn-primary btn-sm" id="go-to-pos-btn">
              <ShoppingBag size={14} /> Open POS
            </button>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="metrics-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: 24 }}>
        {[
          { label: "Today's Revenue",  value: '₹49,200', change: '+12.4%', icon: TrendingUp, color: 'var(--accent-green)'  },
          { label: 'Orders Today',     value: '162',      change: '+8',     icon: ShoppingBag, color: 'var(--accent-blue)'   },
          { label: 'Avg. Order Value', value: '₹304',     change: '+₹18',   icon: CreditCard,  color: 'var(--accent-orange)' },
          { label: 'Active Tables',    value: '6 / 15',   change: '40%',    icon: LayoutGrid,   color: 'var(--text-primary)'  },
        ].map(kpi => {
          const Icon = kpi.icon
          return (
            <div className="metric-card" key={kpi.label} style={{ padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div className="metric-label">{kpi.label}</div>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--bg-canvas)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: kpi.color }}>
                  <Icon size={18} />
                </div>
              </div>
              <div className="metric-value" style={{ fontSize: 28, color: kpi.color }}>{kpi.value}</div>
              <div style={{ fontSize: 12, color: 'var(--accent-green)', fontWeight: 600, marginTop: 4 }}>{kpi.change}</div>
            </div>
          )
        })}
      </div>

      {/* Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16, marginBottom: 24 }}>
        <div className="chart-card" style={{ marginBottom: 0 }}>
          <div className="chart-header">
            <div className="chart-title">Sales Today vs Yesterday</div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={salesChartData.slice(0, 10)} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="time" tick={{ fontSize: 11, fill: '#9b9b9b' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9b9b9b' }} axisLine={false} tickLine={false}
                tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
              <Tooltip
                formatter={(v: any, name: string) => [`₹${Number(v).toLocaleString()}`, name === 'today' ? 'Today' : 'Yesterday']}
                contentStyle={{ borderRadius: 8, border: '1px solid #e5e5e5', fontSize: 12 }}
              />
              <Bar dataKey="today" fill="#1a1a1a" radius={[4, 4, 0, 0]} />
              <Bar dataKey="yesterday" fill="#e5e5e5" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Payment Methods */}
        <div className="chart-card" style={{ marginBottom: 0, padding: 24 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 20 }}>Payment Split</h3>
          {paymentBreakdown.map(p => (
            <div key={p.method} style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 13 }}>
                <span style={{ fontWeight: 600 }}>{p.method}</span>
                <span style={{ fontWeight: 700 }}>₹{p.amount.toLocaleString()}</span>
              </div>
              <div style={{ height: 6, background: '#f0f0f0', borderRadius: 6, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${p.pct}%`, background: p.color, borderRadius: 6 }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Orders */}
      <div className="table-card">
        <div className="table-header-row">
          <span className="table-title">Recent Orders</span>
          <Link href="/admin/orders" style={{ textDecoration: 'none' }}>
            <button className="btn btn-ghost btn-sm" id="view-all-orders-btn">View All</button>
          </Link>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Table</th>
              <th>Staff</th>
              <th>Items</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.slice(0, 5).map(o => (
              <tr key={o.id}>
                <td style={{ fontWeight: 600, color: 'var(--accent-blue)' }}>{o.id}</td>
                <td>{o.table}</td>
                <td style={{ color: 'var(--text-secondary)' }}>{o.staff}</td>
                <td style={{ color: 'var(--text-muted)' }}>{o.items} items</td>
                <td style={{ fontWeight: 700 }}>₹{o.amount.toLocaleString()}</td>
                <td><span className={`badge ${statusMap[o.status]}`}>{o.status}</span></td>
                <td style={{ color: 'var(--text-muted)', fontSize: 12.5 }}>{o.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
