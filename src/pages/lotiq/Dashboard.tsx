import { AppLayout } from "@/components/lotiq/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { useLotIQ } from "@/contexts/LotIQContext";
import { IncidentStatusBadge } from "@/components/lotiq/StatusBadge";
import { incidentTypeIcons } from "@/lib/mock-data";
import { CheckCircle2, Truck, Clock, ChevronRight, Snowflake, Camera, ShieldAlert } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

export default function Dashboard() {
  const { stats, incidents } = useLotIQ();
  const navigate = useNavigate();

  const activeIncidents = incidents.filter(i => i.status === "active" || i.status === "escalated").slice(0, 4);

  // Attention items - combine urgent incidents
  const attentionItems = activeIncidents.map(inc => ({
    id: inc.id,
    property: inc.zone,
    label: inc.title,
    time: formatDistanceToNow(new Date(inc.timestamp), { addSuffix: true }),
    icon: incidentTypeIcons[inc.type],
    color: inc.status === "escalated" ? "border-l-destructive" : "border-l-[hsl(var(--lotiq-amber))]",
    labelColor: inc.status === "escalated" ? "text-destructive" : "text-[hsl(var(--lotiq-amber))]",
  }));

  return (
    <AppLayout title="Overview">
      {/* REQUIRES ATTENTION */}
      <section className="mb-6">
        <h3 className="text-[10px] md:text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
          Requires Attention
        </h3>
        <div className="space-y-2">
          {attentionItems.map((item) => (
            <Card
              key={item.id}
              className={`border-l-4 ${item.color} cursor-pointer hover:bg-muted/30 transition-colors`}
              onClick={() => navigate(`/incidents/${item.id}`)}
            >
              <CardContent className="p-3 md:p-4 flex items-center gap-3">
                <span className="text-lg md:text-xl">{item.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs md:text-sm font-semibold text-foreground truncate">{item.property}</p>
                  <p className={`text-[10px] md:text-xs font-medium ${item.labelColor}`}>{item.label}</p>
                  <p className="text-[10px] text-muted-foreground">{item.time}</p>
                </div>
              </CardContent>
            </Card>
          ))}
          {attentionItems.length === 0 && (
            <Card>
              <CardContent className="p-6 text-center text-sm text-muted-foreground">
                All clear — no items require attention
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* PENDING ACTIVATION */}
      <section className="mb-6">
        <h3 className="text-[10px] md:text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
          Pending Activation
        </h3>
        <button
          onClick={() => navigate("/property")}
          className="w-full rounded-xl bg-primary p-4 flex items-center gap-3 text-left hover:bg-primary/90 transition-colors"
        >
          <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
            <CheckCircle2 className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-primary-foreground">Property Ready</p>
            <p className="text-xs text-primary-foreground/70">Complete activation flow</p>
          </div>
          <ChevronRight className="h-5 w-5 text-primary-foreground/50" />
        </button>
      </section>

      {/* PORTFOLIO OVERVIEW */}
      <section className="mb-6">
        <h3 className="text-[10px] md:text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
          Portfolio Overview
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <OverviewStat
            icon={<ShieldAlert className="h-5 w-5 text-destructive" />}
            iconBg="bg-destructive/10"
            value={stats.activeIncidents}
            label="Active Violations"
          />
          <OverviewStat
            icon={<Truck className="h-5 w-5 text-[hsl(var(--lotiq-amber))]" />}
            iconBg="bg-[hsl(var(--lotiq-amber))]/10"
            value={stats.activeTows}
            label="Tows in Progress"
          />
          <OverviewStat
            icon={<Snowflake className="h-5 w-5 text-[hsl(var(--lotiq-blue))]" />}
            iconBg="bg-[hsl(var(--lotiq-blue))]/10"
            value={incidents.filter(i => i.type === "hazard" && i.status !== "resolved").length}
            label="Slip Risk Alerts"
          />
          <OverviewStat
            icon={<Camera className="h-5 w-5 text-primary" />}
            iconBg="bg-primary/10"
            value={`${stats.camerasOnline}/8`}
            label="Cameras Online"
          />
        </div>
      </section>

      {/* RECENT ACTIVITY - desktop gets more detail */}
      <section className="hidden md:block">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
          Recent Activity
        </h3>
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {incidents.slice(0, 6).map((incident) => (
                <button
                  key={incident.id}
                  onClick={() => navigate(`/incidents/${incident.id}`)}
                  className="w-full flex items-start gap-3 p-4 hover:bg-muted/50 transition-colors text-left"
                >
                  <span className="text-lg mt-0.5">{incidentTypeIcons[incident.type]}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-sm font-medium text-foreground truncate">{incident.title}</span>
                      <IncidentStatusBadge status={incident.status} />
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{incident.zone} · {incident.cameraName}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
                    <Clock className="h-3 w-3" />
                    {formatDistanceToNow(new Date(incident.timestamp), { addSuffix: true })}
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </AppLayout>
  );
}

function OverviewStat({ icon, iconBg, value, label }: { icon: React.ReactNode; iconBg: string; value: string | number; label: string }) {
  return (
    <Card>
      <CardContent className="p-4 flex flex-col items-center text-center gap-2">
        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl ${iconBg} flex items-center justify-center`}>
          {icon}
        </div>
        <p className="text-2xl md:text-3xl font-bold font-mono-data">{value}</p>
        <p className="text-[10px] md:text-xs text-muted-foreground">{label}</p>
      </CardContent>
    </Card>
  );
}
