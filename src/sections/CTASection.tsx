import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Loader2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [songUrl, setSongUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cta-content",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!songUrl.trim()) return;
    
    setIsSubmitting(true);
    
    if (!isAuthenticated) {
      navigate("/login", { state: { redirectTo: "/submit", songUrl } });
      return;
    }
    
    navigate("/submit", { state: { songUrl } });
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#101820]"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              radial-gradient(ellipse 60% 50% at 50% 50%, rgba(198,255,0,0.08) 0%, transparent 70%),
              radial-gradient(ellipse 40% 60% at 30% 70%, rgba(255,69,0,0.06) 0%, transparent 60%)
            `,
          }}
        />
      </div>

      <div className="cta-content relative z-10 w-full max-w-3xl mx-auto px-6 text-center">
        <span className="text-[10px] tracking-[0.3em] uppercase text-[#FF4500] mb-6 block">
          Start Now
        </span>
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[0.95] mb-8">
          PASTE YOUR
          <br />
          <span className="text-gradient">SONG LINK</span>
        </h2>
        <p className="text-base text-white/40 mb-12 max-w-lg mx-auto">
          Get your review, captions, and promo content delivered in under 24 hours.
        </p>

        <form onSubmit={handleSubmit} className="relative max-w-xl mx-auto">
          <div className="relative">
            <input
              type="url"
              value={songUrl}
              onChange={(e) => setSongUrl(e.target.value)}
              placeholder="https://open.spotify.com/track/..."
              className="w-full bg-transparent border-b-2 border-[#C6FF00]/30 focus:border-[#C6FF00] text-white text-lg py-4 px-0 outline-none placeholder:text-white/20 transition-colors"
              required
            />
            <div 
              className="absolute bottom-0 left-0 h-0.5 bg-[#C6FF00] transition-all duration-300"
              style={{ width: songUrl ? "100%" : "0%" }}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !songUrl.trim()}
            className="mt-8 group w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-[#C6FF00] text-[#101820] font-black text-sm tracking-[0.15em] uppercase hover:bg-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed min-h-[48px]"
          >
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                Get My Review Now
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-12 flex items-center justify-center gap-8 text-[10px] tracking-[0.2em] uppercase text-white/20">
          <span>Spotify</span>
          <span className="w-1 h-1 bg-white/20 rounded-full" />
          <span>Apple Music</span>
          <span className="w-1 h-1 bg-white/20 rounded-full" />
          <span>SoundCloud</span>
          <span className="w-1 h-1 bg-white/20 rounded-full" />
          <span>YouTube</span>
        </div>
      </div>
    </section>
  );
}
