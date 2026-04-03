import { useState } from "react";
import { AppLayout } from "@/components/lotiq/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft, CameraOff, Truck, CheckCircle2, XCircle,
  AlertTriangle, SlidersHorizontal, Filter, ChevronDown,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import emptyIllustration from "@/assets/empty-notifications.png";

type NotifCategory = "camera" | "tow-requested" | "tow-dispatched" | "tow-completed" | "tow-cancelled" | "detection" | "rules";

interface Notification {
  id: string;
  category: NotifCategory;
  title: string;
  description: string;
  property: string;
  time: string;
  unread: boolean;
}

const todayNotifs: Notification[] = [
  {
    id: "1", category: "camera", title: "Camera Offline",
    description: "Exit Camera at Lot C is offline.",
    property: "Maple Heights Apts", time: "13 minutes ago", unread: true,
  },
  {
    id: "2", category: "tow-requested", title: "Tow Requested",
    description: "ABC-1234 at Lot A - Entrance",
    property: "Maple Heights Apts", time: "36 minutes ago", unread: true,
  },
  {
    id: "3", category: "tow-dispatched", title: "Tow Requested",
    description: "ABC Towing Services - ETA 12 min",
    property: "Maple Heights Apts", time: "31 minutes ago", unread: true,
  },
  {
    id: "4", category: "detection", title: "Detection Degraded",
    description: "Detection accuracy may be affected at L...",
    property: "Maple Heights Apts", time: "about 2 hours ago", unread: false,
  },
];

const yesterdayNotifs: Notification[] = [
  {
    id: "5", category: "tow-completed", title: "Tow Completed",
    description: "Vehicle DEF-5678 towed from Lot A.",
    property: "Maple Heights Apts", time: "1 day ago", unread: false,
  },
  {
    id: "6", category: "tow-cancelled", title: "Tow Cancelled",
    description: "Vehicle GHI-9012 exited before tow arriv...",
    property: "Mall of Downtown", time: "1 day ago", unread: false,
  },
  {
    id: "7", category: "rules", title: "Rules Updated",
    description: "Grace period changed from 15 min to 10...",
    property: "Maple Heights Apts", time: "about 2 hours ago", unread: false,
  },
];

function getIcon(category: NotifCategory) {
  switch (category) {
    case "camera":
      return (
        <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
          <CameraOff className="h-5 w-5 text-destructive" />
        </div>
      );
    case "tow-requested":
      return (
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          <Truck className="h-5 w-5 text-primary" />
        </div>
      );
    case "tow-dispatched":
      return (
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          <CheckCircle2 className="h-5 w-5 text-primary" />
        </div>
      );
    case "tow-completed":
      return (
        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center shrink-0">
          <CheckCircle2 className="h-5 w-5 text-muted-foreground" />
        </div>
      );
    case "tow-cancelled":
      return (
        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center shrink-0">
          <XCircle className="h-5 w-5 text-muted-foreground" />
        </div>
      );
    case "detection":
      return (
        <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
          <AlertTriangle className="h-5 w-5 text-destructive" />
        </div>
      );
    case "rules":
      return (
        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center shrink-0">
          <SlidersHorizontal className="h-5 w-5 text-muted-foreground" />
        </div>
      );
  }
}

function NotifItem({ notif }: { notif: Notification }) {
  return (
    <div className="flex items-start gap-3 p-4">
      {getIcon(notif.category)}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <p className="text-sm font-semibold text-foreground">{notif.title}</p>
          {notif.unread && <span className="w-2 h-2 rounded-full bg-primary shrink-0" />}
        </div>
        <p className="text-xs text-muted-foreground mt-0.5 truncate">{notif.description}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{notif.property}</p>
      </div>
      <span className="text-[11px] text-muted-foreground whitespace-nowrap shrink-0 pt-0.5">{notif.time}</span>
    </div>
  );
}

export default function NotificationFeed() {
  const navigate = useNavigate();
  const [propertyFilter, setPropertyFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Set to true to show empty state, false to show notifications
  const hasNotifications = false;

  return (
    <AppLayout
      title="Notifications"
      headerLeft={
        <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center">
          <ArrowLeft className="h-4 w-4 text-foreground" />
        </button>
      }
      headerRight={
        hasNotifications ? (
          <button className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center">
            <SlidersHorizontal className="h-4 w-4 text-foreground" />
          </button>
        ) : undefined
      }
    >
      {!hasNotifications ? (
        <div className="flex flex-col items-center justify-center flex-1 py-16">
          <p className="text-lg text-muted-foreground mb-8">Nothing to worry about!</p>
          <img
            src={emptyIllustration}
            alt="No notifications"
            width={280}
            height={280}
            className="mb-10"
            loading="lazy"
          />
          <Button
            className="w-full"
            size="lg"
            onClick={() => navigate("/dashboard")}
          >
            Home
          </Button>
        </div>
      ) : (
        <>
          {/* Filters */}
          <div className="flex gap-2 mb-5">
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-card text-sm text-foreground font-medium flex-1">
              <Filter className="h-4 w-4 text-muted-foreground" />
              All Properties
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground ml-auto" />
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-card text-sm text-foreground font-medium flex-1">
              All Categories
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground ml-auto" />
            </button>
          </div>

          {/* Today */}
          <section className="mb-6">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
              Today
            </h3>
            <Card className="divide-y divide-border overflow-hidden">
              {todayNotifs.map((n) => (
                <NotifItem key={n.id} notif={n} />
              ))}
            </Card>
          </section>

          {/* Yesterday */}
          <section className="mb-6">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
              Yesterday
            </h3>
            <Card className="divide-y divide-border overflow-hidden">
              {yesterdayNotifs.map((n) => (
                <NotifItem key={n.id} notif={n} />
              ))}
            </Card>
          </section>
        </>
      )}
    </AppLayout>
  );
}
