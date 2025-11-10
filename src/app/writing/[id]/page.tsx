"use client"

import { useParams, useRouter } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Calendar, ExternalLink, Award, Trophy } from "lucide-react";
import { posts, Post, PostTag } from "@/data/writing";
import CommentBox from "@/components/CommentBox";
import MotionWrapper from "@/components/MotionWrapper";

export default function WritingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const piece = posts.find((p) => p.id === id) as (Post & Partial<Record<string, any>>) | undefined;

  if (!piece) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold mb-4">Writing Piece Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The writing piece you're looking for doesn't exist.
            </p>
            <Button onClick={() => router.push("/writing")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Writing
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const getTagColor = (tag: PostTag) => {
    switch (tag) {
      case "poetry":
        return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20";
      case "story":
        return "bg-purple-500/10 text-purple-500 hover:bg-purple-500/20";
      case "experimental":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20";
      default:
        return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20";
    }
  };

  // Content fallback: older entries use `content`, newer pages used `fullContent`.
  const content = (piece as any).fullContent ?? piece.content ?? piece.excerpt ?? '';

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          {/* Back Button */}
          <Button 
            variant="ghost" 
            onClick={() => router.push("/writing")}
            className="mb-8 hover:text-wood-accent"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Writing
          </Button>

          {/* Main Content Card */}
          <Card className="p-8 sm:p-12 wood-texture border-2 border-wood-accent/30">
            {/* Header Section */}
            <div className="mb-8">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Badge className={getTagColor(piece.tag)}>
                  {piece.tag}
                </Badge>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">
                    {new Date(piece.date).toLocaleDateString('en-US', { 
                      month: 'long', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </span>
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-wood-accent">
                {piece.title}
              </h1>

              {/* Longer excerpt shown on detail page (was removed from card) */}
              {piece.excerpt && (
                <div className="mb-6">
                  <p className="prose prose-invert prose-sm sm:prose-base lg:prose-lg text-muted-foreground m-0">{piece.excerpt}</p>
                </div>
              )}

              {/* Platform */}
              {piece.platform && (
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-sm font-medium text-muted-foreground">
                    Published on:
                  </span>
                  {piece.platformUrl ? (
                    <a 
                      href={piece.platformUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-wood-accent hover:underline flex items-center gap-1"
                    >
                      {piece.platform}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <span className="text-sm font-medium text-wood-accent">
                      {piece.platform}
                    </span>
                  )}
                </div>
              )}

              {/* Description */}
              {piece.description && (
                <div className="bg-wood-light/30 p-6 rounded-lg mb-6 border border-wood-accent/20">
                  <h2 className="text-sm font-semibold uppercase tracking-wide text-wood-accent mb-2">
                    About This Piece
                  </h2>
                  <p className="text-foreground/90 leading-relaxed">
                    {piece.description}
                  </p>
                </div>
              )}

              {/* Contests */}
              {piece.contests && piece.contests.length > 0 && (
                <div className="bg-wood-light/30 p-6 rounded-lg border border-wood-accent/20">
                  <div className="flex items-center gap-2 mb-3">
                    <Trophy className="w-5 h-5 text-wood-accent" />
                    <h2 className="text-sm font-semibold uppercase tracking-wide text-wood-accent">
                      Contest Submissions
                    </h2>
                  </div>
                  <ul className="space-y-2">
                    {piece.contests.map((contest, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Award className="w-4 h-4 text-wood-accent mt-1 flex-shrink-0" />
                        <div>
                          <span className="text-foreground font-medium">
                            {contest.name}
                          </span>
                          {contest.award && (
                            <span className="ml-2 text-wood-accent font-semibold">
                              • {contest.award}
                            </span>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="border-t-2 border-wood-accent/30 my-8" />

            {/* Full Content */}
            <article className="prose prose-invert prose-sm sm:prose-base lg:prose-lg max-w-none">
              <div className="whitespace-pre-wrap text-foreground/90 leading-relaxed">
                {content}
              </div>
            </article>
          </Card>

          {/* Comments */}
          <div className="mt-8">
            <CommentBox id={piece.id} />
          </div>

          {/* Bottom Navigation */}
          <div className="mt-8 flex justify-center">
            <Button 
              onClick={() => router.push("/writing")}
              size="lg"
              className="bg-wood-accent hover:bg-wood-accent/90 text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to All Writing
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
