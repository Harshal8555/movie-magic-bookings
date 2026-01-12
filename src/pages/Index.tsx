import { movies } from "@/data/movies";
import { MovieCard } from "@/components/MovieCard";
import { Navbar } from "@/components/Navbar";
import { Film, Sparkles, TrendingUp, Ticket } from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Now Showing</span>
            </div>
            
            <h1 className="font-display text-5xl md:text-7xl leading-tight mb-6">
              <span className="text-foreground">Experience Cinema</span>
              <br />
              <span className="gold-text">Like Never Before</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
              Book your favorite movies instantly. Select your seats, pick your showtime, 
              and enjoy the magic of the big screen.
            </p>

            {/* Stats */}
            <div className="flex justify-center gap-8 md:gap-16">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Film className="w-5 h-5 text-primary" />
                  <span className="font-display text-3xl text-foreground">{movies.length}+</span>
                </div>
                <p className="text-sm text-muted-foreground">Movies</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Ticket className="w-5 h-5 text-primary" />
                  <span className="font-display text-3xl text-foreground">10k+</span>
                </div>
                <p className="text-sm text-muted-foreground">Tickets</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <span className="font-display text-3xl text-foreground">4.9</span>
                </div>
                <p className="text-sm text-muted-foreground">Rating</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Movies Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-display text-3xl text-foreground">Now Showing</h2>
              <p className="text-muted-foreground mt-1">Book your tickets for the latest releases</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Film className="w-5 h-5 text-primary" />
              <span className="font-display text-xl gold-text">CineMax</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 CineMax. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
