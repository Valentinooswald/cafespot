import { useState } from 'react'
import { Camera, Save, Eye, EyeOff, CheckCircle } from 'lucide-react'
import AdminSidebar from '../../components/AdminSidebar'

const INPUT = "w-full px-4 py-3 rounded-xl border border-[#EDE8D8] text-sm outline-none focus:border-[#C4843A] focus:ring-2 focus:ring-[#C4843A]/20 transition-all bg-[#F8F4E9]"
const LABEL = "block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide"

export default function Profile() {
  const [profile, setProfile] = useState({
    name: 'Rizky Pratama',
    email: 'rizky@cafespot.id',
    phone: '+62 812 3456 7890',
    role: 'Super Admin',
    bio: "Coffee enthusiast and tech entrepreneur. Founded CafeSpot to help people find their next favorite spot.",
    location: 'Jakarta, Indonesia',
  })

  const [passwords, setPasswords] = useState({ current: '', newPass: '', confirm: '' })
  const [showPws, setShowPws] = useState({ current: false, new: false, confirm: false })
  const [profileSaved, setProfileSaved] = useState(false)
  const [pwSaved, setPwSaved] = useState(false)
  const [pwError, setPwError] = useState('')

  const p = (key: keyof typeof profile, val: string) => setProfile(prev => ({ ...prev, [key]: val }))

  const saveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    setProfileSaved(true)
    setTimeout(() => setProfileSaved(false), 3000)
  }

  const savePassword = (e: React.FormEvent) => {
    e.preventDefault()
    setPwError('')
    if (passwords.newPass !== passwords.confirm) {
      setPwError("New passwords don't match")
      return
    }
    if (passwords.newPass.length < 6) {
      setPwError("Password must be at least 6 characters")
      return
    }
    setPwSaved(true)
    setPasswords({ current: '', newPass: '', confirm: '' })
    setTimeout(() => setPwSaved(false), 3000)
  }

  return (
    <div className="flex min-h-screen" style={{ background: '#F3F3F3' }}>
      <AdminSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white px-6 py-4 border-b border-gray-100" style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.05)' }}>
          <h1 className="text-lg font-bold text-gray-900">Profile Settings</h1>
          <p className="text-xs text-gray-400">Manage your account and preferences</p>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-2xl mx-auto space-y-6">

            {/* Avatar */}
            <div className="bg-white rounded-[16px] p-6 flex items-center gap-5" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
              <div className="relative">
                <img src="https://i.pravatar.cc/100?img=11" alt="avatar"
                  className="w-20 h-20 rounded-2xl object-cover ring-4 ring-[#F8F4E9]" />
                <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-lg flex items-center justify-center text-white transition-all hover:opacity-90"
                  style={{ background: 'linear-gradient(135deg, #6F4E37, #C4843A)' }}>
                  <Camera size={13} />
                </button>
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">{profile.name}</h2>
                <p className="text-sm text-[#C4843A] font-medium">{profile.role}</p>
                <p className="text-xs text-gray-400 mt-0.5">{profile.email}</p>
              </div>
            </div>

            {/* Personal info */}
            <div className="bg-white rounded-[16px] p-6" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-gray-900">Personal Information</h3>
                {profileSaved && (
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-green-600">
                    <CheckCircle size={14} /> Saved!
                  </span>
                )}
              </div>
              <form onSubmit={saveProfile} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={LABEL}>Full Name</label>
                    <input value={profile.name} onChange={e => p('name', e.target.value)} className={INPUT} />
                  </div>
                  <div>
                    <label className={LABEL}>Role</label>
                    <input value={profile.role} readOnly className={`${INPUT} opacity-50 cursor-not-allowed`} />
                  </div>
                  <div>
                    <label className={LABEL}>Email</label>
                    <input type="email" value={profile.email} onChange={e => p('email', e.target.value)} className={INPUT} />
                  </div>
                  <div>
                    <label className={LABEL}>Phone</label>
                    <input value={profile.phone} onChange={e => p('phone', e.target.value)} className={INPUT} />
                  </div>
                  <div>
                    <label className={LABEL}>Location</label>
                    <input value={profile.location} onChange={e => p('location', e.target.value)} className={INPUT} />
                  </div>
                  <div className="md:col-span-2">
                    <label className={LABEL}>Bio</label>
                    <textarea value={profile.bio} onChange={e => p('bio', e.target.value)} rows={3}
                      className={`${INPUT} resize-none`} />
                  </div>
                </div>
                <div className="flex justify-end">
                  <button type="submit"
                    className="flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold text-white rounded-xl transition-all hover:opacity-90"
                    style={{ background: 'linear-gradient(135deg, #6F4E37, #C4843A)' }}>
                    <Save size={14} /> Save Changes
                  </button>
                </div>
              </form>
            </div>

            {/* Change password */}
            <div className="bg-white rounded-[16px] p-6" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-gray-900">Change Password</h3>
                {pwSaved && (
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-green-600">
                    <CheckCircle size={14} /> Password updated!
                  </span>
                )}
              </div>
              {pwError && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-2.5 rounded-xl mb-4">
                  {pwError}
                </div>
              )}
              <form onSubmit={savePassword} className="space-y-4">
                {([
                  ['current', 'Current Password', 'current'],
                  ['newPass', 'New Password', 'new'],
                  ['confirm', 'Confirm New Password', 'confirm'],
                ] as const).map(([key, label, showKey]) => (
                  <div key={key}>
                    <label className={LABEL}>{label}</label>
                    <div className="relative">
                      <input
                        type={showPws[showKey] ? 'text' : 'password'}
                        value={passwords[key]}
                        onChange={e => setPasswords(p => ({ ...p, [key]: e.target.value }))}
                        required
                        placeholder="••••••••"
                        className={`${INPUT} pr-10`}
                      />
                      <button type="button" onClick={() => setShowPws(p => ({ ...p, [showKey]: !p[showKey] }))}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2">
                        {showPws[showKey] ? <EyeOff size={15} color="#9CA3AF" /> : <Eye size={15} color="#9CA3AF" />}
                      </button>
                    </div>
                  </div>
                ))}
                <div className="flex justify-end">
                  <button type="submit"
                    className="flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold text-white rounded-xl transition-all hover:opacity-90"
                    style={{ background: 'linear-gradient(135deg, #6F4E37, #C4843A)' }}>
                    <Save size={14} /> Update Password
                  </button>
                </div>
              </form>
            </div>

            {/* Danger zone */}
            <div className="bg-white rounded-[16px] p-6 border border-red-100" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
              <h3 className="font-bold text-red-600 mb-2">Danger Zone</h3>
              <p className="text-sm text-gray-500 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
              <button className="px-4 py-2 text-sm font-semibold text-red-600 border border-red-200 rounded-xl hover:bg-red-50 transition-colors">
                Delete Account
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
