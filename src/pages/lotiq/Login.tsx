import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, ScanFace, Shield } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-lg mx-auto">
      {/* Top section with logo */}
      <div className="flex flex-col items-center pt-16 pb-8 px-6">
        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 shadow-card">
          <Shield className="h-7 w-7 text-primary" />
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Lot<span className="text-primary">IQ</span>
        </h1>
        <p className="text-sm text-muted-foreground mt-1.5">Sign in to your account</p>
      </div>

      {/* Form */}
      <form onSubmit={handleLogin} className="flex-1 px-6 flex flex-col">
        <div className="flex-1 space-y-5">
          {/* Email */}
          <div className="space-y-2">
            <Label className="text-xs font-medium text-muted-foreground">Email <span className="text-destructive">*</span></Label>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 rounded-lg bg-card border-border shadow-subtle transition-shadow focus-visible:shadow-elevated"
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label className="text-xs font-medium text-muted-foreground">Password <span className="text-destructive">*</span></Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 rounded-lg bg-card border-border pr-10 shadow-subtle transition-shadow focus-visible:shadow-elevated"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                className="text-xs text-primary font-medium hover:underline transition-colors"
              >
                Forgot Password?
              </button>
            </div>
          </div>

          {/* FaceID */}
          <div className="flex flex-col items-center py-2">
            <button
              type="button"
              className="flex flex-col items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center shadow-subtle">
                <ScanFace className="h-6 w-6" />
              </div>
              <span className="text-[10px] font-medium">FaceID Login</span>
            </button>
          </div>

          {/* Social Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-background px-3 text-muted-foreground">or Login with</span>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center gap-4">
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
        </div>

        {/* Login Button - pinned to bottom */}
        <div className="shrink-0 pt-4 pb-6">
          <Button
            type="submit"
            className="w-full h-12 rounded-xl font-semibold text-base shadow-elevated hover:shadow-float transition-all"
          >
            Log In
          </Button>

          <p className="text-center text-sm text-muted-foreground mt-4">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="text-primary font-semibold hover:underline"
            >
              Sign Up
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}
