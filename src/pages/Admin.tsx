import { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { trpc } from "@/providers/trpc";
import Navbar from "@/components/custom/Navbar";
import Footer from "@/sections/Footer";
import { ArrowLeft, Loader2, AlertCircle, CheckCircle, Play, FileText, Clock, Search, DollarSign, ShoppingCart, TrendingUp, Calendar, Copy, Check, Link as LinkIcon } from "lucide-react";

const statusConfig = {
  pending: { color: "text-white/40", bg: "bg-white/5", label: "Pending" },
  paid: { color: "text-[#C6FF00]", bg: "bg-[#C6FF00]/10", label: "Paid" },
  processing: { color: "text-[#C6FF00]", bg: "bg-[#C6FF00]/10", label: "Processing" },
  completed: { color: "text-[#C6FF00]", bg: "bg-[#C6FF00]/10", label: "Completed" },
  failed: { color: "text-[#FF4500]", bg: "bg-[#FF4500]/10", label: "Failed" },
};

const tierColors: Record<string, string> = {
  basic: "#B0BEC5",
  premium: "#C6FF00",
  deluxe: "#FF4500",
};

export default function Admin() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const [generatingId, setGeneratingId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  const { data: allSubmissions, isLoading } = trpc.submission.list.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  const { data: stats } = trpc.payment.getStats.useQuery(undefined, {
    enabled: isAuthenticated && user?.role === "admin",
  });

  const generateMutation = trpc.submission.generateReview.useMutation({
    onSuccess: () => {
      setGeneratingId(null);
      utils.submission.list.invalidate();
    },
    onError: () => {
      setGeneratingId(null);
    },
  });

  const utils = trpc.useUtils();

  const filteredSubmissions = allSubmissions?.filter((sub) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      sub.songTitle?.toLowerCase().includes(term) ||
      sub.artistName?.toLowerCase().includes(term) ||
      sub.genre?.toLowerCase().includes(term)
    );
  });

  const copyLink = (url: string, label: string) => {
    navigator.clipboard.writeText(url);
    setCopiedLink(label);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#101820] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#C6FF00] animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  if (user?.role !== "admin") {
    return (
      <div className="min-h-screen bg-[#101820] flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-8 h-8 text-[#FF4500] mx-auto mb-4" />
          <p className="text-sm text-white/40">Admin access required</p>
        </div>
      </div>
    );
  }

  const origin = typeof window !== "undefined" ? window.location.origin : "https://thedropculture.com";
  const shareableLinks = [
    { tier: "basic", name: "The Block", url: `${origin}/pay/basic`, price: "$10" },
    { tier: "premium", name: "The Zone", url: `${origin}/pay/premium`, price: "$25" },
    { tier: "deluxe", name: "The Drop", url: `${origin}/pay/deluxe`, price: "$50" },
  ];

  return (
    <div className="min-h-screen bg-[#101820]">
      <Navbar />
      
      <main className="pt-24 pb-32 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <Link to="/dashboard" className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-white/30 hover:text-[#C6FF00] transition-colors mb-6">
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to Dashboard
              </Link>
              <h1 className="text-4xl md:text-5xl font-black text-white leading-[0.95] mb-2">
                ADMIN
                <br />
                <span className="text-[#FF4500]">PANEL</span>
              </h1>
              <p className="text-sm text-white/40">
                Track sales, manage submissions, and share payment links.
              </p>
            </div>

            <div className="relative shrink-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search submissions..."
                className="w-full md:w-64 bg-[#1A1A24] border border-white/10 text-white pl-10 pr-4 py-2.5 text-sm outline-none focus:border-[#C6FF00] transition-colors placeholder:text-white/20"
              />
            </div>
          </div>

          {/* Revenue Stats */}
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="border border-white/10 bg-[#0d1219] p-6">
                <div className="flex items-center gap-3 mb-3">
                  <DollarSign className="w-5 h-5 text-[#C6FF00]" />
                  <span className="text-[10px] tracking-[0.2em] uppercase text-white/30">Total Revenue</span>
                </div>
                <span className="text-3xl font-black text-[#C6FF00]">
                  ${(stats.totalRevenue / 100).toFixed(2)}
                </span>
              </div>
              <div className="border border-white/10 bg-[#0d1219] p-6">
                <div className="flex items-center gap-3 mb-3">
                  <ShoppingCart className="w-5 h-5 text-[#C6FF00]" />
                  <span className="text-[10px] tracking-[0.2em] uppercase text-white/30">Total Sales</span>
                </div>
                <span className="text-3xl font-black text-white">{stats.totalSales}</span>
              </div>
              <div className="border border-white/10 bg-[#0d1219] p-6">
                <div className="flex items-center gap-3 mb-3">
                  <TrendingUp className="w-5 h-5 text-[#FF4500]" />
                  <span className="text-[10px] tracking-[0.2em] uppercase text-white/30">Best Seller</span>
                </div>
                <span className="text-xl font-black text-white">
                  {stats.salesByTier.deluxe.count >= stats.salesByTier.premium.count && stats.salesByTier.deluxe.count >= stats.salesByTier.basic.count
                    ? "The Drop"
                    : stats.salesByTier.premium.count >= stats.salesByTier.basic.count
                    ? "The Zone"
                    : "The Block"}
                </span>
              </div>
            </div>
          )}

          {/* Sales by Tier */}
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {(["basic", "premium", "deluxe"] as const).map((tier) => {
                const data = stats.salesByTier[tier];
                return (
                  <div key={tier} className="border border-white/10 bg-[#0d1219] p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-bold" style={{ color: tierColors[tier] }}>
                        {tier === "basic" ? "The Block" : tier === "premium" ? "The Zone" : "The Drop"}
                      </span>
                      <span className="text-xs text-white/30">{data.count} sold</span>
                    </div>
                    <div className="w-full bg-white/5 h-2 mb-2">
                      <div
                        className="h-full transition-all"
                        style={{
                          width: stats.totalSales > 0 ? `${(data.count / stats.totalSales) * 100}%` : "0%",
                          backgroundColor: tierColors[tier],
                        }}
                      />
                    </div>
                    <span className="text-lg font-black text-white">${(data.revenue / 100).toFixed(2)}</span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Shareable Payment Links */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <LinkIcon className="w-4 h-4 text-[#C6FF00]" />
              Shareable Payment Links
            </h2>
            <div className="border border-white/10 bg-[#0d1219]">
              {shareableLinks.map((link) => (
                <div key={link.tier} className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-4 border-b border-white/5 last:border-b-0">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold" style={{ color: tierColors[link.tier] }}>
                      {link.name}
                    </span>
                    <span className="text-xs text-white/30">{link.price}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <code className="text-[11px] text-white/20 bg-white/5 px-2 py-1 truncate max-w-[200px] md:max-w-xs">
                      {link.url}
                    </code>
                    <button
                      onClick={() => copyLink(link.url, link.tier)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-[#C6FF00] text-[#101820] text-[11px] font-bold tracking-[0.1em] uppercase hover:bg-white transition-colors shrink-0"
                    >
                      {copiedLink === link.tier ? (
                        <>
                          <Check className="w-3 h-3" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Daily Sales */}
          {stats && stats.salesByDay.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#C6FF00]" />
                Sales by Day (Last 30 Days)
              </h2>
              <div className="border border-white/10 bg-[#0d1219] overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left text-[10px] tracking-[0.2em] uppercase text-white/30 px-4 py-3 font-bold">Date</th>
                      <th className="text-left text-[10px] tracking-[0.2em] uppercase text-white/30 px-4 py-3 font-bold">Sales</th>
                      <th className="text-left text-[10px] tracking-[0.2em] uppercase text-white/30 px-4 py-3 font-bold">Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.salesByDay.map((day) => (
                      <tr key={day.date} className="border-b border-white/5">
                        <td className="px-4 py-3 text-sm text-white/50">{day.date}</td>
                        <td className="px-4 py-3 text-sm text-white font-medium">{day.count}</td>
                        <td className="px-4 py-3 text-sm text-[#C6FF00] font-medium">${(day.revenue / 100).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Status Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {["pending", "paid", "processing", "completed", "failed"].map((s) => {
              const count = allSubmissions?.filter((sub) => sub.status === s).length || 0;
              const config = statusConfig[s as keyof typeof statusConfig];
              return (
                <div key={s} className="border border-white/10 bg-[#0d1219] p-4">
                  <span className="text-2xl font-black text-white">{count}</span>
                  <p className={`text-[10px] tracking-[0.2em] uppercase mt-1 ${config.color}`}>
                    {config.label}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Submissions Table */}
          {isLoading ? (
            <div className="flex items-center justify-center py-24">
              <Loader2 className="w-8 h-8 text-[#C6FF00] animate-spin" />
            </div>
          ) : (
            <div className="border border-white/10 bg-[#0d1219]">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left text-[10px] tracking-[0.2em] uppercase text-white/30 px-6 py-4 font-bold">ID</th>
                      <th className="text-left text-[10px] tracking-[0.2em] uppercase text-white/30 px-6 py-4 font-bold">Track</th>
                      <th className="text-left text-[10px] tracking-[0.2em] uppercase text-white/30 px-6 py-4 font-bold">Tier</th>
                      <th className="text-left text-[10px] tracking-[0.2em] uppercase text-white/30 px-6 py-4 font-bold">Status</th>
                      <th className="text-left text-[10px] tracking-[0.2em] uppercase text-white/30 px-6 py-4 font-bold">Date</th>
                      <th className="text-right text-[10px] tracking-[0.2em] uppercase text-white/30 px-6 py-4 font-bold">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSubmissions && filteredSubmissions.length > 0 ? (
                      filteredSubmissions.map((sub) => {
                        const status = statusConfig[sub.status as keyof typeof statusConfig] || statusConfig.pending;
                        return (
                          <tr key={sub.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                            <td className="px-6 py-4 text-sm text-white/30">#{sub.id}</td>
                            <td className="px-6 py-4">
                              <p className="text-sm text-white font-medium">{sub.songTitle || "Untitled"}</p>
                              <p className="text-xs text-white/30">{sub.artistName || "Unknown"}</p>
                            </td>
                            <td className="px-6 py-4">
                              <span className="text-[10px] font-bold tracking-[0.15em] uppercase px-2 py-0.5 bg-white/5 text-white/40">
                                {sub.tier}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex items-center gap-1 text-[11px] px-2 py-0.5 ${status.color} ${status.bg}`}>
                                {sub.status === "completed" ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                                {status.label}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-xs text-white/20">
                              {new Date(sub.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 text-right">
                              {(sub.status === "paid" || sub.status === "failed") && (
                                <button
                                  onClick={() => {
                                    setGeneratingId(sub.id);
                                    generateMutation.mutate({ id: sub.id });
                                  }}
                                  disabled={generatingId === sub.id}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#C6FF00] text-[#101820] text-[11px] font-bold tracking-[0.1em] uppercase hover:bg-white transition-colors disabled:opacity-50"
                                >
                                  {generatingId === sub.id ? (
                                    <Loader2 className="w-3 h-3 animate-spin" />
                                  ) : (
                                    <Play className="w-3 h-3" />
                                  )}
                                  Generate
                                </button>
                              )}
                              {sub.status === "completed" && (
                                <Link
                                  to={`/review/${sub.id}`}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#C6FF00] text-[#C6FF00] text-[11px] font-bold tracking-[0.1em] uppercase hover:bg-[#C6FF00] hover:text-[#101820] transition-colors"
                                >
                                  <FileText className="w-3 h-3" />
                                  View
                                </Link>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center text-sm text-white/20">
                          No submissions found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
