import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  ArrowRight,
  ArrowLeft,
  Utensils,
  Store,
  ShieldCheck,
} from "lucide-react";

const Login = () => {
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState("");

  const [error, setError] = useState("");

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();

    if (!identifier.trim()) {
      setError("Please enter your email or mobile number.");
      return;
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier) &&
      !/^\+?[0-9]{10,13}$/.test(identifier.replace(/[\s-]/g, ""))
    ) {
      setError("Please enter a valid email or mobile number.");
      return;
    }

    setError("");

    navigate("/verify-otp", {
      state: { identifier },
    });
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* LEFT PANEL */}

      <div className="hidden lg:flex bg-neutral-900 text-white p-16 flex-col justify-between relative overflow-hidden">
        <div className="absolute -right-32 -bottom-32 w-96 h-96 bg-brand/20 rounded-full blur-3xl" />

        <Link to="/" className="relative z-10">
          <span className="text-4xl font-heading font-extrabold">
            Bite<span className="text-brand">Bid</span>.
          </span>
        </Link>

        <div className="relative z-10 max-w-lg">
          <div className="inline-flex items-center gap-2 bg-white/10 text-orange-400 px-4 py-2 rounded-full text-sm font-semibold">
            <Utensils size={16} />
            India's food discovery marketplace
          </div>

          <h1 className="font-heading text-6xl font-bold leading-tight mt-8">
            Great food deserves
            <span className="text-brand block">the spotlight.</span>
          </h1>

          <p className="text-neutral-400 text-lg mt-7 leading-relaxed">
            Discover exciting food brands, explore live campaigns and find your
            next favourite food destination.
          </p>

          <div className="mt-12 space-y-5">
            <div className="flex items-center gap-3 text-neutral-300">
              <ShieldCheck className="text-brand" size={21} />
              Discover without registration.
            </div>

            <div className="flex items-center gap-3 text-neutral-300">
              <Store className="text-brand" size={21} />
              Help great food businesses get noticed.
            </div>
          </div>
        </div>

        <p className="relative z-10 text-sm text-neutral-500">
          © 2026 BiteBid. Discover. Bid. Get Noticed.
        </p>
      </div>

      {/* RIGHT PANEL */}

      <div className="flex items-center justify-center bg-surface px-6 py-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}

          <Link to="/" className="lg:hidden block mb-12">
            <span className="text-3xl font-heading font-extrabold">
              Bite<span className="text-brand">Bid</span>.
            </span>
          </Link>

          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-brand mb-12"
          >
            <ArrowLeft size={16} />
            Back to home
          </Link>

          <div>
            <h2 className="font-heading text-4xl font-bold">Welcome back!</h2>

            <p className="text-neutral-500 mt-3">
              Sign in to continue with BiteBid.
            </p>
          </div>

          {/* Login Form */}

          <form onSubmit={handleContinue} className="mt-10">
            <label className="block text-sm font-semibold mb-3">
              Email or Mobile Number
            </label>

            <input
              type="text"
              value={identifier}
              onChange={(e) => {
                setIdentifier(e.target.value);
                setError("");
              }}
              placeholder="Enter email or mobile number"
              className="w-full bg-white border border-neutral-200 rounded-xl px-5 py-4 outline-none focus:border-brand focus:ring-2 focus:ring-orange-100 transition-all"
            />

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-3 bg-brand hover:bg-brand-dark text-white rounded-xl py-4 font-bold mt-6 transition-all"
            >
              Continue
              <ArrowRight size={18} />
            </button>
            {/* Account Recovery */}
            <div className="flex justify-end mt-4">
              <Link
                to="/account-recovery"
                className="text-sm font-semibold text-brand hover:text-brand-dark"
              >
                Need help accessing your account?
              </Link>
            </div>
          </form>

          {/* Divider */}

          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-neutral-200" />

            <span className="text-xs text-neutral-400 font-semibold">OR</span>

            <div className="flex-1 h-px bg-neutral-200" />
          </div>

          {/* Google Login - UI only */}

          <button
            type="button"
            className="w-full bg-white border border-neutral-200 rounded-xl py-4 font-semibold flex items-center justify-center gap-3 hover:border-brand transition-all"
          >
            <span className="font-bold text-lg">G</span>
            Continue with Google
          </button>

          {/* Business Registration */}

          <div className="mt-10 text-center">
            <p className="text-sm text-neutral-500">
              Own a restaurant or food business?
            </p>

            <Link
              to="/business/register"
              className="inline-flex items-center gap-2 text-brand font-bold mt-3 hover:text-brand-dark"
            >
              Register your business
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Guest Browsing */}

          <div className="mt-10 pt-7 border-t border-neutral-200 text-center">
            <Link
              to="/explore"
              className="text-sm font-semibold text-neutral-600 hover:text-brand"
            >
              Continue exploring as a guest →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
