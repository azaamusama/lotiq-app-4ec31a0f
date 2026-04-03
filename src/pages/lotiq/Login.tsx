import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, ScanFace } from "lucide-react";

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
    <div className="min-h-screen bg-[hsl(var(--lotiq-navy))] flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-card rounded-2xl p-6 md:p-8 shadow-2xl">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-[hsl(var(--lotiq-emerald))]/10 flex items-center justify-center mb-3">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[hsl(var(--lotiq-emerald))] flex items-center justify-center">
              <span className="text-white font-bold text-lg md:text-xl">L</span>
            </div>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-foreground">
            Lot <span className="text-[hsl(var(--lotiq-emerald))]">IQ</span>
          </h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <div className="space-y-1.5">
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

          {/* Password */}
          <div className="space-y-1.5">
            <Label className="text-xs text-foreground">
              Password <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 bg-background border-border pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <div className="flex justify-end">
              <button type="button" onClick={() => navigate("/forgot-password")} className="text-xs text-muted-foreground hover:text-primary transition-colors">
                Forgot Password?
              </button>
            </div>
          </div>

          {/* FaceID */}
          <div className="flex flex-col items-center py-2">
            <button type="button" className="flex flex-col items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors">
              <ScanFace className="h-8 w-8" />
              <span className="text-xs">FaceID Login</span>
            </button>
          </div>

          {/* Social Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-card px-3 text-muted-foreground">or Login with</span>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center gap-5">
            {[
              { label: "Google", color: "text-[#DB4437]", icon: "G" },
              { label: "Facebook", color: "text-[#4267B2]", icon: "f" },
              { label: "Apple", color: "text-foreground", icon: "" },
              { label: "Twitter", color: "text-[#1DA1F2]", icon: "𝕏" },
            ].map((provider) => (
              <button
                key={provider.label}
                type="button"
                className={`w-10 h-10 rounded-full border border-border flex items-center justify-center ${provider.color} hover:bg-muted transition-colors text-lg font-bold`}
                aria-label={`Login with ${provider.label}`}
              >
                {provider.icon}
              </button>
            ))}
          </div>

          {/* Login Button */}
          <Button
            type="submit"
            className="w-full h-12 rounded-xl bg-[hsl(var(--lotiq-blue))] hover:bg-[hsl(var(--lotiq-blue-light))] text-white font-semibold text-base mt-4"
          >
            Log In
          </Button>
        </form>
      </div>
    </div>
  );
}
