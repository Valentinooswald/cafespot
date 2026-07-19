import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Star,
  MapPin,
  X,
  SlidersHorizontal,
  Plus,
  Minus,
  Locate,
} from "lucide-react";

import Navbar from "../components/Navbar";
import api from "../services/api";
import type { Cafe } from "../types/cafe";
import L from "leaflet";
import "leaflet/dist/leaflet.css";


const filterChips = [
  "All",
  "Coffee Shop",
  "Live Music",
  "Outdoor",
  "Rooftop",
  "Study Cafe",
];

function createCafeIcon(active = false) {
  return L.divIcon({
    className: "",
    html: `
      <div style="
        width:32px;
        height:32px;
        background:${active ? "#C4843A" : "#6F4E37"};
        border-radius:50% 50% 50% 0;
        transform:rotate(-45deg);
        border:3px solid white;
        box-shadow:0 3px 10px rgba(0,0,0,.3);
        display:flex;
        align-items:center;
        justify-content:center;
      ">
        <span style="transform:rotate(45deg);font-size:12px">
          ☕
        </span>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
}

export default function MapView() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  const [cafes, setCafes] = useState<Cafe[]>([]);
  const [loading, setLoading] = useState(true);

  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedCafe, setSelectedCafe] = useState<Cafe | null>(null);

  useEffect(() => {
    const fetchCafe = async () => {
      try {
        const res = await api.get("/cafes");
        setCafes(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCafe();
  }, []);

  const filtered = useMemo(() => {
    let list = [...cafes];

    if (query) {
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(query.toLowerCase()) ||
          c.address.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (activeFilter !== "All") {
      list = list.filter(
        (c) => c.category?.name === activeFilter
      );
    }

    return list;
  }, [cafes, query, activeFilter]);

useEffect(() => {
  if (loading) return;

  if (!mapRef.current) return;

  if (mapInstanceRef.current) return;

  const map = L.map(mapRef.current).setView(
    [-6.2446, 106.8229],
    12
  );

  L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      attribution: "© OpenStreetMap",
    }
  ).addTo(map);

  mapInstanceRef.current = map;
}, [loading]);

  useEffect(() => {
    const map = mapInstanceRef.current;

    if (!map) return;

    markersRef.current.forEach((m) => m.remove());

    markersRef.current = [];

    const bounds: L.LatLngExpression[] = [];
    filtered.forEach((cafe) => {
      const marker = L.marker(
        [
          Number(cafe.latitude),
          Number(cafe.longitude),
        ],
        {
          icon: createCafeIcon(
            selectedCafe?.id === cafe.id
          ),
        }
      ).addTo(map);

      marker.bindPopup(
        `<b>${cafe.name}</b><br>${cafe.address}`
      );

      marker.on("click", () => {
        setSelectedCafe(cafe);

        map.setView(
          [
            Number(cafe.latitude),
            Number(cafe.longitude),
          ],
          16
        );
      });

      markersRef.current.push(marker);
      bounds.push([Number(cafe.latitude), Number(cafe.longitude)]);
    });
    if (bounds.length > 1 && !selectedCafe) {
      map.fitBounds(bounds, { padding: [40,40] });
    } else if (bounds.length === 1 && !selectedCafe) {
      map.setView(bounds[0], 16);
    }
  }, [filtered, selectedCafe]);

  const flyTo = (cafe: Cafe) => {
    setSelectedCafe(cafe);

    mapInstanceRef.current?.setView(
      [
        Number(cafe.latitude),
        Number(cafe.longitude),
      ],
      16,
      {
        animate: true,
      }
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col" style={{ height: '100vh', background: '#F8F4E9' }}>
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-80 xl:w-96 flex flex-col bg-white overflow-hidden shrink-0"
          style={{ boxShadow: '4px 0 24px rgba(111,78,55,0.08)' }}>
          {/* Search */}
          <div className="px-4 pt-4 pb-3 border-b border-[#EDE8D8]">
            <div className="flex items-center gap-2 bg-[#F8F4E9] rounded-xl px-3 py-2.5 mb-3">
              <Search size={15} color="#9CA3AF" />
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search cafes..."
                className="flex-1 text-sm outline-none bg-transparent text-gray-800 placeholder-gray-400"
              />
              {query && <button onClick={() => setQuery('')}><X size={13} color="#9CA3AF" /></button>}
            </div>
            {/* Chips */}
            <div className="flex gap-1.5 overflow-x-auto hide-scrollbar">
              {filterChips.map(f => (
                <button key={f} onClick={() => setActiveFilter(f)}
                  className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                    activeFilter === f ? 'text-white' : 'bg-[#F8F4E9] text-gray-600'
                  }`}
                  style={activeFilter === f ? { background: 'linear-gradient(135deg, #6F4E37, #C4843A)' } : {}}>
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto">
            <p className="text-xs font-semibold text-gray-400 px-4 pt-3 pb-1">{filtered.length} CAFES FOUND</p>
            {filtered.map(cafe => (
              <button key={cafe.id} onClick={() => flyTo(cafe)}
                className={`w-full flex gap-3 p-3 mx-1 rounded-xl mb-1 text-left transition-all ${
                  selectedCafe?.id === cafe.id ? 'bg-[#F8F4E9]' : 'hover:bg-gray-50'
                }`}>
<img
  src={
    cafe.photo
      ? `http://127.0.0.1:8000/storage/${cafe.photo}`
      : "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=500&fit=crop&auto=format"
  }
  alt={cafe.name}
  className="w-16 h-16 rounded-xl object-cover shrink-0 bg-[#EDE8D8]"
/>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <p className="text-sm font-semibold text-gray-900 leading-tight truncate">{cafe.name}</p>
                    {selectedCafe?.id === cafe.id && (
                      <span className="w-2 h-2 rounded-full shrink-0 mt-1.5" style={{ background: '#C4843A' }} />
                    )}
                  </div>
                  <div className="flex items-center gap-1 mt-0.5 mb-1">
                    <Star size={10} fill="#F59E0B" color="#F59E0B" />
                    <span className="text-xs font-medium text-gray-700">{cafe.rating}</span>
                    <span className="text-xs text-gray-400">· {cafe.price_range}</span>
                  </div>
                  <p className="text-xs text-gray-400 truncate">{cafe.address}</p>
                  <span className="inline-block text-[10px] font-semibold text-white px-2 py-0.5 rounded-full mt-1"
                    style={{ background: '#6F4E37' }}>
                    {cafe.category?.name}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Selected cafe panel */}
          {selectedCafe && (
            <div className="border-t border-[#EDE8D8] p-4 bg-[#F8F4E9]">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{selectedCafe.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{selectedCafe.address}</p>
                </div>
                <button onClick={() => setSelectedCafe(null)}>
                  <X size={14} color="#9CA3AF" />
                </button>
              </div>
              <Link to={`/cafe/${selectedCafe.id}`}
                className="block text-center text-xs font-semibold text-white no-underline py-2 rounded-lg"
                style={{ background: 'linear-gradient(135deg, #6F4E37, #C4843A)' }}>
                View Details
              </Link>
            </div>
          )}
        </div>

        {/* Map */}
        <div className="flex-1 relative">
          {/* Leaflet Map */}
          <div
            ref={mapRef}
            className="absolute inset-0"
          ></div>

          {/* Map controls */}
          <div className="absolute top-4 right-4 flex flex-col gap-2 z-[1000]">
            <button
              onClick={() => mapInstanceRef.current?.zoomIn()}
              className="w-9 h-9 bg-white rounded-xl shadow-lg flex items-center justify-center hover:bg-[#F8F4E9] transition-colors"
            >
              <Plus size={16} color="#6F4E37" />
            </button>

            <button
              onClick={() => mapInstanceRef.current?.zoomOut()}
              className="w-9 h-9 bg-white rounded-xl shadow-lg flex items-center justify-center hover:bg-[#F8F4E9] transition-colors"
            >
              <Minus size={16} color="#6F4E37" />
            </button>

            <button
              onClick={() =>
                mapInstanceRef.current?.setView([-6.2446, 106.8229], 12)
              }
              className="w-9 h-9 bg-white rounded-xl shadow-lg flex items-center justify-center hover:bg-[#F8F4E9] transition-colors"
            >
              <Locate size={16} color="#6F4E37" />
            </button>
          </div>

          {/* Floating filter label */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[1000]">
            <div className="flex items-center gap-2 bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
              <SlidersHorizontal size={13} color="#6F4E37" />
              <span className="text-xs font-semibold text-gray-700">
                {filtered.length} cafes on map
              </span>
              <MapPin size={13} color="#C4843A" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
