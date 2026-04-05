import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Shield } from "lucide-react";

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate("/login", { replace: true }), 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center">
      <div className="animate-fade-in flex flex-col items-center gap-5">
        <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center shadow-elevated">
          <Shield className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Lot<span className="text-primary">IQ</span>
        </h1>
        <p className="text-sm text-muted-foreground">Intelligent property monitoring</p>
      </div>
    </div>
  );
}
