import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { trpc } from "@/providers/trpc";
import Navbar from "@/components/custom/Navbar";
import Footer from "@/sections/Footer";
import { CheckCircle, Loader2, AlertCircle, ArrowRight, Music, User, Tag, FileText, Check, Mail } from "lucide-react";

export default function Success() {
  const [searchParams] = useSearchParams();
  const { isLoading: authLoading } = useAuth();
  const sessionId = searchParams.get("session_id");

  const [verified, setVerified] = useState(false);
  const [verifyError, setVerifyError] = useState("");
  const [tier, setTier] = useState("");
  const [submissionId, setSubmissionId] = useState<number | null>(null);

  // Submission form state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [songUrl, setSongUrl] = useState("");
  const [songTitle, setSongTitle] = useState("");
  const [artistName, setArtistName] = useState("");
  const [genre, setGenre] = useState("");
  const [notes, setNotes] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const verifyQuery = trpc.payment.verifySession.useQuery(
    { sessionId: sessionId || "" },
    { enabled: !!sessionId, retry: false }
  );

  const updateMutation = trpc.payment.updateSubmission.useMutation({
    onSuccess: () => {
      setSubmitSuccess(true);
      setSubmitLoading(false);
    },
    onError: (err) => {
      setSubmitError(err.message);
      setSubmitLoading(false);
    },
  });

  useEffect(() => {
    if (verifyQuery.data) {
      if (verifyQuery.data.paid) {
        setVerified(true);
        setTier(verifyQuery.data.tier);
        if (verifyQuery.data.submissionId) {
          setSubmissionId(Number(verifyQuery.data.submissionId));
        }
      } else {
        setVerifyError("Payment not completed. Please try again.");
      }
    }
    if (verifyQuery.error) {
      setVerifyError("Could not verify payment. Please contact support.");
    }
  }, [verifyQuery.data, verifyQuery.error]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!submissionId) return;
    if (!fullName.trim()) {
      setSubmitError("Please enter your full name.");
      return;
    }
    if (!email.trim()) {
      setSubmitError("Please enter your email.");
      return;
    }
    if (!songUrl.trim()) {
      setSubmitError("Please enter your song link.");
      return;
    }

    setSubmitLoading(true);
    setSubmitError("");

    updateMutation.mutate({
      id: submissionId,
      songUrl,
      songTitle: songTitle || undefined,
      artistName: artistName || undefined,
      genre: genre || undefined,
      notes: notes || undefined,
    });
  };

  const tierNames: Record<string, string> = {
    basic: "The Block",
    premium: "The Zone",
    deluxe: "The Drop",
  };

  const tierPrices: Record<string, string> = {
    basic: "$10.00",
    premium: "$25.00",
    deluxe: "$50.00",
  };

  if (authLoading || verifyQuery.isLoading) {
    return (
      <div className="min-h-screen bg-[#101820] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#C6FF00] animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#101820]">
      <Navbar />
      <main className="pt-24 pb-32 px-6">
        <div className="max-w-xl mx-auto">
          {/* Verification status */}
          {verifyError && (
            <div className="text-center py-12">
              <AlertCircle className="w-12 h-12 text-[#FF4500] mx-auto mb-4" />
              <h2 className="text-xl font-bold text-white mb-2">Payment Issue</h2>
              <p className="text-sm text-white/40 mb-6">{verifyError}</p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#C6FF00] text-[#101820] font-bold text-sm tracking-[0.1em] uppercase hover:bg-white transition-colors"
              >
                Back to Home
              </Link>
            </div>
          )}

          {verified && !submitSuccess && (
            <>
              {/* Confirmation */}
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#C6FF00]/10 border border-[#C6FF00]/30 mb-6">
                  <CheckCircle className="w-8 h-8 text-[#C6FF00]" />
                </div>
                <h1 className="text-3xl md:text-4xl font-black text-white leading-[0.95] mb-3">
                  PAYMENT RECEIVED.
                </h1>
                <p className="text-base text-white/50">
                  Submit your song link below and we will get started.
                </p>
              </div>

              {/* Order summary */}
              <div className="border border-white/10 bg-[#0d1219] p-6 mb-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-white/30">Your Plan</span>
                  <span
                    className="text-[10px] font-bold tracking-[0.15em] uppercase px-2 py-0.5"
                    style={{
                      color: tier === "deluxe" ? "#FF4500" : tier === "premium" ? "#C6FF00" : "#B0BEC5",
                      backgroundColor: (tier === "deluxe" ? "#FF4500" : tier === "premium" ? "#C6FF00" : "#B0BEC5") + "15"
                    }}
                  >
                    {tierNames[tier] || tier.toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/40">One-time payment</span>
                  <span className="text-xl font-black text-[#C6FF00]">
                    {tierPrices[tier] || "$0.00"}
                  </span>
                </div>
              </div>

              {/* Submission form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] tracking-[0.25em] uppercase text-white/40 mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Your full name"
                        required
                        className="w-full bg-[#1A1A24] border border-white/10 text-white pl-10 pr-4 py-3 text-sm outline-none focus:border-[#C6FF00] transition-colors placeholder:text-white/20"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.25em] uppercase text-white/40 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        required
                        className="w-full bg-[#1A1A24] border border-white/10 text-white pl-10 pr-4 py-3 text-sm outline-none focus:border-[#C6FF00] transition-colors placeholder:text-white/20"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] tracking-[0.25em] uppercase text-white/40 mb-2">
                    Artist Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                    <input
                      type="text"
                      value={artistName}
                      onChange={(e) => setArtistName(e.target.value)}
                      placeholder="Your artist name"
                      required
                      className="w-full bg-[#1A1A24] border border-white/10 text-white pl-10 pr-4 py-3 text-sm outline-none focus:border-[#C6FF00] transition-colors placeholder:text-white/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] tracking-[0.25em] uppercase text-white/40 mb-2">
                    Song Link *
                  </label>
                  <div className="relative">
                    <Music className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                    <input
                      type="url"
                      value={songUrl}
                      onChange={(e) => setSongUrl(e.target.value)}
                      placeholder="https://open.spotify.com/track/..."
                      required
                      className="w-full bg-[#1A1A24] border border-white/10 text-white pl-10 pr-4 py-3 text-sm outline-none focus:border-[#C6FF00] transition-colors placeholder:text-white/20"
                    />
                  </div>
                  <p className="mt-1.5 text-[11px] text-white/20">
                    Spotify, Apple Music, SoundCloud, YouTube, or Bandcamp
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
                      Genre
                    </label>
                    <div className="relative">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                      <input
                        type="text"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        placeholder="e.g. Trap, Indie Rock"
                        className="w-full bg-[#1A1A24] border border-white/10 text-white pl-10 pr-4 py-3 text-sm outline-none focus:border-[#C6FF00] transition-colors placeholder:text-white/20"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] tracking-[0.25em] uppercase text-white/40 mb-2">
                    Notes (Optional)
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-3 w-4 h-4 text-white/20" />
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Anything we should know about your track?"
                      rows={3}
                      className="w-full bg-[#1A1A24] border border-white/10 text-white pl-10 pr-4 py-3 text-sm outline-none focus:border-[#C6FF00] transition-colors placeholder:text-white/20 resize-none"
                    />
                  </div>
                </div>

                {submitError && (
                  <div className="flex items-center gap-2 text-sm text-[#FF4500] bg-[#FF4500]/10 px-4 py-3 border border-[#FF4500]/20">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {submitError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitLoading}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#C6FF00] text-[#101820] font-black text-sm tracking-[0.15em] uppercase hover:bg-white transition-colors disabled:opacity-50 min-h-[48px]"
                >
                  {submitLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      Submit My Track
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </>
          )}

          {submitSuccess && (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#C6FF00]/10 border border-[#C6FF00]/30 mb-6">
                <Check className="w-8 h-8 text-[#C6FF00]" />
              </div>
              <h2 className="text-2xl font-black text-white mb-3">
                WE RECEIVED YOUR TRACK.
              </h2>
              <p className="text-base text-white/50 mb-2">
                Your review will be delivered within 24 hours.
              </p>
              <p className="text-sm text-white/30 mb-8">
                A confirmation has been sent to your email.
              </p>
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#C6FF00] text-[#101820] font-bold text-sm tracking-[0.1em] uppercase hover:bg-white transition-colors"
              >
                Go to Dashboard
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
