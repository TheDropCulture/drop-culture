import { Link } from "react-router";
import { Github, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-[#0a0e14] border-t border-white/5 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src="/icon.png" alt="" className="w-5 h-5 object-contain" />
              <div className="flex flex-col">
                <span className="text-sm font-black tracking-[0.2em] uppercase text-white leading-none">
                  DROP CULTURE
                </span>
                <span className="text-[9px] tracking-[0.15em] uppercase text-white/30 mt-0.5">
                  Where artists get heard.
                </span>
              </div>
            </Link>
            <p className="text-sm text-white/30 max-w-sm leading-relaxed">
              Professional music reviews and social-ready content for independent artists. 
              Turn your sound into credibility.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-[10px] tracking-[0.3em] uppercase text-white/40 mb-6">
              Platform
            </h4>
            <div className="space-y-3">
              <Link to="/submit" className="block text-sm text-white/30 hover:text-[#C6FF00] transition-colors">
                Submit My Track
              </Link>
              <Link to="/dashboard" className="block text-sm text-white/30 hover:text-[#C6FF00] transition-colors">
                Dashboard
              </Link>
              <Link to="/" className="block text-sm text-white/30 hover:text-[#C6FF00] transition-colors">
                Pricing
              </Link>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-[10px] tracking-[0.3em] uppercase text-white/40 mb-6">
              Connect
            </h4>
            <div className="flex items-center gap-4">
              <a href="#" className="text-white/20 hover:text-[#C6FF00] transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="text-white/20 hover:text-[#C6FF00] transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="text-white/20 hover:text-[#C6FF00] transition-colors">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/20">
            &copy; {new Date().getFullYear()} Drop Culture. All rights reserved.
          </p>
          <p className="text-xs text-white/20">
            Built for artists who take themselves seriously.
          </p>
        </div>
      </div>
    </footer>
  );
}
