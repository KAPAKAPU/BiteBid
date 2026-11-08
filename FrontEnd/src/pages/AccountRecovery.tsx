import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Mail,
  Phone,
  CheckCircle,
  Utensils,
} from "lucide-react";

const AccountRecovery = () => {
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const value = identifier.trim();

    if (!value) {
      setError("Please enter your registered email or mobile number.");
      return;
    }

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    const isPhone = /^\+?[0-9]{10,13}$/.test(value.replace(/[\s-]/g, ""));

    if (!isEmail && !isPhone) {
      setError("Please enter a valid email or mobile number.");
      return;
    }

    setError("");

    navigate("/verify-otp", {
      state: {
        identifier: value,
        purpose: "recovery",
      },
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
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-brand">
            <ShieldCheck size={34} />
          </div>

          <h1 className="font-heading text-5xl font-bold mt-9 leading-tight">
            Let's get you
            <span className="text-brand block">back in.</span>
          </h1>

          <p className="text-neutral-400 text-lg mt-6 leading-relaxed">
            Your favourite food discoveries are just a quick verification away.
          </p>

          <div className="flex items-center gap-3 mt-10 text-neutral-300">
            <Utensils size={21} className="text-brand" />
            Discover. Bid. Get Noticed.
          </div>
        </div>

        <p className="relative z-10 text-sm text-neutral-500">
          © 2026 BiteBid. All rights reserved.
        </p>
      </div>

      {/* RIGHT PANEL */}

      <div className="flex items-center justify-center bg-surface px-6 py-12">
        <div className="w-full max-w-md">
          <Link to="/" className="lg:hidden block mb-12">
            <span className="text-3xl font-heading font-extrabold">
              Bite<span className="text-brand">Bid</span>.
            </span>
          </Link>

          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-brand mb-12"
          >
            <ArrowLeft size={16} />
            Back to login
          </Link>

          <div>
            <div className="w-14 h-14 bg-orange-50 text-brand rounded-2xl flex items-center justify-center">
              <ShieldCheck size={28} />
            </div>

            <h2 className="font-heading text-4xl font-bold mt-7">
              Recover your account
            </h2>

            <p className="text-neutral-500 mt-4 leading-relaxed">
              Enter your registered email or mobile number. We'll help you
              verify your identity.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-10">
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

            {error && <p className="text-sm text-red-500 mt-3">{error}</p>}

            <button
              type="submit"
              className="w-full mt-6 bg-brand hover:bg-brand-dark text-white rounded-xl py-4 font-bold flex items-center justify-center gap-3 transition-all"
            >
              Continue
              <ArrowRight size={18} />
            </button>
          </form>

          <div className="mt-9 bg-orange-50 rounded-xl p-5">
            <div className="flex items-start gap-3">
              <CheckCircle size={20} className="text-brand shrink-0 mt-0.5" />

              <div>
                <p className="font-semibold text-sm">Secure verification</p>

                <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
                  BiteBid uses one-time verification codes instead of
                  traditional passwords.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-9 text-center">
            <p className="text-sm text-neutral-500">
              Remember your account details?
            </p>

            <Link
              to="/login"
              className="text-brand font-bold text-sm mt-2 inline-block"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountRecovery;
