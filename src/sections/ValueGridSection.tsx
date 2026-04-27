import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FileText, Twitter, Hash, PenTool, Mic, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: FileText,
    title: "INSTAGRAM READY",
    desc: "Captions + graphics suggestions that stop the scroll.",
    color: "#C6FF00",
  },
  {
    icon: Twitter,
    title: "TIKTOK SCRIPTS",
    desc: "Hook-driven scripts that algorithm actually promotes.",
    color: "#FF4500",
  },
  {
    icon: Hash,
    title: "TWITTER CLIPS",
    desc: "Thread formats and quotable one-liners for maximum reach.",
    color: "#C6FF00",
  },
  {
    icon: PenTool,
    title: "BIO REWRITE",
    desc: "Professional artist bios that venues and blogs copy-paste.",
    color: "#FF4500",
  },
  {
    icon: Mic,
    title: "PROMO SCRIPTS",
    desc: "Radio drops, interview pitches, and press kit language.",
    color: "#C6FF00",
  },
  {
    icon: Sparkles,
    title: "HASHTAG PACKS",
    desc: "Genre-targeted hashtag sets that boost discovery.",
    color: "#FF4500",
  },
];

export default function ValueGridSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
            delay: i * 0.08,
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 px-6 bg-[#0d1219]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#C6FF00] mb-4 block">
            What You Get
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-white leading-[0.95]">
            GET REVIEWED.
            <br />
            <span className="text-white/30">GO VIRAL.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="group bg-[#0d1219] p-8 md:p-10 hover:bg-[#1A1A24] transition-colors duration-500"
            >
              <feature.icon
                className="w-8 h-8 mb-6 transition-colors duration-300"
                style={{ color: feature.color }}
              />
              <h3 className="text-lg font-bold text-white mb-3 tracking-tight">
                {feature.title}
              </h3>
              <p className="text-sm text-white/40 leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
