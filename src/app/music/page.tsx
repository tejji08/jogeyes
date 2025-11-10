"use client"

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, Music2, Calendar, Clock, Guitar } from "lucide-react";
import { useState } from "react";
import { tracks } from "@/data/music";
import ImageWithPlaceholder from "@/components/ImageWithPlaceholder";

export default function MusicPage() {
  const [playingTrack, setPlayingTrack] = useState<string | null>(null);

  const togglePlay = (trackId: string) => {
    if (playingTrack === trackId) {
      setPlayingTrack(null);
    } else {
      setPlayingTrack(trackId);
    }
  };

  // Group tracks by genre
  const groupedTracks = tracks.reduce((acc, track) => {
    if (!acc[track.genre]) {
      acc[track.genre] = [];
    }
    acc[track.genre].push(track);
    return acc;
  }, {} as Record<string, typeof tracks>);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Guitar className="w-10 h-10 text-wood-accent" />
              <h1 className="text-4xl sm:text-5xl font-bold">Original Guitar Music</h1>
            </div>
            <p className="text-xl text-muted-foreground">
              Listen to my latest guitar compositions and tracks, organized by genre
            </p>
          </div>

          <div className="space-y-12">
            {Object.entries(groupedTracks).map(([genre, genreTracks]) => (
              <div key={genre} className="space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b-2 border-wood-accent/30">
                  <Music2 className="w-6 h-6 text-wood-accent" />
                  <h2 className="text-2xl font-bold text-wood-accent">{genre}</h2>
                  <span className="text-sm text-muted-foreground">({genreTracks.length} {genreTracks.length === 1 ? 'track' : 'tracks'})</span>
                </div>
                
                <div className="space-y-3">
                  {genreTracks.map((track) => (
                    <Card key={track.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 border-2 hover:border-wood-accent group bg-card/50 wood-texture">
                      <div className="flex flex-col sm:flex-row gap-4 p-4">
                        <div className="relative w-full sm:w-32 aspect-square overflow-hidden rounded-lg bg-gradient-to-br from-wood-accent/20 to-wood-light/20 flex-shrink-0">
                          <ImageWithPlaceholder src={track.coverArt} alt={track.title} className="w-full h-full group-hover:scale-110 transition-transform duration-300" />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              size="sm"
                              className="rounded-full h-12 w-12 bg-wood-accent hover:bg-wood-accent/90 text-wood-dark"
                              onClick={() => togglePlay(track.id)}
                            >
                              {playingTrack === track.id ? (
                                <Pause className="w-5 h-5" />
                              ) : (
                                <Play className="w-5 h-5 ml-0.5" />
                              )}
                            </Button>
                          </div>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-xl mb-2 group-hover:text-wood-accent transition-colors">
                            {track.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            {track.description}
                          </p>
                          
                          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>{new Date(track.releaseDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{track.duration}</span>
                            </div>
                          </div>
                          
                          {playingTrack === track.id && (
                            <div className="mt-4">
                              <audio
                                controls
                                autoPlay
                                className="w-full"
                                src={track.audioUrl}
                                onEnded={() => setPlayingTrack(null)}
                              >
                                Your browser does not support the audio element.
                              </audio>
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}