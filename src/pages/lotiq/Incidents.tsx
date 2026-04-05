import { useState } from "react";
import { AppLayout } from "@/components/lotiq/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft, MapPin, Camera, Clock, AlertTriangle, CheckCircle2,
  Truck, Car, Zap, Trash2, ChevronRight,
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { statusIncidents, type VehicleStatus, type StatusIncident } from "@/lib/status-incidents";

const statusConfig: Record<VehicleStatus, {
  label: string; color: string; bg: string; borderColor: string;
  bannerBg: string; bannerText: string; icon: React.ReactNode;
}> = {
  allowed: {
    label: "Allowed", color: "text-success",
    bg: "bg-success/10", borderColor: "border-success/20",
    bannerBg: "bg-success/10", bannerText: "text-success",
    icon: <CheckCircle2 className="h-4 w-4" />,
  },
  grace: {
    label: "Grace", color: "text-warning",
    bg: "bg-warning/10", borderColor: "border-warning/20",
    bannerBg: "bg-warning/10", bannerText: "text-warning",
    icon: <Clock className="h-4 w-4" />,
  },
  violation: {
    label: "Violation", color: "text-destructive",
    bg: "bg-destructive/10", borderColor: "border-destructive/20",
    bannerBg: "bg-destructive/10", bannerText: "text-destructive",
    icon: <AlertTriangle className="h-4 w-4" />,
  },
  tow_requested: {
    label: "Tow Requested", color: "text-destructive",
    bg: "bg-destructive/10", borderColor: "border-destructive/20",
    bannerBg: "bg-destructive", bannerText: "text-destructive-foreground",
    icon: <Truck className="h-4 w-4" />,
  },
  trash_overflow: {
    label: "Trash Overflow", color: "text-destructive",
    bg: "bg-destructive/10", borderColor: "border-destructive/20",
    bannerBg: "bg-foreground", bannerText: "text-background",
    icon: <Trash2 className="h-4 w-4" />,
  },
  ev: {
    label: "EV", color: "text-warning",
    bg: "bg-warning/10", borderColor: "border-warning/20",
    bannerBg: "bg-warning/10", bannerText: "text-warning",
    icon: <Zap className="h-4 w-4" />,
  },
};

const mockStatusIncidents = statusIncidents;

const filterOptions: { label: string; value: VehicleStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Allowed", value: "allowed" },
  { label: "Grace", value: "grace" },
  { label: "Violation", value: "violation" },
  { label: "Tow", value: "tow_requested" },
  { label: "Trash", value: "trash_overflow" },
  { label: "EV", value: "ev" },
];

