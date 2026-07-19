import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  Coffee, LayoutDashboard, Store, Tags, UserCircle, LogOut, ChevronRight
} from 'lucide-react'

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/cafes', label: 'Manage Cafes', icon: Store },
  { to: '/admin/categories', label: 'Categories', icon: Tags },
  { to: '/admin/profile', label: 'Profile', icon: UserCircle },
]

export default function AdminSidebar() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  return (
    <aside className="w-64 min-h-screen flex flex-col"
      style={{ background: '#2C1810', boxShadow: '4px 0 24px rgba(0,0,0,0.15)' }}>
      {/* Logo */}
      <div className="px-6 py-5 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #6F4E37, #C4843A)' }}>
            <Coffee size={16} color="white" />
          </div>
          <div>
            <span className="font-bold text-white text-base">CafeSpot</span>
            <p className="text-[10px] text-gray-400 -mt-0.5">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ to, label, icon: Icon }) => {
          const isActive = pathname === to || (to !== '/admin' && pathname.startsWith(to))
          return (
            <Link key={to} to={to}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl no-underline text-sm font-medium transition-all ${
                isActive
                  ? 'text-white'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
              style={isActive ? { background: 'linear-gradient(135deg, #6F4E37, #C4843A)' } : {}}>
              <Icon size={17} />
              <span className="flex-1">{label}</span>
              {isActive && <ChevronRight size={14} />}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-white/10">
        <button
          onClick={() => navigate('/admin/login')}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all">
          <LogOut size={17} />
          Logout
        </button>
      </div>
    </aside>
  )
}
