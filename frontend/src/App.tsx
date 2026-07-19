import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Explore from './pages/Explore'
import MapView from './pages/MapView'
import CafeDetail from './pages/CafeDetail'
import About from './pages/About'
import Contact from './pages/Contact'
import AdminLogin from './pages/admin/Login'
import Dashboard from './pages/admin/Dashboard'
import ManageCafes from './pages/admin/ManageCafes'
import AddEditCafe from './pages/admin/AddEditCafe'
import Categories from './pages/admin/Categories'
import Profile from './pages/admin/Profile'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Landing />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/map" element={<MapView />} />
        <Route path="/cafe/:id" element={<CafeDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/cafes" element={<ManageCafes />} />
        <Route path="/admin/cafes/add" element={<AddEditCafe />} />
        <Route path="/admin/cafes/edit/:id" element={<AddEditCafe />} />
        <Route path="/admin/categories" element={<Categories />} />
        <Route path="/admin/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}
