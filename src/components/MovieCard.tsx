import { Movie } from "@/types/movie";
import { Link } from "react-router-dom";
import { Clock, Star, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <div className="cinema-card group">
      {/* Movie Poster */}
      <div className="relative aspect-[2/3] overflow-hidden">
        <img 
          src={movie.image} 
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <Link to={`/book/${movie.id}`}>
              <Button className="w-full cinema-button">
                <Ticket className="w-4 h-4 mr-2" />
                Book Now
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Rating Badge */}
        <div className="absolute top-3 right-3 px-2 py-1 rounded-md bg-primary/90 backdrop-blur-sm">
          <span className="text-xs font-bold text-primary-foreground">{movie.rating}</span>
        </div>
        
        {/* Genre Badge */}
        <div className="absolute top-3 left-3 px-2 py-1 rounded-md bg-black/60 backdrop-blur-sm">
          <span className="text-xs font-medium text-foreground">{movie.genre}</span>
        </div>
      </div>

      {/* Movie Info */}
      <div className="p-4 space-y-3">
        <h3 className="font-display text-xl text-foreground truncate">{movie.title}</h3>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{movie.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-primary fill-primary" />
            <span>4.8</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">{movie.description}</p>

        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div>
            <span className="text-xs text-muted-foreground">From</span>
            <p className="font-display text-xl text-primary">${movie.price}</p>
          </div>
          <Link to={`/book/${movie.id}`} className="md:hidden">
            <Button size="sm" className="cinema-button">
              Book
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
