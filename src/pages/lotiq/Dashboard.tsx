import { AppLayout } from "@/components/lotiq/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { useLotIQ } from "@/contexts/LotIQContext";
import { CheckCircle2, Truck, Snowflake, Camera, ShieldAlert, ChevronRight, AlertTriangle, Zap, Building2, Clock, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { statusIncidents, type VehicleStatus } from "@/lib/status-incidents";

const attentionStyleMap: Record<string, { icon: React.ReactNode; bg: string; border: string; labelColor: string; statusLabel: string }> = {
  violation: {
    icon: <AlertTriangle className="h-5 w-5 text-destructive" />,
    bg: "bg-destructive/10",
    border: "border-destructive/20",
    labelColor: "text-destructive",
    statusLabel: "Violation",
  },
  tow_requested: {
    icon: <Truck className="h-5 w-5 text-destructive" />,
    bg: "bg-destructive/10",
    border: "border-destructive/20",
    labelColor: "text-destructive",
    statusLabel: "Tow Requested",
  },
  trash_overflow: {
    icon: <Trash2 className="h-5 w-5 text-foreground" />,
    bg: "bg-muted",
    border: "border-border",
    labelColor: "text-foreground",
    statusLabel: "Trash Overflow",
  },
  grace: {
    icon: <Clock className="h-5 w-5 text-warning" />,
    bg: "bg-warning/10",
    border: "border-warning/20",
    labelColor: "text-warning",
    statusLabel: "Grace Period",
  },
  ev: {
    icon: <Zap className="h-5 w-5 text-warning" />,
    bg: "bg-warning/10",
    border: "border-warning/20",
    labelColor: "text-warning",
    statusLabel: "EV Issue",
  },
};

const attentionStatuses: VehicleStatus[] = ["violation", "tow_requested", "trash_overflow", "grace", "ev"];

export default function Dashboard() {
  const { stats, incidents, towJobs } = useLotIQ();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from("profiles")
          .select("first_name")
          .eq("user_id", user.id)
          .single();
        if (data?.first_name) {
          setFirstName(data.first_name);
        }
      }
    };
    fetchProfile();
  }, []);

  // Pull attention items from the shared status incidents data
  const attentionItems = statusIncidents
    .filter(inc => attentionStatuses.includes(inc.status))
    .map(inc => {
      const style = attentionStyleMap[inc.status];
      return {
        id: inc.id,
        property: inc.zone,
        label: inc.description,
        status: style?.statusLabel || inc.status,
        time: inc.time,
        icon: style?.icon,
        bg: style?.bg || "bg-muted",
        border: style?.border || "border-border",
        labelColor: style?.labelColor || "text-foreground",
        onClick: () => navigate(`/incidents/${inc.id}`),
      };
    });

  return (
    <AppLayout title={firstName ? `Hi, ${firstName}` : "Hi there"}>
      {/* REQUIRES ATTENTION */}
      <section className="mb-6">
        <h3 className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Requires Attention
        </h3>
        <div className="space-y-2.5">
          {attentionItems.map((item) => (
            <Card
              key={item.id}
              className={`border ${item.border} cursor-pointer hover:shadow-elevated transition-all`}
              onClick={item.onClick}
            >
              <CardContent className="p-3.5 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center shrink-0`}>
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-foreground truncate">{item.property}</p>
                    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${item.bg} ${item.labelColor} shrink-0`}>
                      {item.status}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{item.label}</p>
                  <p className="text-[10px] text-muted-foreground">{item.time}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
              </CardContent>
            </Card>
          ))}
          {attentionItems.length === 0 && (
            <Card className="shadow-card">
              <CardContent className="p-6 text-center text-sm text-muted-foreground">
                All clear — no items require attention
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* PENDING ACTIVATION */}
      <section className="mb-6">
        <h3 className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Pending Activation
        </h3>
        <button
          onClick={() => navigate("/activation-review")}
          className="w-full rounded-xl bg-primary p-4 flex items-center gap-3 text-left hover:bg-primary/90 transition-all shadow-elevated hover:shadow-float"
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
        <h3 className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-3">
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
            icon={<Truck className="h-5 w-5 text-warning" />}
            iconBg="bg-warning/10"
            value={stats.activeTows}
            label="Tows in Progress"
          />
          <OverviewStat
            icon={<Snowflake className="h-5 w-5 text-primary" />}
            iconBg="bg-primary/10"
            value={incidents.filter(i => i.type === "hazardous_condition" && i.status !== "resolved").length}
            label="Slip Risk Alerts"
          />
          <OverviewStat
            icon={<Camera className="h-5 w-5 text-success" />}
            iconBg="bg-success/10"
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
    <Card className="shadow-card hover:shadow-elevated transition-shadow">
      <CardContent className="p-4 flex flex-col items-start gap-2.5">
        <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center`}>
          {icon}
        </div>
        <p className="text-2xl font-bold font-mono-data tracking-tight">{value}</p>
        <p className="text-[11px] text-muted-foreground">{label}</p>
      </CardContent>
    </Card>
  );
}
