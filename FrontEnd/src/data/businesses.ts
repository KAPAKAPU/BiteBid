export interface Business {
  id: number;
  name: string;
  category: string;
  location: string;
  city: string;
  currentBid: number;
  participants: number;
  status: "LIVE" | "UPCOMING";
  description: string;
  rating: number;
  trending: boolean;
}

export const businesses: Business[] = [
  {
    id: 1,
    name: "The Burger Club",
    category: "Burgers",
    location: "Bandra West",
    city: "Mumbai",
    currentBid: 12500,
    participants: 18,
    status: "LIVE",
    description: "Gourmet burgers made with fresh ingredients.",
    rating: 4.8,
    trending: true,
  },
  {
    id: 2,
    name: "Pizza Theory",
    category: "Pizza",
    location: "Powai",
    city: "Mumbai",
    currentBid: 8400,
    participants: 12,
    status: "LIVE",
    description: "Authentic Italian pizzas with a modern twist.",
    rating: 4.6,
    trending: true,
  },
  {
    id: 3,
    name: "Brew & Bean",
    category: "Cafe",
    location: "Hiranandani Estate",
    city: "Thane",
    currentBid: 6200,
    participants: 9,
    status: "LIVE",
    description: "Your neighbourhood destination for speciality coffee.",
    rating: 4.7,
    trending: true,
  },
  {
    id: 4,
    name: "Sugar Rush",
    category: "Desserts",
    location: "Andheri",
    city: "Mumbai",
    currentBid: 5100,
    participants: 7,
    status: "LIVE",
    description: "Handcrafted desserts for every sweet craving.",
    rating: 4.5,
    trending: false,
  },
  {
    id: 5,
    name: "The Waffle House",
    category: "Desserts",
    location: "Viman Nagar",
    city: "Pune",
    currentBid: 4300,
    participants: 6,
    status: "UPCOMING",
    description: "Fresh waffles, creative toppings and great coffee.",
    rating: 4.4,
    trending: false,
  },
  {
    id: 6,
    name: "Daily Dose",
    category: "Cafe",
    location: "Bandra",
    city: "Mumbai",
    currentBid: 3900,
    participants: 5,
    status: "LIVE",
    description: "Coffee, conversations and freshly baked treats.",
    rating: 4.6,
    trending: false,
  },
  {
    id: 7,
    name: "Rolls Republic",
    category: "Fast Food",
    location: "Thane West",
    city: "Thane",
    currentBid: 7200,
    participants: 11,
    status: "LIVE",
    description: "Loaded rolls and street food favourites.",
    rating: 4.3,
    trending: true,
  },
  {
    id: 8,
    name: "Crust & Crumb",
    category: "Bakery",
    location: "Koregaon Park",
    city: "Pune",
    currentBid: 2800,
    participants: 4,
    status: "UPCOMING",
    description: "Artisan breads and freshly baked pastries.",
    rating: 4.7,
    trending: false,
  },
];
