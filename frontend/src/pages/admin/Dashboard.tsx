import { Link } from 'react-router-dom'
import { Store, Tags, Users, TrendingUp, Plus, Eye, Bell, Search } from 'lucide-react'
import AdminSidebar from '../../components/AdminSidebar'
import { cafes } from '../../data/cafes'

const stats = [
  { label: 'Total Cafes', value: '240', change: '+12 this month', icon: Store, color: '#6F4E37', bg: '#F8F4E9' },
  { label: 'Categories', value: '5', change: '2 recently added', icon: Tags, color: '#C4843A', bg: '#FFF9F0' },
  { label: 'Total Visitors', value: '18,432', change: '+8.2% this week', icon: Users, color: '#5A8A5A', bg: '#F0F9F0' },
  { label: 'Monthly Growth', value: '23%', change: 'vs last month', icon: TrendingUp, color: '#8B6347', bg: '#FAF6F2' },
]

const recentActivity = [
  { text: 'New cafe "Kopi Kenangan Selatan" added', time: '2 hours ago', type: 'add' },
  { text: 'Review flagged at Filosofi Kopi', time: '4 hours ago', type: 'flag' },
  { text: '"Rooftop Brew Co." details updated', time: '6 hours ago', type: 'edit' },
  { text: 'Category "Coworking" created', time: '1 day ago', type: 'add' },
  { text: '"Bean & Book" marked as temporarily closed', time: '2 days ago', type: 'edit' },
]

const activityColors: Record<string, string> = { add: '#22C55E', edit: '#F59E0B', flag: '#EF4444' }

export default function Dashboard() {
  const topCafes = [...cafes].sort((a, b) => b.rating - a.rating).slice(0, 5)

  return (
    <div className="flex min-h-screen" style={{ background: '#F3F3F3' }}>
      <AdminSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white px-6 py-4 flex items-center justify-between border-b border-gray-100" style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.05)' }}>
          <div>
            <h1 className="text-lg font-bold text-gray-900">Dashboard</h1>
            <p className="text-xs text-gray-400">Saturday, 19 July 2026</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-[#F8F4E9] rounded-xl px-3 py-2">
              <Search size={14} color="#9CA3AF" />
              <input placeholder="Search..." className="w-36 text-xs outline-none bg-transparent text-gray-700 placeholder-gray-400" />
            </div>
            <button className="w-9 h-9 rounded-xl bg-[#F8F4E9] flex items-center justify-center relative">
              <Bell size={16} color="#6F4E37" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="flex items-center gap-2 ml-1">
              <img src="https://i.pravatar.cc/36?img=11" alt="admin" className="w-9 h-9 rounded-xl object-cover" />
              <div className="hidden md:block">
                <p className="text-xs font-semibold text-gray-800">Rizky Pratama</p>
                <p className="text-[10px] text-gray-400">Super Admin</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          {/* Welcome */}
          <div className="rounded-[16px] p-6 mb-6 flex items-center justify-between"
            style={{ background: 'linear-gradient(135deg, #2C1810, #6F4E37)' }}>
            <div>
              <p className="text-white/60 text-sm mb-1">Good morning 👋</p>
              <h2 className="text-2xl font-bold text-white">Welcome back, Rizky!</h2>
              <p className="text-white/70 text-sm mt-1">Here's what's happening with CafeSpot today.</p>
            </div>
            <div className="hidden md:block text-6xl opacity-30">☕</div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
            {stats.map(s => (
              <div key={s.label} className="bg-white rounded-[12px] p-5" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: s.bg }}>
                    <s.icon size={18} style={{ color: s.color }} />
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full text-green-700 bg-green-50">+</span>
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-0.5">{s.value}</p>
                <p className="text-xs font-medium text-gray-500">{s.label}</p>
                <p className="text-xs text-green-600 mt-1">{s.change}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Top cafes */}
            <div className="xl:col-span-2 bg-white rounded-[12px] p-5" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900">Top Rated Cafes</h3>
                <Link to="/admin/cafes" className="text-xs font-medium text-[#C4843A] no-underline">View all →</Link>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left text-xs font-semibold text-gray-400 pb-2 pr-4">CAFE</th>
                    <th className="text-left text-xs font-semibold text-gray-400 pb-2 pr-4">CATEGORY</th>
                    <th className="text-left text-xs font-semibold text-gray-400 pb-2 pr-4">RATING</th>
                    <th className="text-left text-xs font-semibold text-gray-400 pb-2">REVIEWS</th>
                  </tr>
                </thead>
                <tbody>
                  {topCafes.map(cafe => (
                    <tr key={cafe.id} className="border-b border-gray-50 last:border-0">
                      <td className="py-2.5 pr-4">
                        <div className="flex items-center gap-2">
                          <img src={cafe.image} alt={cafe.name} className="w-8 h-8 rounded-lg object-cover bg-[#EDE8D8]" />
                          <span className="text-sm font-medium text-gray-800 truncate max-w-[140px]">{cafe.name}</span>
                        </div>
                      </td>
                      <td className="py-2.5 pr-4">
                        <span className="text-xs font-medium text-white px-2 py-0.5 rounded-full" style={{ background: '#6F4E37' }}>{cafe.category}</span>
                      </td>
                      <td className="py-2.5 pr-4">
                        <span className="text-sm font-bold text-gray-900">⭐ {cafe.rating}</span>
                      </td>
                      <td className="py-2.5">
                        <span className="text-sm text-gray-500">{cafe.reviews}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Activity */}
            <div className="bg-white rounded-[12px] p-5" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
              <h3 className="font-bold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {recentActivity.map((a, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ background: activityColors[a.type] }} />
                    <div>
                      <p className="text-sm text-gray-700 leading-tight">{a.text}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{a.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick actions */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Add New Cafe', icon: Plus, to: '/admin/cafes/add', color: '#6F4E37' },
              { label: 'Manage Cafes', icon: Store, to: '/admin/cafes', color: '#C4843A' },
              { label: 'Categories', icon: Tags, to: '/admin/categories', color: '#5A8A5A' },
              { label: 'View Site', icon: Eye, to: '/', color: '#8B6347' },
            ].map(({ label, icon: Icon, to, color }) => (
              <Link key={to} to={to}
                className="bg-white rounded-[12px] p-4 flex items-center gap-3 no-underline transition-all hover:-translate-y-0.5"
                style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${color}18` }}>
                  <Icon size={16} style={{ color }} />
                </div>
                <span className="text-sm font-semibold text-gray-700">{label}</span>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
