import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Music, CreditCard, FileCheck, Share2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    icon: Music,
    title: "PASTE YOUR LINK",
    desc: "Drop your Spotify, Apple Music, SoundCloud, or YouTube link. Tell us your artist name and genre.",
  },
  {
    number: "02",
    icon: CreditCard,
    title: "PICK & PAY",
    desc: "Choose The Block ($10), The Zone ($25), or The Drop ($50). Secure Stripe checkout. No subscriptions.",
  },
  {
    number: "03",
    icon: FileCheck,
    title: "WE REVIEW",
    desc: "Our system analyzes your track and delivers a professional review and promo content.",
  },
  {
    number: "04",
    icon: Share2,
    title: "YOU POST",
    desc: "Get your review, captions, hashtags, and scripts delivered to your dashboard. Post immediately.",
  },
];

export default function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      stepsRef.current.forEach((step, i) => {
        if (!step) return;
        gsap.fromTo(step,
          { x: i % 2 === 0 ? -60 : 60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: step,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
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
            Process
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-white leading-[0.95]">
            HOW IT WORKS
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10">
          {steps.map((step, i) => (
            <div
              key={step.number}
              ref={(el) => { stepsRef.current[i] = el; }}
              className="group bg-[#0d1219] p-8 md:p-12 hover:bg-[#101820] transition-colors duration-500"
            >
              <div className="flex items-start gap-6">
                <div className="shrink-0">
                  <span className="text-5xl md:text-6xl font-black text-white/5 group-hover:text-[#C6FF00]/10 transition-colors">
                    {step.number}
                  </span>
                </div>
                <div>
                  <step.icon className="w-6 h-6 text-[#C6FF00] mb-4" />
                  <h3 className="text-lg font-bold text-white mb-3 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-sm text-white/40 leading-relaxed max-w-sm">
                    {step.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
