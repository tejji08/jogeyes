"use client";

import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";

export const dynamic = "force-static";

const UPDATED = "July 10, 2026";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="relative pt-36 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="aero-blob w-72 h-72 bg-sky-300 top-20 -left-10" aria-hidden="true" />
        <div className="aero-blob w-72 h-72 bg-emerald-300 top-10 right-0" style={{ animationDelay: "3s" }} aria-hidden="true" />

        <div className="relative max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-400 to-emerald-500 text-white shadow-lg">
              <ShieldCheck className="w-6 h-6" />
            </span>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold">Privacy Policy</h1>
              <p className="text-sm text-muted-foreground">Last updated {UPDATED}</p>
            </div>
          </div>

          <Card className="p-6 sm:p-8 space-y-6 leading-relaxed text-sm sm:text-base">
            <p>
              This Privacy Policy explains how the Jogeyes creator tooling (the &ldquo;Service&rdquo;)
              handles information. The Service is a personal utility operated by Hartej Singh
              (&ldquo;Jogeyes&rdquo;) to manage the Jogeyes social media accounts. It is not a
              consumer product and does not create accounts for, or collect data from, visitors to this
              website.
            </p>

            <div>
              <h2 className="text-lg font-semibold mb-2">Information the Service accesses</h2>
              <p>
                When connected to a social platform (such as TikTok, Instagram, or YouTube) through that
                platform&rsquo;s official API, the Service accesses only the connected account&rsquo;s own
                data, with the account owner&rsquo;s authorization. This may include:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Basic profile information (display name, avatar, follower and video counts).</li>
                <li>A list of the account&rsquo;s own videos and their public engagement metrics.</li>
                <li>The ability to upload video files to the account owner&rsquo;s own drafts or posts.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">How the information is used</h2>
              <p>
                Data is used solely to display the owner&rsquo;s analytics and to publish or draft the
                owner&rsquo;s own content across the owner&rsquo;s own accounts. The Service does not use
                this data for advertising, profiling, or any purpose beyond the account owner&rsquo;s
                direct requests.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">Sharing and storage</h2>
              <p>
                No account data is sold, rented, or shared with third parties. Access tokens are stored
                locally on the account owner&rsquo;s own device and are used only to authenticate with the
                relevant platform API. Tokens can be revoked at any time from the platform&rsquo;s own app
                settings, which immediately ends the Service&rsquo;s access.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">Third-party platforms</h2>
              <p>
                The Service interacts with third-party platforms through their official APIs. Your use of
                those platforms is governed by their respective privacy policies, including those of
                TikTok, Meta (Instagram), and Google (YouTube).
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">Contact</h2>
              <p>
                Questions about this policy can be sent through the{" "}
                <Link href="/contact" className="text-sky-500 hover:underline font-medium">
                  contact page
                </Link>
                .
              </p>
            </div>
          </Card>

          <p className="text-center text-xs text-muted-foreground mt-6">
            <Link href="/terms" className="hover:underline">Terms of Service</Link>
            {" · "}
            <Link href="/" className="hover:underline">Home</Link>
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
