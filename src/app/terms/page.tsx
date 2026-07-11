"use client";

import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { ScrollText } from "lucide-react";

export const dynamic = "force-static";

const UPDATED = "July 10, 2026";

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="relative pt-36 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="aero-blob w-72 h-72 bg-violet-300 top-20 -left-10" aria-hidden="true" />
        <div className="aero-blob w-72 h-72 bg-sky-300 top-10 right-0" style={{ animationDelay: "3s" }} aria-hidden="true" />

        <div className="relative max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-400 to-sky-500 text-white shadow-lg">
              <ScrollText className="w-6 h-6" />
            </span>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold">Terms of Service</h1>
              <p className="text-sm text-muted-foreground">Last updated {UPDATED}</p>
            </div>
          </div>

          <Card className="p-6 sm:p-8 space-y-6 leading-relaxed text-sm sm:text-base">
            <p>
              These Terms govern the use of the Jogeyes creator tooling (the &ldquo;Service&rdquo;), a
              personal utility operated by Hartej Singh (&ldquo;Jogeyes&rdquo;) to manage the Jogeyes
              social media accounts. By using the Service you agree to these Terms.
            </p>

            <div>
              <h2 className="text-lg font-semibold mb-2">1. Purpose</h2>
              <p>
                The Service exists to let the account owner view their own social media analytics and to
                publish or draft the owner&rsquo;s own content across the owner&rsquo;s own connected
                accounts. It is provided for personal use and is not offered as a commercial product to
                third parties.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">2. Platform compliance</h2>
              <p>
                The Service connects to third-party platforms (including TikTok, Instagram, and YouTube)
                only through their official APIs and in accordance with each platform&rsquo;s developer
                terms and community guidelines. The account owner is responsible for ensuring that content
                published through the Service complies with those platforms&rsquo; policies.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">3. Authorization</h2>
              <p>
                The Service acts only on accounts the owner has explicitly authorized via each
                platform&rsquo;s standard login flow. Authorization can be revoked at any time from the
                platform&rsquo;s own app settings, which immediately ends the Service&rsquo;s access.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">4. No warranty</h2>
              <p>
                The Service is provided &ldquo;as is,&rdquo; without warranties of any kind. It may change,
                break, or be discontinued at any time. To the fullest extent permitted by law, the operator
                is not liable for any loss arising from use of the Service.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">5. Contact</h2>
              <p>
                Questions about these Terms can be sent through the{" "}
                <Link href="/contact" className="text-sky-500 hover:underline font-medium">
                  contact page
                </Link>
                .
              </p>
            </div>
          </Card>

          <p className="text-center text-xs text-muted-foreground mt-6">
            <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
            {" · "}
            <Link href="/" className="hover:underline">Home</Link>
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
