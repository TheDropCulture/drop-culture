import { useEffect, useRef } from "react";
import { Link } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { ArrowDown, Zap } from "lucide-react";
import gsap from "gsap";

export default function HeroSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const title = titleRef.current;
      if (title) {
        const originalText = "DROP CULTURE.";
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
        let iteration = 0;
        
        gsap.fromTo(title, 
          { opacity: 0, y: 40 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.6, 
            ease: "power3.out",
            onStart: () => {
              const interval = setInterval(() => {
                if (!title) return;
                title.innerText = originalText
                  .split("")
                  .map((char, idx) => {
                    if (idx < iteration) return originalText[idx];
                    if (char === " ") return " ";
                    return chars[Math.floor(Math.random() * chars.length)];
                  })
                  .join("");
                
                if (iteration >= originalText.length) {
                  clearInterval(interval);
                  title.innerText = originalText;
                }
                iteration += 1 / 3;
              }, 40);
            }
          }
        );
      }

      gsap.fromTo(subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.6, ease: "power2.out" }
      );

      gsap.fromTo(ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.9, ease: "power2.out" }
      );

      // Pulsing glow animation
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          opacity: 0.6,
          scale: 1.1,
          duration: 2,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 z-50 bg-[#C6FF00]" />
      <div className="absolute top-1 left-0 right-0 h-px bg-[#FF4500]/60" />

      {/* Animated liquid background - much bolder */}
      <div className="absolute inset-0 bg-[#0a0e14]">
        {/* Large neon green orb top-left */}
        <div 
          className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(198,255,0,0.18) 0%, transparent 70%)",
            filter: "blur(80px)",
            animation: "floatOrb1 12s ease-in-out infinite"
          }}
        />
        {/* Burnt orange orb bottom-right */}
        <div 
          className="absolute -bottom-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(255,69,0,0.2) 0%, transparent 70%)",
            filter: "blur(80px)",
            animation: "floatOrb2 14s ease-in-out infinite"
          }}
        />
        {/* Center glow */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(198,255,0,0.08) 0%, transparent 60%)",
            filter: "blur(60px)",
            animation: "pulseCenter 6s ease-in-out infinite"
          }}
        />
        {/* Diagonal color strip */}
        <div 
          className="absolute top-0 right-0 w-[2px] h-[40vh]"
          style={{
            background: "linear-gradient(to bottom, #C6FF00, transparent)",
            transform: "rotate(15deg) translateX(-20vw)",
            opacity: 0.5
          }}
        />
        <div 
          className="absolute bottom-0 left-0 w-[2px] h-[30vh]"
          style={{
            background: "linear-gradient(to top, #FF4500, transparent)",
            transform: "rotate(-10deg) translateX(15vw)",
            opacity: 0.4
          }}
        />
        <div className="absolute inset-0 noise-bg" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <div className="mb-6">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 border border-[#C6FF00]/40 text-[#C6FF00] text-[10px] font-bold tracking-[0.25em] uppercase bg-[#C6FF00]/5">
            <Zap className="w-3 h-3" />
            Professional Music Reviews
          </span>
          <p className="text-[11px] tracking-[0.2em] uppercase text-white/30 mt-3">
            Used by independent artists to build buzz and grow their audience.
          </p>
        </div>

        <h1
          ref={titleRef}
          className="text-[12vw] md:text-[8vw] lg:text-[7vw] font-black leading-[0.9] tracking-tighter text-white mb-8"
          style={{ textShadow: "0 0 60px rgba(198,255,0,0.15), 0 0 120px rgba(255,69,0,0.08)" }}
        >
          DROP CULTURE.
        </h1>

        <p
          ref={subtitleRef}
          className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Turn your music into content that gets attention, builds credibility, and makes people take you seriously.
        </p>

        <div ref={ctaRef} className="flex flex-col items-center gap-4 relative">
          {/* Glow behind CTA */}
          <div 
            ref={glowRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[80px] rounded-full opacity-30 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse, rgba(198,255,0,0.4) 0%, transparent 70%)",
              filter: "blur(30px)"
            }}
          />
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <Link
              to={isAuthenticated ? "/submit" : "/login"}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-[#C6FF00] text-[#101820] font-black text-sm tracking-[0.15em] uppercase overflow-hidden hover:bg-white transition-colors duration-300 shadow-[0_0_40px_rgba(198,255,0,0.3)] min-h-[48px]"
            >
              <span className="relative z-10 flex items-center gap-2">
                Submit My Track
                <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform shrink-0" />
              </span>
            </Link>
            <a
              href="#pricing"
              className="w-full sm:w-auto flex items-center justify-center px-8 py-4 border border-[#FF4500]/40 text-[#FF4500]/80 font-bold text-sm tracking-[0.15em] uppercase hover:border-[#FF4500] hover:text-[#FF4500] hover:bg-[#FF4500]/10 transition-colors min-h-[48px]"
            >
              Get My Review Now
            </a>
          </div>
          <p className="text-[11px] tracking-[0.15em] uppercase text-white/20">
            Limited reviews per day to maintain quality.
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[10px] tracking-[0.3em] uppercase text-white/30">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-[#FF4500] via-[#C6FF00] to-transparent" />
      </div>

      <style>{`
        @keyframes floatOrb1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -20px) scale(1.05); }
          66% { transform: translate(-20px, 15px) scale(0.95); }
        }
        @keyframes floatOrb2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-40px, -30px) scale(1.08); }
        }
        @keyframes pulseCenter {
          0%, 100% { opacity: 0.6; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 1; transform: translate(-50%, -50%) scale(1.15); }
        }
      `}</style>
    </section>
  );
}
