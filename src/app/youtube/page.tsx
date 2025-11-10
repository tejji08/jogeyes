"use client"

import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Play, Guitar } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { videos, Video } from "@/data/videos";
import MotionWrapper from "@/components/MotionWrapper";
import ImageWithPlaceholder from "@/components/ImageWithPlaceholder";

export default function YouTubePage() {
  const [selectedVideo, setSelectedVideo] = useState<string>("dQw4w9WgXcQ");
  const [shouldLoadIframe, setShouldLoadIframe] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // videos are imported from src/data/videos.ts for easy editing

  const current = videos.find((v) => v.id === selectedVideo);

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

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Guitar className="w-10 h-10 text-wood-accent" />
              <h1 className="text-4xl sm:text-5xl font-bold">YouTube Channel</h1>
            </div>
            <p className="text-xl text-muted-foreground">
              Watch my latest guitar covers, original music, and creative content
            </p>
          </div>

          {/* Featured Video Player */}
          <div className="mb-12">
            <Card className="relative overflow-hidden bg-card/50 wood-texture border-2 border-wood-accent/30">
              <div className="aspect-video bg-black">
                {shouldLoadIframe ? (
                  <>
                    {isLoading && (
                      <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40">
                        <Spinner className="w-12 h-12 text-wood-accent" />
                      </div>
                    )}
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube-nocookie.com/embed/${selectedVideo}`}
                      title={current ? `YouTube video player — ${current.title}` : "YouTube video player"}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                      onLoad={() => setIsLoading(false)}
                      className="w-full h-full"
                    />
                  </>
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
                      <div className="bg-wood-accent rounded-full p-4">
                        <Play className="w-8 h-8 text-wood-dark fill-wood-dark" />
                      </div>
                    </div>
                  </button>
                )}
              </div>
            </Card>
          </div>

          {/* Video Groups */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Videos by Category</h2>
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                {groups.map((g) => (
                  <button key={g} onClick={() => setActiveGroup(g)} className={`px-3 py-1 rounded ${g === activeGroup ? 'bg-wood-accent text-wood-dark' : 'bg-card/30'}`}>
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
                        <h3 className="text-xl font-semibold mb-3 capitalize">{group}</h3>
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
                                    className="flex items-start gap-4 p-4 bg-card/50 wood-texture border-2 hover:shadow-lg transition-all min-h-[7rem]"
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
                                    <div className="w-48 h-28 relative rounded-md flex-shrink-0 overflow-hidden">
                                      <ImageWithPlaceholder src={video.thumbnail} alt={video.title} />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between">
                                      <div className="flex items-start justify-between gap-4">
                                        <h3 className="font-semibold text-lg pr-4">{video.title}</h3>
                                        <div className="text-sm text-muted-foreground whitespace-nowrap">{video.views} • {video.date}</div>
                                      </div>
                                      <p className="text-muted-foreground mt-2 line-clamp-2">{video.description}</p>
                                      <div className="mt-3 flex items-center gap-3">
                                        <button
                                          onClick={(ev) => {
                                            ev.stopPropagation();
                                            handleSelect(video.id);
                                          }}
                                          className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-wood-accent text-wood-dark hover:bg-wood-accent/90 transition-all"
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
                                    className="px-3 py-2 rounded bg-card/30"
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
        </div>
      </main>

      <Footer />
    </div>
  );
}