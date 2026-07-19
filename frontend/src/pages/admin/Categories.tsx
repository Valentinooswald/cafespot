import { useState } from 'react'
import { Plus, Edit2, Trash2, X, Check } from 'lucide-react'
import AdminSidebar from '../../components/AdminSidebar'
import { categories as initialCategories } from '../../data/cafes'

interface Category { id: number; name: string; icon: string; count: number; color: string }

const COLORS = ['#6F4E37', '#C4843A', '#5A8A5A', '#8B6347', '#543A28', '#3B82F6', '#8B5CF6']

export default function Categories() {
  const [cats, setCats] = useState<Category[]>(initialCategories)
  const [editId, setEditId] = useState<number | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [adding, setAdding] = useState(false)
  const [newCat, setNewCat] = useState({ name: '', icon: '☕', color: COLORS[0] })
  const [editForm, setEditForm] = useState<Category | null>(null)

  const handleAdd = () => {
    if (!newCat.name.trim()) return
    setCats(prev => [...prev, { id: Date.now(), name: newCat.name, icon: newCat.icon, count: 0, color: newCat.color }])
    setNewCat({ name: '', icon: '☕', color: COLORS[0] })
    setAdding(false)
  }

  const handleEdit = () => {
    if (!editForm) return
    setCats(prev => prev.map(c => c.id === editForm.id ? editForm : c))
    setEditId(null)
    setEditForm(null)
  }

  const handleDelete = (id: number) => {
    setCats(prev => prev.filter(c => c.id !== id))
    setDeleteId(null)
  }

  const INPUT = "w-full px-3 py-2 rounded-lg border border-[#EDE8D8] text-sm outline-none focus:border-[#C4843A] bg-[#F8F4E9]"

  return (
    <div className="flex min-h-screen" style={{ background: '#F3F3F3' }}>
      <AdminSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white px-6 py-4 flex items-center justify-between border-b border-gray-100"
          style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.05)' }}>
          <div>
            <h1 className="text-lg font-bold text-gray-900">Categories</h1>
            <p className="text-xs text-gray-400">{cats.length} categories</p>
          </div>
          <button onClick={() => setAdding(true)}
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white rounded-xl transition-all hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #6F4E37, #C4843A)' }}>
            <Plus size={15} /> Add Category
          </button>
        </header>

        <main className="flex-1 p-6">
          <div className="bg-white rounded-[12px] overflow-hidden" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
            <table className="w-full">
              <thead style={{ background: '#F8F4E9' }}>
                <tr>
                  <th className="text-left text-xs font-semibold text-gray-500 px-5 py-3">CATEGORY</th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">ICON</th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">CAFES</th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">COLOR</th>
                  <th className="text-right text-xs font-semibold text-gray-500 px-5 py-3">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {/* Add row */}
                {adding && (
                  <tr className="border-t border-gray-50 bg-[#F8F4E9]">
                    <td className="px-5 py-3">
                      <input value={newCat.name} onChange={e => setNewCat(p => ({ ...p, name: e.target.value }))}
                        placeholder="Category name" autoFocus className={INPUT} />
                    </td>
                    <td className="px-4 py-3">
                      <input value={newCat.icon} onChange={e => setNewCat(p => ({ ...p, icon: e.target.value }))}
                        className={`${INPUT} w-16 text-center text-xl`} maxLength={2} />
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-gray-400">0</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1.5">
                        {COLORS.map(c => (
                          <button key={c} type="button" onClick={() => setNewCat(p => ({ ...p, color: c }))}
                            className={`w-5 h-5 rounded-full transition-transform ${newCat.color === c ? 'scale-125 ring-2 ring-offset-1 ring-gray-400' : ''}`}
                            style={{ background: c }} />
                        ))}
                      </div>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={handleAdd} className="w-8 h-8 rounded-lg flex items-center justify-center bg-green-50 text-green-600 hover:bg-green-100 transition-colors">
                          <Check size={14} />
                        </button>
                        <button onClick={() => setAdding(false)} className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-100 text-gray-400 hover:bg-gray-200 transition-colors">
                          <X size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )}

                {cats.map(cat => (
                  <tr key={cat.id} className="border-t border-gray-50 hover:bg-[#FDFCFB] transition-colors">
                    {editId === cat.id && editForm ? (
                      <>
                        <td className="px-5 py-3">
                          <input value={editForm.name} onChange={e => setEditForm(p => p ? { ...p, name: e.target.value } : p)}
                            autoFocus className={INPUT} />
                        </td>
                        <td className="px-4 py-3">
                          <input value={editForm.icon} onChange={e => setEditForm(p => p ? { ...p, icon: e.target.value } : p)}
                            className={`${INPUT} w-16 text-center text-xl`} maxLength={2} />
                        </td>
                        <td className="px-4 py-3"><span className="text-sm text-gray-500">{cat.count}</span></td>
                        <td className="px-4 py-3">
                          <div className="flex gap-1.5">
                            {COLORS.map(c => (
                              <button key={c} type="button" onClick={() => setEditForm(p => p ? { ...p, color: c } : p)}
                                className={`w-5 h-5 rounded-full transition-transform ${editForm.color === c ? 'scale-125 ring-2 ring-offset-1 ring-gray-400' : ''}`}
                                style={{ background: c }} />
                            ))}
                          </div>
                        </td>
                        <td className="px-5 py-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button onClick={handleEdit} className="w-8 h-8 rounded-lg flex items-center justify-center bg-green-50 text-green-600">
                              <Check size={14} />
                            </button>
                            <button onClick={() => { setEditId(null); setEditForm(null) }} className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-100 text-gray-400">
                              <X size={14} />
                            </button>
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-5 py-3.5">
                          <span className="text-sm font-semibold text-gray-900">{cat.name}</span>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className="text-2xl">{cat.icon}</span>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className="text-sm font-medium text-gray-700">{cat.count} cafes</span>
                        </td>
                        <td className="px-4 py-3.5">
                          <div className="w-6 h-6 rounded-full" style={{ background: cat.color }} />
                        </td>
                        <td className="px-5 py-3.5 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button onClick={() => { setEditId(cat.id); setEditForm({ ...cat }) }}
                              className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-blue-50 text-blue-500">
                              <Edit2 size={14} />
                            </button>
                            <button onClick={() => setDeleteId(cat.id)}
                              className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-red-50 text-red-500">
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.4)' }}>
          <div className="bg-white rounded-[16px] p-6 w-full max-w-sm" style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
            <h3 className="font-bold text-gray-900 mb-2">Delete Category?</h3>
            <p className="text-sm text-gray-500 mb-5">All cafes in this category will need to be reassigned.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 text-sm font-semibold text-gray-600 rounded-xl border border-gray-200 hover:bg-gray-50">Cancel</button>
              <button onClick={() => handleDelete(deleteId)} className="flex-1 py-2.5 text-sm font-semibold text-white rounded-xl bg-red-500">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
