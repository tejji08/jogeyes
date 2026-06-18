import type { Metadata } from "next";
import { Sora, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";
import MotionWrapper from "@/components/MotionWrapper";
import { PlayerProvider } from "@/context/player";
import MiniPlayer from "@/components/MiniPlayer";
import { ThemeProvider } from "@/components/ThemeProvider";

const sora = Sora({ subsets: ["latin"], variable: "--font-sora", display: "swap" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = {
  title: "Jogeyes — Hartej's Creative Portfolio",
  description: "The creative hub of Hartej Singh: gaming & guitar videos, fiction & poetry, photography, and community.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${sora.variable} ${grotesk.variable} ${jetbrains.variable}`}>
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
        <ThemeProvider>
          <div id="site-content">
            <PlayerProvider>
              <MotionWrapper>{children}</MotionWrapper>
              <MiniPlayer />
            </PlayerProvider>
          </div>
        </ThemeProvider>
        {/* Simple analytics beacon: sends a small event on page load to /api/analytics/collect */}
        <Script id="analytics-beacon" strategy="afterInteractive">
          {`(function(){function send(){try{navigator.sendBeacon('/api/analytics/collect', JSON.stringify({path:location.pathname, ts:Date.now()}));}catch(e){fetch('/api/analytics/collect',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({path:location.pathname,ts:Date.now()})})}}; if(document.readyState==='complete') send(); else window.addEventListener('load',send);})();`}
        </Script>
        <VisualEditsMessenger />
      </body>
    </html>
  );
}
