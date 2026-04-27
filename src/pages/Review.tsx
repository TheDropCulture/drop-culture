import { useState } from "react";
import { Link, useParams } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { trpc } from "@/providers/trpc";
import Navbar from "@/components/custom/Navbar";
import Footer from "@/sections/Footer";
import { ArrowLeft, Copy, Check, Loader2, AlertCircle, FileText, Instagram, Twitter, Hash, PenTool, Mic, Sparkles } from "lucide-react";

export default function Review() {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated, isLoading: authLoading } = useAuth({ redirectOnUnauthenticated: true });
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const { data: submission, isLoading, error } = trpc.submission.get.useQuery(
    { id: Number(id) },
    { enabled: isAuthenticated && !!id }
  );

  const handleCopy = (text: string | null, field: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
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
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <Link to="/dashboard" className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-white/30 hover:text-[#C6FF00] transition-colors mb-6">
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Dashboard
            </Link>
            <h1 className="text-4xl md:text-5xl font-black text-white leading-[0.95] mb-4">
              YOUR
              <br />
              <span className="text-[#C6FF00]">REVIEW</span>
            </h1>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-24">
              <Loader2 className="w-8 h-8 text-[#C6FF00] animate-spin" />
            </div>
          ) : error ? (
            <div className="text-center py-24">
              <AlertCircle className="w-8 h-8 text-[#FF4500] mx-auto mb-4" />
              <p className="text-sm text-white/40">Failed to load review</p>
            </div>
          ) : submission ? (
            <div className="space-y-8">
              {/* Song Info */}
              <div className="border border-white/10 bg-[#0d1219] p-6 md:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[10px] tracking-[0.3em] uppercase text-[#C6FF00] mb-2 block">
                      {submission.tier.toUpperCase()} REVIEW
                    </span>
                    <h2 className="text-2xl font-bold text-white mb-1">
                      {submission.songTitle || "Untitled Track"}
                    </h2>
                    <p className="text-sm text-white/40">
                      {submission.artistName || "Unknown Artist"}
                      {submission.genre && ` — ${submission.genre}`}
                    </p>
                  </div>
                  <a
                    href={submission.songUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 px-3 py-1.5 border border-white/10 text-white/30 text-[10px] tracking-[0.2em] uppercase hover:border-[#C6FF00] hover:text-[#C6FF00] transition-colors"
                  >
                    Listen
                  </a>
                </div>
              </div>

              {/* Main Review */}
              {submission.reviewContent && (
                <ContentBlock
                  icon={FileText}
                  title="PROFESSIONAL REVIEW"
                  content={submission.reviewContent}
                  onCopy={() => handleCopy(submission.reviewContent, "review")}
                  copied={copiedField === "review"}
                />
              )}

              {/* Instagram Caption */}
              {submission.instagramCaption && (
                <ContentBlock
                  icon={Instagram}
                  title="INSTAGRAM CAPTION"
                  content={submission.instagramCaption}
                  onCopy={() => handleCopy(submission.instagramCaption, "instagram")}
                  copied={copiedField === "instagram"}
                  color="#E1306C"
                />
              )}

              {/* Twitter Thread */}
              {submission.twitterThread && (
                <ContentBlock
                  icon={Twitter}
                  title="TWITTER / X THREAD"
                  content={submission.twitterThread}
                  onCopy={() => handleCopy(submission.twitterThread, "twitter")}
                  copied={copiedField === "twitter"}
                  color="#1DA1F2"
                />
              )}

              {/* Hashtags */}
              {submission.hashtags && (
                <ContentBlock
                  icon={Hash}
                  title="HASHTAG PACK"
                  content={submission.hashtags}
                  onCopy={() => handleCopy(submission.hashtags, "hashtags")}
                  copied={copiedField === "hashtags"}
                  color="#C6FF00"
                />
              )}

              {/* Artist Bio */}
              {submission.artistBio && (
                <ContentBlock
                  icon={PenTool}
                  title="ARTIST BIO"
                  content={submission.artistBio}
                  onCopy={() => handleCopy(submission.artistBio, "bio")}
                  copied={copiedField === "bio"}
                  color="#FF4500"
                />
              )}

              {/* TikTok Script */}
              {submission.tiktokScript && (
                <ContentBlock
                  icon={Mic}
                  title="TIKTOK PROMO SCRIPT"
                  content={submission.tiktokScript}
                  onCopy={() => handleCopy(submission.tiktokScript, "tiktok")}
                  copied={copiedField === "tiktok"}
                  color="#FF0050"
                />
              )}

              {/* Promo Script */}
              {submission.promoScript && (
                <ContentBlock
                  icon={Sparkles}
                  title="PROMO SCRIPT"
                  content={submission.promoScript}
                  onCopy={() => handleCopy(submission.promoScript, "promo")}
                  copied={copiedField === "promo"}
                  color="#C6FF00"
                />
              )}
            </div>
          ) : null}
        </div>
      </main>

      <Footer />
    </div>
  );
}

function ContentBlock({
  icon: Icon,
  title,
  content,
  onCopy,
  copied,
  color = "#C6FF00",
}: {
  icon: React.ElementType;
  title: string;
  content: string;
  onCopy: () => void;
  copied: boolean;
  color?: string;
}) {
  return (
    <div className="border border-white/10 bg-[#0d1219]">
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          <Icon className="w-4 h-4" style={{ color }} />
          <span className="text-[10px] tracking-[0.25em] uppercase text-white/40 font-bold">
            {title}
          </span>
        </div>
        <button
          onClick={onCopy}
          className="flex items-center gap-1.5 text-[11px] text-white/20 hover:text-[#C6FF00] transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5" />
              Copied
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              Copy
            </>
          )}
        </button>
      </div>
      <div className="p-6 md:p-8">
        <div className="prose prose-invert prose-sm max-w-none">
          {content.split("\n").map((line, i) => (
            <p key={i} className="text-sm text-white/70 leading-relaxed mb-2 last:mb-0">
              {line}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
