import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Plus, Edit2, Trash2, Star, ChevronLeft, ChevronRight, Filter } from 'lucide-react'
import AdminSidebar from '../../components/AdminSidebar'
import { cafes as initialCafes } from '../../data/cafes'

const PER_PAGE = 5

export default function ManageCafes() {
  const [cafes, setCafes] = useState(initialCafes)
  const [query, setQuery] = useState('')
  const [filterCat, setFilterCat] = useState('All')
  const [page, setPage] = useState(1)
  const [deleteId, setDeleteId] = useState<number | null>(null)

  const categories = ['All', ...Array.from(new Set(cafes.map(c => c.category)))]

  const filtered = cafes.filter(c => {
    const matchQ = !query || c.name.toLowerCase().includes(query.toLowerCase())
    const matchCat = filterCat === 'All' || c.category === filterCat
    return matchQ && matchCat
  })

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const handleDelete = (id: number) => {
    setCafes(prev => prev.filter(c => c.id !== id))
    setDeleteId(null)
  }

  return (
    <div className="flex min-h-screen" style={{ background: '#F3F3F3' }}>
      <AdminSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white px-6 py-4 flex items-center justify-between border-b border-gray-100" style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.05)' }}>
          <div>
            <h1 className="text-lg font-bold text-gray-900">Manage Cafes</h1>
            <p className="text-xs text-gray-400">{cafes.length} cafes total</p>
          </div>
          <Link to="/admin/cafes/add"
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white rounded-xl no-underline transition-all hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #6F4E37, #C4843A)' }}>
            <Plus size={15} /> Add Cafe
          </Link>
        </header>

        <main className="flex-1 p-6">
          {/* Controls */}
          <div className="bg-white rounded-[12px] p-4 mb-5 flex flex-col md:flex-row gap-3" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
            <div className="flex items-center gap-2 bg-[#F8F4E9] rounded-xl px-3 py-2.5 flex-1">
              <Search size={15} color="#9CA3AF" />
              <input value={query} onChange={e => { setQuery(e.target.value); setPage(1) }}
                placeholder="Search cafes..."
                className="flex-1 text-sm outline-none bg-transparent text-gray-700 placeholder-gray-400" />
            </div>
            <div className="flex items-center gap-2 bg-[#F8F4E9] rounded-xl px-3 py-2.5">
              <Filter size={14} color="#9CA3AF" />
              <select value={filterCat} onChange={e => { setFilterCat(e.target.value); setPage(1) }}
                className="text-sm outline-none bg-transparent text-gray-700 cursor-pointer">
                {categories.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-[12px] overflow-hidden" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
            <table className="w-full">
              <thead style={{ background: '#F8F4E9' }}>
                <tr>
                  <th className="text-left text-xs font-semibold text-gray-500 px-5 py-3">CAFE</th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">CATEGORY</th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">RATING</th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">PRICE</th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">CITY</th>
                  <th className="text-right text-xs font-semibold text-gray-500 px-5 py-3">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map(cafe => (
                  <tr key={cafe.id} className="border-t border-gray-50 hover:bg-[#FDFCFB] transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <img src={cafe.image} alt={cafe.name} className="w-10 h-10 rounded-xl object-cover bg-[#EDE8D8] shrink-0" />
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{cafe.name}</p>
                          <p className="text-xs text-gray-400 truncate max-w-[160px]">{cafe.address}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="text-xs font-semibold text-white px-2.5 py-1 rounded-full" style={{ background: '#6F4E37' }}>{cafe.category}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1">
                        <Star size={12} fill="#F59E0B" color="#F59E0B" />
                        <span className="text-sm font-semibold text-gray-800">{cafe.rating}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="text-sm font-medium text-[#C4843A]">{cafe.price}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="text-sm text-gray-600">{cafe.city}</span>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link to={`/admin/cafes/edit/${cafe.id}`}
                          className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-blue-50 no-underline"
                          style={{ color: '#3B82F6' }}>
                          <Edit2 size={14} />
                        </Link>
                        <button onClick={() => setDeleteId(cafe.id)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-red-50 text-red-500">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {paginated.length === 0 && (
                  <tr><td colSpan={6} className="text-center py-12 text-sm text-gray-400">No cafes found</td></tr>
                )}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="px-5 py-3.5 border-t border-gray-100 flex items-center justify-between">
              <p className="text-xs text-gray-400">
                Showing {Math.min((page-1)*PER_PAGE+1, filtered.length)}–{Math.min(page*PER_PAGE, filtered.length)} of {filtered.length}
              </p>
              <div className="flex gap-1">
                <button onClick={() => setPage(p => Math.max(1, p-1))} disabled={page === 1}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-[#F8F4E9] disabled:opacity-40 transition-colors">
                  <ChevronLeft size={14} />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                  <button key={n} onClick={() => setPage(n)}
                    className={`w-8 h-8 rounded-lg text-xs font-medium transition-colors ${
                      page === n ? 'text-white' : 'text-gray-600 hover:bg-[#F8F4E9]'
                    }`}
                    style={page === n ? { background: '#6F4E37' } : {}}>
                    {n}
                  </button>
                ))}
                <button onClick={() => setPage(p => Math.min(totalPages, p+1))} disabled={page === totalPages}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-[#F8F4E9] disabled:opacity-40 transition-colors">
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Delete confirmation modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.4)' }}>
          <div className="bg-white rounded-[16px] p-6 w-full max-w-sm" style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-red-50 mb-4">
              <Trash2 size={20} color="#EF4444" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Delete Cafe?</h3>
            <p className="text-sm text-gray-500 mb-5">This action cannot be undone. The cafe will be permanently removed.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)}
                className="flex-1 py-2.5 text-sm font-semibold text-gray-600 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <button onClick={() => handleDelete(deleteId)}
                className="flex-1 py-2.5 text-sm font-semibold text-white rounded-xl bg-red-500 hover:bg-red-600 transition-colors">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
