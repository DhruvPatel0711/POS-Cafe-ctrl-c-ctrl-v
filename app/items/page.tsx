'use client'
import { useState } from 'react'
import { Search, Plus, Star } from 'lucide-react'
import { menuItems, menuCategories } from '@/lib/mockData'
import ItemDetailsPanel from '@/components/ItemDetailsPanel'
const stockStyle: Record<string, string> = {
  available: 'badge-green',
  low:       'badge-orange',
  out:       'badge-red',
}

export default function ItemsPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>(null)

  const handleOpenNew = () => {
    setSelectedItem(null)
    setIsPanelOpen(true)
  }

  const handleOpenEdit = (item: any) => {
    setSelectedItem({
      ...item,
      kitchenRouting: 'Main Kitchen', // mock data default
      variants: [] // mock data default
    })
    setIsPanelOpen(true)
  }

  const filtered = menuItems.filter(item => {
    const matchCat = activeCategory === 'All' || item.category === activeCategory
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Menu & Items</h1>
          <div className="page-subtitle">{menuItems.length} items across {menuCategories.length - 1} categories</div>
        </div>
        <div className="header-actions">
          <button className="btn btn-secondary btn-sm" id="items-category-btn">Manage Categories</button>
          <button className="btn btn-primary btn-sm" id="add-item-btn" onClick={handleOpenNew}>
            <Plus size={14} /> Add Item
          </button>
        </div>
      </div>

      {/* Category Pills */}
      <div className="filter-bar">
        {menuCategories.map(cat => (
          <button
            key={cat}
            className={`filter-pill${activeCategory === cat ? ' active' : ''}`}
            onClick={() => setActiveCategory(cat)}
            id={`cat-${cat.toLowerCase().replace(/\s+/g, '-')}`}
          >
            {cat}
          </button>
        ))}
        <div className="search-input-wrapper" style={{ width: 220, marginLeft: 'auto' }}>
          <Search size={14} className="search-icon" />
          <input
            type="text"
            placeholder="Search items…"
            className="search-input"
            id="items-search"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="table-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Tax</th>
              <th>Sold (Today)</th>
              <th>Rating</th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.id} id={`item-row-${item.id}`} onClick={() => handleOpenEdit(item)}>
                <td style={{ fontWeight: 600 }}>{item.name}</td>
                <td>
                  <span className="badge badge-gray">{item.category}</span>
                </td>
                <td style={{ fontWeight: 700 }}>₹{item.price}</td>
                <td style={{ color: 'var(--text-muted)' }}>{item.tax}%</td>
                <td style={{ fontWeight: 500 }}>{item.sold}</td>
                <td>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Star size={12} fill="#f5a623" color="#f5a623" />
                    <span style={{ fontWeight: 600 }}>{item.rating}</span>
                  </span>
                </td>
                <td>
                  <span className={`badge ${stockStyle[item.stock]}`}>{item.stock}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="empty-state">
            <div className="empty-state-title">No items found</div>
            <div className="empty-state-sub">Try a different category or search term</div>
          </div>
        )}
      </div>

      <ItemDetailsPanel 
        isOpen={isPanelOpen} 
        onClose={() => setIsPanelOpen(false)} 
        initialData={selectedItem} 
      />
    </div>
  )
}
