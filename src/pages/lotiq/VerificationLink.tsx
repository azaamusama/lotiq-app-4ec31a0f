import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MailCheck } from "lucide-react";

export default function VerificationLink() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = (location.state as any)?.email || "username@email.com";

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-lg mx-auto">
      <div className="w-full flex-1 px-6 pt-6 pb-6 flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={() => navigate("/forgot-password")}
            className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center shadow-subtle hover:bg-accent transition-colors"
          >
            <ArrowLeft className="h-4 w-4 text-foreground" />
          </button>
          <h1 className="text-xl font-semibold tracking-tight text-foreground">Verification Link</h1>
        </div>

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center shadow-card">
            <MailCheck className="h-6 w-6 text-muted-foreground" />
          </div>
        </div>

        {/* Content */}
        <div className="text-center flex-1">
          <h2 className="text-lg font-semibold text-foreground mb-2">Check Your Email</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            We just sent an email to {email}. Please follow the link in the email to reset your password.
          </p>
        </div>

        <Button
          variant="outline"
          className="w-full h-12 rounded-xl font-semibold text-base mt-6 border-border shadow-subtle hover:shadow-card transition-all"
          onClick={() => navigate("/forgot-password/set-password")}
        >
          Resend Email
        </Button>
      </div>
    </div>
  );
}
