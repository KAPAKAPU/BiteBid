import { ArrowUpRight, Store, TrendingUp, Eye } from "lucide-react";

const BusinessCTA = () => {
  return (
    <section className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-neutral-900 rounded-3xl p-10 md:p-16 relative overflow-hidden">
          {/* Background Decoration */}
          <div className="absolute -right-20 -top-20 w-96 h-96 bg-brand/20 rounded-full blur-3xl" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <span className="inline-flex items-center gap-2 bg-white/10 text-orange-400 px-4 py-2 rounded-full text-sm font-semibold">
                <Store size={16} />
                FOR FOOD BUSINESSES
              </span>

              <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mt-7 leading-tight">
                Your food is great.
                <span className="text-brand block">Let the city know.</span>
              </h2>

              <p className="text-neutral-400 mt-6 leading-relaxed max-w-lg">
                Put your restaurant in the spotlight. Compete for premium
                visibility and get discovered by people looking for their next
                favourite meal.
              </p>

              <button className="mt-9 flex items-center gap-3 bg-brand hover:bg-brand-dark text-white px-7 py-4 rounded-xl font-bold transition-all">
                Get Your Business Featured
                <ArrowUpRight size={18} />
              </button>
            </div>

            {/* Right Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-7">
                <TrendingUp className="text-brand" size={30} />

                <h3 className="text-white text-xl font-bold mt-6">Compete</h3>

                <p className="text-neutral-400 text-sm mt-3 leading-relaxed">
                  Compete with other food brands for premium visibility.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-7 sm:translate-y-10">
                <Eye className="text-brand" size={30} />

                <h3 className="text-white text-xl font-bold mt-6">
                  Get Noticed
                </h3>

                <p className="text-neutral-400 text-sm mt-3 leading-relaxed">
                  Put your business in front of hungry customers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessCTA;
