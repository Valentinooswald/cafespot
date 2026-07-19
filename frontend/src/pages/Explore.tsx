import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CafeCard from '../components/CafeCard'
import api from '../services/api'

const filterChips = ['All', 'Coffee Shop', 'Live Music', 'Outdoor', 'Rooftop', 'Study Cafe']
const sortOptions = ['Most Popular', 'Highest Rated', 'Price: Low to High', 'Price: High to Low']
const priceFilters = ['All', '$', '$$', '$$$']

export default function Explore() {
  const [searchParams] = useSearchParams()
  const initialQ = searchParams.get('q') || ''
  const initialCat = searchParams.get('cat') || 'All'

  const [query, setQuery] = useState(initialQ)
  const [activeFilter, setActiveFilter] = useState(initialCat === '' ? 'All' : initialCat)
  const [sort, setSort] = useState('Most Popular')
  const [priceFilter, setPriceFilter] = useState('All')
  const [showFilters, setShowFilters] = useState(false)
  const [cafes, setCafes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
  const fetchCafes = async () => {
    try {
      const response = await api.get("/cafes");
      console.log("Response:", response);
      console.log("Data:", response.data);
      setCafes(response.data);
    } catch (error) {
      console.error("Gagal mengambil data cafe:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchCafes();
}, []);

  const filtered = useMemo(() => {
    let list = [...cafes]
    if (query) list = list.filter(c =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.address.toLowerCase().includes(query.toLowerCase())
    )
    if (activeFilter !== "All") list = list.filter(c => c.category?.name === activeFilter)
    if (priceFilter !== "All") list = list.filter(c => c.price_range === priceFilter)
    if (sort === 'Highest Rated') list.sort((a, b) => b.rating - a.rating)
    if (sort === 'Price: Low to High') list.sort((a, b) => a.price_range.length - b.price_range.length)
    if (sort === 'Price: High to Low') list.sort((a, b) => b.price_range.length - a.price_range.length)
    return list
  }, [cafes, query, activeFilter, priceFilter, sort])
        if (loading) {
          return (
            <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
              Loading...
            </div>
          );
        }
  return (
    <div className="min-h-screen" style={{ background: '#F8F4E9' }}>
      <Navbar />

      {/* Header */}
      <div className="py-10 px-6 md:px-10" style={{ background: 'linear-gradient(135deg, #2C1810 0%, #6F4E37 100%)' }}>
        <div className="max-w-[1440px] mx-auto">
          <h1 className="text-3xl font-bold text-white mb-1">Explore Cafes</h1>
          <p className="text-white/70 text-sm mb-6">Discover {cafes.length} amazing spots across Indonesia</p>

          {/* Search */}
          <div className="flex gap-2 bg-white rounded-xl p-2 max-w-xl shadow-lg">
            <div className="flex items-center gap-2 flex-1 px-3">
              <Search size={16} color="#9CA3AF" />
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search cafes, neighborhoods..."
                className="flex-1 text-sm outline-none bg-transparent text-gray-800 placeholder-gray-400"
              />
              {query && (
                <button onClick={() => setQuery('')}><X size={14} color="#9CA3AF" /></button>
              )}
            </div>
            <button className="px-4 py-2 text-sm font-semibold text-white rounded-lg"
              style={{ background: 'linear-gradient(135deg, #6F4E37, #C4843A)' }}>
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-8">
        {/* Filter chips */}
        <div className="flex items-center gap-3 mb-6 overflow-x-auto hide-scrollbar pb-2">
          <div className="flex gap-2 shrink-0">
            {filterChips.map(f => (
              <button key={f} onClick={() => setActiveFilter(f)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeFilter === f
                    ? 'text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-[#EDE8D8]'
                }`}
                style={activeFilter === f ? { background: 'linear-gradient(135deg, #6F4E37, #C4843A)' } : {}}>
                {f}
              </button>
            ))}
          </div>
          <button onClick={() => setShowFilters(!showFilters)}
            className="ml-auto flex items-center gap-1.5 px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-600 shrink-0 hover:bg-[#EDE8D8] transition-colors"
            style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <SlidersHorizontal size={14} />
            Filters
          </button>
        </div>

        {/* Extended filters */}
        {showFilters && (
          <div className="bg-white rounded-[12px] p-5 mb-6 flex flex-wrap gap-6"
            style={{ boxShadow: '0 2px 16px rgba(111,78,55,0.08)' }}>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Sort by</p>
              <div className="flex gap-2 flex-wrap">
                {sortOptions.map(o => (
                  <button key={o} onClick={() => setSort(o)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      sort === o ? 'text-white' : 'bg-[#F8F4E9] text-gray-600'
                    }`}
                    style={sort === o ? { background: '#6F4E37' } : {}}>
                    {o}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Price range</p>
              <div className="flex gap-2">
                {priceFilters.map(p => (
                  <button key={p} onClick={() => setPriceFilter(p)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      priceFilter === p ? 'text-white' : 'bg-[#F8F4E9] text-gray-600'
                    }`}
                    style={priceFilter === p ? { background: '#6F4E37' } : {}}>
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Results count */}
        <p className="text-sm text-gray-500 mb-6">
          Showing <span className="font-semibold text-gray-900">{filtered.length}</span> cafes
          {activeFilter !== 'All' && <span> in <span className="text-[#6F4E37] font-medium">{activeFilter}</span></span>}
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map(cafe => <CafeCard key={cafe.id} cafe={cafe} />)}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">☕</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No cafes found</h3>
            <p className="text-sm text-gray-400">Try adjusting your filters or search terms</p>
            <button onClick={() => { setQuery(''); setActiveFilter('All'); setPriceFilter('All') }}
              className="mt-4 px-5 py-2.5 text-sm font-semibold text-white rounded-xl"
              style={{ background: 'linear-gradient(135deg, #6F4E37, #C4843A)' }}>
              Clear Filters
            </button>
          </div>
        )}

        {/* Pagination placeholder */}
        {filtered.length > 0 && (
          <div className="flex justify-center gap-2 mt-12">
            {[1, 2, 3].map(n => (
              <button key={n}
                className={`w-9 h-9 rounded-lg text-sm font-medium transition-all ${n === 1 ? 'text-white' : 'bg-white text-gray-600 hover:bg-[#EDE8D8]'}`}
                style={n === 1 ? { background: 'linear-gradient(135deg, #6F4E37, #C4843A)' } : {}}>
                {n}
              </button>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
