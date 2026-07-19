import { useState } from "react";
import { Link } from "react-router-dom";
import { Star, MapPin, Heart } from "lucide-react";
import type { Cafe } from "../types/cafe";

const categoryColors: Record<string, string> = {
  "Coffee Shop": "#6F4E37",
  "Live Music": "#C4843A",
  Outdoor: "#5A8A5A",
  Rooftop: "#8B6347",
  "Study Cafe": "#543A28",
};

export default function CafeCard({ cafe }: { cafe: Cafe }) {
  const [fav, setFav] = useState(false);

  return (
    <div
      className="bg-white rounded-[12px] overflow-hidden transition-all duration-300 hover:-translate-y-1 group"
      style={{ boxShadow: "0 2px 16px rgba(111,78,55,0.10)" }}
    >
      {/* Image */}
      <div className="relative overflow-hidden h-48 bg-[#EDE8D8]">
        <img
          src={
            cafe.photo
              ? `http://127.0.0.1:8000/storage/${cafe.photo}`
              : "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=500&fit=crop&auto=format"
          }
          alt={cafe.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <span
          className="absolute top-3 left-3 text-white text-xs font-semibold px-2.5 py-1 rounded-full"
          style={{
            background: categoryColors[cafe.category?.name] || "#6F4E37",
          }}
        >
          {cafe.category?.name}
        </span>

        <button
          onClick={() => setFav(!fav)}
          className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
        >
          <Heart
            size={14}
            fill={fav ? "#E74C3C" : "none"}
            color={fav ? "#E74C3C" : "#9CA3AF"}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-1.5">
          <h3 className="font-semibold text-[15px] text-gray-900 leading-tight">
            {cafe.name}
          </h3>

          <span className="text-sm font-medium text-[#C4843A] ml-2 shrink-0">
            {cafe.price_range}
          </span>
        </div>

        <div className="flex items-center gap-1 mb-2">
          <Star size={12} fill="#F59E0B" color="#F59E0B" />

          <span className="text-sm font-semibold text-gray-800">
            {cafe.rating}
          </span>
        </div>

        <div className="flex items-center gap-1 text-xs text-gray-500 mb-4">
          <MapPin size={11} className="shrink-0 text-[#C4843A]" />

          <span className="truncate">{cafe.address}</span>
        </div>

        <Link
          to={`/cafe/${cafe.id}`}
          className="block w-full text-center text-sm font-semibold text-white no-underline py-2.5 rounded-xl transition-all hover:opacity-90 active:scale-95"
          style={{
            background: "linear-gradient(135deg, #6F4E37, #C4843A)",
          }}
        >
          View Details
        </Link>
      </div>
    </div>
  );
}