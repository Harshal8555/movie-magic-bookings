import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Film, Mail, Lock, Shield, AlertCircle } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const success = await login(email, password, true);
    
    if (success) {
      navigate("/admin");
    } else {
      setError("Invalid admin credentials");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 bg-background">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="p-3 rounded-xl bg-primary/10">
              <Film className="w-8 h-8 text-primary" />
            </div>
            <span className="font-display text-3xl gold-text">CineMax</span>
          </Link>
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10">
            <Shield className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-primary">Admin Portal</span>
          </div>
          <h1 className="font-display text-4xl mt-4 text-foreground">Admin Login</h1>
          <p className="text-muted-foreground mt-2">Access the management dashboard</p>
        </div>

        {/* Login Form */}
        <div className="cinema-card p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive">
                <AlertCircle className="w-5 h-5" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Admin Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="cinema-input pl-11"
                  placeholder="Enter admin email"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="cinema-input pl-11"
                  placeholder="Enter password"
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full cinema-button"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Access Dashboard"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link 
              to="/login" 
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              ← Back to User Login
            </Link>
          </div>

          {/* Demo credentials */}
          <div className="mt-6 p-4 rounded-lg bg-secondary/50 border border-border">
            <p className="text-xs text-muted-foreground text-center mb-2">Demo Admin Credentials</p>
            <p className="text-xs text-center text-foreground">admin@cinema.com / admin123</p>
          </div>
        </div>
      </div>
    </div>
  );
}
