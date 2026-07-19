import { Coffee, Target, Eye, Phone, Mail } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { teamMembers } from '../data/cafes'

export default function About() {
  return (
    <div className="min-h-screen" style={{ background: '#F8F4E9' }}>
      <Navbar />

      {/* Hero */}
      <section className="relative py-24 overflow-hidden" style={{ background: 'linear-gradient(135deg, #2C1810 0%, #6F4E37 100%)' }}>
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }} />
        </div>
        <div className="relative max-w-[1440px] mx-auto px-6 md:px-10 text-center">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
            style={{ background: 'linear-gradient(135deg, #C4843A, #F5C87D)' }}>
            <Coffee size={28} color="white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About CafeSpot</h1>
          <p className="text-white/75 text-lg max-w-xl mx-auto leading-relaxed">
            We're on a mission to help people discover the perfect cafe experience — one cup at a time.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#C4843A] mb-2">Our Story</p>
            <h2 className="text-3xl font-bold text-gray-900 mb-5">Born from a love of great cafes</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              CafeSpot started in 2023 when our founder Rizky found himself unable to track his growing list of favorite Jakarta cafes. A simple note-taking app felt inadequate — he wanted something map-based, social, and richly detailed.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Six months later, CafeSpot launched with 40 handpicked Jakarta cafes. Today, we list over 240 venues across 12 Indonesian cities — all verified, photographed, and reviewed by our community.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We believe the right cafe can transform your entire day — turning a mundane meeting into an inspiring session, or a solo study grind into a cherished memory.
            </p>
          </div>
          <div className="relative h-72 md:h-96 rounded-[20px] overflow-hidden bg-[#EDE8D8]">
            <img
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=700&h=500&fit=crop&auto=format"
              alt="cafe culture"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-white py-16">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">What Drives Us</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 rounded-[16px]" style={{ background: 'linear-gradient(135deg, #F8F4E9, #EDE8D8)' }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ background: '#6F4E37' }}>
                <Target size={22} color="white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To make cafe discovery effortless and joyful — giving everyone the tools to find their perfect workspace, social hub, or quiet corner, wherever they are in Indonesia.
              </p>
            </div>
            <div className="p-8 rounded-[16px]" style={{ background: 'linear-gradient(135deg, #2C1810, #6F4E37)' }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ background: 'rgba(255,255,255,0.15)' }}>
                <Eye size={22} color="white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Our Vision</h3>
              <p className="text-white/75 leading-relaxed">
                To become Southeast Asia's most loved cafe discovery platform — a place where every coffee enthusiast, remote worker, and hangout-seeker feels at home.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-10 py-16">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#C4843A] mb-1">Why we're different</p>
          <h2 className="text-3xl font-bold text-gray-900">Our Values</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: '🗺️', title: 'Map-First Discovery', desc: 'We believe location context transforms how you discover places. Our interactive map puts every cafe in its neighborhood context.' },
            { icon: '⭐', title: 'Honest Reviews', desc: 'Every review on CafeSpot comes from verified visitors. No fake ratings, no paid placements — just authentic community voices.' },
            { icon: '☕', title: 'Deep Cafe Profiles', desc: "We go beyond name and address. Facilities, opening hours, ambiance, pricing — everything you need before you even walk through the door." },
          ].map((v, i) => (
            <div key={i} className="bg-white rounded-[12px] p-6 text-center"
              style={{ boxShadow: '0 2px 16px rgba(111,78,55,0.08)' }}>
              <span className="text-4xl mb-4 block">{v.icon}</span>
              <h3 className="font-bold text-gray-900 mb-2">{v.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="bg-white py-16">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#C4843A] mb-1">The people behind it</p>
            <h2 className="text-3xl font-bold text-gray-900">Meet the Team</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((m, i) => (
              <div key={i} className="text-center rounded-[12px] p-6" style={{ background: '#F8F4E9' }}>
                <img src={m.avatar} alt={m.name} className="w-20 h-20 rounded-full object-cover mx-auto mb-3 ring-4 ring-white" />
                <h3 className="font-bold text-gray-900 mb-0.5">{m.name}</h3>
                <p className="text-xs font-semibold text-[#C4843A] mb-2">{m.role}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact strip */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-10 py-12">
        <div className="rounded-[16px] p-8 flex flex-col md:flex-row items-center justify-between gap-6"
          style={{ background: 'linear-gradient(135deg, #2C1810, #6F4E37)' }}>
          <div>
            <h3 className="text-xl font-bold text-white mb-1">Have questions or want to partner?</h3>
            <p className="text-white/70 text-sm">We'd love to hear from you — whether you're a cafe owner or a coffee lover.</p>
          </div>
          <div className="flex gap-4 flex-wrap">
            <a href="mailto:hello@cafespot.id" className="flex items-center gap-2 text-sm font-semibold text-white no-underline px-4 py-2.5 rounded-xl border border-white/30 hover:bg-white/10 transition-colors">
              <Mail size={14} /> Email Us
            </a>
            <a href="tel:+62215500 1234" className="flex items-center gap-2 text-sm font-semibold text-white no-underline px-4 py-2.5 rounded-xl"
              style={{ background: 'rgba(255,255,255,0.15)' }}>
              <Phone size={14} /> +62 21 5500 1234
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
