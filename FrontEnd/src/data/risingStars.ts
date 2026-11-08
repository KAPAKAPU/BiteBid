export interface RisingStar {
  id: number;
  businessId: number;
  name: string;
  category: string;
  location: string;
  city: string;
  bidGrowth: number;
  participantGrowth: number;
  currentBid: number;
  participants: number;
}

export const risingStars: RisingStar[] = [
  {
    id: 1,
    businessId: 3,
    name: "Brew & Bean",
    category: "Cafe",
    location: "Hiranandani Estate",
    city: "Thane",
    bidGrowth: 42,
    participantGrowth: 35,
    currentBid: 6200,
    participants: 9,
  },
  {
    id: 2,
    businessId: 7,
    name: "Rolls Republic",
    category: "Fast Food",
    location: "Thane West",
    city: "Thane",
    bidGrowth: 38,
    participantGrowth: 28,
    currentBid: 7200,
    participants: 11,
  },
  {
    id: 3,
    businessId: 4,
    name: "Sugar Rush",
    category: "Desserts",
    location: "Andheri",
    city: "Mumbai",
    bidGrowth: 31,
    participantGrowth: 24,
    currentBid: 5100,
    participants: 7,
  },
  {
    id: 4,
    businessId: 6,
    name: "Daily Dose",
    category: "Cafe",
    location: "Bandra",
    city: "Mumbai",
    bidGrowth: 25,
    participantGrowth: 19,
    currentBid: 3900,
    participants: 5,
  },
  {
    id: 5,
    businessId: 5,
    name: "The Waffle House",
    category: "Desserts",
    location: "Viman Nagar",
    city: "Pune",
    bidGrowth: 21,
    participantGrowth: 16,
    currentBid: 4300,
    participants: 6,
  },
];
