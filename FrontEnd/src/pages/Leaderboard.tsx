import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import {
  MapPin,
  Trophy,
  TrendingUp,
  Users,
  ArrowUpRight,
  Sparkles,
  Crown,
  Award,
  Heart,
  MessageCircle,
  Star,
} from "lucide-react";

import Navbar from "../components/layout/Navbar";

import { businesses } from "../data/businesses";
import { dailyWinners } from "../data/dailyWinners";
import { risingStars } from "../data/risingStars";
import { newEntrants } from "../data/newEntrants";
import { communityFavourites } from "../data/communityFavourites";
import { calculateCommunityScore } from "../utils/communityScore";

const cities = ["All India", "Mumbai", "Thane", "Pune"];

const categories = [
  "All Categories",
  "Burgers",
  "Pizza",
  "Cafe",
  "Desserts",
  "Fast Food",
  "Bakery",
];

type TabType =| "overall"| "winners"| "rising"| "new"| "community";

const formatBid = (amount: number) => `₹${amount.toLocaleString("en-IN")}`;

const tabs = [
  { id: "overall", label: "Overall", icon: Trophy },
  { id: "winners", label: "Daily Winners", icon: Award },
  { id: "rising", label: "Rising Stars", icon: TrendingUp },
  { id: "new", label: "New Entrants", icon: Sparkles },
  { id: "community", label: "Community Favourites", icon: Heart },
] as const;

