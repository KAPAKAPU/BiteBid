export interface Campaign {
  id: number;
  name: string;
  category: string;
  location: string;
  currentBid: number;
  participants: number;
  timeLeft: string;
  rank: number;
}

export const campaigns: Campaign[] = [
  {
    id: 1,
    name: "The Burger Club",
    category: "Burgers & Fast Food",
    location: "Bandra, Mumbai",
    currentBid: 12500,
    participants: 18,
    timeLeft: "02:45:12",
    rank: 1,
  },
  {
    id: 2,
    name: "Pizza Theory",
    category: "Italian & Pizza",
    location: "Powai, Mumbai",
    currentBid: 8400,
    participants: 12,
    timeLeft: "04:12:30",
    rank: 2,
  },
  {
    id: 3,
    name: "Brew & Bean",
    category: "Cafe & Coffee",
    location: "Thane, Mumbai",
    currentBid: 6200,
    participants: 9,
    timeLeft: "01:30:45",
    rank: 3,
  },
];
