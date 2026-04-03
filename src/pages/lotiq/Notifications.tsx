import { useState } from "react";
import { AppLayout } from "@/components/lotiq/AppLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowLeft, ClipboardCheck, Camera, Truck, AlertTriangle,
  CheckCircle2, XCircle, Settings2, ChevronDown, Shield, Zap, UserPlus
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type NotifCategory = "all" | "critical" | "operational" | "configuration";

interface Notification {
  id: string;
  title: string;
  description: string;
  property: string;
  time: string;
  category: NotifCategory;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  unread: boolean;
  group: "today" | "yesterday" | "earlier";
}

const properties = ["All Properties", "Maple Heights Apts", "Mall of Downtown"];

const initialNotifications: Notification[] = [
  {
    id: "1", title: "Camera Offline", description: "Exit Camera at Lot C is offline.",
    property: "Maple Heights Apts", time: "13 minutes ago", category: "critical",
    icon: Camera, iconBg: "bg-destructive/10", iconColor: "text-destructive",
    unread: true, group: "today",
  },
  {
    id: "2", title: "Tow Requested", description: "ABC-1234 at Lot A - Entrance",
    property: "Maple Heights Apts", time: "36 minutes ago", category: "operational",
    icon: Truck, iconBg: "bg-primary/10", iconColor: "text-primary",
    unread: true, group: "today",
  },
  {
    id: "3", title: "Tow Requested", description: "ABC Towing Services - ETA 12 min",
    property: "Maple Heights Apts", time: "31 minutes ago", category: "operational",
    icon: CheckCircle2, iconBg: "bg-primary/10", iconColor: "text-primary",
    unread: true, group: "today",
  },
  {
    id: "4", title: "Detection Degraded", description: "Detection accuracy may be affected at L...",
    property: "Maple Heights Apts", time: "about 2 hours ago", category: "critical",
    icon: AlertTriangle, iconBg: "bg-destructive/10", iconColor: "text-destructive",
    unread: false, group: "today",
  },
  {
    id: "5", title: "Tow Completed", description: "Vehicle DEF-5678 towed from Lot A.",
    property: "Maple Heights Apts", time: "1 day ago", category: "operational",
    icon: CheckCircle2, iconBg: "bg-[hsl(var(--lotiq-green))]/10", iconColor: "text-[hsl(var(--lotiq-green))]",
    unread: false, group: "yesterday",
  },
  {
    id: "6", title: "Tow Cancelled", description: "Vehicle GHI-9012 exited before tow arriv...",
    property: "Mall of Downtown", time: "1 day ago", category: "operational",
    icon: XCircle, iconBg: "bg-muted", iconColor: "text-muted-foreground",
    unread: false, group: "yesterday",
  },
  {
    id: "7", title: "Rules Updated", description: "Grace period changed from 15 min to 10...",
    property: "Maple Heights Apts", time: "about 2 hours ago", category: "configuration",
    icon: Settings2, iconBg: "bg-muted", iconColor: "text-muted-foreground",
    unread: false, group: "yesterday",
  },
  {
    id: "8", title: "Enforcement Paused", description: "Enforcement paused for scheduled main...",
    property: "Maple Heights Apts", time: "3 days ago", category: "operational",
    icon: Shield, iconBg: "bg-muted", iconColor: "text-muted-foreground",
    unread: false, group: "earlier",
  },
  {
    id: "9", title: "System Outage Resolved", description: "All systems back to normal operation.",
    property: "Mall of Downtown", time: "4 days ago", category: "critical",
    icon: Zap, iconBg: "bg-destructive/10", iconColor: "text-destructive",
    unread: false, group: "earlier",
  },
  {
    id: "10", title: "Authorized Parker Added", description: "Maria Garcia added to Maple Heights.",
    property: "Maple Heights Apts", time: "5 days ago", category: "configuration",
    icon: UserPlus, iconBg: "bg-muted", iconColor: "text-muted-foreground",
    unread: false, group: "earlier",
  },
];

