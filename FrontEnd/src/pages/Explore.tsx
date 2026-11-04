import { useMemo, useState } from "react";

import {
  Search,
  MapPin,
  SlidersHorizontal,
  ArrowDownWideNarrow,
  Store,
} from "lucide-react";

import Navbar from "../components/layout/Navbar";
import BusinessCard from "../components/common/BusinessCard";

import { businesses } from "../data/businesses";

const categories = [
  "All",
  "Cafe",
  "Burgers",
  "Pizza",
  "Desserts",
  "Fast Food",
  "Bakery",
];

const cities = ["All Cities", "Mumbai", "Thane", "Pune"];

const Explore = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [sortBy, setSortBy] = useState("trending");

  const filteredBusinesses = useMemo(() => {
    let result = businesses.filter((business) => {
      const matchesSearch =
        business.name.toLowerCase().includes(search.toLowerCase()) ||
        business.category.toLowerCase().includes(search.toLowerCase()) ||
        business.location.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || business.category === selectedCategory;

      const matchesCity =
        selectedCity === "All Cities" || business.city === selectedCity;

      return matchesSearch && matchesCategory && matchesCity;
    });

    if (sortBy === "highest") {
      result.sort((a, b) => b.currentBid - a.currentBid);
    }

    if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    if (sortBy === "trending") {
      result.sort((a, b) => Number(b.trending) - Number(a.trending));
    }

    return result;
  }, [search, selectedCategory, selectedCity, sortBy]);

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />

      {/* Page Header */}
      <section className="bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex items-center gap-2 text-brand text-sm font-bold mb-4">
            <Store size={17} />
            DISCOVER FOOD BRANDS
          </div>

          <h1 className="font-heading text-4xl md:text-5xl font-bold">
            Discover your next
            <span className="text-brand"> favourite spot.</span>
          </h1>

          <p className="text-neutral-500 mt-4 max-w-2xl leading-relaxed">
            Explore restaurants, cafes and food businesses competing for the
            spotlight in your city.
          </p>
        </div>
      </section>

      {/* Explore Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Search */}
        <div className="relative max-w-2xl">
          <Search
            className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-400"
            size={20}
          />

          <input
            type="text"
            placeholder="Search restaurants, cafes, cuisines..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-neutral-200 rounded-xl pl-14 pr-5 py-4 outline-none focus:border-brand focus:ring-2 focus:ring-orange-100 transition-all"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 mt-8">
          {/* City Filter */}
          <div className="flex items-center gap-3">
            <MapPin size={18} className="text-brand" />

            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="bg-white border border-neutral-200 rounded-lg px-4 py-3 text-sm font-semibold outline-none focus:border-brand"
            >
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Sorting */}
          <div className="flex items-center gap-3">
            <ArrowDownWideNarrow size={18} className="text-neutral-500" />

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-neutral-200 rounded-lg px-4 py-3 text-sm font-semibold outline-none focus:border-brand"
            >
              <option value="trending">Trending</option>
              <option value="highest">Highest Bid</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Categories */}
        <div className="mt-10">
          <div className="flex items-center gap-2 mb-5">
            <SlidersHorizontal size={18} />

            <h2 className="font-bold">Categories</h2>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap px-5 py-3 rounded-full text-sm font-semibold transition-all ${
                  selectedCategory === category
                    ? "bg-brand text-white"
                    : "bg-white border border-neutral-200 text-neutral-600 hover:border-brand"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Business Listing */}
        <section className="mt-12">
          <div className="flex items-center justify-between mb-7">
            <div>
              <h2 className="font-heading text-2xl font-bold">
                Explore Food Brands
              </h2>

              <p className="text-sm text-neutral-500 mt-1">
                Discover businesses competing for visibility.
              </p>
            </div>

            <span className="text-sm font-semibold text-neutral-500">
              {filteredBusinesses.length} businesses
            </span>
          </div>

          {filteredBusinesses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBusinesses.map((business) => (
                <BusinessCard key={business.id} business={business} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-neutral-200 p-16 text-center">
              <Search size={35} className="mx-auto text-neutral-300" />

              <h3 className="font-heading text-xl font-bold mt-5">
                No businesses found
              </h3>

              <p className="text-neutral-500 mt-2">
                Try changing your search or filters.
              </p>

              <button
                onClick={() => {
                  setSearch("");
                  setSelectedCategory("All");
                  setSelectedCity("All Cities");
                }}
                className="mt-5 text-brand font-bold"
              >
                Clear Filters
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Explore;
