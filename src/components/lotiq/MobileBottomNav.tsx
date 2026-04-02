import { NavLink } from "react-router-dom";
import { Home, Building2, Settings } from "lucide-react";
import { useLocation } from "react-router-dom";

const tabs = [
  { label: "Home", icon: Home, path: "/" },
  { label: "Property", icon: Building2, path: "/property" },
  { label: "Settings", icon: Settings, path: "/rules" },
];

export function MobileBottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border md:hidden">
      <div className="flex items-center justify-around h-14">
        {tabs.map((tab) => {
          const isActive = tab.path === "/" ? location.pathname === "/" : location.pathname.startsWith(tab.path);
          return (
            <NavLink
              key={tab.label}
              to={tab.path}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 transition-colors ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <tab.icon className="h-5 w-5" />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
