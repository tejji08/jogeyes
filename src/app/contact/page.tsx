"use client";

import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/profile";
import { Mail, Send, Loader2, CheckCircle2, Youtube, Instagram, Twitter, Github } from "lucide-react";

const PROJECT_TYPES = ["Photography", "Writing", "YouTube / Video", "Collaboration", "Other"];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", projectType: "Photography", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [note, setNote] = useState("");

  const socials = [
    { url: profile.youtubeUrl, label: "YouTube", icon: Youtube },
    { url: profile.instagramUrl, label: "Instagram", icon: Instagram },
    { url: profile.twitterUrl, label: "Twitter / X", icon: Twitter },
    { url: profile.githubUrl, label: "GitHub", icon: Github },
  ].filter((s) => s.url);

  function update<K extends keyof typeof form>(k: K, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function openMailto() {
    const subject = `New inquiry — ${form.projectType}${form.name ? ` from ${form.name}` : ""}`;
    const body = `From: ${form.name} <${form.email}>\nType: ${form.projectType}\n\n${form.message}`;
    const to = profile.email || "";
    window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.email || !form.message) return;
    setStatus("sending");
    setNote("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (json.ok) {
        setStatus("sent");
      } else if (json.fallback) {
        openMailto();
        setStatus("sent");
        setNote("Opening your email app to finish sending.");
      } else {
        setStatus("error");
        setNote(json.error || "Something went wrong.");
      }
    } catch {
      openMailto();
      setStatus("sent");
      setNote("Opening your email app to finish sending.");
    }
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            {profile.available && (
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm font-medium text-primary mb-6">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Currently available for work
              </span>
            )}
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Let&apos;s <span className="aero-text">work together</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {profile.pitch} Tell me about your project and I&apos;ll get back to you.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            {/* Form */}
            <Card className="md:col-span-3 glass border-0 rounded-2xl p-6 sm:p-8">
              {status === "sent" ? (
                <div className="text-center py-10">
                  <CheckCircle2 className="w-14 h-14 mx-auto text-emerald-500 mb-4" />
                  <h2 className="text-2xl font-bold mb-2">Thanks!</h2>
                  <p className="text-muted-foreground">{note || "Your message is on its way — I'll reply soon."}</p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <label className="block">
                      <span className="block text-sm font-medium mb-1.5">Name</span>
                      <input value={form.name} onChange={(e) => update("name", e.target.value)} className="w-full rounded-xl bg-white/70 border border-white/80 px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/40" />
                    </label>
                    <label className="block">
                      <span className="block text-sm font-medium mb-1.5">Email *</span>
                      <input type="email" required value={form.email} onChange={(e) => update("email", e.target.value)} className="w-full rounded-xl bg-white/70 border border-white/80 px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/40" />
                    </label>
                  </div>
                  <label className="block">
                    <span className="block text-sm font-medium mb-1.5">What's it for?</span>
                    <select value={form.projectType} onChange={(e) => update("projectType", e.target.value)} className="w-full rounded-xl bg-white/70 border border-white/80 px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/40">
                      {PROJECT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </label>
                  <label className="block">
                    <span className="block text-sm font-medium mb-1.5">Message *</span>
                    <textarea required rows={6} value={form.message} onChange={(e) => update("message", e.target.value)} placeholder="Tell me about your project, timeline, and budget…" className="w-full rounded-xl bg-white/70 border border-white/80 px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/40" />
                  </label>
                  {status === "error" && <p className="text-sm text-red-600">{note}</p>}
                  <Button type="submit" disabled={status === "sending"} className="glossy border-0 rounded-xl h-11 px-6">
                    {status === "sending" ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Send className="w-5 h-5 mr-2" />}
                    Send message
                  </Button>
                </form>
              )}
            </Card>

            {/* Direct contact */}
            <div className="md:col-span-2 space-y-4">
              <Card className="glass border-0 rounded-2xl p-6">
                <h3 className="font-bold mb-3">Prefer email?</h3>
                {profile.email ? (
                  <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 text-primary font-medium hover:underline break-all">
                    <Mail className="w-4 h-4 shrink-0" /> {profile.email}
                  </a>
                ) : (
                  <p className="text-sm text-muted-foreground">Email coming soon.</p>
                )}
              </Card>

              {socials.length > 0 && (
                <Card className="glass border-0 rounded-2xl p-6">
                  <h3 className="font-bold mb-3">Find me online</h3>
                  <div className="flex flex-wrap gap-2">
                    {socials.map((s) => {
                      const Icon = s.icon;
                      return (
                        <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/60 border border-white/70 text-sm font-medium hover:text-primary transition-colors">
                          <Icon className="w-4 h-4" /> {s.label}
                        </a>
                      );
                    })}
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
