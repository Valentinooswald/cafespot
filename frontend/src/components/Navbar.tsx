import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { MapPin, Menu, X, Coffee } from 'lucide-react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  const links = [
    { to: '/', label: 'Home' },
    { to: '/explore', label: 'Explore' },
    { to: '/map', label: 'Map' },
    { to: '/about', label: 'About' },
  ]

  const active = (to: string) =>
    pathname === to ? 'text-[#6F4E37] font-semibold' : 'text-gray-600 hover:text-[#6F4E37]'

  return (
    <nav className="bg-white/95 backdrop-blur-sm sticky top-0 z-50 border-b border-[#EDE8D8]" style={{ boxShadow: '0 2px 16px rgba(111,78,55,0.08)' }}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 no-underline">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #6F4E37, #C4843A)' }}>
            <Coffee size={16} color="white" />
          </div>
          <span className="font-bold text-xl" style={{ color: '#6F4E37' }}>CafeSpot</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <Link key={l.to} to={l.to} className={`text-sm font-medium no-underline transition-colors ${active(l.to)}`}>
              {l.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/map" className="flex items-center gap-1.5 text-sm font-medium text-white no-underline px-4 py-2 rounded-xl transition-all hover:opacity-90 active:scale-95"
            style={{ background: 'linear-gradient(135deg, #6F4E37, #C4843A)' }}>
            <MapPin size={14} />
            Find Cafes
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden p-2 rounded-lg hover:bg-[#F8F4E9]" onClick={() => setOpen(!open)}>
          {open ? <X size={20} color="#6F4E37" /> : <Menu size={20} color="#6F4E37" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-[#EDE8D8] px-6 py-4 flex flex-col gap-4">
          {links.map(l => (
            <Link key={l.to} to={l.to} className={`text-sm font-medium no-underline ${active(l.to)}`} onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <Link to="/map" onClick={() => setOpen(false)}
            className="text-sm font-medium text-white no-underline px-4 py-2 rounded-xl text-center"
            style={{ background: 'linear-gradient(135deg, #6F4E37, #C4843A)' }}>
            Find Cafes
          </Link>
        </div>
      )}
    </nav>
  )
}