export default function Incidents() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<VehicleStatus | "all">("all");

  // DETAIL VIEW
  if (id) {
    const incident = mockStatusIncidents.find(i => i.id === id);
    if (!incident) return <AppLayout title="Not Found"><p className="text-sm text-muted-foreground">Incident not found.</p></AppLayout>;

    const cfg = statusConfig[incident.status];

    return (
      <AppLayout
        title="Status"
        headerLeft={
          <button onClick={() => navigate("/incidents")} className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center shadow-subtle hover:bg-accent transition-colors">
            <ArrowLeft className="h-4 w-4 text-foreground" />
          </button>
        }
      >
        {/* Status Banner */}
        <div className={`rounded-xl p-4 mb-4 ${cfg.bannerBg}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-semibold ${cfg.bannerText}`}>
                {incident.status === "tow_requested" ? "Tow In Progress" :
                 incident.status === "allowed" ? "Authorized Parker" :
                 cfg.label}
              </p>
              {incident.status === "tow_requested" && (
                <p className={`text-xs ${cfg.bannerText} opacity-80`}>Tow truck en route to location</p>
              )}
              {incident.status === "allowed" && (
                <p className={`text-xs ${cfg.bannerText} opacity-80`}>{incident.zone}</p>
              )}
              {(incident.status === "trash_overflow" || incident.status === "ev") && (
                <p className={`text-xs ${cfg.bannerText} opacity-80`}>{incident.time}</p>
              )}
            </div>
            {incident.status === "tow_requested" && (
              <span className="flex items-center gap-1 text-xs font-medium text-destructive bg-destructive/10 px-2.5 py-1 rounded-full">
                <Truck className="h-3.5 w-3.5" /> Tow Requested
              </span>
            )}
            {incident.status === "allowed" && (
              <span className="flex items-center gap-1 text-xs font-medium text-success bg-success/10 px-2.5 py-1 rounded-full">
                <CheckCircle2 className="h-3.5 w-3.5" /> Allowed
              </span>
            )}
          </div>
        </div>

        {/* Vehicle Info */}
        <Card className="mb-4 shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              {incident.images[0] && (
                <img src={incident.images[0]} alt="Vehicle" className="w-14 h-14 rounded-xl object-cover" loading="lazy" />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">{incident.plate}</p>
                <p className="text-xs text-muted-foreground">{incident.vehicleType}</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                {incident.zone}
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Camera className="h-3.5 w-3.5 shrink-0" />
                {incident.camera}
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5 shrink-0" />
                Detected {format(new Date(incident.timestamp), "MMM d, h:mm a")}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Evidence */}
        {incident.images.length > 0 && (
          <section className="mb-4">
            <h3 className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Evidence
            </h3>
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
              {incident.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`Evidence ${i + 1}`}
                  loading="lazy"
                  className="w-28 h-20 rounded-xl object-cover shrink-0 shadow-subtle"
                />
              ))}
            </div>
          </section>
        )}

        {/* Rules Triggered */}
        {incident.rulesTriggered.length > 0 && (
          <section className="mb-4">
            <h3 className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Rules Triggered
            </h3>
            <Card className="shadow-card">
              <CardContent className="p-0 divide-y divide-border">
                {incident.rulesTriggered.map((rule, i) => (
                  <div key={i} className="flex items-center gap-3 p-3.5">
                    <AlertTriangle className="h-4 w-4 text-destructive shrink-0" />
                    <p className="text-xs text-foreground">{rule}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>
        )}

        {/* Tow Timeline */}
        {incident.towTimeline && incident.towTimeline.length > 0 && (
          <section className="mb-4">
            <h3 className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Tow Timeline
            </h3>
            <Card className="shadow-card">
              <CardContent className="p-4">
                <div className="space-y-4">
                  {incident.towTimeline.map((event, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 rounded-full border-2 border-destructive bg-background mt-0.5" />
                        {i < incident.towTimeline!.length - 1 && <div className="w-px flex-1 bg-border mt-1" />}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{event.action}</p>
                        <p className="text-xs text-muted-foreground">{event.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {/* Actions */}
        {incident.status !== "allowed" && (
          <div className="space-y-2">
            {incident.status !== "tow_requested" && (
              <Button className="w-full gap-2 shadow-elevated">
                <Truck className="h-4 w-4" /> Request Tow
              </Button>
            )}
            <Button variant="outline" className="w-full gap-2 shadow-subtle">
              <CheckCircle2 className="h-4 w-4" /> Resolve
            </Button>
          </div>
        )}
      </AppLayout>
    );
  }

  // LIST VIEW
  const filtered = filter === "all" ? mockStatusIncidents : mockStatusIncidents.filter(i => i.status === filter);

  return (
    <AppLayout
      title="Status"
      headerLeft={
        <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center shadow-subtle hover:bg-accent transition-colors">
          <ArrowLeft className="h-4 w-4 text-foreground" />
        </button>
      }
    >
      {/* Filter pills */}
      <div className="flex gap-1.5 overflow-x-auto pb-2 mb-4 -mx-1 px-1">
        {filterOptions.map(f => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap shrink-0 transition-all ${
              filter === f.value
                ? "bg-primary text-primary-foreground shadow-subtle"
                : "bg-secondary text-muted-foreground hover:bg-accent"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Incident cards */}
      <div className="space-y-2.5">
        {filtered.map((inc) => {
          const cfg = statusConfig[inc.status];
          return (
            <Card
              key={inc.id}
              className="cursor-pointer hover:shadow-elevated transition-all shadow-card"
              onClick={() => navigate(`/incidents/${inc.id}`)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center">
                      <Car className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{inc.plate}</p>
                      <p className="text-[10px] text-muted-foreground">{inc.vehicleType}</p>
                    </div>
                  </div>
                  <span className={`flex items-center gap-1 text-[10px] font-medium px-2.5 py-0.5 rounded-full ${cfg.bg} ${cfg.color}`}>
                    {cfg.icon}
                    {cfg.label}
                  </span>
                </div>

                <p className="text-xs text-muted-foreground mb-2">{inc.description}</p>

                <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {inc.zone}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {inc.time}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
        {filtered.length === 0 && (
          <Card className="shadow-card">
            <CardContent className="p-6 text-center text-sm text-muted-foreground">
              No incidents found
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  );
}
