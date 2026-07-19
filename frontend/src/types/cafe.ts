export interface Cafe {
  id: number;
  category_id: number;
  name: string;
  address: string;
  description: string;
  latitude: number;
  longitude: number;
  opening_hours: string;
  price_range: string;
  rating: number;
  wifi: boolean;
  parking: boolean;
  photo: string | null;
  category: {
    id: number;
    name: string;
    slug: string;
  };
}