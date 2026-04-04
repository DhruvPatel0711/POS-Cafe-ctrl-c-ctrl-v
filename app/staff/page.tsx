'use client'
import { staffMembers } from '@/lib/mockData'
import { UserPlus } from 'lucide-react'

const statusStyle: Record<string, string> = {
  active: 'badge-green',
  break:  'badge-orange',
  off:    'badge-gray',
}

const roleColors: Record<string, string> = {
  Manager: 'badge-purple',
  Cashier: 'badge-blue',
  Waiter:  'badge-gray',
  Kitchen: 'badge-orange',
}

export default function StaffPage() {
  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Staff</h1>
          <div className="page-subtitle">Manage team members and shift performance</div>
        </div>
        <div className="header-actions">
          <button className="btn btn-primary btn-sm" id="add-staff-btn">
            <UserPlus size={14} /> Add Staff
          </button>
        </div>
      </div>

      {/* Summary Row */}
      <div className="metrics-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: 24 }}>
        {[
          { label: 'On Shift',   value: staffMembers.filter(s => s.status === 'active').length, color: 'var(--accent-green)'  },
          { label: 'On Break',   value: staffMembers.filter(s => s.status === 'break').length,  color: 'var(--accent-orange)' },
          { label: 'Off Today',  value: staffMembers.filter(s => s.status === 'off').length,    color: 'var(--text-muted)'    },
          { label: 'Total Staff',value: staffMembers.length,                                     color: 'var(--text-primary)'  },
        ].map(s => (
          <div className="metric-card" key={s.label} style={{ padding: '16px 20px' }}>
            <div className="metric-label">{s.label}</div>
            <div className="metric-value" style={{ fontSize: 26, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Staff Table */}
      <div className="table-card">
        <div className="table-header-row">
          <span className="table-title">Team Members</span>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Staff Member</th>
              <th>Role</th>
              <th>Shift</th>
              <th>Orders Served</th>
              <th>Sales</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {staffMembers.map(s => (
              <tr key={s.id} id={`staff-row-${s.id}`}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div className="avatar">{s.avatar}</div>
                    <span style={{ fontWeight: 600 }}>{s.name}</span>
                  </div>
                </td>
                <td><span className={`badge ${roleColors[s.role]}`}>{s.role}</span></td>
                <td style={{ color: 'var(--text-secondary)', fontSize: 12.5 }}>{s.shift}</td>
                <td style={{ fontWeight: 600 }}>{s.orders > 0 ? s.orders : '—'}</td>
                <td style={{ fontWeight: 700, color: s.sales > 0 ? 'var(--accent-green)' : 'var(--text-muted)' }}>
                  {s.sales > 0 ? `₹${s.sales.toLocaleString()}` : '—'}
                </td>
                <td><span className={`badge ${statusStyle[s.status]}`}>{s.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
