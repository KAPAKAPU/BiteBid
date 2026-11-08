import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  RefreshCw,
  Utensils,
} from "lucide-react";

const DEMO_OTP = "1234";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const identifier = location.state?.identifier || "your registered number";

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown timer
  useEffect(() => {
    if (timeLeft === 0 || success) return;

    const timer = setInterval(() => {
      setTimeLeft((previous) => previous - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, success]);

  // Handle individual digit input
  const handleChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);

    const updatedOTP = [...otp];

    updatedOTP[index] = digit;

    setOtp(updatedOTP);
    setError("");

    if (digit && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace navigation
  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (e.key === "ArrowRight" && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle OTP paste
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 4);

    if (!pasted) return;

    const updatedOTP = ["", "", "", ""];

    pasted.split("").forEach((digit, index) => {
      updatedOTP[index] = digit;
    });

    setOtp(updatedOTP);
    setError("");

    const nextIndex = Math.min(pasted.length, 3);

    inputRefs.current[nextIndex]?.focus();
  };

  // Resend OTP
  const handleResend = () => {
    setOtp(["", "", "", ""]);
    setError("");
    setTimeLeft(30);

    inputRefs.current[0]?.focus();
  };

  // Verify OTP
  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();

    const enteredOTP = otp.join("");

    if (enteredOTP.length !== 4) {
      setError("Please enter the complete 4-digit OTP.");
      return;
    }

    if (enteredOTP !== DEMO_OTP) {
      setError("Incorrect OTP. Please try again.");
      setOtp(["", "", "", ""]);
      inputRefs.current[0]?.focus();
      return;
    }

    setError("");
    setSuccess(true);
  };

  const formatTime = (seconds: number) => {
    return `00:${String(seconds).padStart(2, "0")}`;
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
            Your account.
            <span className="text-brand block">Your identity.</span>
          </h1>

          <p className="text-neutral-400 text-lg mt-6 leading-relaxed">
            A quick verification helps us keep BiteBid safe and secure for
            everyone.
          </p>

          <div className="mt-10 flex items-center gap-3 text-neutral-300">
            <Utensils className="text-brand" size={21} />
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

          {success ? (
            /* SUCCESS STATE */

            <div className="text-center">
              <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle size={42} />
              </div>

              <h2 className="font-heading text-4xl font-bold mt-8">
                You're verified!
              </h2>

              <p className="text-neutral-500 mt-4 leading-relaxed">
                Your verification was successful. Welcome to BiteBid!
              </p>

              <button
                onClick={() => navigate("/explore")}
                className="w-full mt-10 bg-brand hover:bg-brand-dark text-white rounded-xl py-4 font-bold flex items-center justify-center gap-3 transition-all"
              >
                Continue to BiteBid
                <ArrowRight size={18} />
              </button>

              <Link
                to="/"
                className="inline-block mt-6 text-sm text-neutral-500 hover:text-brand"
              >
                Back to home
              </Link>
            </div>
          ) : (
            /* OTP FORM */

            <>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-brand mb-12"
              >
                <ArrowLeft size={16} />
                Back
              </Link>

              <div>
                <div className="w-14 h-14 bg-orange-50 text-brand rounded-2xl flex items-center justify-center">
                  <ShieldCheck size={28} />
                </div>

                <h2 className="font-heading text-4xl font-bold mt-7">
                  Verify your number
                </h2>

                <p className="text-neutral-500 mt-4 leading-relaxed">
                  We've sent a 4-digit verification code to
                </p>

                <p className="font-bold text-neutral-800 mt-2 break-all">
                  {identifier}
                </p>
              </div>

              {/* OTP Inputs */}

              <form onSubmit={handleVerify} className="mt-10">
                <label className="block text-sm font-semibold mb-4">
                  Enter verification code
                </label>

                <div className="flex gap-4 justify-between">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(element) => {
                        inputRefs.current[index] = element;
                      }}
                      type="text"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={handlePaste}
                      autoFocus={index === 0}
                      className="w-16 h-16 md:w-20 md:h-20 text-center text-3xl font-heading font-bold bg-white border border-neutral-200 rounded-xl outline-none focus:border-brand focus:ring-2 focus:ring-orange-100 transition-all"
                    />
                  ))}
                </div>

                {/* Error */}

                {error && (
                  <p className="text-sm text-red-500 mt-4 font-medium">
                    {error}
                  </p>
                )}

                {/* Resend OTP */}

                <div className="flex items-center justify-between mt-7">
                  <span className="text-sm text-neutral-500">
                    Didn't receive the code?
                  </span>

                  {timeLeft > 0 ? (
                    <span className="text-sm font-semibold text-neutral-400">
                      Resend in {formatTime(timeLeft)}
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResend}
                      className="flex items-center gap-2 text-sm font-bold text-brand"
                    >
                      <RefreshCw size={15} />
                      Resend OTP
                    </button>
                  )}
                </div>

                {/* Verify Button */}

                <button
                  type="submit"
                  disabled={otp.join("").length !== 4}
                  className="w-full mt-9 bg-brand hover:bg-brand-dark disabled:bg-neutral-300 disabled:cursor-not-allowed text-white rounded-xl py-4 font-bold flex items-center justify-center gap-3 transition-all"
                >
                  Verify & Continue
                  <ArrowRight size={18} />
                </button>
              </form>

              {/* Change Number */}

              <div className="mt-8 pt-7 border-t border-neutral-200 text-center">
                <button
                  onClick={() => navigate(-1)}
                  className="text-sm font-semibold text-neutral-600 hover:text-brand"
                >
                  Change email or mobile number
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
