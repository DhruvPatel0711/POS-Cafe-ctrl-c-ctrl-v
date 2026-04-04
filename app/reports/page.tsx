'use client'
import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell, Legend } from 'recharts'
import { weeklyData, menuItems, paymentBreakdown, staffMembers } from '@/lib/mockData'
import { ChevronDown, Download, Filter, Calendar } from 'lucide-react'

const topItems = [...menuItems].sort((a, b) => b.sold - a.sold).slice(0, 8)

const COLORS = ['#1a1a1a', '#006aff', '#00b259', '#f5a623', '#e22134', '#7b5ea7', '#00b4d8', '#ff6b6b']

export default function ReportsPage() {
  const [period, setPeriod] = useState('Today')
  const [reportType, setReportType] = useState('Sales')

  // Mock filters
  const [staffFilter, setStaffFilter] = useState('All Staff')
  const [sessionFilter, setSessionFilter] = useState('All Sessions')
  const [categoryFilter, setCategoryFilter] = useState('All Categories')

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Reporting & Analytics</h1>
          <div className="page-subtitle">Multi-dimensional business intelligence</div>
        </div>
        <div className="header-actions">
          <button className="btn btn-primary btn-sm" id="export-report-btn">
            <Download size={13} /> Export Report
          </button>
        </div>
      </div>

      {/* Report Type Tabs */}
      <div style={{ display: 'flex', gap: 0, marginBottom: 24, borderBottom: '1px solid var(--border-light)' }}>
        {['Sales', 'Products', 'Staff Performance', 'Sessions', 'Payments'].map(t => (
          <button
            key={t}
            onClick={() => setReportType(t)}
            id={`report-tab-${t.toLowerCase().replace(' ', '-')}`}
            style={{
              padding: '10px 20px',
              background: 'none', border: 'none',
              borderBottom: reportType === t ? '2px solid var(--text-primary)' : '2px solid transparent',
              fontWeight: reportType === t ? 700 : 500,
              fontSize: 13.5,
              color: reportType === t ? 'var(--text-primary)' : 'var(--text-muted)',
              cursor: 'pointer', marginBottom: -1,
            }}
          >{t}</button>
        ))}
      </div>

      {/* Phase 6 Complex Filter Bar */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 24, padding: '16px', background: 'var(--bg-card)', borderRadius: 12, border: '1px solid var(--border-light)' }}>
         <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)', marginRight: 8 }}>
            <Filter size={16} /> <span style={{ fontSize: 13, fontWeight: 600 }}>Filters</span>
         </div>
         
         <div className="form-group" style={{ marginBottom: 0, width: 140 }}>
            <select className="form-input form-select" value={period} onChange={e => setPeriod(e.target.value)} style={{ padding: '8px 12px', fontSize: 12.5 }}>
               <option value="Today">Today</option>
               <option value="This Week">This Week</option>
               <option value="This Month">This Month</option>
               <option value="Custom">Custom Range...</option>
            </select>
         </div>

         <div className="form-group" style={{ marginBottom: 0, width: 140 }}>
            <select className="form-input form-select" value={staffFilter} onChange={e => setStaffFilter(e.target.value)} style={{ padding: '8px 12px', fontSize: 12.5 }}>
               <option value="All Staff">All Staff</option>
               <option value="Riya Sharma">Riya Sharma</option>
               <option value="Arjun Kumar">Arjun Kumar</option>
            </select>
         </div>

         <div className="form-group" style={{ marginBottom: 0, width: 140 }}>
            <select className="form-input form-select" value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} style={{ padding: '8px 12px', fontSize: 12.5 }}>
               <option value="All Categories">All Categories</option>
               <option value="Main Course">Main Course</option>
               <option value="Beverages">Beverages</option>
               <option value="Desserts">Desserts</option>
            </select>
         </div>
         
         <div className="form-group" style={{ marginBottom: 0, width: 140 }}>
            <select className="form-input form-select" value={sessionFilter} onChange={e => setSessionFilter(e.target.value)} style={{ padding: '8px 12px', fontSize: 12.5 }}>
               <option value="All Sessions">All Sessions</option>
               <option value="Sess-2410">Session #2410 (Open)</option>
               <option value="Sess-2409">Session #2409 (Closed)</option>
            </select>
         </div>
      </div>

      {reportType === 'Sales' && (
        <>
          <div className="metrics-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: 24 }}>
            {[
              { label: 'Net Revenue',  value: '₹3,14,200', sub: '+8.4% vs last period'  },
              { label: 'Gross Sales',  value: '₹3,38,000', sub: '+9.1% vs last period' },
              { label: 'Discounts',    value: '₹14,200',   sub: '-3.2% vs last period'  },
              { label: 'Taxes Collected',value: '₹9,600',  sub: '+1.4% vs last period'     },
            ].map(m => (
              <div className="metric-card" key={m.label}>
                <div className="metric-label">{m.label}</div>
                <div className="metric-value" style={{ fontSize: 22 }}>{m.value}</div>
                <div style={{ fontSize: 11.5, color: 'var(--text-muted)', marginTop: 6 }}>{m.sub}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16, marginBottom: 24 }}>
            <div className="chart-card" style={{ marginBottom: 0 }}>
              <div className="chart-header">
                <div className="chart-title">Sales Trend</div>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={weeklyData} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                  <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#9b9b9b' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#9b9b9b' }} axisLine={false} tickLine={false}
                    tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
                  <Tooltip
                    formatter={(v: any) => [`₹${Number(v).toLocaleString()}`, 'Revenue']}
                    contentStyle={{ borderRadius: 8, border: '1px solid #e5e5e5', fontSize: 12 }}
                  />
                  <Bar dataKey="sales" fill="#1a1a1a" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="chart-card" style={{ marginBottom: 0, display: 'flex', flexDirection: 'column', padding: 24 }}>
               <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Key Highlights</h3>
               <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                 <div style={{ background: 'var(--accent-green-light)', color: 'var(--accent-green)', padding: 12, borderRadius: 8, fontSize: 13, fontWeight: 600 }}>
                   ✅ Beverage sales are up 14% perfectly correlating with summer promotions.
                 </div>
                 <div style={{ background: 'var(--accent-blue-light)', color: 'var(--accent-blue)', padding: 12, borderRadius: 8, fontSize: 13, fontWeight: 600 }}>
                   ℹ️ Riya S. processed the most transactions this period (42).
                 </div>
                 <div style={{ background: 'var(--bg-canvas)', color: 'var(--text-secondary)', padding: 12, borderRadius: 8, fontSize: 13, fontWeight: 600 }}>
                   ⚠️ Average order value dropped slightly on Sunday due to high takeaway volume.
                 </div>
               </div>
            </div>
          </div>
        </>
      )}

      {reportType === 'Products' && (
        <div className="table-card" style={{ animation: 'fadeIn 0.2s ease' }}>
          <div className="table-header-row">
            <span className="table-title">Product & Category Analytics</span>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Item</th>
                <th>Category</th>
                <th>Units Sold</th>
                <th>Revenue</th>
                <th>Gross Margin</th>
              </tr>
            </thead>
            <tbody>
              {topItems.map((item, i) => (
                <tr key={item.id}>
                  <td style={{ color: 'var(--text-muted)', fontWeight: 600 }}>{i + 1}</td>
                  <td style={{ fontWeight: 600 }}>{item.name}</td>
                  <td><span className="badge badge-gray">{item.category}</span></td>
                  <td style={{ fontWeight: 700 }}>{item.sold}</td>
                  <td style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                    ₹{(item.sold * item.price).toLocaleString()}
                  </td>
                  <td style={{ fontWeight: 600, color: 'var(--accent-green)' }}>
                    ≈ 48%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {reportType === 'Staff Performance' && (
         <div className="table-card" style={{ animation: 'fadeIn 0.2s ease' }}>
           <div className="table-header-row">
             <span className="table-title">Employee Shift Analytics</span>
           </div>
           <table className="data-table">
             <thead>
               <tr>
                 <th>Staff Name</th>
                 <th>Role</th>
                 <th>Total Orders Handled</th>
                 <th>Total Sales Value (₹)</th>
                 <th>Avg Transaction Val.</th>
               </tr>
             </thead>
             <tbody>
               {staffMembers.filter(s => s.role !== 'Kitchen').map(staff => (
                 <tr key={staff.id}>
                   <td style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
                     <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--accent-blue)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10 }}>{staff.avatar}</div>
                     {staff.name}
                   </td>
                   <td><span className="badge badge-gray">{staff.role}</span></td>
                   <td style={{ fontWeight: 600 }}>{staff.orders}</td>
                   <td style={{ fontWeight: 700, color: 'var(--text-primary)' }}>₹{staff.sales.toLocaleString()}</td>
                   <td style={{ fontWeight: 600, color: 'var(--text-muted)' }}>
                      ₹{staff.orders > 0 ? (staff.sales / staff.orders).toFixed(0) : 0}
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
         </div>
      )}

      {reportType === 'Payments' && (
         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, animation: 'fadeIn 0.2s ease' }}>
           <div className="chart-card" style={{ marginBottom: 0 }}>
             <div className="chart-header">
               <div className="chart-title">Payment Method Breakdown</div>
             </div>
             <ResponsiveContainer width="100%" height={260}>
               <PieChart>
                 <Pie
                   data={paymentBreakdown}
                   dataKey="pct"
                   nameKey="method"
                   cx="50%"
                   cy="50%"
                   innerRadius={65}
                   outerRadius={100}
                   paddingAngle={3}
                 >
                   {paymentBreakdown.map((entry, i) => (
                     <Cell key={i} fill={COLORS[i % COLORS.length]} />
                   ))}
                 </Pie>
                 <Tooltip formatter={(v: any) => [`${v}%`, '']} />
                 <Legend />
               </PieChart>
             </ResponsiveContainer>
           </div>
         </div>
      )}

    </div>
  )
}
