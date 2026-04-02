import { AppLayout } from "@/components/lotiq/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { useLotIQ } from "@/contexts/LotIQContext";
import { CheckCircle2, Truck, Snowflake, Camera, ShieldAlert, ChevronRight, AlertTriangle, Zap, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

const attentionIconMap: Record<string, { icon: React.ReactNode; bg: string; border: string; labelColor: string }> = {
  escalated: {
    icon: <AlertTriangle className="h-5 w-5 text-destructive" />,
    bg: "bg-destructive/10",
    border: "border-destructive/40",
    labelColor: "text-destructive",
  },
  active: {
    icon: <Zap className="h-5 w-5 text-[hsl(var(--lotiq-amber))]" />,
    bg: "bg-[hsl(var(--lotiq-amber))]/10",
    border: "border-[hsl(var(--lotiq-amber))]/40",
    labelColor: "text-[hsl(var(--lotiq-amber))]",
  },
  tow: {
    icon: <Truck className="h-5 w-5 text-[hsl(var(--lotiq-amber))]" />,
    bg: "bg-[hsl(var(--lotiq-amber))]/10",
    border: "border-[hsl(var(--lotiq-amber))]/40",
    labelColor: "text-[hsl(var(--lotiq-amber))]",
  },
  health: {
    icon: <Building2 className="h-5 w-5 text-destructive" />,
    bg: "bg-destructive/10",
    border: "border-destructive/40",
    labelColor: "text-destructive",
  },
};

export default function Dashboard() {
  const { stats, incidents, towJobs } = useLotIQ();
  const navigate = useNavigate();

  // Build attention items from active/escalated incidents + active tows
  const activeIncidents = incidents.filter(i => i.status === "active" || i.status === "escalated").slice(0, 3);
  const activeTowItems = towJobs.filter(t => !["completed", "cancelled"].includes(t.status)).slice(0, 1);

  const attentionItems = [
    ...activeIncidents.map(inc => {
      const style = inc.status === "escalated" ? attentionIconMap.escalated : attentionIconMap.active;
      return {
        id: inc.id,
        property: inc.zone,
        label: inc.title,
        time: formatDistanceToNow(new Date(inc.timestamp), { addSuffix: true }),
        ...style,
        onClick: () => navigate(`/incidents/${inc.id}`),
      };
    }),
    ...activeTowItems.map(tow => {
      const style = attentionIconMap.tow;
      return {
        id: tow.id,
        property: tow.vehicleDescription,
        label: "Tow in progress",
        time: formatDistanceToNow(new Date(tow.requestedAt), { addSuffix: true }),
        ...style,
        onClick: () => navigate("/towing"),
      };
    }),
    // Add a property health item
    {
      id: "health-1",
      property: incidents[0]?.zone || "Main Property",
      label: "Property health 65%",
      time: "5 minutes ago",
      ...attentionIconMap.health,
      onClick: () => navigate("/property"),
    },
  ];

  return (
    <AppLayout title="Overview">
      {/* REQUIRES ATTENTION */}
      <section className="mb-6">
        <h3 className="text-[10px] md:text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
          Requires Attention
        </h3>
        <div className="space-y-2.5">
          {attentionItems.map((item) => (
            <Card
              key={item.id}
              className={`border-2 ${item.border} cursor-pointer hover:bg-muted/30 transition-colors`}
              onClick={item.onClick}
            >
              <CardContent className="p-3 md:p-4 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center shrink-0`}>
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{item.property}</p>
                  <p className={`text-xs font-medium ${item.labelColor}`}>{item.label}</p>
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
          <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
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
            value={incidents.filter(i => i.type === "hazardous_condition" && i.status !== "resolved").length}
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
    </AppLayout>
  );
}

function OverviewStat({ icon, iconBg, value, label }: { icon: React.ReactNode; iconBg: string; value: string | number; label: string }) {
  return (
    <Card>
      <CardContent className="p-4 flex flex-col items-start gap-2">
        <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center`}>
          {icon}
        </div>
        <p className="text-2xl font-bold font-mono-data">{value}</p>
        <p className="text-[10px] md:text-xs text-muted-foreground">{label}</p>
      </CardContent>
    </Card>
  );
}
