import { Link } from 'react-router-dom'
import { Coffee, Share2, Link2, MapPin, Phone, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="text-white pt-16 pb-8" style={{ background: '#2C1810' }}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #6F4E37, #C4843A)' }}>
                <Coffee size={16} color="white" />
              </div>
              <span className="font-bold text-xl">CafeSpot</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Discover the best cafes and hangout spots near you. Your next favorite place is just a map pin away.
            </p>
            <div className="flex gap-3">
              {[Share2, Link2, Mail].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors hover:text-[#C4843A]"
                  style={{ background: 'rgba(255,255,255,0.08)' }}>
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-semibold text-sm mb-4 text-[#C4843A] uppercase tracking-wider">Explore</h4>
            <ul className="space-y-2.5">
              {[
                { to: '/', label: 'Home' },
                { to: '/explore', label: 'Explore Cafes' },
                { to: '/map', label: 'Interactive Map' },
                { to: '/about', label: 'About Us' },
                { to: '/contact', label: 'Contact' },
              ].map(l => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-gray-400 no-underline hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold text-sm mb-4 text-[#C4843A] uppercase tracking-wider">Categories</h4>
            <ul className="space-y-2.5">
              {['Coffee Shop', 'Live Music', 'Outdoor', 'Rooftop', 'Study Cafe'].map(c => (
                <li key={c}>
                  <Link to="/explore" className="text-sm text-gray-400 no-underline hover:text-white transition-colors">
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm mb-4 text-[#C4843A] uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-gray-400">
                <MapPin size={14} className="mt-0.5 shrink-0 text-[#C4843A]" />
                Jl. Sudirman Kav. 52, Jakarta Pusat 10220
              </li>
              <li className="flex items-center gap-2.5 text-sm text-gray-400">
                <Phone size={14} className="shrink-0 text-[#C4843A]" />
                +62 21 5500 1234
              </li>
              <li className="flex items-center gap-2.5 text-sm text-gray-400">
                <Mail size={14} className="shrink-0 text-[#C4843A]" />
                hello@cafespot.id
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">© 2026 CafeSpot. All rights reserved.</p>
          <p className="text-xs text-gray-500">Made with ☕ for coffee lovers everywhere</p>
        </div>
      </div>
    </footer>
  )
}
