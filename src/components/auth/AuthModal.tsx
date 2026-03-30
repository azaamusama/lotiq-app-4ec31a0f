import { useState } from "react";
import {
  X, Mail, Lock, User, CheckCircle, ArrowRight, RefreshCw,
  Shield, Truck, Tag, Clock, Package, ChevronRight, AlertCircle,
} from "lucide-react";
import { useAuthGating } from "./AuthGatingProvider";

const AuthModal = () => {
  const { isModalOpen, modalVariant, triggerReason, closeModal, setAuthenticated, dismissCount } = useAuthGating();
  const [view, setView] = useState<"prompt" | "signup" | "signin" | "activation" | "success">("prompt");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [editingEmail, setEditingEmail] = useState(false);
  const [resent, setResent] = useState(false);

  if (!isModalOpen) return null;

  const isHardGate = triggerReason === "hard_gate";

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && name && password) {
      localStorage.setItem("safco_has_account", "true");
      setView("activation");
    }
  };

  const handleSignin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      localStorage.setItem("safco_visited", "true");
      localStorage.setItem("safco_activated", "true");
      setAuthenticated(true);
      setView("success");
      setTimeout(() => {
        closeModal();
        setView("prompt");
      }, 1500);
    }
  };

  const handleActivate = () => {
    localStorage.setItem("safco_activated", "true");
    setAuthenticated(true);
    setView("success");
    setTimeout(() => {
      closeModal();
      setView("prompt");
    }, 1500);
  };

  const handleResend = () => {
    setResent(true);
    setTimeout(() => setResent(false), 3000);
  };

  const handleClose = () => {
    if (isHardGate) return; // Can't dismiss hard gate
    closeModal();
    setView("prompt");
  };

  const resetToPrompt = () => setView("prompt");

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-foreground/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-card rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200">
        {/* Close button */}
        {!isHardGate && (
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}

        {/* ── Success View ── */}
        {view === "success" ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-[hsl(var(--success)/0.15)] flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-[hsl(var(--success))]" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">You're all set!</h2>
            <p className="text-sm text-muted-foreground">Welcome to Safco Dental. Enjoy member-only pricing.</p>
          </div>
        ) : view === "activation" ? (
          /* ── Activation View ── */
          <div className="p-8">
            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Mail className="h-7 w-7 text-primary" />
              </div>
              <h2 className="text-xl font-bold text-foreground mb-1">Check your email to activate</h2>
              <p className="text-sm text-muted-foreground">
                We sent a verification link to{" "}
                {editingEmail ? (
                  <span className="inline-flex items-center gap-1.5">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border-b border-primary bg-transparent text-sm font-medium text-foreground focus:outline-none w-48"
                    />
                    <button onClick={() => setEditingEmail(false)} className="text-primary text-xs font-medium">Save</button>
                  </span>
                ) : (
                  <span>
                    <strong className="text-foreground">{email}</strong>
                    <button onClick={() => setEditingEmail(true)} className="ml-1 text-primary text-xs hover:underline">
                      Wrong email?
                    </button>
                  </span>
                )}
              </p>
            </div>

            <div className="bg-[hsl(var(--alert)/0.08)] border border-[hsl(var(--alert)/0.2)] rounded-lg p-3 mb-5">
              <p className="text-xs text-[hsl(var(--alert))] flex items-start gap-2">
                <AlertCircle className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                Activation required before placing orders
              </p>
            </div>

            <button
              onClick={handleResend}
              className="w-full h-10 border border-input rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors flex items-center justify-center gap-2 mb-3"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${resent ? "animate-spin" : ""}`} />
              {resent ? "Email sent!" : "Resend activation email"}
            </button>

            <button
              onClick={handleActivate}
              className="w-full h-10 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors"
            >
              I've verified — continue
            </button>
          </div>
        ) : view === "signup" ? (
          /* ── Signup Form ── */
          <div className="p-8">
            <button onClick={resetToPrompt} className="text-xs text-muted-foreground hover:text-foreground mb-4 flex items-center gap-1">
              ← Back
            </button>
            <h2 className="text-xl font-bold text-foreground mb-1">Create your free account</h2>
            <p className="text-sm text-muted-foreground mb-6">Join thousands of dental professionals saving time and money.</p>

            <form onSubmit={handleSignup} className="space-y-3">
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full h-11 pl-10 pr-3 rounded-lg border border-input bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                />
              </div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="email"
                  placeholder="Work email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full h-11 pl-10 pr-3 rounded-lg border border-input bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="password"
                  placeholder="Create password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full h-11 pl-10 pr-3 rounded-lg border border-input bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                />
              </div>
              <button
                type="submit"
                className="w-full h-11 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
              >
                Create Free Account
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <p className="text-center text-xs text-muted-foreground mt-4">
              Already have an account?{" "}
              <button onClick={() => setView("signin")} className="text-primary font-medium hover:underline">
                Sign in
              </button>
            </p>
          </div>
        ) : view === "signin" ? (
          /* ── Sign In Form ── */
          <div className="p-8">
            <button onClick={resetToPrompt} className="text-xs text-muted-foreground hover:text-foreground mb-4 flex items-center gap-1">
              ← Back
            </button>
            <h2 className="text-xl font-bold text-foreground mb-1">Welcome back</h2>
            <p className="text-sm text-muted-foreground mb-6">Sign in to access your account and member pricing.</p>

            <form onSubmit={handleSignin} className="space-y-3">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="email"
                  placeholder="Work email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full h-11 pl-10 pr-3 rounded-lg border border-input bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full h-11 pl-10 pr-3 rounded-lg border border-input bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                />
              </div>
              <button
                type="submit"
                className="w-full h-11 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors"
              >
                Sign In
              </button>
            </form>

            <p className="text-center text-xs text-muted-foreground mt-4">
              Don't have an account?{" "}
              <button onClick={() => setView("signup")} className="text-primary font-medium hover:underline">
                Create one free
              </button>
            </p>
          </div>
        ) : (
          /* ── Prompt View (Variant-based) ── */
          <div>
            {/* Incentive banner */}
            <div className="bg-[hsl(var(--success)/0.1)] px-6 py-3 flex items-center justify-center gap-2 text-sm font-medium text-[hsl(153_38%_25%)]">
              <Truck className="h-4 w-4" />
              FREE shipping on your first order
            </div>

            <div className="p-8">
              {modalVariant === "returning_user" ? (
                <>
                  <h2 className="text-xl font-bold text-foreground mb-1">Welcome back — continue where you left off</h2>
                  <p className="text-sm text-muted-foreground mb-6">
                    Sign in to access your saved orders, member pricing, and faster checkout.
                  </p>
                </>
              ) : modalVariant === "unactivated" ? (
                <>
                  <h2 className="text-xl font-bold text-foreground mb-1">Activate your account to start ordering</h2>
                  <p className="text-sm text-muted-foreground mb-6">
                    Check your email to verify your account and unlock full access.
                  </p>
                </>
              ) : (
                <>
                  <h2 className="text-xl font-bold text-foreground mb-1">Unlock Member Pricing & Fast Checkout</h2>
                  <p className="text-sm text-muted-foreground mb-6">
                    Create a free account to access exclusive pricing, promotions, and faster ordering.
                  </p>
                </>
              )}

              {/* Benefits */}
              <div className="space-y-3 mb-6">
                {[
                  { icon: Tag, label: "Member-only discounts", desc: "Exclusive bulk pricing" },
                  { icon: Clock, label: "Faster reordering", desc: "One-click repeat orders" },
                  { icon: Package, label: "Order history & tracking", desc: "Full visibility on every order" },
                  { icon: Shield, label: "Practice savings programs", desc: "Custom pricing for your practice" },
                ].map(({ icon: Icon, label, desc }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/8 flex items-center justify-center shrink-0">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{label}</p>
                      <p className="text-xs text-muted-foreground">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              {modalVariant === "unactivated" ? (
                <div className="space-y-3">
                  <button
                    onClick={() => setView("activation")}
                    className="w-full h-11 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                  >
                    Resend Activation Email
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              ) : modalVariant === "returning_user" ? (
                <div className="space-y-3">
                  <button
                    onClick={() => setView("signin")}
                    className="w-full h-11 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                  >
                    Sign In
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setView("signup")}
                    className="w-full h-11 border border-input rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors"
                  >
                    Create Account
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <button
                    onClick={() => setView("signup")}
                    className="w-full h-11 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                  >
                    Create Free Account
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setView("signin")}
                    className="w-full h-11 border border-input rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors"
                  >
                    Already have an account? Sign in
                  </button>
                </div>
              )}

              {/* Incentive callouts */}
              <div className="mt-6 pt-5 border-t border-border">
                <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Shield className="h-3.5 w-3.5 text-primary" />
                    Trusted by 5,000+ practices
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Lock className="h-3.5 w-3.5 text-primary" />
                    Secure & private
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
