import { MobileBottomNav } from "./MobileBottomNav";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLotIQ } from "@/contexts/LotIQContext";

interface AppLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export function AppLayout({ children, title, subtitle }: AppLayoutProps) {
  const { stats } = useLotIQ();

  return (
    <div className="min-h-screen flex flex-col w-full">
      <header className="h-12 md:h-14 flex items-center justify-between border-b bg-card px-3 md:px-6 shrink-0">
        <div className="flex items-center gap-2 md:gap-3 min-w-0">
          {title && (
            <div className="min-w-0">
              <h2 className="text-sm md:text-base font-semibold text-foreground truncate">{title}</h2>
              {subtitle && <p className="text-[10px] md:text-xs text-muted-foreground truncate">{subtitle}</p>}
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-muted-foreground relative h-8 w-8 md:h-9 md:w-9">
            <Bell className="h-4 w-4" />
            {stats.activeIncidents > 0 && (
              <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-destructive text-destructive-foreground text-[10px] flex items-center justify-center font-medium">
                {stats.activeIncidents}
              </span>
            )}
          </Button>
          <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-[10px] md:text-xs font-semibold text-primary">PM</span>
          </div>
        </div>
      </header>
      <main className="flex-1 overflow-auto p-3 md:p-6 pb-20 max-w-3xl mx-auto w-full">
        {children}
      </main>
      <MobileBottomNav />
    </div>
  );
}
