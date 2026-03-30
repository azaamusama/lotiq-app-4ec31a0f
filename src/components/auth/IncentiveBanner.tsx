import { useAuthGating } from "./AuthGatingProvider";
import { ArrowRight, Sparkles, Truck, Tag } from "lucide-react";

const IncentiveBanner = () => {
  const { isAuthenticated, openModal, userState } = useAuthGating();

  if (isAuthenticated) return null;

  return (
    <div className="bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(219_59%_32%)] text-primary-foreground">
      <div className="container py-2.5 flex items-center justify-center gap-6 text-sm">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 font-medium">
            <Truck className="h-3.5 w-3.5" />
            FREE shipping on first order
          </span>
          <span className="hidden sm:inline text-primary-foreground/40">|</span>
          <span className="hidden sm:flex items-center gap-1.5">
            <Tag className="h-3.5 w-3.5" />
            Exclusive bulk discounts
          </span>
          <span className="hidden md:inline text-primary-foreground/40">|</span>
          <span className="hidden md:flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5" />
            Practice savings programs
          </span>
        </div>
        <button
          onClick={() => openModal(userState === "returning" ? "returning_user" : "new_user", "add_to_cart")}
          className="flex items-center gap-1 bg-primary-foreground/15 hover:bg-primary-foreground/25 text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full transition-colors shrink-0"
        >
          Sign up free
          <ArrowRight className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
};

export default IncentiveBanner;
