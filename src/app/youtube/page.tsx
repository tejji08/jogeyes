"use client"

import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Guitar, Youtube, ExternalLink } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { videos, Video } from "@/data/videos";
import MotionWrapper from "@/components/MotionWrapper";
import ImageWithPlaceholder from "@/components/ImageWithPlaceholder";

const CHANNEL_URL = "https://www.youtube.com/@Jogeyes";

export default function YouTubePage() {
  const [selectedVideo, setSelectedVideo] = useState<string>(videos[0]?.id ?? "");
  const [shouldLoadIframe, setShouldLoadIframe] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // videos are imported from src/data/videos.ts (backed by videos.json) for easy editing
  const current = videos.find((v) => v.id === selectedVideo);
  const embedId = (current?.youtubeId || "").trim();

  function handleSelect(id: string) {
    setSelectedVideo(id);
    setShouldLoadIframe(true);
    setIsLoading(true);
  }

  // group videos by group and then subcategory
  const grouped = videos.reduce((acc: Record<string, Record<string, Video[]>>, v) => {
    const g = v.group || "other";
    const s = v.subcategory || "general";
    acc[g] = acc[g] || {};
    acc[g][s] = acc[g][s] || [];
    acc[g][s].push(v);
    return acc;
  }, {} as Record<string, Record<string, Video[]>>);

  const groups = Object.keys(grouped);
  const [activeGroup, setActiveGroup] = useState<string>(groups[0] || "all");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const hasVideos = videos.length > 0;

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-8 pt-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="grid place-items-center w-12 h-12 rounded-2xl glossy">
                  <Guitar className="w-6 h-6" />
                </span>
                <h1 className="text-4xl sm:text-5xl font-bold">
                  <span className="aero-text">YouTube</span>
                </h1>
              </div>
              <p className="text-lg text-muted-foreground">
                Guitar covers and gaming runs.
              </p>
            </div>
            <Button asChild className="glossy border-0 rounded-xl h-11 px-5 shrink-0">
              <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer">
                <Youtube className="w-5 h-5 mr-2" />
                Visit @Jogeyes
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </div>

          {!hasVideos ? (
            /* Empty state — ready for videos to be added */
            <Card className="glass border-0 rounded-2xl p-10 sm:p-16 text-center pat pat-burst overflow-hidden">
              <svg viewBox="0 0 160 120" className="w-40 h-auto mx-auto mb-5 text-primary" fill="none" stroke="currentColor" strokeWidth="4" aria-hidden="true">
                <rect x="20" y="34" width="120" height="76" rx="10" />
                <path d="M60 34 L46 14" />
                <path d="M100 34 L114 14" />
                <circle cx="46" cy="12" r="4" fill="currentColor" stroke="none" />
                <circle cx="114" cy="12" r="4" fill="currentColor" stroke="none" />
                <path d="M70 56 L96 72 L70 88 Z" fill="currentColor" stroke="none" />
              </svg>
              <h2 className="text-2xl font-bold mb-2">Videos coming soon</h2>
              <p className="text-muted-foreground max-w-md mx-auto mb-7">
                Guitar covers and gaming runs will live here. In the meantime, head to the channel
                to watch the latest.
              </p>
              <Button asChild size="lg" className="glossy border-0 rounded-xl">
                <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer">
                  <Youtube className="w-5 h-5 mr-2" />
                  Watch on YouTube
                </a>
              </Button>
            </Card>
          ) : (
            <>
              {/* Featured Video Player */}
              <div className="mb-12">
                <Card className="relative overflow-hidden glass border-0 rounded-2xl">
                  <div className="aspect-video bg-black rounded-2xl overflow-hidden">
                    {shouldLoadIframe && embedId ? (
                      <>
                        {isLoading && (
                          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40">
                            <Spinner className="w-12 h-12 text-wood-accent" />
                          </div>
                        )}
                        <iframe
                          width="100%"
                          height="100%"
                          src={`https://www.youtube-nocookie.com/embed/${embedId}`}
                          title={current ? `YouTube video player — ${current.title}` : "YouTube video player"}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          loading="lazy"
                          onLoad={() => setIsLoading(false)}
                          className="w-full h-full"
                        />
                      </>
                    ) : shouldLoadIframe && !embedId ? (
                      <div className="w-full h-full flex flex-col items-center justify-center text-center text-white/90 gap-2 px-6">
                        <p className="font-medium">No YouTube link yet for “{current?.title}”.</p>
                        <p className="text-sm text-white/70">Add its YouTube ID in the <a href="/studio" className="underline">studio</a> to make it playable.</p>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setShouldLoadIframe(true);
                          setIsLoading(true);
                        }}
                        aria-label={current ? `Play ${current.title}` : "Play video"}
                        className="w-full h-full"
                      >
                        {current ? (
                          <ImageWithPlaceholder src={current.thumbnail} alt={current.title} className="w-full h-full" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-white">No preview</div>
                        )}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="glossy rounded-full p-4">
                            <Play className="w-8 h-8" />
                          </div>
                        </div>
                      </button>
                    )}
                  </div>
                </Card>
              </div>

              {/* Video Groups */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Videos by category</h2>
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-4">
                    {groups.map((g) => (
                      <button
                        key={g}
                        onClick={() => setActiveGroup(g)}
                        className={`px-4 py-1.5 rounded-xl text-sm font-medium capitalize transition-all ${g === activeGroup ? 'glossy' : 'bg-white/55 text-muted-foreground hover:text-foreground'}`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>

                  <MotionWrapper>
                    <div className="space-y-8">
                      {Object.entries(grouped)
                        .filter(([group]) => group === activeGroup)
                        .map(([group, subs]) => (
                          <section key={group}>
                            {Object.entries(subs).map(([sub, items]) => {
                              const key = `${group}:${sub}`;
                              const isExpanded = !!expanded[key];
                              const visible = isExpanded ? items : items.slice(0, 4);
                              return (
                                <div key={sub} className="mb-6">
                                  <h4 className="text-lg font-medium mb-3 capitalize">{sub.replace(/-/g, ' ')}</h4>
                                  <div className="space-y-4">
                                    {visible.map((video) => (
                                      <Card
                                        key={video.id}
                                        className="flex items-start gap-4 p-4 glass border-0 rounded-2xl hover:shadow-lg transition-all min-h-[7rem]"
                                        role="button"
                                        tabIndex={0}
                                        onClick={() => handleSelect(video.id)}
                                        onKeyDown={(e: React.KeyboardEvent) => {
                                          if (e.key === "Enter" || e.key === " ") {
                                            e.preventDefault();
                                            handleSelect(video.id);
                                          }
                                        }}
                                        aria-label={`Play ${video.title}`}
                                      >
                                        <div className="w-48 h-28 relative rounded-xl flex-shrink-0 overflow-hidden">
                                          <ImageWithPlaceholder src={video.thumbnail} alt={video.title} />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between">
                                          <div className="flex items-start justify-between gap-4">
                                            <h3 className="font-semibold text-lg pr-4">{video.title}</h3>
                                            <div className="text-sm text-muted-foreground whitespace-nowrap">{[video.views, video.date].filter(Boolean).join(" • ")}</div>
                                          </div>
                                          <p className="text-muted-foreground mt-2 line-clamp-2">{video.description}</p>
                                          <div className="mt-3 flex items-center gap-3">
                                            <button
                                              onClick={(ev) => {
                                                ev.stopPropagation();
                                                handleSelect(video.id);
                                              }}
                                              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl glossy text-sm"
                                            >
                                              <Play className="w-4 h-4" /> Play
                                            </button>
                                          </div>
                                        </div>
                                      </Card>
                                    ))}
                                  </div>
                                  {items.length > 4 && (
                                    <div className="mt-3">
                                      <button
                                        onClick={() => setExpanded((s) => ({ ...s, [key]: !s[key] }))}
                                        className="px-3 py-2 rounded-xl bg-white/55 text-sm font-medium"
                                      >
                                        {isExpanded ? 'Show less' : `Show all ${items.length}`}
                                      </button>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </section>
                        ))}
                    </div>
                  </MotionWrapper>
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
