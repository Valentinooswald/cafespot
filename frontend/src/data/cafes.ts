export interface Cafe {
  id: number
  name: string
  category: string
  rating: number
  reviews: number
  price: string
  address: string
  city: string
  lat: number
  lng: number
  image: string
  gallery: string[]
  description: string
  openingHours: { day: string; hours: string }[]
  facilities: { wifi: boolean; parking: boolean; powerOutlet: boolean; ac: boolean; smokingArea: boolean }
  phone: string
  instagram: string
  featured: boolean
}

export const cafes: Cafe[] = [
  {
    id: 1,
    name: "Filosofi Kopi",
    category: "Coffee Shop",
    rating: 4.8,
    reviews: 324,
    price: "$$",
    address: "Jl. Melawai Raya No. 12, Blok M",
    city: "Jakarta Selatan",
    lat: -6.2446,
    lng: 106.7993,
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=500&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=600&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=600&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=400&fit=crop&auto=format",
    ],
    description: "Filosofi Kopi is an iconic Jakarta cafe that embodies the philosophy of coffee culture. Born from the beloved Indonesian novel, this cafe serves specialty coffee with a deep respect for the bean's origin and the art of brewing. The warm wooden interior and aromatic ambiance make it perfect for meaningful conversations.",
    openingHours: [
      { day: "Monday – Friday", hours: "07:00 – 22:00" },
      { day: "Saturday", hours: "08:00 – 23:00" },
      { day: "Sunday", hours: "08:00 – 22:00" },
    ],
    facilities: { wifi: true, parking: true, powerOutlet: true, ac: true, smokingArea: false },
    phone: "+62 21 7279 0188",
    instagram: "@filosofikopi",
    featured: true,
  },
  {
    id: 2,
    name: "Rooftop Brew Co.",
    category: "Rooftop",
    rating: 4.7,
    reviews: 218,
    price: "$$$",
    address: "Jl. Sudirman Kav. 52, Lantai 22",
    city: "Jakarta Pusat",
    lat: -6.2146,
    lng: 106.8229,
    image: "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=800&h=500&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1559305616-3f99cd43e353?w=600&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1525193612562-0ec53b0e5d7c?w=600&h=400&fit=crop&auto=format",
    ],
    description: "Perched on the 22nd floor of a Sudirman skyscraper, Rooftop Brew Co. offers breathtaking panoramic views of the Jakarta skyline alongside expertly crafted specialty coffees and artisanal cocktails. The open-air terrace is the ultimate spot to watch the sun dip behind the city.",
    openingHours: [
      { day: "Monday – Thursday", hours: "11:00 – 23:00" },
      { day: "Friday – Saturday", hours: "11:00 – 01:00" },
      { day: "Sunday", hours: "10:00 – 22:00" },
    ],
    facilities: { wifi: true, parking: true, powerOutlet: false, ac: false, smokingArea: true },
    phone: "+62 21 5789 0234",
    instagram: "@rooftopbrewco",
    featured: true,
  },
  {
    id: 3,
    name: "The Study Den",
    category: "Study Cafe",
    rating: 4.6,
    reviews: 189,
    price: "$",
    address: "Jl. Margonda Raya No. 45",
    city: "Depok",
    lat: -6.3728,
    lng: 106.8317,
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&h=500&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=600&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=600&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1517705008128-361805f42e86?w=600&h=400&fit=crop&auto=format",
    ],
    description: "The Study Den is every student's sanctuary — a quiet, focus-friendly cafe stocked with fast WiFi, ample power outlets, and a menu of energizing coffee and light bites. Ergonomic seating and dedicated study zones make long working sessions feel effortless.",
    openingHours: [
      { day: "Monday – Friday", hours: "06:00 – 24:00" },
      { day: "Saturday – Sunday", hours: "07:00 – 23:00" },
    ],
    facilities: { wifi: true, parking: true, powerOutlet: true, ac: true, smokingArea: false },
    phone: "+62 21 7722 1890",
    instagram: "@thestudyden",
    featured: true,
  },
  {
    id: 4,
    name: "Taman Kopi Outdoor",
    category: "Outdoor",
    rating: 4.5,
    reviews: 302,
    price: "$$",
    address: "Jl. Ragunan No. 8, Pasar Minggu",
    city: "Jakarta Selatan",
    lat: -6.3021,
    lng: 106.8212,
    image: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=800&h=500&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=600&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1499955085172-a104c9463ece?w=600&h=400&fit=crop&auto=format",
    ],
    description: "Nestled amid lush tropical greenery near Ragunan Zoo, Taman Kopi Outdoor is a garden cafe that brings you closer to nature. Sip your cold brew under shading trees while enjoying the sound of wind through leaves. A beloved weekend retreat for Jakarta families and nature lovers.",
    openingHours: [
      { day: "Tuesday – Sunday", hours: "08:00 – 21:00" },
      { day: "Monday", hours: "Closed" },
    ],
    facilities: { wifi: true, parking: true, powerOutlet: false, ac: false, smokingArea: true },
    phone: "+62 21 7884 5621",
    instagram: "@tamankopi",
    featured: false,
  },
  {
    id: 5,
    name: "Melodi Live Lounge",
    category: "Live Music",
    rating: 4.9,
    reviews: 411,
    price: "$$$",
    address: "Jl. Kemang Raya No. 77",
    city: "Jakarta Selatan",
    lat: -6.2606,
    lng: 106.8144,
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=500&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1571266028243-d220c6a2d4be?w=600&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&h=400&fit=crop&auto=format",
    ],
    description: "Melodi Live Lounge is Kemang's premier music cafe, hosting nightly performances by indie bands, jazz ensembles, and acoustic solo artists. The intimate venue pairs world-class coffee cocktails with a carefully curated sound system, creating evenings you'll never forget.",
    openingHours: [
      { day: "Monday – Thursday", hours: "17:00 – 01:00" },
      { day: "Friday – Saturday", hours: "17:00 – 02:00" },
      { day: "Sunday", hours: "16:00 – 00:00" },
    ],
    facilities: { wifi: true, parking: true, powerOutlet: false, ac: true, smokingArea: true },
    phone: "+62 21 7193 4455",
    instagram: "@melodilounge",
    featured: true,
  },
  {
    id: 6,
    name: "Bean & Book",
    category: "Coffee Shop",
    rating: 4.4,
    reviews: 156,
    price: "$$",
    address: "Jl. Fatmawati No. 33",
    city: "Jakarta Selatan",
    lat: -6.2889,
    lng: 106.7942,
    image: "https://images.unsplash.com/photo-1481833761820-0509d3217039?w=800&h=500&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=600&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=600&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&h=400&fit=crop&auto=format",
    ],
    description: "Bean & Book blends the warmth of a neighborhood bookstore with the comfort of a specialty cafe. Browse curated shelves of fiction, poetry, and travel literature while savoring single-origin pour-overs. The perfect escape for bibliophiles who run on caffeine.",
    openingHours: [
      { day: "Monday – Sunday", hours: "08:00 – 22:00" },
    ],
    facilities: { wifi: true, parking: false, powerOutlet: true, ac: true, smokingArea: false },
    phone: "+62 21 7659 2211",
    instagram: "@beanandbook",
    featured: false,
  },
]

