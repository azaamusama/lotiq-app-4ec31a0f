import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export default function PasswordChanged() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[hsl(var(--lotiq-navy))] flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-card rounded-2xl p-6 md:p-8 shadow-2xl flex flex-col items-center min-h-[70vh]">
        {/* Success Icon */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-[hsl(var(--lotiq-emerald))]/10 flex items-center justify-center mb-6">
            <CheckCircle2 className="h-8 w-8 text-[hsl(var(--lotiq-emerald))]" />
          </div>
          <h1 className="text-xl font-bold text-foreground mb-2">Password Changed</h1>
          <p className="text-sm text-muted-foreground">Your password has been updated!</p>
        </div>

        <Button
          className="w-full h-12 rounded-xl bg-[hsl(var(--lotiq-blue))] hover:bg-[hsl(var(--lotiq-blue-light))] text-white font-semibold text-base"
          onClick={() => navigate("/login")}
        >
          Log In
        </Button>
      </div>
    </div>
  );
}
