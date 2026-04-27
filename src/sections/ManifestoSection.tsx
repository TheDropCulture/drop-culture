import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ManifestoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = [line1Ref.current, line2Ref.current, line3Ref.current];
      
      lines.forEach((line, i) => {
        if (!line) return;
        gsap.fromTo(line,
          { x: 100, skewX: 10, opacity: 0 },
          {
            x: 0,
            skewX: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: line,
              start: "top 85%",
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
    <section ref={sectionRef} className="relative py-32 md:py-48 px-6 overflow-hidden bg-[#101820]">
      <div className="max-w-7xl mx-auto">
        <div ref={line1Ref} className="mb-4">
          <span className="text-[6vw] md:text-[5vw] lg:text-[4vw] font-black leading-[0.95] text-white/90">
            Stop singing into
          </span>
        </div>
        <div ref={line2Ref} className="mb-4">
          <span className="text-[6vw] md:text-[5vw] lg:text-[4vw] font-black leading-[0.95] text-white/90">
            the void. Turn your{" "}
          </span>
          <span className="text-[6vw] md:text-[5vw] lg:text-[4vw] font-black leading-[0.95] text-[#C6FF00] italic skew-x-[-6deg] inline-block">
            demo
          </span>
        </div>
        <div ref={line3Ref}>
          <span className="text-[6vw] md:text-[5vw] lg:text-[4vw] font-black leading-[0.95] text-white/90">
            into{" "}
          </span>
          <span className="text-[6vw] md:text-[5vw] lg:text-[4vw] font-black leading-[0.95] text-[#C6FF00]">
            social ammunition.
          </span>
        </div>

        <div className="mt-16 max-w-lg">
          <p className="text-sm md:text-base text-white/40 leading-relaxed">
            Every artist needs press. But PR firms charge thousands. Blogs ignore your emails. 
            We give you instant, professional-grade music reviews and social-ready content 
            you can post today.
          </p>
        </div>
      </div>
    </section>
  );
}