export default function Leaderboard() {
  const [activeTab, setActiveTab] = useState<TabType>("overall");

  const [selectedCity, setSelectedCity] = useState("All India");

  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const [rankingLimit, setRankingLimit] = useState<number | "all">(10);

  // Overall rankings
  const rankedBusinesses = useMemo(() => {
    return businesses
      .filter((business) => business.status === "LIVE")
      .filter(
        (business) =>
          selectedCity === "All India" || business.city === selectedCity,
      )
      .filter(
        (business) =>
          selectedCategory === "All Categories" ||
          business.category === selectedCategory,
      )
      .sort((a, b) => b.currentBid - a.currentBid);
  }, [selectedCity, selectedCategory]);

  const visibleBusinesses =
    rankingLimit === "all"
      ? rankedBusinesses
      : rankedBusinesses.slice(0, rankingLimit);

  const podium = visibleBusinesses.slice(0, 3);

  // Daily winners
  const filteredWinners = useMemo(() => {
    return dailyWinners
      .filter(
        (winner) =>
          selectedCity === "All India" || winner.city === selectedCity,
      )
      .filter(
        (winner) =>
          selectedCategory === "All Categories" ||
          winner.category === selectedCategory,
      );
  }, [selectedCity, selectedCategory]);

  // Rising stars
  const filteredRisingStars = useMemo(() => {
    return risingStars
      .filter(
        (star) => selectedCity === "All India" || star.city === selectedCity,
      )
      .filter(
        (star) =>
          selectedCategory === "All Categories" ||
          star.category === selectedCategory,
      )
      .sort((a, b) => b.bidGrowth - a.bidGrowth);
  }, [selectedCity, selectedCategory]);

  // New entrants
  const filteredNewEntrants = useMemo(() => {
    return newEntrants
      .filter(
        (entrant) =>
          selectedCity === "All India" || entrant.city === selectedCity,
      )
      .filter(
        (entrant) =>
          selectedCategory === "All Categories" ||
          entrant.category === selectedCategory,
      )
      .sort(
        (a, b) =>
          new Date(b.joinedDate).getTime() - new Date(a.joinedDate).getTime(),
      );
  }, [selectedCity, selectedCategory]);
// const filteredCommunityFavourites = communityFavourites
//   .filter((business) => {
//     const matchesCity =
//       selectedCity === "All India" || business.city === selectedCity;

//     const matchesCategory =
//       selectedCategory === "All Categories" ||
//       business.category === selectedCategory;

//     return matchesCity && matchesCategory;
//   })
//   .sort(
//     (a, b) =>
//       b.likes +
//       b.comments * 2 +
//       b.followers * 3 -
//       (a.likes + a.comments * 2 + a.followers * 3),
//   );
const filteredCommunityFavourites = communityFavourites
  .filter((business) => {
    const matchesCity =
      selectedCity === "All India" || business.city === selectedCity;

    const matchesCategory =
      selectedCategory === "All Categories" ||
      business.category === selectedCategory;

    return matchesCity && matchesCategory;
  })
  .sort(
    (a, b) =>
      calculateCommunityScore(b.likes, b.comments, b.followers) -
      calculateCommunityScore(a.likes, a.comments, a.followers),
  );
  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />

      <main className="mx-auto max-w-7xl px-5 py-12">
        {/* Page heading */}
        <div className="mb-10">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-orange-600">
            <Trophy size={17} />
            THE BITEBID RANKINGS
          </div>

          <h1 className="font-heading text-4xl font-bold text-neutral-900 md:text-5xl">
            The Leaderboard
            <span className="text-orange-500">.</span>
          </h1>

          <p className="mt-3 max-w-2xl text-neutral-500">
            Discover the food brands competing for visibility. Explore rankings,
            celebrate winners and find emerging businesses across India.
          </p>
        </div>

        {/* Location and category filters */}
        <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-neutral-200 bg-white p-5 sm:flex-row sm:items-center">
          <div className="flex flex-1 items-center gap-3">
            <MapPin className="text-orange-500" size={20} />

            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-3 text-sm outline-none focus:border-orange-500"
            >
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-3 text-sm outline-none focus:border-orange-500"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Leaderboard tabs */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex min-w-max gap-2 rounded-2xl border border-neutral-200 bg-white p-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition-all ${
                    isActive
                      ? "bg-orange-500 text-white shadow-md shadow-orange-200"
                      : "text-neutral-600 hover:bg-orange-50 hover:text-orange-600"
                  }`}
                >
                  <Icon size={17} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* OVERALL TAB */}
        {activeTab === "overall" && (
          <section>
            <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <h2 className="font-heading text-2xl font-bold text-neutral-900">
                  Overall Rankings
                </h2>

                <p className="mt-2 text-sm text-neutral-500">
                  Businesses ranked by their highest active campaign bid.
                </p>
              </div>

              <span className="text-sm font-semibold text-orange-600">
                {rankedBusinesses.length} Active Businesses
              </span>
            </div>

            {/* Ranking limits */}
            <div className="mb-8 flex flex-wrap gap-3">
              {[
                { label: "Top 10", value: 10 },
                { label: "Top 20", value: 20 },
                { label: "Top 50", value: 50 },
                { label: "Top 100", value: 100 },
                { label: "All", value: "all" },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => setRankingLimit(item.value as number | "all")}
                  className={`rounded-xl px-5 py-3 text-sm font-bold transition-all ${
                    rankingLimit === item.value
                      ? "bg-orange-500 text-white shadow-md shadow-orange-200"
                      : "border border-neutral-200 bg-white text-neutral-600 hover:border-orange-300 hover:text-orange-600"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Top three podium */}
            {podium.length > 0 && (
              <div className="mb-10 grid gap-5 md:grid-cols-3">
                {podium.map((business, index) => {
                  const rank = index + 1;

                  return (
                    <div
                      key={business.id}
                      className={`rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md ${
                        rank === 1
                          ? "border-orange-300 md:-mt-3"
                          : "border-neutral-200"
                      }`}
                    >
                      <div className="mb-5 flex items-center justify-between">
                        <span
                          className={`flex h-10 w-10 items-center justify-center rounded-full font-bold ${
                            rank === 1
                              ? "bg-orange-500 text-white"
                              : rank === 2
                                ? "bg-neutral-200 text-neutral-700"
                                : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          #{rank}
                        </span>

                        {rank === 1 && (
                          <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-orange-600">
                            TOP BID
                          </span>
                        )}
                      </div>

                      <h3 className="font-heading text-xl font-bold text-neutral-900">
                        {business.name}
                      </h3>

                      <p className="mt-1 text-sm text-neutral-500">
                        {business.category} · {business.city}
                      </p>

                      <div className="mt-6 border-t border-neutral-100 pt-5">
                        <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">
                          Current highest bid
                        </p>

                        <p className="mt-1 font-heading text-3xl font-bold text-orange-600">
                          {formatBid(business.currentBid)}
                        </p>
                      </div>

                      <div className="mt-4 flex items-center gap-2 text-sm text-neutral-500">
                        <Users size={16} />
                        {business.participants} participants
                      </div>

                      <Link
                        to={`/campaigns/${business.id}`}
                        className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-neutral-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
                      >
                        View Campaign
                        <ArrowUpRight size={16} />
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Full rankings */}
            {visibleBusinesses.length === 0 ? (
              <div className="rounded-2xl border border-neutral-200 bg-white p-10 text-center">
                <p className="font-semibold text-neutral-800">
                  No active businesses found.
                </p>
                <p className="mt-2 text-sm text-neutral-500">
                  Try another city or category.
                </p>
              </div>
            ) : (
              <div>
                <div className="mb-5 flex items-center justify-between">
                  <h3 className="font-heading text-xl font-bold text-neutral-900">
                    {rankingLimit === "all"
                      ? "All Rankings"
                      : `Top ${rankingLimit} Rankings`}
                  </h3>

                  <span className="text-sm text-neutral-500">
                    Highest bid first
                  </span>
                </div>

                <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
                  {visibleBusinesses.map((business, index) => (
                    <div
                      key={business.id}
                      className="flex flex-col gap-4 border-b border-neutral-100 p-5 last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-100 font-bold text-neutral-600">
                          {index + 1}
                        </span>

                        <div>
                          <h4 className="font-semibold text-neutral-900">
                            {business.name}
                          </h4>

                          <p className="mt-1 text-sm text-neutral-500">
                            {business.category} · {business.location}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-6 sm:justify-end">
                        <div>
                          <p className="text-xs text-neutral-400">
                            Highest bid
                          </p>

                          <p className="font-heading text-lg font-bold text-neutral-900">
                            {formatBid(business.currentBid)}
                          </p>
                        </div>

                        <div className="hidden text-sm text-neutral-500 sm:block">
                          <Users size={15} className="mr-1 inline" />
                          {business.participants}
                        </div>

                        <Link
                          to={`/campaigns/${business.id}`}
                          className="rounded-lg border border-neutral-200 px-4 py-2 text-sm font-semibold text-neutral-700 transition hover:border-orange-500 hover:text-orange-600"
                        >
                          View
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 flex items-start gap-3 rounded-xl bg-orange-50 p-5 text-sm text-orange-900">
              <TrendingUp
                className="mt-0.5 shrink-0 text-orange-600"
                size={19}
              />

              <p>
                <strong>How rankings work:</strong> Businesses are ranked by
                their current highest active campaign bid. These are demo
                rankings using local mock data, not live auction results.
              </p>
            </div>
          </section>
        )}

        {/* DAILY WINNERS TAB */}
        {activeTab === "winners" && (
          <section>
            <div className="mb-8">
              <div className="mb-2 flex items-center gap-2 text-orange-600">
                <Crown size={20} />
                <span className="text-sm font-bold uppercase tracking-wide">
                  Hall of Fame
                </span>
              </div>

              <h2 className="font-heading text-3xl font-bold text-neutral-900">
                Daily Winners
              </h2>

              <p className="mt-2 text-sm text-neutral-500">
                Celebrating businesses that won previous bidding rounds.
              </p>
            </div>

            {filteredWinners.length === 0 ? (
              <EmptyState message="No winners found for this location or category." />
            ) : (
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {filteredWinners.map((winner) => (
                  <div
                    key={winner.id}
                    className="rounded-2xl border border-neutral-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-md"
                  >
                    <div className="mb-5 flex items-center justify-between">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-50 text-orange-600">
                        <Trophy size={21} />
                      </span>

                      <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">
                        WINNER
                      </span>
                    </div>

                    <h3 className="font-heading text-xl font-bold text-neutral-900">
                      {winner.name}
                    </h3>

                    <p className="mt-1 text-sm text-neutral-500">
                      {winner.category} · {winner.location}, {winner.city}
                    </p>

                    <div className="mt-5 rounded-xl bg-orange-50 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-orange-600">
                        Winning bid
                      </p>

                      <p className="mt-1 font-heading text-2xl font-bold text-orange-700">
                        {formatBid(winner.winningBid)}
                      </p>
                    </div>

                    <div className="mt-4 flex justify-between text-sm text-neutral-500">
                      <span>{winner.winnerDate}</span>
                      <span>{winner.participants} participants</span>
                    </div>

                    <Link
                      to={`/campaigns/${winner.businessId}`}
                      className="mt-5 flex items-center justify-center gap-2 rounded-xl border border-neutral-200 px-4 py-3 text-sm font-semibold text-neutral-700 transition hover:border-orange-500 hover:text-orange-600"
                    >
                      View Business
                      <ArrowUpRight size={16} />
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* RISING STARS TAB */}
        {activeTab === "rising" && (
          <section>
            <div className="mb-8">
              <div className="mb-2 flex items-center gap-2 text-orange-600">
                <TrendingUp size={20} />
                <span className="text-sm font-bold uppercase tracking-wide">
                  Growing Fast
                </span>
              </div>

              <h2 className="font-heading text-3xl font-bold text-neutral-900">
                Rising Stars
              </h2>

              <p className="mt-2 text-sm text-neutral-500">
                Businesses gaining momentum and attracting more competition.
              </p>
            </div>

            {filteredRisingStars.length === 0 ? (
              <EmptyState message="No rising stars found for this location or category." />
            ) : (
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {filteredRisingStars.map((star, index) => (
                  <div
                    key={star.id}
                    className="rounded-2xl border border-neutral-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-md"
                  >
                    <div className="mb-5 flex items-center justify-between">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-50 text-orange-600">
                        <TrendingUp size={21} />
                      </span>

                      <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">
                        #{index + 1} RISING
                      </span>
                    </div>

                    <h3 className="font-heading text-xl font-bold text-neutral-900">
                      {star.name}
                    </h3>

                    <p className="mt-1 text-sm text-neutral-500">
                      {star.category} · {star.location}, {star.city}
                    </p>

                    <div className="mt-5 grid grid-cols-2 gap-3">
                      <div className="rounded-xl bg-green-50 p-4">
                        <p className="text-xs font-medium text-green-700">
                          Bid Growth
                        </p>

                        <p className="mt-1 text-2xl font-bold text-green-700">
                          +{star.bidGrowth}%
                        </p>
                      </div>

                      <div className="rounded-xl bg-orange-50 p-4">
                        <p className="text-xs font-medium text-orange-700">
                          Participant Growth
                        </p>

                        <p className="mt-1 text-2xl font-bold text-orange-700">
                          +{star.participantGrowth}%
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 flex justify-between text-sm">
                      <div>
                        <p className="text-neutral-400">Current bid</p>
                        <p className="font-bold text-neutral-900">
                          {formatBid(star.currentBid)}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-neutral-400">Participants</p>
                        <p className="font-bold text-neutral-900">
                          {star.participants}
                        </p>
                      </div>
                    </div>

                    <Link
                      to={`/campaigns/${star.businessId}`}
                      className="mt-5 flex items-center justify-center gap-2 rounded-xl border border-neutral-200 px-4 py-3 text-sm font-semibold text-neutral-700 transition hover:border-orange-500 hover:text-orange-600"
                    >
                      View Campaign
                      <ArrowUpRight size={16} />
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* NEW ENTRANTS TAB */}
        {activeTab === "new" && (
          <section>
            <div className="mb-8">
              <div className="mb-2 flex items-center gap-2 text-orange-600">
                <Sparkles size={20} />
                <span className="text-sm font-bold uppercase tracking-wide">
                  Fresh on BiteBid
                </span>
              </div>

              <h2 className="font-heading text-3xl font-bold text-neutral-900">
                New Entrants
              </h2>

              <p className="mt-2 text-sm text-neutral-500">
                Discover the newest food businesses joining the competition.
              </p>
            </div>

            {filteredNewEntrants.length === 0 ? (
              <EmptyState message="No new businesses found for this location or category." />
            ) : (
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {filteredNewEntrants.map((entrant) => (
                  <div
                    key={entrant.id}
                    className="rounded-2xl border border-neutral-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-md"
                  >
                    <div className="mb-5 flex items-center justify-between">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-50 text-orange-600">
                        <Sparkles size={21} />
                      </span>

                      <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">
                        NEW ON BITEBID
                      </span>
                    </div>

                    <h3 className="font-heading text-xl font-bold text-neutral-900">
                      {entrant.name}
                    </h3>

                    <p className="mt-1 text-sm text-neutral-500">
                      {entrant.category} · {entrant.location}, {entrant.city}
                    </p>

                    <div className="mt-5 rounded-xl bg-orange-50 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-orange-600">
                        Joined BiteBid
                      </p>

                      <p className="mt-1 font-semibold text-neutral-900">
                        {entrant.joinedDate}
                      </p>
                    </div>

                    <div className="mt-5 flex justify-between text-sm">
                      <div>
                        <p className="text-neutral-400">Current bid</p>
                        <p className="font-bold text-neutral-900">
                          {formatBid(entrant.currentBid)}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-neutral-400">Participants</p>
                        <p className="font-bold text-neutral-900">
                          {entrant.participants}
                        </p>
                      </div>
                    </div>

                    <Link
                      to={`/campaigns/${entrant.businessId}`}
                      className="mt-5 flex items-center justify-center gap-2 rounded-xl border border-neutral-200 px-4 py-3 text-sm font-semibold text-neutral-700 transition hover:border-orange-500 hover:text-orange-600"
                    >
                      View Business
                      <ArrowUpRight size={16} />
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* COMMUNITY FAVOURITES TAB */}
        {activeTab === "community" && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-orange-100 bg-orange-50 p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-white p-3 text-orange-500">
                  <Heart size={24} />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-neutral-900">
                    Community Favourites
                  </h2>
                  <p className="text-sm text-neutral-600">
                    Celebrating businesses loved by the BiteBid community.
                  </p>
                </div>
              </div>
            </div>

            {filteredCommunityFavourites.map((business, index) => (
              <div
                key={business.id}
                className="flex flex-col gap-4 rounded-2xl border border-neutral-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-50 font-bold text-orange-600">
                    #{index + 1}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-bold text-neutral-900">
                        {business.name}
                      </h3>

                      {business.isWeeklyFavourite && (
                        <span className="flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-1 text-xs font-semibold text-yellow-700">
                          <Star size={12} />
                          Weekly Favourite
                        </span>
                      )}
                    </div>

                    <p className="mt-1 text-sm text-neutral-500">
                      {business.category} · {business.location}, {business.city}
                    </p>

                    {/* Community Score */}
                    <div className="mt-2 inline-flex items-center gap-2 rounded-lg bg-orange-50 px-3 py-1.5">
                      <Star size={15} className="text-orange-500" />

                      <span className="text-sm font-semibold text-orange-700">
                        {calculateCommunityScore(
                          business.likes,
                          business.comments,
                          business.followers,
                        ).toLocaleString("en-IN")}{" "}
                        Community Points
                      </span>
                    </div>
                  </div>
                </div>

                {/* Engagement Statistics */}
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <Heart className="mx-auto mb-1 text-rose-500" size={18} />
                    <p className="font-bold text-neutral-900">
                      {business.likes.toLocaleString("en-IN")}
                    </p>
                    <p className="text-xs text-neutral-500">Likes</p>
                  </div>

                  <div>
                    <MessageCircle
                      className="mx-auto mb-1 text-blue-500"
                      size={18}
                    />
                    <p className="font-bold text-neutral-900">
                      {business.comments.toLocaleString("en-IN")}
                    </p>
                    <p className="text-xs text-neutral-500">Comments</p>
                  </div>

                  <div>
                    <Users className="mx-auto mb-1 text-green-500" size={18} />
                    <p className="font-bold text-neutral-900">
                      {business.followers.toLocaleString("en-IN")}
                    </p>
                    <p className="text-xs text-neutral-500">Followers</p>
                  </div>
                </div>
              </div>
            ))}

            {filteredCommunityFavourites.length === 0 && (
              <EmptyState message="No community favourites found for these filters." />
            )}

            {/* Ranking Explanation - OUTSIDE map() */}
            <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4">
              <h3 className="font-semibold text-neutral-800">
                How Community Ranking Works
              </h3>
              <p className="mt-2 text-sm text-neutral-600">
                Businesses earn Community Points through customer engagement.
                Likes earn 1 point, comments earn 2 points and followers earn 3
                points. Rankings are calculated independently of business bids.
              </p>
            </div>

          </div>
        )}
      </main>
    </div>
  );
}
// Reusable empty state
function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-10 text-center">
      <p className="font-semibold text-neutral-800">{message}</p>
      <p className="mt-2 text-sm text-neutral-500">
        Try changing your filters.
      </p>
    </div>
  );
}
