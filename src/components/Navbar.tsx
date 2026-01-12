import { Link, useLocation } from "react-router-dom";
import { Film, User, LogOut, Shield, Ticket } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <Film className="w-6 h-6 text-primary" />
            </div>
            <span className="font-display text-2xl gold-text">CineMax</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === '/' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Movies
            </Link>
            {isAuthenticated && !isAdmin && (
              <Link 
                to="/my-bookings" 
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === '/my-bookings' ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                My Bookings
              </Link>
            )}
            {isAdmin && (
              <Link 
                to="/admin" 
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname.startsWith('/admin') ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                Admin Panel
              </Link>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary">
                  {isAdmin ? (
                    <Shield className="w-4 h-4 text-primary" />
                  ) : (
                    <User className="w-4 h-4 text-primary" />
                  )}
                  <span className="text-sm font-medium">{user?.name}</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={logout}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">Login</Button>
                </Link>
                <Link to="/register">
                  <Button size="sm" className="cinema-button">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
