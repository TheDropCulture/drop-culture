import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Quote } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Rufio Lombardi",
    role: "Indie Rapper",
    image: "/rufio-lombardi.jpg",
    quote: "Drop Culture gave my music the credibility I needed. The review was fire, and the social content had my fans engaged like never before. It elevated my whole brand.",
    tier: "Drop Culture",
    color: "#FF4500",
  },
  {
    name: "Baby G33k",
    role: "Aspiring Rapper",
    image: "/baby-g33k.jpg",
    quote: "I used Drop Culture for my album release and the hashtag pack alone did me justice. The review gave me content to post for weeks. My streams went up after I started sharing the review content.",
    tier: "Drop Culture",
    color: "#C6FF00",
  },
];

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(card,
          { y: 60, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
            delay: i * 0.15,
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 px-6 bg-[#0a0e14]">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-[#C6FF00]/20" />

      <div className="max-w-6xl mx-auto">
        <div className="mb-16 text-center">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#FF4500] mb-4 block">
            Real Artists. Real Results.
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-white leading-[0.95]">
            ARTISTS WHO
            <br />
            <span className="text-[#C6FF00]">LEVELED UP</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="group relative border border-white/10 bg-[#0d1219] hover:border-white/20 transition-all duration-500 overflow-hidden"
            >
              {/* Accent corner */}
              <div 
                className="absolute top-0 left-0 w-16 h-16 opacity-20"
                style={{
                  background: `linear-gradient(135deg, ${t.color} 0%, transparent 60%)`,
                }}
              />

              <div className="p-8 md:p-10 relative z-10">
                {/* Quote icon */}
                <Quote 
                  className="w-8 h-8 mb-6 opacity-20" 
                  style={{ color: t.color }}
                />

                <p className="text-base md:text-lg text-white/70 leading-relaxed mb-8 italic">
                  "{t.quote}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="relative shrink-0">
                    <img 
                      src={t.image} 
                      alt={t.name}
                      className="w-14 h-14 object-cover grayscale group-hover:grayscale-0 transition-all duration-500 rounded-sm"
                    />
                    <div 
                      className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-[#0d1219]"
                      style={{ backgroundColor: t.color }}
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white tracking-tight">
                      {t.name}
                    </h4>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-white/40">{t.role}</span>
                      <span 
                        className="text-[10px] font-bold tracking-[0.15em] uppercase px-1.5 py-0.5"
                        style={{ 
                          color: t.color, 
                          backgroundColor: t.color + "15" 
                        }}
                      >
                        {t.tier}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
