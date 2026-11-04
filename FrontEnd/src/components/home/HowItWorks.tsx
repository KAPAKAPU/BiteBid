import {
  Search,
  TrendingUp,
  Trophy,
  ArrowRight
} from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Discover Campaigns',
    description:
      'Explore restaurants, cafes and food brands competing for visibility in your city.',
  },
  {
    number: '02',
    icon: TrendingUp,
    title: 'Watch the Competition',
    description:
      "'Track live bids, see who's leading and follow the competition as it unfolds.'"
  },
  {
    number: '03',
    icon: Trophy,
    title: 'Win the Spotlight',
    description:
      'The highest eligible bid earns the top visibility slot for the campaign period.',
  },
]

const HowItWorks = () => {
  return (
    <section className="py-24 bg-surface">

      <div className="max-w-7xl mx-auto px-6">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">

          <span className="text-brand font-bold text-sm tracking-wider uppercase">
            Simple. Competitive. Visible.
          </span>

          <h2 className="font-heading text-4xl md:text-5xl font-bold mt-4">
            How BiteBid <span className="text-brand">works.</span>
          </h2>

          <p className="text-neutral-500 mt-5 leading-relaxed">
            A new way for food businesses to compete for attention
            and get discovered by more customers.
          </p>

        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {steps.map((step, index) => {
            const Icon = step.icon

            return (
              <div
                key={step.number}
                className="relative bg-white border border-neutral-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-300"
              >

                {/* Step Number */}
                <div className="flex items-center justify-between mb-8">

                  <span className="text-5xl font-heading font-bold text-orange-100">
                    {step.number}
                  </span>

                  <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center text-brand">
                    <Icon size={26} />
                  </div>

                </div>

                <h3 className="font-heading text-2xl font-bold mb-3">
                  {step.title}
                </h3>

                <p className="text-neutral-500 leading-relaxed">
                  {step.description}
                </p>

                {index !== 2 && (
                  <div className="hidden lg:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white border border-neutral-200 rounded-full items-center justify-center">
                    <ArrowRight size={18} className="text-brand" />
                  </div>
                )}

              </div>
            )
          })}

        </div>

      </div>

    </section>
  )
}

export default HowItWorks