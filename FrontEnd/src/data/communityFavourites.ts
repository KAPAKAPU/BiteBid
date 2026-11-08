export interface CommunityFavourite {
  id: number;
  businessId: number;
  name: string;
  category: string;
  location: string;
  city: string;
  likes: number;
  comments: number;
  followers: number;
  weeklyGrowth: number;
  isWeeklyFavourite: boolean;
  weeklyLikes: number;
  weeklyComments: number;
  weeklyFollowers: number;

  monthlyLikes: number;
  monthlyComments: number;
  monthlyFollowers: number;
}

export const communityFavourites: CommunityFavourite[] = [
  {
    id: 1,
    businessId: 3,
    name: "Brew & Bean",
    category: "Cafe",
    location: "Hiranandani Estate",
    city: "Thane",
    likes: 1240,
    comments: 186,
    followers: 890,
    weeklyGrowth: 32,
    isWeeklyFavourite: true,
    weeklyLikes: 120,
    weeklyComments: 35,
    weeklyFollowers: 48,
    monthlyLikes: 420,
    monthlyComments: 85,
    monthlyFollowers: 190,
  },
  {
    id: 2,
    businessId: 1,
    name: "The Burger Club",
    category: "Burgers",
    location: "Bandra West",
    city: "Mumbai",
    likes: 1120,
    comments: 154,
    followers: 760,
    weeklyGrowth: 24,
    isWeeklyFavourite: false,
    weeklyLikes: 120,
    weeklyComments: 35,
    weeklyFollowers: 48,

    monthlyLikes: 420,
    monthlyComments: 85,
    monthlyFollowers: 190,
  },
  {
    id: 3,
    businessId: 7,
    name: "Rolls Republic",
    category: "Fast Food",
    location: "Thane West",
    city: "Thane",
    likes: 980,
    comments: 142,
    followers: 680,
    weeklyGrowth: 28,
    isWeeklyFavourite: false,
    weeklyLikes: 120,
    weeklyComments: 35,
    weeklyFollowers: 48,

    monthlyLikes: 420,
    monthlyComments: 85,
    monthlyFollowers: 190,
  },
  {
    id: 4,
    businessId: 4,
    name: "Sugar Rush",
    category: "Desserts",
    location: "Andheri",
    city: "Mumbai",
    likes: 850,
    comments: 120,
    followers: 590,
    weeklyGrowth: 19,
    isWeeklyFavourite: false,
    weeklyLikes: 120,
    weeklyComments: 35,
    weeklyFollowers: 48,

    monthlyLikes: 420,
    monthlyComments: 85,
    monthlyFollowers: 190,
  },
  {
    id: 5,
    businessId: 6,
    name: "Daily Dose",
    category: "Cafe",
    location: "Bandra",
    city: "Mumbai",
    likes: 720,
    comments: 98,
    followers: 510,
    weeklyGrowth: 22,
    isWeeklyFavourite: false,
    weeklyLikes: 120,
    weeklyComments: 35,
    weeklyFollowers: 48,

    monthlyLikes: 420,
    monthlyComments: 85,
    monthlyFollowers: 190,
  },
];
