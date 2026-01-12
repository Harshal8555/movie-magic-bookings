import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { movies as initialMovies } from "@/data/movies";
import { Movie } from "@/types/movie";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { 
  Film, 
  Plus, 
  Edit, 
  Trash2, 
  Users, 
  Ticket, 
  TrendingUp,
  LayoutDashboard
} from "lucide-react";

export default function AdminDashboard() {
  const { isAdmin } = useAuth();
  const [movies, setMovies] = useState<Movie[]>(initialMovies);

  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  const stats = [
    { label: "Total Movies", value: movies.length, icon: Film, color: "text-primary" },
    { label: "Active Users", value: 156, icon: Users, color: "text-green-500" },
    { label: "Tickets Sold", value: "2.4k", icon: Ticket, color: "text-blue-500" },
    { label: "Revenue", value: "$48.5k", icon: TrendingUp, color: "text-purple-500" },
  ];

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this movie?")) {
      setMovies(movies.filter(m => m.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <LayoutDashboard className="w-6 h-6 text-primary" />
                <h1 className="font-display text-4xl text-foreground">Admin Dashboard</h1>
              </div>
              <p className="text-muted-foreground">Manage your cinema content</p>
            </div>
            <Link to="/admin/add-movie">
              <Button className="cinema-button">
                <Plus className="w-4 h-4 mr-2" />
                Add New Movie
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {stats.map((stat) => (
              <div key={stat.label} className="cinema-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <p className="font-display text-3xl text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Movie List */}
          <div className="cinema-card overflow-hidden">
            <div className="p-6 border-b border-border">
              <h2 className="font-display text-2xl text-foreground">Movie Catalog</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Movie</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Genre</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Duration</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Price</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {movies.map((movie) => (
                    <tr key={movie.id} className="border-b border-border hover:bg-secondary/30 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img 
                            src={movie.image} 
                            alt={movie.title}
                            className="w-12 h-16 rounded-lg object-cover"
                          />
                          <div>
                            <p className="font-medium text-foreground">{movie.title}</p>
                            <p className="text-xs text-muted-foreground">{movie.rating}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-muted-foreground">{movie.genre}</td>
                      <td className="p-4 text-muted-foreground">{movie.duration}</td>
                      <td className="p-4">
                        <span className="text-primary font-medium">${movie.price}</span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleDelete(movie.id)}
                            className="text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
