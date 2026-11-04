import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

import Navbar from '../components/layout/Navbar'

import {
  MapPin,
  Users,
  Clock,
  ArrowLeft,
  ArrowUpRight,
  TrendingUp,
  MessageCircle,
  Minus,
  Plus,
  Trophy,
  CheckCircle
} from 'lucide-react'

import { businesses } from '../data/businesses'

const CampaignDetails = () => {

  const { id } = useParams()

  const business = businesses.find(
    (item) => item.id === Number(id)
  )

  const [currentBid, setCurrentBid] = useState(
    business?.currentBid ?? 0
  )

  const [bidAmount, setBidAmount] = useState(
    (business?.currentBid ?? 0) + 100
  )

  const [history, setHistory] = useState([
    {
      name: business?.name ?? 'The Burger Club',
      amount: business?.currentBid ?? 12500,
      time: '2 minutes ago',
    },
    {
      name: 'Pizza Theory',
      amount: (business?.currentBid ?? 12500) - 500,
      time: '15 minutes ago',
    },
    {
      name: business?.name ?? 'The Burger Club',
      amount: (business?.currentBid ?? 12500) - 1000,
      time: '30 minutes ago',
    },
  ])

  const [message, setMessage] = useState('')

  const [timeLeft, setTimeLeft] = useState(2 * 60 * 60 + 45 * 60 + 12)

  // Countdown Timer
  useEffect(() => {

    const timer = setInterval(() => {

      setTimeLeft((previous) =>
        Math.max(previous - 1, 0)
      )

    }, 1000)

    return () => clearInterval(timer)

  }, [])

  const formatTime = (seconds: number) => {

    const hours = Math.floor(seconds / 3600)

    const minutes = Math.floor((seconds % 3600) / 60)

    const remainingSeconds = seconds % 60

    return [
      hours,
      minutes,
      remainingSeconds
    ]
      .map((value) => String(value).padStart(2, '0'))
      .join(':')

  }

  // Increase bid
  const increaseBid = () => {

    setBidAmount((previous) => previous + 100)

  }

  // Decrease bid
  const decreaseBid = () => {

    setBidAmount((previous) =>
      Math.max(currentBid + 100, previous - 100)
    )

  }

  // Place bid
  const placeBid = () => {

    if (timeLeft === 0) {
      setMessage('This campaign has ended.')
      return
    }

    if (bidAmount <= currentBid) {
      setMessage('Your bid must exceed the current highest bid.')
      return
    }

    setCurrentBid(bidAmount)

    setHistory((previous) => [

      {
        name: business?.name ?? 'The Burger Club',
        amount: bidAmount,
        time: 'Just now',
      },

      ...previous

    ])

    setBidAmount(bidAmount + 100)

    setMessage('Your bid has been placed successfully!')

  }

  // Business not found
  if (!business) {

    return (

      <div className="min-h-screen bg-surface">

        <Navbar />

        <div className="max-w-7xl mx-auto px-6 py-32 text-center">

          <h1 className="font-heading text-3xl font-bold">
            Campaign not found
          </h1>

          <Link
            to="/explore"
            className="inline-block mt-6 text-brand font-bold"
          >
            Back to Explore
          </Link>

        </div>

      </div>

    )

  }

  return (

    <div className="min-h-screen bg-surface">

      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-12">

        {/* Breadcrumb */}
        <Link
          to="/explore"
          className="flex items-center gap-2 text-neutral-500 hover:text-brand text-sm font-semibold mb-8"
        >
          <ArrowLeft size={16} />
          Back to Explore
        </Link>

        {/* Business Header */}
        <section className="bg-white border border-neutral-200 rounded-3xl p-8 md:p-12">

          <div className="flex flex-col md:flex-row justify-between gap-6">

            <div>

              <div className="flex items-center gap-2 mb-5">

                <span className="bg-green-50 text-green-600 px-3 py-2 rounded-full text-xs font-bold">
                  ● {business.status}
                </span>

                {business.trending && (

                  <span className="bg-orange-50 text-brand px-3 py-2 rounded-full text-xs font-bold">
                    TRENDING
                  </span>

                )}

              </div>

              <h1 className="font-heading text-4xl md:text-5xl font-bold">
                {business.name}
              </h1>

              <p className="text-neutral-500 mt-3">
                {business.category}
              </p>

              <div className="flex items-center gap-2 text-neutral-500 mt-5 text-sm">

                <MapPin size={17} />

                {business.location}, {business.city}

              </div>

              <p className="text-neutral-500 mt-6 max-w-xl leading-relaxed">
                {business.description}
              </p>

            </div>

            <div className="flex items-center justify-center">

              <div className="w-32 h-32 bg-orange-50 rounded-3xl flex items-center justify-center">

                <span className="text-6xl font-heading font-bold text-brand">
                  {business.name.charAt(0)}
                </span>

              </div>

            </div>

          </div>

        </section>

        {/* Campaign Statistics */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-7">

          {/* Highest Bid */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-7">

            <TrendingUp className="text-brand" size={25} />

            <p className="text-sm text-neutral-500 mt-5">
              Current Highest Bid
            </p>

            <h2 className="font-heading text-3xl font-bold mt-2">
              ₹{currentBid.toLocaleString('en-IN')}
            </h2>

          </div>

          {/* Participants */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-7">

            <Users className="text-brand" size={25} />

            <p className="text-sm text-neutral-500 mt-5">
              Participants
            </p>

            <h2 className="font-heading text-3xl font-bold mt-2">
              {business.participants}
            </h2>

          </div>

          {/* Countdown */}
          <div className="bg-neutral-900 rounded-2xl p-7 text-white">

            <Clock className="text-brand" size={25} />

            <p className="text-sm text-neutral-400 mt-5">
              Time Remaining
            </p>

            <h2 className="font-heading text-3xl font-bold mt-2">
              {formatTime(timeLeft)}
            </h2>

          </div>

        </section>

        {/* Bidding and History */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-7 mt-10">

          {/* Bidding Panel */}
          <div className="lg:col-span-2 bg-white border border-neutral-200 rounded-2xl p-8">

            <div className="flex items-center gap-3">

              <div className="w-11 h-11 bg-orange-50 rounded-xl flex items-center justify-center text-brand">
                <TrendingUp size={22} />
              </div>

              <div>

                <h2 className="font-heading text-2xl font-bold">
                  Place Your Bid
                </h2>

                <p className="text-sm text-neutral-500">
                  Compete for the top visibility slot.
                </p>

              </div>

            </div>

            <div className="mt-10">

              <p className="text-sm text-neutral-500 mb-3">
                Your proposed bid
              </p>

              <div className="flex items-center gap-4">

                <button
                  onClick={decreaseBid}
                  className="w-12 h-12 border border-neutral-200 rounded-xl flex items-center justify-center hover:border-brand"
                >
                  <Minus size={18} />
                </button>

                <div className="flex-1 text-center bg-orange-50 rounded-xl py-5">

                  <span className="font-heading text-3xl font-bold text-brand">
                    ₹{bidAmount.toLocaleString('en-IN')}
                  </span>

                </div>

                <button
                  onClick={increaseBid}
                  className="w-12 h-12 border border-neutral-200 rounded-xl flex items-center justify-center hover:border-brand"
                >
                  <Plus size={18} />
                </button>

              </div>

              <p className="text-xs text-neutral-400 mt-3">
                Minimum next bid: ₹{(currentBid + 100).toLocaleString('en-IN')}
              </p>

            </div>

            <button
              onClick={placeBid}
              disabled={timeLeft === 0}
              className="w-full mt-8 bg-brand hover:bg-brand-dark disabled:bg-neutral-300 text-white rounded-xl py-4 font-bold flex items-center justify-center gap-2 transition-all"
            >

              Place Bid

              <ArrowUpRight size={18} />

            </button>

            {message && (

              <div className="mt-5 flex items-center gap-2 text-sm text-green-600 font-semibold">

                <CheckCircle size={17} />

                {message}

              </div>

            )}

          </div>

          {/* Bidding History */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-7">

            <div className="flex items-center gap-3 mb-8">

              <Trophy className="text-brand" size={22} />

              <h2 className="font-heading text-xl font-bold">
                Bid History
              </h2>

            </div>

            <div className="space-y-6">

              {history.map((bid, index) => (

                <div
                  key={`${bid.name}-${bid.amount}-${index}`}
                  className="flex justify-between items-start gap-3"
                >

                  <div>

                    <p className="font-semibold text-sm">
                      {bid.name}
                    </p>

                    <p className="text-xs text-neutral-400 mt-1">
                      {bid.time}
                    </p>

                  </div>

                  <span className="font-bold text-sm">
                    ₹{bid.amount.toLocaleString('en-IN')}
                  </span>

                </div>

              ))}

            </div>

          </div>

        </section>

        {/* Future Community Section */}
        <section className="mt-10 bg-white border border-neutral-200 rounded-2xl p-8">

          <div className="flex items-center gap-3">

            <div className="w-11 h-11 bg-orange-50 rounded-xl flex items-center justify-center text-brand">

              <MessageCircle size={22} />

            </div>

            <div>

              <h2 className="font-heading text-2xl font-bold">
                Community
              </h2>

              <p className="text-sm text-neutral-500">
                Recommendations, conversations and customer support.
              </p>

            </div>

          </div>

          <div className="mt-7 bg-surface rounded-xl p-8 text-center">

            <h3 className="font-heading text-xl font-bold">
              Something exciting is coming.
            </h3>

            <p className="text-neutral-500 mt-2">
              Community comments and customer contributions
              will be introduced in a future update.
            </p>

            <span className="inline-block mt-5 bg-orange-50 text-brand px-4 py-2 rounded-full text-xs font-bold">
              COMING SOON
            </span>

          </div>

        </section>

      </main>

    </div>

  )

}

export default CampaignDetails