import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate("/login", { replace: true }), 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[hsl(var(--lotiq-navy))] flex flex-col items-center justify-center">
      <div className="animate-pulse flex flex-col items-center gap-4">
        {/* Logo icon */}
        <div className="w-24 h-24 rounded-2xl bg-[hsl(var(--lotiq-emerald))]/10 flex items-center justify-center">
          <div className="w-16 h-16 rounded-xl bg-[hsl(var(--lotiq-emerald))] flex items-center justify-center">
            <span className="text-white font-bold text-3xl">L</span>
          </div>
        </div>
        {/* Brand name */}
        <h1 className="text-3xl font-bold text-white">
          Lot <span className="text-[hsl(var(--lotiq-emerald))]">IQ</span>
        </h1>
      </div>
    </div>
  );
}
