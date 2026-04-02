import { AppLayout } from "@/components/lotiq/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLotIQ } from "@/contexts/LotIQContext";
import { IncidentStatusBadge } from "@/components/lotiq/StatusBadge";
import { incidentTypeLabels, incidentTypeIcons } from "@/lib/mock-data";
import { AlertTriangle, CheckCircle2, Video, Truck, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

export default function Dashboard() {
  const { stats, incidents, towJobs } = useLotIQ();
  const navigate = useNavigate();

  const recentIncidents = incidents.slice(0, 8);
  const activeTows = towJobs.filter(t => !["completed", "cancelled"].includes(t.status));

  return (
    <AppLayout title="Dashboard" subtitle="Real-time property overview">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6">
        <StatCard icon={<AlertTriangle className="h-4 w-4 text-status-escalated" />} label="Active Incidents" value={stats.activeIncidents} accent="border-l-status-escalated" />
        <StatCard icon={<CheckCircle2 className="h-4 w-4 text-status-resolved" />} label="Resolved Today" value={stats.resolvedToday} accent="border-l-status-resolved" />
        <StatCard icon={<Video className="h-4 w-4 text-primary" />} label="Cameras Online" value={`${stats.camerasOnline}/8`} accent="border-l-primary" />
        <StatCard icon={<Truck className="h-4 w-4 text-status-active" />} label="Active Tows" value={stats.activeTows} accent="border-l-status-active" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Incident Feed */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-3 px-3 md:px-6">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm md:text-base font-semibold">Live Incident Feed</CardTitle>
                <button onClick={() => navigate("/incidents")} className="text-xs text-primary hover:underline font-medium">
                  View all →
                </button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {recentIncidents.map((incident) => (
                  <button
                    key={incident.id}
                    onClick={() => navigate(`/incidents/${incident.id}`)}
                    className="w-full flex items-start gap-2 md:gap-3 p-3 md:p-4 hover:bg-muted/50 transition-colors text-left"
                  >
                    <span className="text-base md:text-lg mt-0.5">{incidentTypeIcons[incident.type]}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 md:gap-2 mb-0.5 flex-wrap">
                        <span className="text-xs md:text-sm font-medium text-foreground truncate">{incident.title}</span>
                        <IncidentStatusBadge status={incident.status} />
                      </div>
                      <p className="text-[10px] md:text-xs text-muted-foreground truncate">{incident.zone} · {incident.cameraName}</p>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] md:text-xs text-muted-foreground shrink-0">
                      <Clock className="h-3 w-3 hidden sm:block" />
                      {formatDistanceToNow(new Date(incident.timestamp), { addSuffix: true })}
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Active Tows */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3 px-3 md:px-6">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm md:text-base font-semibold">Active Tows</CardTitle>
                <button onClick={() => navigate("/towing")} className="text-xs text-primary hover:underline font-medium">
                  View all →
                </button>
              </div>
            </CardHeader>
            <CardContent className="px-3 md:px-6">
              {activeTows.length === 0 ? (
                <p className="text-sm text-muted-foreground py-4 text-center">No active tow operations</p>
              ) : (
                <div className="space-y-3">
                  {activeTows.map((tow) => (
                    <div key={tow.id} className="p-3 rounded-lg border bg-muted/30">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium font-mono-data">{tow.licensePlate}</span>
                        <span className="text-[10px] md:text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium capitalize">{tow.status.replace("_", " ")}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{tow.towingCompany}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Stats by Type */}
          <Card>
            <CardHeader className="pb-3 px-3 md:px-6">
              <CardTitle className="text-sm md:text-base font-semibold">By Category</CardTitle>
            </CardHeader>
            <CardContent className="px-3 md:px-6">
              <div className="space-y-2">
                {(Object.keys(incidentTypeLabels) as Array<keyof typeof incidentTypeLabels>).map((type) => {
                  const count = incidents.filter(i => i.type === type && (i.status === "active" || i.status === "escalated")).length;
                  return (
                    <div key={type} className="flex items-center justify-between py-1">
                      <span className="text-xs text-muted-foreground flex items-center gap-2">
                        <span>{incidentTypeIcons[type]}</span>
                        {incidentTypeLabels[type]}
                      </span>
                      <span className="text-xs font-mono-data font-medium">{count}</span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}

function StatCard({ icon, label, value, accent }: { icon: React.ReactNode; label: string; value: string | number; accent: string }) {
  return (
    <Card className={`border-l-4 ${accent}`}>
      <CardContent className="p-3 md:p-4">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="p-1.5 md:p-2 rounded-lg bg-muted">{icon}</div>
          <div>
            <p className="text-lg md:text-2xl font-bold font-mono-data">{value}</p>
            <p className="text-[10px] md:text-xs text-muted-foreground">{label}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
