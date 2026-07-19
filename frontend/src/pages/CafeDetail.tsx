import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Star,
  MapPin,
  Clock,
  ChevronLeft,
  ExternalLink,
  Wifi,
  Car,
  Heart,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../services/api";
import type { Cafe } from "../types/cafe";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function FacilityBadge({
  icon: Icon,
  label,
  available,
}: {
  icon: typeof Wifi;
  label: string;
  available: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium ${
        available
          ? "bg-green-100 text-green-700"
          : "bg-gray-100 text-gray-400"
      }`}
    >
      <Icon size={15} />
      {label}
    </div>
  );
}

export default function CafeDetail() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [fav, setFav] = useState(false);
  const [cafe, setCafe] = useState<Cafe | null>(null);

  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);

  useEffect(() => {
    const getCafe = async () => {
      try {
        const res = await api.get(`/cafes/${id}`);
        setCafe(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getCafe();
  }, [id]);

  useEffect(() => {
    if (!cafe) return;
    if (!mapRef.current) return;
    if (mapInstance.current) return;

    const map = L.map(mapRef.current, {
      zoomControl: false,
    }).setView(
      [
        Number(cafe.latitude),
        Number(cafe.longitude),
      ],
      16
    );

    L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        attribution: "© OpenStreetMap",
      }
    ).addTo(map);

    L.marker([
      Number(cafe.latitude),
      Number(cafe.longitude),
    ]).addTo(map);

    mapInstance.current = map;
  }, [cafe]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!cafe) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Cafe tidak ditemukan.
      </div>
    );
  }

  const photo = cafe.photo
    ? `http://127.0.0.1:8000/storage/${cafe.photo}`
    : "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200";



  return (
<div className="min-h-screen bg-[#F8F4E9]">
  <Navbar />

  {/* Banner */}
  <div className="relative h-72 md:h-96 overflow-hidden bg-gray-200">
    <img
      src={photo}
      alt={cafe.name}
      className="w-full h-full object-cover"
    />

    <div
      className="absolute inset-0"
      style={{
        background:
          "linear-gradient(to top, rgba(0,0,0,.45), rgba(0,0,0,.05))",
      }}
    />

    <Link
      to="/explore"
      className="absolute top-6 left-6 flex items-center gap-2 bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full no-underline"
    >
      <ChevronLeft size={16} />
      Explore
    </Link>

    <button
      onClick={() => setFav(!fav)}
      className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg"
    >
      <Heart
        size={18}
        fill={fav ? "#EF4444" : "none"}
        color={fav ? "#EF4444" : "#6B7280"}
      />
    </button>
  </div>

  <div className="max-w-7xl mx-auto px-6 py-8">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

      {/* Content */}
      <div className="lg:col-span-2">

        {/* Header */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">

          <span className="inline-block px-3 py-1 rounded-full text-xs text-white bg-[#6F4E37]">
            {cafe.category?.name}
          </span>

          <h1 className="text-3xl font-bold mt-3">
            {cafe.name}
          </h1>

          <div className="flex items-center gap-3 mt-3">

            <Star
              size={18}
              fill="#F59E0B"
              color="#F59E0B"
            />

            <span className="font-semibold">
              {cafe.rating}
            </span>

            <span className="text-gray-400">
              •
            </span>

            <span className="font-semibold text-[#C4843A]">
              {cafe.price_range}
            </span>

          </div>

          <div className="flex items-center gap-2 text-gray-500 mt-4">

            <MapPin
              size={15}
              color="#C4843A"
            />

            {cafe.address}

          </div>

        </div>

        {/* Description */}

        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">

          <h2 className="font-bold text-xl mb-4">
            About
          </h2>

          <p className="leading-7 text-gray-600">
            {cafe.description}
          </p>

        </div>

        {/* Facilities */}

        <div className="bg-white rounded-xl p-6 shadow-sm">

          <h2 className="font-bold text-xl mb-4">
            Facilities
          </h2>

          <div className="flex flex-wrap gap-3">

            <FacilityBadge
              icon={Wifi}
              label="Free WiFi"
              available={cafe.wifi}
            />

            <FacilityBadge
              icon={Car}
              label="Parking"
              available={cafe.parking}
            />

          </div>

        </div>

      </div>

            
      {/* Sidebar */}
      <div className="space-y-6">

        {/* Opening Hours */}
        <div className="bg-white rounded-xl p-6 shadow-sm">

          <h2 className="flex items-center gap-2 font-bold text-lg mb-4">
            <Clock size={18} color="#C4843A" />
            Opening Hours
          </h2>

          <p className="text-gray-600">
            {cafe.opening_hours}
          </p>

        </div>

        {/* Mini Map */}
        <div className="bg-white rounded-xl overflow-hidden shadow-sm">

          <div
            ref={mapRef}
            style={{
              height: 220,
            }}
          />

          <div className="p-4">

            <a
              href={`https://maps.google.com/?q=${cafe.latitude},${cafe.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-white no-underline font-semibold"
              style={{
                background:
                  "linear-gradient(135deg,#6F4E37,#C4843A)",
              }}
            >
              <ExternalLink size={16} />
              Open in Google Maps
            </a>

          </div>

        </div>

      </div>

    </div>
  </div>

  <Footer />

</div>
);
}