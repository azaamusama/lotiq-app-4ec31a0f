import { MobileBottomNav } from "./MobileBottomNav";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { useLotIQ } from "@/contexts/LotIQContext";
import { useNavigate } from "react-router-dom";

interface AppLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  headerRight?: React.ReactNode;
  headerLeft?: React.ReactNode;
}

export function AppLayout({ children, title, subtitle, headerRight, headerLeft }: AppLayoutProps) {
  const { stats } = useLotIQ();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col w-full">
      <header className="h-14 flex items-center justify-between border-b border-border/60 bg-card/80 backdrop-blur-sm px-4 md:px-6 shrink-0 sticky top-0 z-40">
        <div className="flex items-center gap-2.5 md:gap-3 min-w-0">
          {headerLeft}
          {title && (
            <div className="min-w-0">
              <h2 className="text-sm md:text-base font-semibold tracking-tight text-foreground truncate">{title}</h2>
              {subtitle && <p className="text-[10px] md:text-xs text-muted-foreground truncate">{subtitle}</p>}
            </div>
          )}
        </div>
        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          {headerRight || (
            <Button variant="ghost" size="icon" className="text-muted-foreground relative h-8 w-8 md:h-9 md:w-9" onClick={() => navigate("/notifications")}>
              <Bell className="h-4 w-4" />
              {stats.activeIncidents > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-destructive text-destructive-foreground text-[10px] flex items-center justify-center font-medium">
                  {stats.activeIncidents}
                </span>
              )}
            </Button>
          )}
        </div>
      </header>
      <main className="flex-1 overflow-auto p-4 md:p-6 pb-20 max-w-3xl mx-auto w-full">
        {children}
      </main>
      <MobileBottomNav />
    </div>
  );
}
