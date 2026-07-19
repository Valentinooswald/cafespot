import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, MapPin, Star, ArrowRight, Coffee, Music, TreePine, Building2, BookOpen } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CafeCard from '../components/CafeCard'
import { cafes, categories } from '../data/cafes'

const categoryIcons: Record<string, typeof Coffee> = {
  'Coffee Shop': Coffee,
  'Live Music': Music,
  'Outdoor': TreePine,
  'Rooftop': Building2,
  'Study Cafe': BookOpen,
}

const stats = [
  { label: 'Cafes Listed', value: '240+' },
  { label: 'Cities Covered', value: '12' },
  { label: 'Happy Users', value: '18K+' },
  { label: 'Reviews', value: '52K+' },
]

export default function Landing() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    navigate(`/explore?q=${encodeURIComponent(query)}`)
  }

  const featured = cafes.filter(c => c.featured).slice(0, 4)

  return (
    <div className="min-h-screen" style={{ background: '#F8F4E9' }}>
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1600&h=900&fit=crop&auto=format"
            alt="cafe hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(44,24,16,0.88) 0%, rgba(111,78,55,0.72) 60%, rgba(196,132,58,0.40) 100%)' }} />
        </div>

        <div className="relative max-w-[1440px] mx-auto px-6 md:px-10 py-28 md:py-40">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full mb-5">
              <MapPin size={12} />
              Discover 240+ cafes across Indonesia
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-5">
              Find Your Perfect<br />
              <span style={{ color: '#F5C87D' }}>Cafe & Hangout</span> Spot
            </h1>
            <p className="text-lg text-white/80 mb-8 leading-relaxed">
              From hidden gems to beloved classics — explore cafes on an interactive map, read real reviews, and plan your next great outing.
            </p>

            {/* Search */}
            <form onSubmit={handleSearch} className="flex gap-2 bg-white rounded-2xl p-2 shadow-2xl max-w-xl">
              <div className="flex items-center gap-2 flex-1 px-3">
                <Search size={18} color="#9CA3AF" />
                <input
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search cafes, locations..."
                  className="flex-1 text-sm outline-none bg-transparent text-gray-800 placeholder-gray-400"
                />
              </div>
              <button type="submit" className="px-5 py-3 text-sm font-semibold text-white rounded-xl transition-all hover:opacity-90 active:scale-95 whitespace-nowrap"
                style={{ background: 'linear-gradient(135deg, #6F4E37, #C4843A)' }}>
                Search
              </button>
            </form>

            {/* Popular searches */}
            <div className="flex flex-wrap gap-2 mt-4">
              {['Near Me', 'Study Cafe', 'Live Music', 'Rooftop'].map(tag => (
                <button key={tag} onClick={() => navigate(`/explore?q=${tag}`)}
                  className="text-xs text-white/80 bg-white/15 hover:bg-white/25 px-3 py-1 rounded-full backdrop-blur-sm transition-colors">
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="relative bg-white/10 backdrop-blur-sm border-t border-white/10">
          <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map(s => (
                <div key={s.label} className="text-center">
                  <div className="text-2xl font-bold text-white">{s.value}</div>
                  <div className="text-xs text-white/60">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-10 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#C4843A] mb-1">Browse by type</p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Cafe Categories</h2>
          </div>
          <Link to="/explore" className="flex items-center gap-1 text-sm font-medium text-[#6F4E37] no-underline hover:gap-2 transition-all">
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {categories.map(cat => {
            const Icon = categoryIcons[cat.name] || Coffee
            return (
              <Link key={cat.id} to={`/explore?cat=${cat.name}`}
                className="no-underline group bg-white rounded-[12px] p-5 flex flex-col items-center gap-3 transition-all hover:-translate-y-1"
                style={{ boxShadow: '0 2px 16px rgba(111,78,55,0.08)' }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-all group-hover:scale-110"
                  style={{ background: `${cat.color}18` }}>
                  <Icon size={22} style={{ color: cat.color }} />
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-gray-900">{cat.name}</p>
                  <p className="text-xs text-gray-400">{cat.count} cafes</p>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Featured Cafes */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-10 pb-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#C4843A] mb-1">Editor's picks</p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Featured Cafes</h2>
          </div>
          <Link to="/explore" className="flex items-center gap-1 text-sm font-medium text-[#6F4E37] no-underline hover:gap-2 transition-all">
            Explore all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map(cafe => <CafeCard key={cafe.id} cafe={cafe} />)}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="mx-6 md:mx-10 mb-16 rounded-[20px] overflow-hidden relative"
        style={{ maxWidth: 'calc(1440px - 80px)', marginLeft: 'auto', marginRight: 'auto' }}>
        <img
          src="https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=1400&h=400&fit=crop&auto=format"
          alt="cafe atmosphere"
          className="w-full h-52 object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-between px-8 md:px-16"
          style={{ background: 'linear-gradient(90deg, rgba(44,24,16,0.92) 0%, rgba(111,78,55,0.60) 60%, transparent 100%)' }}>
          <div>
            <h3 className="text-xl md:text-3xl font-bold text-white mb-2">Ready to explore?</h3>
            <p className="text-white/75 text-sm md:text-base">Open the interactive map and find cafes near you right now.</p>
          </div>
          <Link to="/map"
            className="hidden md:flex items-center gap-2 text-sm font-semibold text-white no-underline px-6 py-3 rounded-xl whitespace-nowrap transition-all hover:opacity-90 active:scale-95"
            style={{ background: 'linear-gradient(135deg, #C4843A, #6F4E37)' }}>
            <MapPin size={15} />
            Open Map
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-10 pb-16">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#C4843A] mb-1">What people say</p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Loved by coffee lovers</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { name: 'Alicia R.', text: "CafeSpot helped me find my new favorite study spot in under 2 minutes. The map is incredibly intuitive!", stars: 5, avatar: 'https://i.pravatar.cc/48?img=1' },
            { name: 'Bima S.', text: "Finally an app that understands what cafe lovers need. Detailed info, real photos, and honest reviews.", stars: 5, avatar: 'https://i.pravatar.cc/48?img=3' },
            { name: 'Citra D.', text: "I discovered three rooftop gems in Sudirman I had no idea existed. Worth every scroll!", stars: 5, avatar: 'https://i.pravatar.cc/48?img=5' },
          ].map((t, i) => (
            <div key={i} className="bg-white rounded-[12px] p-6" style={{ boxShadow: '0 2px 16px rgba(111,78,55,0.08)' }}>
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <Star key={j} size={14} fill="#F59E0B" color="#F59E0B" />
                ))}
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <img src={t.avatar} alt={t.name} className="w-9 h-9 rounded-full object-cover" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                  <p className="text-xs text-gray-400">Verified User</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
