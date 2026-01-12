import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Upload, Film, DollarSign, Clock, Tag, FileText, AlertCircle, CheckCircle } from "lucide-react";

export default function AddMovie() {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("PG-13");
  const [imageUrl, setImageUrl] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !genre || !duration || !price) {
      setError("Please fill in all required fields");
      return;
    }

    // In a real app, this would save to database
    setSuccess(true);
    setTimeout(() => {
      navigate('/admin');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-2xl">
          {/* Header */}
          <button 
            onClick={() => navigate('/admin')} 
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>

          <div className="mb-8">
            <h1 className="font-display text-4xl text-foreground">Add New Movie</h1>
            <p className="text-muted-foreground mt-2">Fill in the movie details below</p>
          </div>

          {success ? (
            <div className="cinema-card p-8 text-center animate-fade-in">
              <div className="w-20 h-20 mx-auto rounded-full bg-green-500/20 flex items-center justify-center mb-6">
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
              <h2 className="font-display text-2xl mb-2">Movie Added Successfully!</h2>
              <p className="text-muted-foreground">Redirecting to dashboard...</p>
            </div>
          ) : (
            <div className="cinema-card p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive">
                    <AlertCircle className="w-5 h-5" />
                    <span className="text-sm">{error}</span>
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Movie Title *</label>
                  <div className="relative">
                    <Film className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="cinema-input pl-11"
                      placeholder="Enter movie title"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Description *</label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="cinema-input pl-11 min-h-[100px] resize-none"
                      placeholder="Enter movie description"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Genre *</label>
                    <div className="relative">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <select
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        className="cinema-input pl-11"
                      >
                        <option value="">Select genre</option>
                        <option value="Action">Action</option>
                        <option value="Drama">Drama</option>
                        <option value="Sci-Fi">Sci-Fi</option>
                        <option value="Comedy">Comedy</option>
                        <option value="Horror">Horror</option>
                        <option value="Romance">Romance</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Duration *</label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="text"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="cinema-input pl-11"
                        placeholder="e.g., 2h 30m"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Ticket Price *</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="cinema-input pl-11"
                        placeholder="15"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Rating</label>
                    <select
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                      className="cinema-input"
                    >
                      <option value="G">G</option>
                      <option value="PG">PG</option>
                      <option value="PG-13">PG-13</option>
                      <option value="R">R</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Poster Image URL</label>
                  <div className="relative">
                    <Upload className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="url"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      className="cinema-input pl-11"
                      placeholder="https://example.com/poster.jpg"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Enter a URL for the movie poster image</p>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button 
                    type="button" 
                    variant="ghost" 
                    onClick={() => navigate('/admin')}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1 cinema-button">
                    Add Movie
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
