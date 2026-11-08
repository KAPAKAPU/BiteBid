export interface DailyWinner {
  id: number;
  businessId: number;
  name: string;
  category: string;
  location: string;
  city: string;
  winningBid: number;
  winnerDate: string;
  participants: number;
}

export const dailyWinners: DailyWinner[] = [
  {
    id: 1,
    businessId: 1,
    name: "The Burger Club",
    category: "Burgers",
    location: "Bandra West",
    city: "Mumbai",
    winningBid: 12500,
    winnerDate: "November 4, 2026",
    participants: 18,
  },
  {
    id: 2,
    businessId: 2,
    name: "Pizza Theory",
    category: "Pizza",
    location: "Powai",
    city: "Mumbai",
    winningBid: 8400,
    winnerDate: "November 3, 2026",
    participants: 12,
  },
  {
    id: 3,
    businessId: 3,
    name: "Brew & Bean",
    category: "Cafe",
    location: "Hiranandani Estate",
    city: "Thane",
    winningBid: 6200,
    winnerDate: "November 3, 2026",
    participants: 9,
  },
  {
    id: 4,
    businessId: 7,
    name: "Rolls Republic",
    category: "Fast Food",
    location: "Thane West",
    city: "Thane",
    winningBid: 7200,
    winnerDate: "November 2, 2026",
    participants: 11,
  },
  {
    id: 5,
    businessId: 4,
    name: "Sugar Rush",
    category: "Desserts",
    location: "Andheri",
    city: "Mumbai",
    winningBid: 5100,
    winnerDate: "November 1, 2026",
    participants: 7,
  },
];
