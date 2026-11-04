import { MapPin, Users, ArrowUpRight, Star, Flame } from "lucide-react";

import type { Business } from "../../data/businesses";
import { Link } from 'react-router-dom'
interface Props {
  business: Business;
}

const BusinessCard = ({ business }: Props) => {
  return (
    <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      {/* Card Header */}
      <div className="h-40 bg-gradient-to-br from-orange-100 via-orange-50 to-amber-100 p-5 flex items-start justify-between">
        <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-brand font-heading font-bold text-xl shadow-sm">
          {business.name.charAt(0)}
        </div>

        {business.trending && (
          <span className="flex items-center gap-1 bg-white text-orange-600 px-3 py-2 rounded-full text-xs font-bold shadow-sm">
            <Flame size={14} />
            Trending
          </span>
        )}
      </div>

      {/* Card Body */}
      <div className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-heading text-xl font-bold">{business.name}</h3>

            <p className="text-sm text-neutral-500 mt-1">{business.category}</p>
          </div>

          <div className="flex items-center gap-1 text-sm font-semibold">
            <Star size={15} className="text-amber-400 fill-amber-400" />
            {business.rating}
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-neutral-500 mt-4">
          <MapPin size={15} />
          {business.location}, {business.city}
        </div>

        <p className="text-sm text-neutral-500 mt-3 leading-relaxed min-h-10">
          {business.description}
        </p>

        {/* Bidding Information */}
        <div className="mt-5 bg-orange-50 rounded-xl p-4">
          <p className="text-xs text-neutral-500 font-medium">
            Current Highest Bid
          </p>

          <div className="flex items-end justify-between mt-1">
            <span className="text-2xl font-heading font-bold text-brand">
              ₹{business.currentBid.toLocaleString("en-IN")}
            </span>

            <span className="text-xs text-neutral-500 flex items-center gap-1">
              <Users size={13} />
              {business.participants} bidders
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-5">
          <span
            className={`text-xs font-bold px-3 py-2 rounded-full ${business.status === "LIVE"
                ? "bg-green-50 text-green-600"
                : "bg-blue-50 text-blue-600"
              }`}
          >
            ● {business.status}
          </span>

          <Link
            to={`/campaigns/${business.id}`}
            className="flex items-center gap-2 text-sm font-bold text-neutral-800 hover:text-brand transition-colors"
          >
            View Details
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BusinessCard;
