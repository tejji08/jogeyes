import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";
import MotionWrapper from "@/components/MotionWrapper";
import { PlayerProvider } from "@/context/player";
import MiniPlayer from "@/components/MiniPlayer";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jogeyes — Hartej's Creative Portfolio",
  description: "The creative hub of Hartej Singh: gaming & guitar videos, original music, fiction & poetry, photography, and community.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={sora.variable}>
      <body className="antialiased">
        <a href="#site-content" className="skip-link sr-only focus:not-sr-only">Skip to content</a>
        <ErrorReporter />
        <Script
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
          strategy="afterInteractive"
          data-target-origin="*"
          data-message-type="ROUTE_CHANGE"
          data-include-search-params="true"
          data-only-in-iframe="true"
          data-debug="true"
          data-custom-data='{"appName": "YourApp", "version": "1.0.0", "greeting": "hi"}'
        />
        <div id="site-content">
          <PlayerProvider>
            <MotionWrapper>{children}</MotionWrapper>
            <MiniPlayer />
          </PlayerProvider>
        </div>
        {/* Simple analytics beacon: sends a small event on page load to /api/analytics/collect */}
        <Script id="analytics-beacon" strategy="afterInteractive">
          {`(function(){function send(){try{navigator.sendBeacon('/api/analytics/collect', JSON.stringify({path:location.pathname, ts:Date.now()}));}catch(e){fetch('/api/analytics/collect',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({path:location.pathname,ts:Date.now()})})}}; if(document.readyState==='complete') send(); else window.addEventListener('load',send);})();`}
        </Script>
        <VisualEditsMessenger />
      </body>
    </html>
  );
}