import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Eye, EyeOff, Lock, CheckCircle2 } from "lucide-react";

export default function SetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const hasMinLength = password.length >= 8;
  const hasSpecial = /[^A-Za-z0-9]/.test(password);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasMinLength || !hasSpecial || password !== confirm) return;
    navigate("/forgot-password/success");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-lg mx-auto">
      <div className="w-full flex-1 px-6 pt-6 pb-6 flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center shadow-subtle hover:bg-accent transition-colors"
          >
            <ArrowLeft className="h-4 w-4 text-foreground" />
          </button>
          <h1 className="text-xl font-semibold tracking-tight text-foreground">Set Password</h1>
        </div>

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center shadow-card">
            <Lock className="h-6 w-6 text-muted-foreground" />
          </div>
        </div>

        <form onSubmit={handleUpdate} className="flex flex-col flex-1">
          {/* Password */}
          <div className="space-y-2 mb-4">
            <Label className="text-xs font-medium text-muted-foreground">
              Password <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <Input
                type={showPw ? "text" : "password"}
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 rounded-lg bg-card border-border pr-10 shadow-subtle transition-shadow focus-visible:shadow-elevated"
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Confirm */}
          <div className="space-y-2 mb-4">
            <Label className="text-xs font-medium text-muted-foreground">
              Confirm Password <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <Input
                type={showConfirm ? "text" : "password"}
                placeholder="••••••••••••"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="h-11 rounded-lg bg-card border-border pr-10 shadow-subtle transition-shadow focus-visible:shadow-elevated"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Validation */}
          <div className="space-y-2.5 mb-auto">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className={`h-4 w-4 transition-colors ${hasMinLength ? "text-primary" : "text-muted-foreground/30"}`} />
              <span className={`text-xs transition-colors ${hasMinLength ? "text-foreground" : "text-muted-foreground"}`}>Must be at least 8 characters</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className={`h-4 w-4 transition-colors ${hasSpecial ? "text-primary" : "text-muted-foreground/30"}`} />
              <span className={`text-xs transition-colors ${hasSpecial ? "text-foreground" : "text-muted-foreground"}`}>Must contain one special character</span>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-12 rounded-xl font-semibold text-base mt-6 shadow-elevated hover:shadow-float transition-all"
            disabled={!hasMinLength || !hasSpecial || password !== confirm}
          >
            Update
          </Button>
        </form>
      </div>
    </div>
  );
}
