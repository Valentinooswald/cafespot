import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Coffee, Eye, EyeOff, Lock, Mail, AlertCircle } from 'lucide-react'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    await new Promise(r => setTimeout(r, 800))
    if (email === 'admin@cafespot.id' && password === 'admin123') {
      navigate('/admin')
    } else {
      setError('Invalid credentials. Try admin@cafespot.id / admin123')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex" style={{ background: '#F8F4E9' }}>
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 p-12 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #2C1810 0%, #6F4E37 80%, #C4843A 100%)' }}>
        {/* Pattern */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)',
            backgroundSize: '28px 28px'
          }} />

        {/* Logo */}
        <div className="relative flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/20">
            <Coffee size={20} color="white" />
          </div>
          <span className="text-white font-bold text-xl">CafeSpot</span>
        </div>

        {/* Illustration */}
        <div className="relative flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="text-9xl mb-4">☕</div>
            <p className="text-white/60 text-sm">Admin Portal</p>
          </div>
        </div>

        {/* Quote */}
        <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-6">
          <p className="text-white/90 text-sm italic leading-relaxed mb-3">
            "Great coffee inspires great work. Welcome back to CafeSpot's command center."
          </p>
          <p className="text-white/50 text-xs">— The CafeSpot Team</p>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #6F4E37, #C4843A)' }}>
              <Coffee size={18} color="white" />
            </div>
            <span className="text-xl font-bold" style={{ color: '#6F4E37' }}>CafeSpot</span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-1">Welcome back</h1>
          <p className="text-gray-500 text-sm mb-8">Sign in to your admin account</p>

          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl mb-5">
              <AlertCircle size={14} />
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Email</label>
              <div className="relative">
                <Mail size={16} color="#9CA3AF" className="absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  placeholder="admin@cafespot.id"
                  className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-[#EDE8D8] text-sm outline-none focus:border-[#C4843A] focus:ring-2 focus:ring-[#C4843A]/20 transition-all bg-[#F8F4E9]"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1.5">
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Password</label>
                <button type="button" className="text-xs text-[#C4843A] font-medium hover:underline">Forgot?</button>
              </div>
              <div className="relative">
                <Lock size={16} color="#9CA3AF" className="absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3.5 rounded-xl border border-[#EDE8D8] text-sm outline-none focus:border-[#C4843A] focus:ring-2 focus:ring-[#C4843A]/20 transition-all bg-[#F8F4E9]"
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2">
                  {showPass ? <EyeOff size={16} color="#9CA3AF" /> : <Eye size={16} color="#9CA3AF" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full py-3.5 text-sm font-semibold text-white rounded-xl transition-all hover:opacity-90 active:scale-95 disabled:opacity-60 mt-2"
              style={{ background: 'linear-gradient(135deg, #6F4E37, #C4843A)' }}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="text-xs text-center text-gray-400 mt-6">
            Demo: <span className="font-mono text-[#6F4E37]">admin@cafespot.id</span> / <span className="font-mono text-[#6F4E37]">admin123</span>
          </p>
        </div>
      </div>
    </div>
  )
}
