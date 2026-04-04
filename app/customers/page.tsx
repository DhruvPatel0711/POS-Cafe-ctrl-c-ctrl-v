'use client'
import { useState } from 'react'
import { Search, UserPlus } from 'lucide-react'
import { customers } from '@/lib/mockData'

const loyaltyStyle: Record<string, string> = {
  Platinum: 'badge-purple',
  Gold:     'badge-orange',
  Silver:   'badge-blue',
  Bronze:   'badge-gray',
}

export default function CustomersPage() {
  const [search, setSearch] = useState('')

  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search)
  )

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Customers</h1>
          <div className="page-subtitle">{customers.length} registered customers</div>
        </div>
        <div className="header-actions">
          <button className="btn btn-primary btn-sm" id="add-customer-btn">
            <UserPlus size={14} /> Add Customer
          </button>
        </div>
      </div>

      {/* Summary */}
      <div className="metrics-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: 20 }}>
        {[
          { label: 'Total Customers', value: customers.length,                         color: 'var(--text-primary)'  },
          { label: 'Visited Today',   value: customers.filter(c => c.lastVisit === 'Today').length, color: 'var(--accent-green)' },
          { label: 'Platinum / Gold', value: customers.filter(c => ['Platinum','Gold'].includes(c.loyalty)).length, color: 'var(--accent-orange)' },
          { label: 'Avg. Spend',      value: `₹${Math.round(customers.reduce((s,c)=>s+c.totalSpend,0)/customers.length).toLocaleString()}`, color: 'var(--accent-blue)' },
        ].map(s => (
          <div className="metric-card" key={s.label} style={{ padding: '16px 20px' }}>
            <div className="metric-label">{s.label}</div>
            <div className="metric-value" style={{ fontSize: 22, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div className="table-card">
        <div className="table-header-row">
          <span className="table-title">Customer Directory</span>
          <div className="search-input-wrapper" style={{ width: 220 }}>
            <Search size={14} className="search-icon" />
            <input
              type="text"
              placeholder="Search customers…"
              className="search-input"
              id="customers-search"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Phone</th>
              <th>Total Visits</th>
              <th>Total Spend</th>
              <th>Last Visit</th>
              <th>Loyalty</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(c => (
              <tr key={c.id} id={`customer-row-${c.id}`}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div className="avatar" style={{ width: 30, height: 30, fontSize: 11 }}>
                      {c.name.split(' ').map(w => w[0]).join('')}
                    </div>
                    <span style={{ fontWeight: 600 }}>{c.name}</span>
                  </div>
                </td>
                <td style={{ color: 'var(--text-secondary)', fontFamily: 'monospace', fontSize: 12.5 }}>{c.phone}</td>
                <td style={{ fontWeight: 600 }}>{c.visits}</td>
                <td style={{ fontWeight: 700 }}>₹{c.totalSpend.toLocaleString()}</td>
                <td style={{ color: 'var(--text-muted)', fontSize: 12.5 }}>{c.lastVisit}</td>
                <td><span className={`badge ${loyaltyStyle[c.loyalty]}`}>{c.loyalty}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
