import { useEffect, useRef, useState } from 'react'
import { MapPin, Phone, Mail, Share2, Link2, Send, CheckCircle } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import L from 'leaflet'

export default function Contact() {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<L.Map | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return
    const map = L.map(mapRef.current, { center: [-6.2146, 106.8229], zoom: 14, zoomControl: false, dragging: false })
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap' }).addTo(map)
    L.marker([-6.2146, 106.8229]).addTo(map)
    mapInstance.current = map
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen" style={{ background: '#F8F4E9' }}>
      <Navbar />

      {/* Header */}
      <section className="py-16 text-center" style={{ background: 'linear-gradient(135deg, #2C1810 0%, #6F4E37 100%)' }}>
        <h1 className="text-4xl font-bold text-white mb-2">Get in Touch</h1>
        <p className="text-white/70 text-base">We're here to help — whether you're a cafe owner, partner, or just a coffee lover.</p>
      </section>

      <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact info */}
          <div className="space-y-5">
            <div className="bg-white rounded-[12px] p-6" style={{ boxShadow: '0 2px 16px rgba(111,78,55,0.08)' }}>
              <h3 className="font-bold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: '#F8F4E9' }}>
                    <MapPin size={16} color="#6F4E37" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-0.5">Address</p>
                    <p className="text-sm text-gray-700">Jl. Sudirman Kav. 52, Jakarta Pusat 10220</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: '#F8F4E9' }}>
                    <Phone size={16} color="#6F4E37" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-0.5">Phone</p>
                    <p className="text-sm text-gray-700">+62 21 5500 1234</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: '#F8F4E9' }}>
                    <Mail size={16} color="#6F4E37" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-0.5">Email</p>
                    <p className="text-sm text-gray-700">hello@cafespot.id</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[12px] p-6" style={{ boxShadow: '0 2px 16px rgba(111,78,55,0.08)' }}>
              <h3 className="font-bold text-gray-900 mb-3">Follow Us</h3>
              <div className="flex gap-3">
                {[
                  { Icon: Share2, label: '@cafespot.id' },
                  { Icon: Link2, label: '@cafespot_id' },
                  { Icon: Mail, label: 'CafeSpot Indonesia' },
                ].map(({ Icon, label }, i) => (
                  <a key={i} href="#"
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-110"
                    style={{ background: 'linear-gradient(135deg, #6F4E37, #C4843A)' }}
                    title={label}>
                    <Icon size={16} color="white" />
                  </a>
                ))}
              </div>
            </div>

            {/* Map */}
            <div className="bg-white rounded-[12px] overflow-hidden" style={{ boxShadow: '0 2px 16px rgba(111,78,55,0.08)' }}>
              <div ref={mapRef} style={{ height: 200 }} />
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-[12px] p-8" style={{ boxShadow: '0 2px 16px rgba(111,78,55,0.08)' }}>
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <CheckCircle size={56} color="#22C55E" className="mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-500 text-sm mb-6">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                  <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }) }}
                    className="px-5 py-2.5 text-sm font-semibold text-white rounded-xl"
                    style={{ background: 'linear-gradient(135deg, #6F4E37, #C4843A)' }}>
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Send us a message</h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Full Name</label>
                        <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required
                          placeholder="Rizky Pratama"
                          className="w-full px-4 py-3 rounded-xl border border-[#EDE8D8] text-sm outline-none focus:border-[#C4843A] focus:ring-2 focus:ring-[#C4843A]/20 transition-all bg-[#F8F4E9]" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Email</label>
                        <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required type="email"
                          placeholder="rizky@email.com"
                          className="w-full px-4 py-3 rounded-xl border border-[#EDE8D8] text-sm outline-none focus:border-[#C4843A] focus:ring-2 focus:ring-[#C4843A]/20 transition-all bg-[#F8F4E9]" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Subject</label>
                      <input value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} required
                        placeholder="Partnership / Feedback / General"
                        className="w-full px-4 py-3 rounded-xl border border-[#EDE8D8] text-sm outline-none focus:border-[#C4843A] focus:ring-2 focus:ring-[#C4843A]/20 transition-all bg-[#F8F4E9]" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Message</label>
                      <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required rows={5}
                        placeholder="Tell us what's on your mind..."
                        className="w-full px-4 py-3 rounded-xl border border-[#EDE8D8] text-sm outline-none focus:border-[#C4843A] focus:ring-2 focus:ring-[#C4843A]/20 transition-all bg-[#F8F4E9] resize-none" />
                    </div>
                    <button type="submit"
                      className="flex items-center justify-center gap-2 w-full py-3 text-sm font-semibold text-white rounded-xl transition-all hover:opacity-90 active:scale-95"
                      style={{ background: 'linear-gradient(135deg, #6F4E37, #C4843A)' }}>
                      <Send size={15} />
                      Send Message
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
