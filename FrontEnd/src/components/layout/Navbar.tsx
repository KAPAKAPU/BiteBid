import { Link } from "react-router-dom";
import { Search, MapPin, ChevronDown, ArrowUpRight } from "lucide-react";

const Navbar = () => {
  return (
    <header className="w-full bg-white border-b border-neutral-100">
      <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-1">
          <span className="text-3xl font-heading font-extrabold tracking-tight">
            Bite<span className="text-brand">Bid</span>
          </span>
          <span className="text-brand text-2xl">.</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-9 text-sm font-semibold text-neutral-600">
          <Link to="/" className="hover:text-brand transition-colors">
            Home
          </Link>

          <Link to="/explore" className="hover:text-brand transition-colors">
            Explore
          </Link>

          <Link to="/leaderboard" className="transition hover:text-orange-500">
            Leaderboard
          </Link>
          
          <Link to="/campaigns" className="hover:text-brand transition-colors">
            Live Bids
          </Link>

          <button className="flex items-center gap-1 hover:text-brand transition-colors">
            <MapPin size={16} />
            Mumbai
            <ChevronDown size={14} />
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-5">
          <button className="text-neutral-600 hover:text-brand transition-colors">
            <Search size={20} />
          </button>

          <Link
            to="/login"
            className="hidden sm:block text-sm font-semibold text-neutral-700 hover:text-brand"
          >
            Login
          </Link>

          <button className="flex items-center gap-2 bg-brand hover:bg-brand-dark text-white px-5 py-3 rounded-xl text-sm font-bold transition-all">
            Get Featured
            <ArrowUpRight size={16} />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
