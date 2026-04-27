import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";

function getOAuthUrl() {
  const kimiAuthUrl = import.meta.env.VITE_KIMI_AUTH_URL;
  const appID = import.meta.env.VITE_APP_ID;
  const redirectUri = `${window.location.origin}/api/oauth/callback`;
  const state = btoa(redirectUri);

  const url = new URL(`${kimiAuthUrl}/api/oauth/authorize`);
  url.searchParams.set("client_id", appID);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", "profile");
  url.searchParams.set("state", state);

  return url.toString();
}

export default function Login() {
  return (
    <div className="min-h-screen bg-[#101820] flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-white/30 hover:text-[#C6FF00] transition-colors mb-12">
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Home
        </Link>

        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-6">
            <img src="/icon.png" alt="" className="w-8 h-8 object-contain" />
            <div className="flex flex-col items-start">
              <span className="text-lg font-black tracking-[0.2em] uppercase text-white leading-none">
                DROP CULTURE
              </span>
              <span className="text-[9px] tracking-[0.15em] uppercase text-white/30 mt-0.5">
                Where artists get heard.
              </span>
            </div>
          </div>
          <h1 className="text-3xl font-black text-white mb-3">
            WELCOME BACK
          </h1>
          <p className="text-sm text-white/40">
            Sign in to submit your tracks and view your reviews.
          </p>
        </div>

        <button
          onClick={() => {
            window.location.href = getOAuthUrl();
          }}
          className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-[#C6FF00] text-[#101820] font-bold text-sm tracking-[0.1em] uppercase hover:bg-white transition-colors"
        >
          Sign in with Kimi
        </button>

        <p className="mt-6 text-center text-xs text-white/20">
          By signing in, you agree to our terms of service.
        </p>
      </div>
    </div>
  );
}
