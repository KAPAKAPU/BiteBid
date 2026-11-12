import { MapPin, Users, Clock, ArrowUpRight } from "lucide-react";
import type { Campaign } from "../../data/campaigns";

interface Props {
  campaign: Campaign;
}

const CampaignCard = ({ campaign }: Props) => {
  return (
    <div className="bg-white border border-neutral-200 rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <span className="bg-orange-50 text-brand text-xs font-bold px-3 py-2 rounded-full">
          #{campaign.rank} Trending
        </span>

        <span className="text-xs text-green-600 font-semibold">● LIVE</span>
      </div>

      <div className="mb-5">
        <h3 className="font-heading text-xl font-bold">{campaign.name}</h3>

        <p className="text-sm text-neutral-500 mt-1">{campaign.category}</p>

        <div className="flex items-center gap-1 text-sm text-neutral-400 mt-3">
          <MapPin size={14} />
          {campaign.location}
        </div>
      </div>

      <div className="bg-orange-50 rounded-xl p-4 mb-5">
        <p className="text-xs text-neutral-500 font-medium">
          Current Winning Bid
        </p>

        <p className="text-3xl font-heading font-bold text-brand mt-1">
          ₹{campaign.currentBid.toLocaleString("en-IN")}
        </p>
      </div>

      <div className="flex justify-between text-sm text-neutral-500 mb-5">
        <div className="flex items-center gap-2">
          <Users size={15} />
          {campaign.participants} bidders
        </div>

        <div className="flex items-center gap-2">
          <Clock size={15} />
          {campaign.timeLeft}
        </div>
      </div>

      <button className="w-full flex items-center justify-center gap-2 bg-neutral-900 hover:bg-brand text-white py-3 rounded-xl font-semibold transition-colors">
        View Campaign
        <ArrowUpRight size={16} />
      </button>
    </div>
  );
};

export default CampaignCard;