import { ArrowRight, Flame } from "lucide-react";
import { campaigns } from "../../data/campaigns";
import CampaignCard from "./CampaignCard";

const LiveCampaigns = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 text-brand font-semibold text-sm mb-3">
              <Flame size={18} />
              LIVE IN YOUR CITY
            </div>

            <h2 className="font-heading text-4xl font-bold">
              Mumbai's Trending Bids
            </h2>

            <p className="text-neutral-500 mt-3">
              Discover who's competing for the spotlight.
            </p>
          </div>

          <button className="flex items-center gap-2 text-brand font-bold mt-5 md:mt-0">
            View All Campaigns
            <ArrowRight size={18} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LiveCampaigns;
