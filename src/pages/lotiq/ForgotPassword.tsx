import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, KeyRound } from "lucide-react";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/forgot-password/verify", { state: { email } });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-lg mx-auto">
      <div className="w-full flex-1 px-6 pt-6 pb-6 flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={() => navigate("/login")}
            className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center shadow-subtle hover:bg-accent transition-colors"
          >
            <ArrowLeft className="h-4 w-4 text-foreground" />
          </button>
          <h1 className="text-xl font-semibold tracking-tight text-foreground">Forgot Password</h1>
        </div>

        {/* Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center shadow-card">
            <KeyRound className="h-6 w-6 text-muted-foreground" />
          </div>
        </div>

        <form onSubmit={handleReset} className="flex flex-col flex-1">
          <div className="space-y-2 mb-4">
            <Label className="text-xs font-medium text-muted-foreground">
              Email <span className="text-destructive">*</span>
            </Label>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 rounded-lg bg-card border-border shadow-subtle transition-shadow focus-visible:shadow-elevated"
            />
          </div>

          {/* Links */}
          <div className="flex justify-between items-center mb-4">
            <button type="button" onClick={() => navigate("/login")} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              ← Back to login
            </button>
            <p className="text-xs text-muted-foreground">
              Don't have an account?{" "}
              <button type="button" onClick={() => navigate("/signup")} className="text-primary font-semibold">Sign Up</button>
            </p>
          </div>

          {/* Social Divider */}
          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-background px-3 text-muted-foreground">or Login with</span>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center gap-4 mb-auto">
            {[
              { label: "Google", color: "text-[#DB4437]", icon: "G" },
              { label: "Facebook", color: "text-[#4267B2]", icon: "f" },
              { label: "Apple", color: "text-foreground", icon: "" },
              { label: "Twitter", color: "text-foreground", icon: "𝕏" },
            ].map((p) => (
              <button
                key={p.label}
                type="button"
                className={`w-11 h-11 rounded-xl border border-border bg-card flex items-center justify-center ${p.color} hover:bg-secondary transition-colors text-lg font-semibold shadow-subtle`}
                aria-label={`Login with ${p.label}`}
              >
                {p.label === "Apple" ? (
                  <svg className="h-5 w-5 text-foreground" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
                ) : p.icon}
              </button>
            ))}
          </div>

          <Button
            type="submit"
            className="w-full h-12 rounded-xl font-semibold text-base mt-6 shadow-elevated hover:shadow-float transition-all"
          >
            Reset Password
          </Button>
        </form>
      </div>
    </div>
  );
}
