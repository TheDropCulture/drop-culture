import { Link, useNavigate } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { trpc } from "@/providers/trpc";
import Navbar from "@/components/custom/Navbar";
import Footer from "@/sections/Footer";
import { ArrowLeft, Plus, Loader2, Clock, CheckCircle, AlertCircle, FileText, ExternalLink } from "lucide-react";

const statusConfig = {
  pending: { icon: Clock, color: "text-white/40", bg: "bg-white/5", label: "Pending Payment" },
  paid: { icon: CheckCircle, color: "text-[#C6FF00]", bg: "bg-[#C6FF00]/10", label: "Paid — Processing" },
  processing: { icon: Loader2, color: "text-[#C6FF00]", bg: "bg-[#C6FF00]/10", label: "Generating Review" },
  completed: { icon: CheckCircle, color: "text-[#C6FF00]", bg: "bg-[#C6FF00]/10", label: "Completed" },
  failed: { icon: AlertCircle, color: "text-[#FF4500]", bg: "bg-[#FF4500]/10", label: "Failed" },
};

const tierLabels = {
  basic: "THE BLOCK",
  premium: "THE ZONE",
  deluxe: "THE DROP",
};

const tierColors = {
  basic: "#B0BEC5",
  premium: "#C6FF00",
  deluxe: "#FF4500",
};

export default function Dashboard() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading: authLoading } = useAuth({ redirectOnUnauthenticated: true });
  
  const { data: submissions, isLoading, error } = trpc.submission.list.useQuery(undefined, {
    enabled: isAuthenticated,
  });

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
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <Link to="/" className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-white/30 hover:text-[#C6FF00] transition-colors mb-6">
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to Home
              </Link>
              <h1 className="text-4xl md:text-5xl font-black text-white leading-[0.95]">
                YOUR
                <br />
                <span className="text-[#C6FF00]">SUBMISSIONS</span>
              </h1>
            </div>
            <Link
              to="/submit"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#C6FF00] text-[#101820] font-bold text-sm tracking-[0.1em] uppercase hover:bg-white transition-colors shrink-0"
            >
              <Plus className="w-4 h-4" />
              New Submission
            </Link>
          </div>

          {/* Submissions List */}
          {isLoading ? (
            <div className="flex items-center justify-center py-24">
              <Loader2 className="w-8 h-8 text-[#C6FF00] animate-spin" />
            </div>
          ) : error ? (
            <div className="text-center py-24">
              <AlertCircle className="w-8 h-8 text-[#FF4500] mx-auto mb-4" />
              <p className="text-sm text-white/40">Failed to load submissions</p>
            </div>
          ) : submissions && submissions.length > 0 ? (
            <div className="space-y-4">
              {submissions.map((sub) => {
                const status = statusConfig[sub.status as keyof typeof statusConfig] || statusConfig.pending;
                const StatusIcon = status.icon;
                
                return (
                  <div
                    key={sub.id}
                    className="group border border-white/10 bg-[#0d1219] hover:border-white/20 transition-colors"
                  >
                    <div className="p-6 md:p-8">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <span
                              className="text-[10px] font-bold tracking-[0.2em] uppercase px-2 py-0.5"
                              style={{ color: tierColors[sub.tier as keyof typeof tierColors], backgroundColor: tierColors[sub.tier as keyof typeof tierColors] + "15" }}
                            >
                              {tierLabels[sub.tier as keyof typeof tierLabels]}
                            </span>
                            <div className={`flex items-center gap-1.5 text-[11px] px-2 py-0.5 ${status.color} ${status.bg}`}>
                              <StatusIcon className={`w-3 h-3 ${sub.status === "processing" ? "animate-spin" : ""}`} />
                              {status.label}
                            </div>
                          </div>
                          
                          <h3 className="text-lg font-bold text-white truncate mb-1">
                            {sub.songTitle || "Untitled Track"}
                          </h3>
                          <p className="text-sm text-white/30 mb-2">
                            {sub.artistName || "Unknown Artist"} {sub.genre && `— ${sub.genre}`}
                          </p>
                          
                          <a
                            href={sub.songUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] text-white/20 hover:text-[#C6FF00] transition-colors"
                          >
                            <ExternalLink className="w-3 h-3" />
                            {sub.songUrl.slice(0, 50)}...
                          </a>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          {sub.status === "pending" && (
                            <button
                              onClick={() => navigate(`/submit?pay=${sub.id}`)}
                              className="px-4 py-2 bg-[#C6FF00] text-[#101820] text-xs font-bold tracking-[0.1em] uppercase hover:bg-white transition-colors"
                            >
                              Pay Now
                            </button>
                          )}
                          
                          {sub.status === "completed" && (
                            <Link
                              to={`/review/${sub.id}`}
                              className="flex items-center gap-2 px-4 py-2 border border-[#C6FF00] text-[#C6FF00] text-xs font-bold tracking-[0.1em] uppercase hover:bg-[#C6FF00] hover:text-[#101820] transition-colors"
                            >
                              <FileText className="w-3.5 h-3.5" />
                              View Review
                            </Link>
                          )}
                          
                          <span className="text-xs text-white/20">
                            {new Date(sub.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-24 border border-white/5 bg-[#0d1219]">
              <FileText className="w-10 h-10 text-white/10 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white/40 mb-2">No submissions yet</h3>
              <p className="text-sm text-white/20 mb-6 max-w-sm mx-auto">
                Submit your first track to get a professional review and social-ready content.
              </p>
              <Link
                to="/submit"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#C6FF00] text-[#101820] font-bold text-sm tracking-[0.1em] uppercase hover:bg-white transition-colors"
              >
                <Plus className="w-4 h-4" />
                Submit My Track
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
