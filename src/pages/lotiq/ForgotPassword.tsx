import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { KeyRound } from "lucide-react";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/forgot-password/verify", { state: { email } });
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--lotiq-navy))] flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-card rounded-2xl p-6 md:p-8 shadow-2xl flex flex-col min-h-[70vh]">
        <h1 className="text-xl font-bold text-foreground text-center mb-6">Forgot Password</h1>

        {/* Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center">
            <KeyRound className="h-6 w-6 text-muted-foreground" />
          </div>
        </div>

        <form onSubmit={handleReset} className="flex flex-col flex-1">
          <div className="space-y-1.5 mb-4">
            <Label className="text-xs text-foreground">
              Email <span className="text-destructive">*</span>
            </Label>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 bg-background border-border"
            />
          </div>

          {/* Links */}
          <div className="flex justify-between items-center mb-4">
            <button type="button" onClick={() => navigate("/login")} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              ← Back to login
            </button>
            <p className="text-xs text-muted-foreground">
              Doesn't have an account?{" "}
              <button type="button" className="text-[hsl(var(--lotiq-blue))] font-medium">Signup</button>
            </p>
          </div>

          {/* Social Divider */}
          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-card px-3 text-muted-foreground">or Login with</span>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center gap-5 mb-auto">
            {[
              { label: "Google", color: "text-[#DB4437]", icon: "G" },
              { label: "Facebook", color: "text-[#4267B2]", icon: "f" },
              { label: "Apple", color: "text-foreground", icon: "" },
              { label: "Twitter", color: "text-[#1DA1F2]", icon: "𝕏" },
            ].map((p) => (
              <button
                key={p.label}
                type="button"
                className={`w-10 h-10 rounded-full border border-border flex items-center justify-center ${p.color} hover:bg-muted transition-colors text-lg font-bold`}
                aria-label={`Login with ${p.label}`}
              >
                {p.icon}
              </button>
            ))}
          </div>

          <Button
            type="submit"
            className="w-full h-12 rounded-xl bg-[hsl(var(--lotiq-blue))] hover:bg-[hsl(var(--lotiq-blue-light))] text-white font-semibold text-base mt-6"
          >
            Reset Password
          </Button>
        </form>
      </div>
    </div>
  );
}
