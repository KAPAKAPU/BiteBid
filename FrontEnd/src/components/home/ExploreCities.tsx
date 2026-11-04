import { MapPin, ArrowUpRight } from "lucide-react";

const cities = [
  {
    name: "Mumbai",
    subtitle: "The city that never stops eating",
    campaigns: 42,
    featured: true,
  },
  {
    name: "Pune",
    subtitle: "A growing food destination",
    campaigns: 28,
    featured: false,
  },
  {
    name: "Bengaluru",
    subtitle: "Where food meets innovation",
    campaigns: 35,
    featured: false,
  },
  {
    name: "Delhi",
    subtitle: "A paradise for food lovers",
    campaigns: 31,
    featured: false,
  },
];

const ExploreCities = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-brand text-sm font-bold uppercase tracking-wider">
              Discover locally
            </span>

            <h2 className="font-heading text-4xl md:text-5xl font-bold mt-4">
              Explore by <span className="text-brand">city.</span>
            </h2>

            <p className="text-neutral-500 mt-4">
              Find the food brands making waves in your city.
            </p>
          </div>

          <button className="flex items-center gap-2 text-brand font-bold mt-6 md:mt-0">
            Explore all cities
            <ArrowUpRight size={18} />
          </button>
        </div>

        {/* City Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cities.map((city) => (
            <button
              key={city.name}
              className={`text-left rounded-2xl p-7 border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                city.featured
                  ? "bg-neutral-900 text-white border-neutral-900"
                  : "bg-surface border-neutral-200 hover:border-brand"
              }`}
            >
              <div className="flex items-center justify-between mb-12">
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                    city.featured
                      ? "bg-white/10 text-orange-400"
                      : "bg-orange-50 text-brand"
                  }`}
                >
                  <MapPin size={22} />
                </div>

                <ArrowUpRight
                  size={20}
                  className={
                    city.featured ? "text-orange-400" : "text-neutral-400"
                  }
                />
              </div>

              <h3 className="font-heading text-2xl font-bold">{city.name}</h3>

              <p
                className={`text-sm mt-2 ${
                  city.featured ? "text-neutral-400" : "text-neutral-500"
                }`}
              >
                {city.subtitle}
              </p>

              <div
                className={`mt-6 pt-5 border-t flex justify-between items-center ${
                  city.featured ? "border-white/10" : "border-neutral-200"
                }`}
              >
                <span className="text-sm font-semibold">
                  {city.campaigns} Campaigns
                </span>

                <span className="text-xs font-bold uppercase tracking-wider text-brand">
                  Explore
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreCities;