export const categories = [
  { id: 1, name: "Coffee Shop", icon: "☕", count: 42, color: "#6F4E37" },
  { id: 2, name: "Live Music", icon: "🎵", count: 18, color: "#C4843A" },
  { id: 3, name: "Outdoor", icon: "🌿", count: 24, color: "#5A8A5A" },
  { id: 4, name: "Rooftop", icon: "🌇", count: 12, color: "#8B6347" },
  { id: 5, name: "Study Cafe", icon: "📚", count: 31, color: "#543A28" },
]

export const reviews = [
  { id: 1, cafeId: 1, user: "Alicia Rahman", avatar: "https://i.pravatar.cc/48?img=1", rating: 5, date: "12 Jul 2026", text: "Absolutely love this place. The Ben's Perfecto is unlike any espresso I've had in Jakarta. The staff are knowledgeable and passionate about their craft. Will definitely be my regular." },
  { id: 2, cafeId: 1, user: "Bima Santoso", avatar: "https://i.pravatar.cc/48?img=3", rating: 5, date: "8 Jul 2026", text: "Such a warm, welcoming atmosphere. The wooden decor feels authentic and thoughtful. Came for a work meeting and stayed three hours just soaking in the vibe. Great food too!" },
  { id: 3, cafeId: 1, user: "Citra Dewi", avatar: "https://i.pravatar.cc/48?img=5", rating: 4, date: "3 Jul 2026", text: "Beautiful cafe with really good specialty coffee. A bit pricey but worth every rupiah for the quality and experience. The latte art is Instagram-worthy." },
]

export const teamMembers = [
  { name: "Rizky Pratama", role: "CEO & Founder", avatar: "https://i.pravatar.cc/200?img=11", bio: "Coffee enthusiast turned tech entrepreneur. Founded CafeSpot to help people discover their next favorite spot." },
  { name: "Dina Kusuma", role: "Head of Design", avatar: "https://i.pravatar.cc/200?img=20", bio: "UX designer with a passion for maps and human-centered design. Crafts every pixel with care." },
  { name: "Andi Wijaya", role: "Lead Developer", avatar: "https://i.pravatar.cc/200?img=33", bio: "Full-stack engineer who builds the backbone of CafeSpot. Coffee-dependent coder." },
  { name: "Sari Putri", role: "Community Manager", avatar: "https://i.pravatar.cc/200?img=47", bio: "Connects cafes and coffee lovers. Tastes 10+ cafes per month so you don't have to." },
]
