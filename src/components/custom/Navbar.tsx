import { useState, useEffect } from "react";
import { Link } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { Menu, X, LogOut } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#101820]/90 backdrop-blur-md border-b border-white/5" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <img src="/icon.png" alt="" className="w-6 h-6 object-contain" />
          <div className="flex flex-col">
            <span className="text-sm font-black tracking-[0.2em] uppercase text-white leading-none">
              DROP CULTURE
            </span>
            <span className="text-[9px] tracking-[0.15em] uppercase text-white/30 mt-0.5">
              Where artists get heard.
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-xs tracking-[0.15em] uppercase text-white/60 hover:text-[#C6FF00] transition-colors">
            Home
          </Link>
          <Link to="/submit" className="text-xs tracking-[0.15em] uppercase text-white/60 hover:text-[#C6FF00] transition-colors">
            Submit My Track
          </Link>
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="text-xs tracking-[0.15em] uppercase text-white/60 hover:text-[#C6FF00] transition-colors">
                Dashboard
              </Link>
              {user?.role === "admin" && (
                <Link to="/admin" className="text-xs tracking-[0.15em] uppercase text-[#FF4500] hover:text-[#C6FF00] transition-colors">
                  Admin
                </Link>
              )}
              <div className="flex items-center gap-3">
                {user?.avatar && (
                  <img src={user.avatar} alt="" className="w-7 h-7 rounded-full border border-white/10" />
                )}
                <button
                  onClick={() => logout()}
                  className="flex items-center gap-1.5 text-xs tracking-[0.15em] uppercase text-white/40 hover:text-[#FF4500] transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Exit
                </button>
              </div>
            </>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 bg-[#C6FF00] text-[#101820] text-xs font-bold tracking-[0.15em] uppercase hover:bg-white transition-colors"
            >
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#101820]/95 backdrop-blur-xl border-t border-white/5 px-6 py-6 space-y-4">
          <Link to="/" onClick={() => setMenuOpen(false)} className="block text-sm tracking-[0.15em] uppercase text-white/60">
            Home
          </Link>
          <Link to="/submit" onClick={() => setMenuOpen(false)} className="block text-sm tracking-[0.15em] uppercase text-white/60">
            Submit My Track
          </Link>
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="block text-sm tracking-[0.15em] uppercase text-white/60">
                Dashboard
              </Link>
              {user?.role === "admin" && (
                <Link to="/admin" onClick={() => setMenuOpen(false)} className="block text-sm tracking-[0.15em] uppercase text-[#FF4500]">
                  Admin
                </Link>
              )}
              <button
                onClick={() => { logout(); setMenuOpen(false); }}
                className="flex items-center gap-2 text-sm tracking-[0.15em] uppercase text-white/40"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </>
          ) : (
            <Link to="/login" onClick={() => setMenuOpen(false)} className="inline-block px-4 py-2 bg-[#C6FF00] text-[#101820] text-sm font-bold tracking-[0.15em] uppercase">
              Sign In
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
