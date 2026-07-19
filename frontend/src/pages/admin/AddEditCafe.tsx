import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Upload, MapPin, Save, X, ChevronLeft } from 'lucide-react'
import AdminSidebar from '../../components/AdminSidebar'
import { cafes } from '../../data/cafes'
import L from 'leaflet'

const INPUT_CLS = "w-full px-4 py-3 rounded-xl border border-[#EDE8D8] text-sm outline-none focus:border-[#C4843A] focus:ring-2 focus:ring-[#C4843A]/20 transition-all bg-[#F8F4E9]"
const LABEL_CLS = "block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide"

const defaultForm = {
  name: '', category: 'Coffee Shop', address: '', city: '', description: '',
  price: '$$', lat: '-6.2446', lng: '106.8229', phone: '', instagram: '',
  openMon: '08:00', closeMon: '22:00', openWknd: '08:00', closeWknd: '22:00',
  wifi: true, parking: false, powerOutlet: true, ac: true, smokingArea: false,
}

export default function AddEditCafe() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)
  const existingCafe = id ? cafes.find(c => c.id === Number(id)) : null

  const [form, setForm] = useState({ ...defaultForm, ...
    (existingCafe ? {
      name: existingCafe.name,
      category: existingCafe.category,
      address: existingCafe.address,
      city: existingCafe.city,
      description: existingCafe.description,
      price: existingCafe.price,
      lat: String(existingCafe.lat),
      lng: String(existingCafe.lng),
      phone: existingCafe.phone,
      instagram: existingCafe.instagram,
      wifi: existingCafe.facilities.wifi,
      parking: existingCafe.facilities.parking,
      powerOutlet: existingCafe.facilities.powerOutlet,
      ac: existingCafe.facilities.ac,
      smokingArea: existingCafe.facilities.smokingArea,
    } : {})
  })

  const [saved, setSaved] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<L.Map | null>(null)
  const markerRef = useRef<L.Marker | null>(null)

  const f = (key: keyof typeof form, val: string | boolean) =>
    setForm(prev => ({ ...prev, [key]: val }))

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return
    const lat = parseFloat(form.lat) || -6.2446
    const lng = parseFloat(form.lng) || 106.8229

    const map = L.map(mapRef.current, { center: [lat, lng], zoom: 13 })
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap' }).addTo(map)

    const marker = L.marker([lat, lng], { draggable: true }).addTo(map)
    marker.on('dragend', () => {
      const pos = marker.getLatLng()
      f('lat', pos.lat.toFixed(6))
      f('lng', pos.lng.toFixed(6))
    })

    map.on('click', (e: L.LeafletMouseEvent) => {
      marker.setLatLng(e.latlng)
      f('lat', e.latlng.lat.toFixed(6))
      f('lng', e.latlng.lng.toFixed(6))
    })

    mapInstance.current = map
    markerRef.current = marker
  }, [])

  useEffect(() => {
    const lat = parseFloat(form.lat)
    const lng = parseFloat(form.lng)
    if (!isNaN(lat) && !isNaN(lng)) {
      markerRef.current?.setLatLng([lat, lng])
    }
  }, [form.lat, form.lng])

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => { navigate('/admin/cafes') }, 1200)
  }

  return (
    <div className="flex min-h-screen" style={{ background: '#F3F3F3' }}>
      <AdminSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white px-6 py-4 flex items-center justify-between border-b border-gray-100"
          style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.05)' }}>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/admin/cafes')} className="w-8 h-8 rounded-xl bg-[#F8F4E9] flex items-center justify-center hover:bg-[#EDE8D8] transition-colors">
              <ChevronLeft size={16} color="#6F4E37" />
            </button>
            <div>
              <h1 className="text-lg font-bold text-gray-900">{isEdit ? 'Edit Cafe' : 'Add New Cafe'}</h1>
              <p className="text-xs text-gray-400">{isEdit ? existingCafe?.name : 'Fill in the cafe details below'}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => navigate('/admin/cafes')} className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-600 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors">
              <X size={14} /> Cancel
            </button>
            <button form="cafe-form" type="submit"
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white rounded-xl transition-all hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #6F4E37, #C4843A)' }}>
              {saved ? '✓ Saved!' : <><Save size={14} /> Save Cafe</>}
            </button>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          <form id="cafe-form" onSubmit={handleSave}>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Main info */}
              <div className="xl:col-span-2 space-y-5">
                <div className="bg-white rounded-[12px] p-5" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
                  <h3 className="font-bold text-gray-900 mb-4">Basic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className={LABEL_CLS}>Cafe Name</label>
                      <input value={form.name} onChange={e => f('name', e.target.value)} required
                        placeholder="e.g. Filosofi Kopi Selatan" className={INPUT_CLS} />
                    </div>
                    <div>
                      <label className={LABEL_CLS}>Category</label>
                      <select value={form.category} onChange={e => f('category', e.target.value)} className={INPUT_CLS}>
                        {['Coffee Shop', 'Live Music', 'Outdoor', 'Rooftop', 'Study Cafe'].map(c => (
                          <option key={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className={LABEL_CLS}>Price Range</label>
                      <select value={form.price} onChange={e => f('price', e.target.value)} className={INPUT_CLS}>
                        {['$', '$$', '$$$'].map(p => <option key={p}>{p}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className={LABEL_CLS}>Phone</label>
                      <input value={form.phone} onChange={e => f('phone', e.target.value)}
                        placeholder="+62 21 5500 1234" className={INPUT_CLS} />
                    </div>
                    <div>
                      <label className={LABEL_CLS}>Instagram</label>
                      <input value={form.instagram} onChange={e => f('instagram', e.target.value)}
                        placeholder="@cafename" className={INPUT_CLS} />
                    </div>
                    <div>
                      <label className={LABEL_CLS}>Address</label>
                      <input value={form.address} onChange={e => f('address', e.target.value)} required
                        placeholder="Jl. Sudirman No. 1" className={INPUT_CLS} />
                    </div>
                    <div>
                      <label className={LABEL_CLS}>City</label>
                      <input value={form.city} onChange={e => f('city', e.target.value)} required
                        placeholder="Jakarta Selatan" className={INPUT_CLS} />
                    </div>
                    <div className="md:col-span-2">
                      <label className={LABEL_CLS}>Description</label>
                      <textarea value={form.description} onChange={e => f('description', e.target.value)} rows={4}
                        placeholder="Describe the cafe's ambiance, specialty, and unique selling points..."
                        className={`${INPUT_CLS} resize-none`} />
                    </div>
                  </div>
                </div>

                {/* Opening hours */}
                <div className="bg-white rounded-[12px] p-5" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
                  <h3 className="font-bold text-gray-900 mb-4">Opening Hours</h3>
                  <div className="space-y-3">
                    <div>
                      <label className={LABEL_CLS}>Monday – Friday</label>
                      <div className="flex items-center gap-3">
                        <input type="time" value={form.openMon} onChange={e => f('openMon', e.target.value)} className={`${INPUT_CLS} flex-1`} />
                        <span className="text-gray-400 text-sm">to</span>
                        <input type="time" value={form.closeMon} onChange={e => f('closeMon', e.target.value)} className={`${INPUT_CLS} flex-1`} />
                      </div>
                    </div>
                    <div>
                      <label className={LABEL_CLS}>Saturday – Sunday</label>
                      <div className="flex items-center gap-3">
                        <input type="time" value={form.openWknd} onChange={e => f('openWknd', e.target.value)} className={`${INPUT_CLS} flex-1`} />
                        <span className="text-gray-400 text-sm">to</span>
                        <input type="time" value={form.closeWknd} onChange={e => f('closeWknd', e.target.value)} className={`${INPUT_CLS} flex-1`} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Facilities */}
                <div className="bg-white rounded-[12px] p-5" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
                  <h3 className="font-bold text-gray-900 mb-4">Facilities</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {([
                      ['wifi', 'Free WiFi'],
                      ['parking', 'Parking'],
                      ['powerOutlet', 'Power Outlets'],
                      ['ac', 'Air Conditioner'],
                      ['smokingArea', 'Smoking Area'],
                    ] as const).map(([key, label]) => (
                      <label key={key} className="flex items-center gap-3 p-3 rounded-xl border border-[#EDE8D8] cursor-pointer hover:bg-[#F8F4E9] transition-colors">
                        <input type="checkbox" checked={Boolean(form[key])} onChange={e => f(key, e.target.checked)}
                          className="w-4 h-4 accent-[#6F4E37]" />
                        <span className="text-sm font-medium text-gray-700">{label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-5">
                {/* Image upload */}
                <div className="bg-white rounded-[12px] p-5" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
                  <h3 className="font-bold text-gray-900 mb-4">Cafe Images</h3>
                  <div
                    onDragOver={e => { e.preventDefault(); setDragOver(true) }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={e => { e.preventDefault(); setDragOver(false) }}
                    className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center gap-3 transition-colors ${
                      dragOver ? 'border-[#C4843A] bg-[#FFF9F0]' : 'border-[#EDE8D8] hover:border-[#C4843A]'
                    }`}>
                    <Upload size={24} color={dragOver ? '#C4843A' : '#9CA3AF'} />
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-600">Drag & drop images here</p>
                      <p className="text-xs text-gray-400">or click to browse</p>
                    </div>
                    <button type="button" className="px-4 py-2 text-xs font-semibold text-white rounded-lg"
                      style={{ background: '#6F4E37' }}>
                      Choose Files
                    </button>
                  </div>
                  {existingCafe && (
                    <div className="mt-3">
                      <p className="text-xs text-gray-400 mb-2">Current image:</p>
                      <img src={existingCafe.image} alt="current" className="w-full h-24 object-cover rounded-xl" />
                    </div>
                  )}
                </div>

                {/* Location */}
                <div className="bg-white rounded-[12px] p-5" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <MapPin size={16} color="#C4843A" /> Location
                  </h3>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className={LABEL_CLS}>Latitude</label>
                      <input value={form.lat} onChange={e => f('lat', e.target.value)}
                        placeholder="-6.2446" className={INPUT_CLS} />
                    </div>
                    <div>
                      <label className={LABEL_CLS}>Longitude</label>
                      <input value={form.lng} onChange={e => f('lng', e.target.value)}
                        placeholder="106.8229" className={INPUT_CLS} />
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mb-2">Click on the map to pick a location</p>
                  <div ref={mapRef} className="rounded-xl overflow-hidden" style={{ height: 200 }} />
                </div>
              </div>
            </div>
          </form>
        </main>
      </div>
    </div>
  )
}
