import Navbar from "../components/layout/Navbar";
import { ArrowRight, TrendingUp } from "lucide-react";
import LiveCampaigns from "../components/home/LiveCampaigns";
import HowItWorks from "../components/home/HowItWorks";
import ExploreCities from "../components/home/ExploreCities";
import BusinessCTA from "../components/home/BusinessCTA";
const Home = () => {
  return (
    <div className="min-h-screen bg-surface">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6">
        {/* Hero Section */}
        <section className="py-24 md:py-32">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-orange-50 text-brand px-4 py-2 rounded-full text-sm font-semibold mb-8">
              <TrendingUp size={16} />
              India's food discovery marketplace
            </div>

            {/* Heading */}
            <h1 className="font-heading text-6xl md:text-7xl font-bold leading-tight tracking-tight">
              Great food deserves
              <span className="text-brand block">the spotlight.</span>
            </h1>

            {/* Description */}
            <p className="mt-7 text-lg text-neutral-500 leading-relaxed max-w-xl">
              Discover the hottest food spots around you. Watch brands compete
              for the spotlight and find your next favourite place with BiteBid.
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-wrap gap-4">
              <button className="flex items-center gap-3 bg-brand hover:bg-brand-dark text-white px-7 py-4 rounded-xl font-bold transition-all">
                Explore Campaigns
                <ArrowRight size={18} />
              </button>

              <button className="border border-neutral-200 bg-white hover:border-brand px-7 py-4 rounded-xl font-bold transition-all">
                I'm a Business Owner
              </button>
            </div>
          </div>
        </section>
      </main>
      <LiveCampaigns />
      <HowItWorks />
      <ExploreCities />
      <BusinessCTA />
    </div>
  );
};

export default Home;
