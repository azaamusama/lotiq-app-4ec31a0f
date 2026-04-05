import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export default function PasswordChanged() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-lg mx-auto">
      <div className="w-full flex-1 px-6 pt-6 pb-6 flex flex-col items-center">
        {/* Success Icon */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 shadow-card">
            <CheckCircle2 className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-xl font-semibold tracking-tight text-foreground mb-2">Password Changed</h1>
          <p className="text-sm text-muted-foreground">Your password has been updated!</p>
        </div>

        <Button
          className="w-full h-12 rounded-xl font-semibold text-base shadow-elevated hover:shadow-float transition-all"
          onClick={() => navigate("/login")}
        >
          Log In
        </Button>
      </div>
    </div>
  );
}
