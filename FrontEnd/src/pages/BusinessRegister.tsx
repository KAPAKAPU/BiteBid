import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  ArrowRight,
  Store,
  MapPin,
  User,
  Mail,
  Phone,
  Building2,
} from "lucide-react";

const BusinessRegister = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    businessName: "",
    ownerName: "",
    category: "",
    email: "",
    phone: "",
    city: "",
    address: "",
  });

  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (Object.values(form).some((value) => !value.trim())) {
      setError("Please complete all required fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Please enter a valid business email.");
      return;
    }

    if (!/^[0-9]{10}$/.test(form.phone)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!acceptedTerms) {
      setError("Please accept the terms and conditions.");
      return;
    }

    navigate("/verify-otp", {
      state: {
        identifier: form.phone,
        registrationData: form,
      },
    });
  };

  const inputClass =
    "w-full bg-white border border-neutral-200 rounded-xl px-4 py-3.5 outline-none focus:border-brand focus:ring-2 focus:ring-orange-100 transition-all text-sm";

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}

      <header className="bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="text-3xl font-heading font-extrabold">
            Bite<span className="text-brand">Bid</span>.
          </Link>

          <Link
            to="/login"
            className="text-sm font-semibold text-neutral-600 hover:text-brand"
          >
            Already registered? Login
          </Link>
        </div>
      </header>

      {/* Registration Form */}

      <main className="max-w-3xl mx-auto px-6 py-14">
        <Link
          to="/login"
          className="flex items-center gap-2 text-sm text-neutral-500 hover:text-brand mb-8"
        >
          <ArrowLeft size={16} />
          Back to login
        </Link>

        <div className="bg-white border border-neutral-200 rounded-3xl p-7 md:p-10">
          {/* Heading */}

          <div className="mb-10">
            <div className="w-14 h-14 bg-orange-50 text-brand rounded-2xl flex items-center justify-center mb-6">
              <Store size={27} />
            </div>

            <h1 className="font-heading text-3xl md:text-4xl font-bold">
              Bring your business to BiteBid.
            </h1>

            <p className="text-neutral-500 mt-3 leading-relaxed">
              Tell us about your business and get started with India's food
              discovery marketplace.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-7">
            {/* Business Information */}

            <div>
              <h2 className="font-heading text-xl font-bold mb-5">
                Business Information
              </h2>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Business Name *
                  </label>

                  <div className="relative">
                    <Building2
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                    />

                    <input
                      name="businessName"
                      value={form.businessName}
                      onChange={handleChange}
                      placeholder="e.g. The Burger Club"
                      className={`${inputClass} pl-11`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Business Category *
                  </label>

                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="">Select category</option>

                    <option value="Cafe">Cafe</option>
                    <option value="Restaurant">Restaurant</option>
                    <option value="Fast Food">Fast Food</option>
                    <option value="Bakery">Bakery</option>
                    <option value="Desserts">Desserts</option>
                    <option value="Cloud Kitchen">Cloud Kitchen</option>
                    <option value="Fine Dining">Fine Dining</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="h-px bg-neutral-100" />

            {/* Owner Information */}

            <div>
              <h2 className="font-heading text-xl font-bold mb-5">
                Owner Information
              </h2>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Owner's Full Name *
                  </label>

                  <div className="relative">
                    <User
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                    />

                    <input
                      name="ownerName"
                      value={form.ownerName}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className={`${inputClass} pl-11`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Business Email *
                  </label>

                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                    />

                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="business@example.com"
                      className={`${inputClass} pl-11`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Mobile Number *
                  </label>

                  <div className="relative">
                    <Phone
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                    />

                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="10-digit mobile number"
                      maxLength={10}
                      className={`${inputClass} pl-11`}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="h-px bg-neutral-100" />

            {/* Location */}

            <div>
              <h2 className="font-heading text-xl font-bold mb-5">
                Business Location
              </h2>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    City *
                  </label>

                  <select
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="">Select your city</option>

                    <option value="Mumbai">Mumbai</option>
                    <option value="Thane">Thane</option>
                    <option value="Pune">Pune</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Bengaluru">Bengaluru</option>
                    <option value="Hyderabad">Hyderabad</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Business Address *
                  </label>

                  <div className="relative">
                    <MapPin
                      size={18}
                      className="absolute left-4 top-4 text-neutral-400"
                    />

                    <input
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      placeholder="Enter complete business address"
                      className={`${inputClass} pl-11`}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Terms */}

            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="mt-1 accent-orange-500"
              />

              <p className="text-sm text-neutral-500 leading-relaxed">
                I agree to BiteBid's terms and conditions and privacy policy.
              </p>
            </div>

            {/* Error */}

            {error && (
              <p className="text-sm text-red-500 font-medium">{error}</p>
            )}

            {/* Submit */}

            <button
              type="submit"
              className="w-full bg-brand hover:bg-brand-dark text-white rounded-xl py-4 font-bold flex items-center justify-center gap-3 transition-all"
            >
              Continue to Verification
              <ArrowRight size={18} />
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-neutral-400 mt-7">
          © 2026 BiteBid. Discover. Bid. Get Noticed.
        </p>
      </main>
    </div>
  );
};

export default BusinessRegister;
