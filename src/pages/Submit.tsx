import { useState } from "react";
import { useLocation, Link } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { trpc } from "@/providers/trpc";
import Navbar from "@/components/custom/Navbar";
import Footer from "@/sections/Footer";
import { ArrowLeft, ArrowRight, Check, Loader2, FileText, Layers, Crown, AlertCircle, Lock } from "lucide-react";

const tiers = [
  {
    id: "basic",
    name: "THE BLOCK",
    price: "$10.00",
    icon: FileText,
    color: "#B0BEC5",
    features: ["150-250 word review", "1 pull-quote", "24h delivery"],
  },
  {
    id: "premium",
    name: "THE ZONE",
    price: "$25.00",
    icon: Layers,
    color: "#C6FF00",
    features: ["400-600 word review", "Instagram caption", "Twitter thread", "Hashtag pack", "2 pull-quotes"],
    popular: true,
  },
  {
    id: "deluxe",
    name: "THE DROP",
    price: "$50.00",
    icon: Crown,
    color: "#FF4500",
    features: ["Everything in The Zone", "Artist bio rewrite", "TikTok script", "Radio drop script", "Press release", "12h delivery"],
  },
];

export default function Submit() {
  const location = useLocation();
  const { isAuthenticated, isLoading: authLoading } = useAuth({ redirectOnUnauthenticated: true });
  
  const initialUrl = location.state?.songUrl || "";
  const initialTier = location.state?.tier || "premium";
  
  const [step, setStep] = useState(1);
  const [songUrl, setSongUrl] = useState(initialUrl);
  const [songTitle, setSongTitle] = useState("");
  const [artistName, setArtistName] = useState("");
  const [genre, setGenre] = useState("");
  const [selectedTier, setSelectedTier] = useState(initialTier);
  const [submitError, setSubmitError] = useState("");
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const checkoutMutation = trpc.payment.createCheckoutSession.useMutation({
    onSuccess: (data) => {
      if (data.url) {
        window.location.href = data.url;
      } else {
        setSubmitError("Payment link unavailable.");
        setCheckoutLoading(false);
      }
    },
    onError: (err) => {
      setSubmitError(err.message);
      setCheckoutLoading(false);
    },
  });

  const handleCheckout = () => {
    setSubmitError("");
    setCheckoutLoading(true);
    checkoutMutation.mutate({ tier: selectedTier as "basic" | "premium" | "deluxe" });
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#101820] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#C6FF00] animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-[#101820]">
      <Navbar />
      
      <main className="pt-24 pb-32 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <Link to="/" className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-white/30 hover:text-[#C6FF00] transition-colors mb-8">
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Home
            </Link>
            <h1 className="text-4xl md:text-5xl font-black text-white leading-[0.95] mb-4">
              SUBMIT YOUR
              <br />
              <span className="text-[#C6FF00]">TRACK</span>
            </h1>
            <p className="text-sm text-white/40">
              Fill in your details, pick a tier, and get reviewed within 24 hours.
            </p>
          </div>

          {/* Steps indicator */}
          <div className="flex items-center gap-4 mb-12">
            <div className={`flex items-center justify-center w-8 h-8 text-xs font-bold ${step >= 1 ? "bg-[#C6FF00] text-[#101820]" : "bg-white/10 text-white/30"}`}>
              1
            </div>
            <div className={`flex-1 h-px ${step >= 2 ? "bg-[#C6FF00]" : "bg-white/10"}`} />
            <div className={`flex items-center justify-center w-8 h-8 text-xs font-bold ${step >= 2 ? "bg-[#C6FF00] text-[#101820]" : "bg-white/10 text-white/30"}`}>
              2
            </div>
          </div>

          {/* Step 1: Song Details */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] tracking-[0.25em] uppercase text-white/40 mb-2">
                  Song Link *
                </label>
                <input
                  type="url"
                  value={songUrl}
                  onChange={(e) => setSongUrl(e.target.value)}
                  placeholder="https://open.spotify.com/track/..."
                  className="w-full bg-[#1A1A24] border border-white/10 text-white px-4 py-3 text-sm outline-none focus:border-[#C6FF00] transition-colors placeholder:text-white/20"
                />
                <p className="mt-1.5 text-[11px] text-white/20">
                  Spotify, Apple Music, SoundCloud, YouTube, or Bandcamp links accepted
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] tracking-[0.25em] uppercase text-white/40 mb-2">
                    Song Title
                  </label>
                  <input
                    type="text"
                    value={songTitle}
                    onChange={(e) => setSongTitle(e.target.value)}
                    placeholder="Track name"
                    className="w-full bg-[#1A1A24] border border-white/10 text-white px-4 py-3 text-sm outline-none focus:border-[#C6FF00] transition-colors placeholder:text-white/20"
                  />
                </div>
                <div>
                  <label className="block text-[10px] tracking-[0.25em] uppercase text-white/40 mb-2">
                    Artist Name
                  </label>
                  <input
                    type="text"
                    value={artistName}
                    onChange={(e) => setArtistName(e.target.value)}
                    placeholder="Your artist name"
                    className="w-full bg-[#1A1A24] border border-white/10 text-white px-4 py-3 text-sm outline-none focus:border-[#C6FF00] transition-colors placeholder:text-white/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] tracking-[0.25em] uppercase text-white/40 mb-2">
                  Genre
                </label>
                <input
                  type="text"
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  placeholder="e.g. Indie Rock, Trap, Synthwave"
                  className="w-full bg-[#1A1A24] border border-white/10 text-white px-4 py-3 text-sm outline-none focus:border-[#C6FF00] transition-colors placeholder:text-white/20"
                />
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#C6FF00] text-[#101820] font-bold text-sm tracking-[0.1em] uppercase hover:bg-white transition-colors min-h-[48px]"
              >
                Continue
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>
            </div>
          )}

          {/* Step 2: Tier Selection + Checkout */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="space-y-4">
                {tiers.map((tier) => (
                  <div
                    key={tier.id}
                    onClick={() => setSelectedTier(tier.id)}
                    className={`relative border p-6 cursor-pointer transition-all duration-300 ${
                      selectedTier === tier.id
                        ? "border-[#C6FF00] bg-[#C6FF00]/5"
                        : "border-white/10 bg-[#1A1A24] hover:border-white/20"
                    }`}
                  >
                    {tier.popular && (
                      <div className="absolute top-0 right-0 bg-[#C6FF00] text-[#101820] text-[9px] font-bold tracking-[0.2em] uppercase px-2 py-0.5">
                        Popular
                      </div>
                    )}
                    <div className="flex items-start gap-4">
                      <div
                        className="w-10 h-10 flex items-center justify-center shrink-0"
                        style={{ backgroundColor: tier.color + "20" }}
                      >
                        <tier.icon className="w-5 h-5" style={{ color: tier.color }} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-baseline justify-between mb-2">
                          <h3 className="text-lg font-bold" style={{ color: tier.color }}>
                            {tier.name}
                          </h3>
                          <span className="text-xl font-black text-white">{tier.price}</span>
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-1">
                          {tier.features.map((f) => (
                            <div key={f} className="flex items-center gap-1.5 text-[11px] text-white/40">
                              <Check className="w-3 h-3" style={{ color: tier.color }} />
                              {f}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="shrink-0">
                        <div
                          className={`w-5 h-5 border-2 flex items-center justify-center transition-colors ${
                            selectedTier === tier.id
                              ? "border-[#C6FF00] bg-[#C6FF00]"
                              : "border-white/20"
                          }`}
                        >
                          {selectedTier === tier.id && <Check className="w-3 h-3 text-[#101820]" />}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {submitError && (
                <div className="flex items-center gap-2 text-sm text-[#FF4500] bg-[#FF4500]/10 px-4 py-3 border border-[#FF4500]/20">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {submitError}
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="w-full sm:w-auto flex items-center justify-center px-6 py-4 border border-white/20 text-white/60 font-bold text-sm tracking-[0.1em] uppercase hover:border-white/40 hover:text-white transition-colors min-h-[48px]"
                >
                  Back
                </button>
                <button
                  onClick={handleCheckout}
                  disabled={checkoutLoading || checkoutMutation.isPending}
                  className="w-full sm:flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-[#C6FF00] text-[#101820] font-bold text-sm tracking-[0.1em] uppercase hover:bg-white transition-colors disabled:opacity-50 min-h-[48px]"
                >
                  {checkoutLoading || checkoutMutation.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      Pay with Stripe
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              <p className="text-[11px] text-white/20 text-center">
                One-time payment. No subscriptions. Cancel anytime before checkout.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
