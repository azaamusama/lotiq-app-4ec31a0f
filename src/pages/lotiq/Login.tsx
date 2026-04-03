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
        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-3">
          <Shield className="h-7 w-7 text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">
          Lot <span className="text-primary">IQ</span>
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Sign in to your account</p>
      </div>

      {/* Form */}
      <form onSubmit={handleLogin} className="flex-1 px-6 space-y-5">
        {/* Email */}
        <div className="space-y-1.5">
          <Label className="text-xs font-medium text-muted-foreground">Email</Label>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 bg-muted/50 border-0 rounded-xl"
          />
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <Label className="text-xs font-medium text-muted-foreground">Password</Label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 bg-muted/50 border-0 rounded-xl pr-11"
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
        <div className="flex flex-col items-center py-1">
          <button
            type="button"
            className="flex flex-col items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
          >
            <div className="w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center">
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
            { label: "Google", bg: "bg-[#DB4437]/10", color: "text-[#DB4437]", icon: "G" },
            { label: "Facebook", bg: "bg-[#4267B2]/10", color: "text-[#4267B2]", icon: "f" },
            { label: "Apple", bg: "bg-foreground/10", color: "text-foreground", icon: "🍎" },
            { label: "Twitter", bg: "bg-foreground/10", color: "text-foreground", icon: "𝕏" },
          ].map((provider) => (
            <button
              key={provider.label}
              type="button"
              className={`w-12 h-12 rounded-xl ${provider.bg} flex items-center justify-center ${provider.color} hover:opacity-80 transition-opacity text-base font-bold`}
              aria-label={`Login with ${provider.label}`}
            >
              {provider.icon}
            </button>
          ))}
        </div>

        {/* Login Button */}
        <Button
          type="submit"
          className="w-full h-12 rounded-xl font-semibold text-base"
        >
          Log In
        </Button>

        {/* Sign Up */}
        <p className="text-center text-sm text-muted-foreground pb-6">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="text-primary font-semibold hover:underline"
          >
            Sign Up
          </button>
        </p>
      </form>
    </div>
  );
}
