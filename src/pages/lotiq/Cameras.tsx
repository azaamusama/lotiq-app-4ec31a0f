import { useState } from "react";
import { AppLayout } from "@/components/lotiq/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Wifi, WifiOff, Eye, List, LayoutGrid } from "lucide-react";
import { useNavigate } from "react-router-dom";

import cameraEntrance from "@/assets/camera-entrance.jpg";
import cameraRow2 from "@/assets/camera-row2.jpg";
import cameraLotB from "@/assets/camera-lot-b.jpg";
import cameraExit from "@/assets/camera-exit.jpg";
import cameraEv from "@/assets/camera-ev.jpg";

type CameraStatus = "online" | "degraded" | "offline";

interface CameraItem {
  id: string;
  name: string;
  zone: string;
  status: CameraStatus;
  lastActivity: string;
  image: string;
}

const cameras: CameraItem[] = [
  { id: "cam-1", name: "Entrance Camera", zone: "Lot A - Entrance", status: "online", lastActivity: "1 minute ago", image: cameraEntrance },
  { id: "cam-2", name: "Row 2 Camera", zone: "Lot A - Row 2", status: "online", lastActivity: "2 minutes ago", image: cameraRow2 },
  { id: "cam-3", name: "Lot B Camera", zone: "Lot B - Main", status: "online", lastActivity: "30 seconds ago", image: cameraLotB },
  { id: "cam-4", name: "Exit Ramp Camera", zone: "Garage - Exit", status: "degraded", lastActivity: "5 minutes ago", image: cameraExit },
  { id: "cam-5", name: "EV Station Camera", zone: "Lot A - EV", status: "offline", lastActivity: "2 hours ago", image: cameraEv },
];

const statusColor: Record<CameraStatus, string> = {
  online: "text-[hsl(var(--lotiq-green))]",
  degraded: "text-[hsl(var(--lotiq-amber))]",
  offline: "text-destructive",
};

const statusDot: Record<CameraStatus, string> = {
  online: "bg-[hsl(var(--lotiq-green))]",
  degraded: "bg-[hsl(var(--lotiq-amber))]",
  offline: "bg-destructive",
};

const statusBg: Record<CameraStatus, string> = {
  online: "bg-[hsl(var(--lotiq-green))]/10",
  degraded: "bg-[hsl(var(--lotiq-amber))]/10",
  offline: "bg-destructive/10",
};

export default function Cameras() {
  const navigate = useNavigate();
  const [view, setView] = useState<"list" | "grid">("list");

  const online = cameras.filter(c => c.status === "online").length;
  const degraded = cameras.filter(c => c.status === "degraded").length;
  const offline = cameras.filter(c => c.status === "offline").length;

  return (
    <AppLayout
      title="Cameras"
      headerLeft={
        <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center">
          <ArrowLeft className="h-4 w-4 text-foreground" />
        </button>
      }
    >
      {/* Status summary */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <Card>
          <CardContent className="p-3 text-center">
            <p className="text-2xl font-bold text-[hsl(var(--lotiq-green))]">{online}</p>
            <p className="text-[10px] text-muted-foreground">Online</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 text-center">
            <p className="text-2xl font-bold text-[hsl(var(--lotiq-amber))]">{degraded}</p>
            <p className="text-[10px] text-muted-foreground">Degraded</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 text-center">
            <p className="text-2xl font-bold text-destructive">{offline}</p>
            <p className="text-[10px] text-muted-foreground">Offline</p>
          </CardContent>
        </Card>
      </div>

      {/* View toggle */}
      <Card className="mb-4">
        <CardContent className="p-1 flex">
          <button
            onClick={() => setView("list")}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-colors ${
              view === "list" ? "bg-muted text-foreground" : "text-muted-foreground"
            }`}
          >
            <List className="h-4 w-4" />
            List
          </button>
          <button
            onClick={() => setView("grid")}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-colors ${
              view === "grid" ? "bg-muted text-foreground" : "text-muted-foreground"
            }`}
          >
            <LayoutGrid className="h-4 w-4" />
            Grid
          </button>
        </CardContent>
      </Card>

      {/* Camera list/grid */}
      <div className={view === "grid" ? "grid grid-cols-2 gap-3" : "space-y-3"}>
        {cameras.map((cam) => (
          <Card key={cam.id} className="overflow-hidden">
            <div className="relative">
              <img
                src={cam.image}
                alt={cam.name}
                loading="lazy"
                width={800}
                height={512}
                className={`w-full ${view === "grid" ? "h-28" : "h-44"} object-cover`}
              />
              <div className="absolute top-2 left-2">
                <span className="inline-flex items-center gap-1 bg-card/90 backdrop-blur-sm rounded-full px-2.5 py-1 text-[10px] font-medium text-foreground">
                  <span className={`w-1.5 h-1.5 rounded-full ${statusDot[cam.status]}`} />
                  {cam.name}
                </span>
              </div>
            </div>

            <CardContent className={view === "grid" ? "p-2.5" : "p-3"}>
              <div className="flex items-start justify-between mb-1">
                <div className="min-w-0">
                  <p className={`${view === "grid" ? "text-xs" : "text-sm"} font-semibold text-foreground truncate`}>{cam.name}</p>
                  <p className={`${view === "grid" ? "text-[9px]" : "text-xs"} text-muted-foreground truncate`}>{cam.zone}</p>
                </div>
                <span className={`inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full ${statusBg[cam.status]} ${statusColor[cam.status]} shrink-0`}>
                  {cam.status === "offline" ? <WifiOff className="h-3 w-3" /> : <Wifi className="h-3 w-3" />}
                  {cam.status === "online" ? "Online" : cam.status === "degraded" ? "Degraded" : "Offline"}
                </span>
              </div>
              {view === "list" && (
                <div className="flex items-center justify-between mt-2">
                  <p className="text-[10px] text-muted-foreground">Last activity {cam.lastActivity}</p>
                  {cam.status !== "offline" && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-medium text-primary px-2 py-0.5 rounded-full bg-primary/10">
                      <Eye className="h-3 w-3" />
                      Live
                    </span>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </AppLayout>
  );
}