export default function Notifications() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(initialNotifications);
  const [selectedProperty, setSelectedProperty] = useState("All Properties");
  const [selectedCategory, setSelectedCategory] = useState<NotifCategory>("all");

  const categoryLabels: Record<NotifCategory, string> = {
    all: "All Categories",
    critical: "Critical",
    operational: "Operational",
    configuration: "Configuration",
  };

  const filtered = notifications.filter((n) => {
    const propMatch = selectedProperty === "All Properties" || n.property === selectedProperty;
    const catMatch = selectedCategory === "all" || n.category === selectedCategory;
    return propMatch && catMatch;
  });

  const todayItems = filtered.filter((n) => n.group === "today");
  const yesterdayItems = filtered.filter((n) => n.group === "yesterday");
  const earlierItems = filtered.filter((n) => n.group === "earlier");
  const hasUnread = notifications.some((n) => n.unread);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const isEmpty = filtered.length === 0;

  return (
    <AppLayout
      title="Notifications"
      headerLeft={
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => navigate("/rules")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
      }
      headerRight={
        hasUnread ? (
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={markAllRead}>
            <ClipboardCheck className="h-4 w-4" />
          </Button>
        ) : <div />
      }
    >
      {isEmpty ? (
        <div className="flex flex-col items-center justify-center text-center pt-20 space-y-6">
          <p className="text-lg font-medium text-foreground">Nothing to worry about!</p>
          <p className="text-sm text-muted-foreground">You're all caught up. No new notifications.</p>
          <Button className="w-full max-w-xs" size="lg" onClick={() => navigate("/")}>
            Home
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Filters */}
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="text-xs gap-1.5">
                  {selectedProperty === "All Properties" ? "⊘ " : ""}{selectedProperty}
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {properties.map((p) => (
                  <DropdownMenuItem key={p} onClick={() => setSelectedProperty(p)}>
                    {selectedProperty === p && <span className="mr-1">✓</span>}
                    {p}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="text-xs gap-1.5">
                  {categoryLabels[selectedCategory]}
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {(Object.keys(categoryLabels) as NotifCategory[]).map((cat) => (
                  <DropdownMenuItem key={cat} onClick={() => setSelectedCategory(cat)}>
                    {selectedCategory === cat && <span className="mr-1">✓</span>}
                    {categoryLabels[cat]}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Today */}
          {todayItems.length > 0 && (
            <div>
              <p className="text-[11px] font-semibold text-muted-foreground tracking-wider mb-2 px-1">TODAY</p>
              <Card className="divide-y divide-border">
                {todayItems.map((n) => (
                  <NotificationRow key={n.id} notification={n} />
                ))}
              </Card>
            </div>
          )}

          {/* Yesterday */}
          {yesterdayItems.length > 0 && (
            <div>
              <p className="text-[11px] font-semibold text-muted-foreground tracking-wider mb-2 px-1">YESTERDAY</p>
              <Card className="divide-y divide-border">
                {yesterdayItems.map((n) => (
                  <NotificationRow key={n.id} notification={n} />
                ))}
              </Card>
            </div>
          )}

          {/* Earlier */}
          {earlierItems.length > 0 && (
            <div>
              <p className="text-[11px] font-semibold text-muted-foreground tracking-wider mb-2 px-1">EARLIER</p>
              <Card className="divide-y divide-border">
                {earlierItems.map((n) => (
                  <NotificationRow key={n.id} notification={n} />
                ))}
              </Card>
            </div>
          )}
        </div>
      )}
    </AppLayout>
  );
}

function NotificationRow({ notification: n }: { notification: Notification }) {
  return (
    <div className="flex items-start gap-3 p-3.5">
      <div className={`h-9 w-9 rounded-full ${n.iconBg} flex items-center justify-center shrink-0 mt-0.5`}>
        <n.icon className={`h-4 w-4 ${n.iconColor}`} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <p className="text-sm font-semibold text-foreground">{n.title}</p>
          {n.unread && <span className="h-2 w-2 rounded-full bg-primary shrink-0" />}
        </div>
        <p className="text-xs text-muted-foreground truncate">{n.description}</p>
        <div className="flex items-center justify-between mt-0.5">
          <p className="text-[11px] text-muted-foreground">{n.property}</p>
          <p className="text-[11px] text-muted-foreground">{n.time}</p>
        </div>
      </div>
    </div>
  );
}
