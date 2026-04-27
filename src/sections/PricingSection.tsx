import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, ArrowRight, FileText, Layers, Crown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const tiers = [
  {
    id: "basic",
    name: "THE BLOCK",
    price: "$10",
    subtitle: "Short Write-up",
    icon: FileText,
    features: [
      "150-250 word professional review",
      "1 quotable pull-quote for social",
      "Delivered in 24 hours",
      "Markdown format",
    ],
    color: "#B0BEC5",
    accent: "#C6FF00",
  },
  {
    id: "premium",
    name: "THE ZONE",
    price: "$25",
    subtitle: "Full Review + Captions + Hashtags",
    icon: Layers,
    features: [
      "400-600 word deep-dive review",
      "Instagram caption (ready to post)",
      "Twitter/X thread (3-5 tweets)",
      "Targeted hashtag set (15-20 tags)",
      "2 quotable pull-quotes",
      "Delivered in 24 hours",
    ],
    color: "#C6FF00",
    accent: "#101820",
    popular: true,
  },
  {
    id: "deluxe",
    name: "THE DROP",
    price: "$50",
    subtitle: "Review + Bio + Promo Script",
    positioning: "\uD83D\uDD25 Best for artists serious about going viral",
    icon: Crown,
    features: [
      "Everything in The Zone",
      "Professional artist bio rewrite",
      "TikTok promo script (60-90s)",
      "Radio drop / elevator pitch script",
      "Full press release draft",
      "Priority delivery (12 hours)",
    ],
    color: "#FF4500",
    accent: "#101820",
  },
];

export default function PricingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredTier, setHoveredTier] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".pricing-tier",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="relative py-24 md:py-32 px-6 bg-[#101820]"
    >
      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-[#FF4500]/30" />

      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#C6FF00] mb-4 block">
            Pricing
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-white leading-[0.95]">
            PICK YOUR
            <br />
            <span className="text-white/30">CREDIBILITY LEVEL</span>
          </h2>
        </div>

        <div className="space-y-4">
          {tiers.map((tier) => {
            const isHovered = hoveredTier === tier.id;
            const isOtherHovered = hoveredTier !== null && hoveredTier !== tier.id;

            return (
              <div
                key={tier.id}
                className={`pricing-tier group relative border border-white/10 transition-all duration-500 cursor-pointer overflow-hidden ${
                  isHovered
                    ? "bg-[#1A1A24] border-white/20"
                    : "bg-[#0d1219] border-white/5"
                } ${isOtherHovered ? "opacity-40 scale-[0.98]" : "opacity-100 scale-100"}`}
                onMouseEnter={() => setHoveredTier(tier.id)}
                onMouseLeave={() => setHoveredTier(null)}
              >
                {/* Popular badge */}
                {tier.popular && (
                  <div className="absolute top-0 right-0 bg-[#C6FF00] text-[#101820] text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1">
                    Most Popular
                  </div>
                )}

                {/* Left accent strip on hover */}
                <div 
                  className="absolute left-0 top-0 bottom-0 w-1 transition-all duration-500"
                  style={{ 
                    backgroundColor: tier.color,
                    opacity: isHovered ? 1 : 0.1
                  }}
                />

                <div className="p-8 md:p-10 lg:p-12 flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-12 pl-10">
                  {/* Left: Icon + Name */}
                  <div className="flex items-center gap-4 lg:w-56 shrink-0">
                    <div
                      className="w-12 h-12 flex items-center justify-center"
                      style={{ backgroundColor: tier.color + "20" }}
                    >
                      <tier.icon
                        className="w-6 h-6"
                        style={{ color: tier.color }}
                      />
                    </div>
                    <div>
                      <h3
                        className="text-xl font-black tracking-tight"
                        style={{ color: tier.color }}
                      >
                        {tier.name}
                      </h3>
                    </div>
                  </div>

                  {/* Center: Price + Features */}
                  <div className="flex-1">
                    {tier.positioning && (
                      <p className="text-xs text-[#FF4500] font-medium tracking-wide mb-2">
                        {tier.positioning}
                      </p>
                    )}
                    <div className="flex items-baseline gap-3 mb-3">
                      <span
                        className="text-5xl md:text-6xl font-black"
                        style={{ color: tier.color }}
                      >
                        {tier.price}
                      </span>
                      <span className="text-sm text-white/40">one-time</span>
                    </div>
                    <p className="text-sm text-white/50 mb-4">{tier.subtitle}</p>

                    <div className="flex flex-wrap gap-x-6 gap-y-2">
                      {tier.features.map((feature) => (
                        <div
                          key={feature}
                          className="flex items-center gap-2 text-xs text-white/50"
                        >
                          <Check className="w-3 h-3" style={{ color: tier.color }} />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right: CTA */}
                  <div className="lg:shrink-0 w-full lg:w-auto">
                    <Link
                      to="/submit"
                      state={{ tier: tier.id }}
                      className="flex items-center justify-center gap-2 px-6 py-4 text-sm font-bold tracking-[0.1em] uppercase transition-all duration-300 w-full min-h-[48px]"
                      style={{
                        backgroundColor: isHovered ? tier.color : "transparent",
                        color: isHovered ? tier.accent : tier.color,
                        border: `1px solid ${tier.color}`,
                      }}
                    >
                      Choose {tier.name}
                      <ArrowRight className="w-4 h-4 shrink-0" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-xs text-white/30 tracking-wide">
            10 customers/day = $100–$500/day potential. No subscriptions. No hidden fees.
          </p>
        </div>
      </div>
    </section>
  );
}
