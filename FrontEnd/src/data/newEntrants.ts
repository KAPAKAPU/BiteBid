export interface NewEntrant {
  id: number;
  businessId: number;
  name: string;
  category: string;
  location: string;
  city: string;
  joinedDate: string;
  currentBid: number;
  participants: number;
}

export const newEntrants: NewEntrant[] = [
  {
    id: 1,
    businessId: 8,
    name: "Crust & Crumb",
    category: "Bakery",
    location: "Koregaon Park",
    city: "Pune",
    joinedDate: "November 5, 2026",
    currentBid: 2800,
    participants: 4,
  },
  {
    id: 2,
    businessId: 6,
    name: "Daily Dose",
    category: "Cafe",
    location: "Bandra",
    city: "Mumbai",
    joinedDate: "November 4, 2026",
    currentBid: 3900,
    participants: 5,
  },
  {
    id: 3,
    businessId: 5,
    name: "The Waffle House",
    category: "Desserts",
    location: "Viman Nagar",
    city: "Pune",
    joinedDate: "November 3, 2026",
    currentBid: 4300,
    participants: 6,
  },
  {
    id: 4,
    businessId: 4,
    name: "Sugar Rush",
    category: "Desserts",
    location: "Andheri",
    city: "Mumbai",
    joinedDate: "November 2, 2026",
    currentBid: 5100,
    participants: 7,
  },
];
