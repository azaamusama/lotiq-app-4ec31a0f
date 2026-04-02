import { useState } from "react";
import { AppLayout } from "@/components/lotiq/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLotIQ } from "@/contexts/LotIQContext";
import { IncidentStatusBadge } from "@/components/lotiq/StatusBadge";
import { incidentTypeLabels, incidentTypeIcons, IncidentType, IncidentStatus } from "@/lib/mock-data";
import { Clock, Camera, MapPin, Shield, Truck, CheckCircle2, ArrowLeft } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { formatDistanceToNow, format } from "date-fns";

export default function Incidents() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { incidents, requestTow, resolveIncident } = useLotIQ();
  const [filterType, setFilterType] = useState<IncidentType | "all">("all");
  const [filterStatus, setFilterStatus] = useState<IncidentStatus | "all">("all");

  if (id) {
    const incident = incidents.find(i => i.id === id);
    if (!incident) return <AppLayout title="Incident Not Found"><p>Incident not found.</p></AppLayout>;

    return (
      <AppLayout title={`Incident ${incident.id}`} subtitle={incident.title}>
        <button onClick={() => navigate("/incidents")} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="h-4 w-4" /> Back to incidents
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {/* Header Card */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{incidentTypeIcons[incident.type]}</span>
                      <h3 className="text-lg font-semibold">{incident.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{incident.description}</p>
                  </div>
                  <IncidentStatusBadge status={incident.status} />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t">
                  <Detail icon={<Clock className="h-3.5 w-3.5" />} label="Detected" value={format(new Date(incident.timestamp), "MMM d, h:mm a")} />
                  <Detail icon={<Camera className="h-3.5 w-3.5" />} label="Camera" value={incident.cameraName} />
                  <Detail icon={<MapPin className="h-3.5 w-3.5" />} label="Zone" value={incident.zone} />
                  <Detail icon={<Shield className="h-3.5 w-3.5" />} label="Rule" value={incident.ruleTriggered} />
                </div>

                {incident.licensePlate && (
                  <div className="mt-4 p-3 rounded-lg bg-muted/50">
                    <span className="text-xs text-muted-foreground">License Plate</span>
                    <p className="text-lg font-mono-data font-bold">{incident.licensePlate}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Evidence */}
            <Card>
              <CardContent className="p-6">
                <h4 className="text-sm font-semibold mb-3">Evidence</h4>
                <div className="grid grid-cols-2 gap-3">
                  {incident.images.map((img, i) => (
                    <div key={i} className="aspect-video rounded-lg bg-muted flex items-center justify-center border">
                      <span className="text-xs text-muted-foreground">Capture {i + 1}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Timeline & Actions */}
          <div className="space-y-4">
            {/* Actions */}
            {incident.status !== "resolved" && (
              <Card>
                <CardContent className="p-4 space-y-2">
                  <h4 className="text-sm font-semibold mb-2">Actions</h4>
                  {incident.licensePlate && !incident.towJobId && (
                    <Button className="w-full" onClick={() => requestTow(incident.id)}>
                      <Truck className="h-4 w-4 mr-2" /> Request Tow
                    </Button>
                  )}
                  <Button variant="outline" className="w-full" onClick={() => resolveIncident(incident.id)}>
                    <CheckCircle2 className="h-4 w-4 mr-2" /> Resolve Incident
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Timeline */}
            <Card>
              <CardContent className="p-4">
                <h4 className="text-sm font-semibold mb-3">Timeline</h4>
                <div className="space-y-3">
                  {incident.timeline.map((event, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-2 h-2 rounded-full bg-primary mt-1.5" />
                        {i < incident.timeline.length - 1 && <div className="w-px flex-1 bg-border mt-1" />}
                      </div>
                      <div className="pb-3">
                        <p className="text-sm font-medium">{event.action}</p>
                        <p className="text-xs text-muted-foreground">{event.actor} · {format(new Date(event.timestamp), "h:mm a")}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </AppLayout>
    );
  }

  // List view
  const filtered = incidents.filter(i =>
    (filterType === "all" || i.type === filterType) &&
    (filterStatus === "all" || i.status === filterStatus)
  );

  return (
    <AppLayout title="Incidents" subtitle={`${incidents.length} total incidents`}>
      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        <FilterChip active={filterType === "all"} onClick={() => setFilterType("all")}>All Types</FilterChip>
        {(Object.keys(incidentTypeLabels) as IncidentType[]).map(type => (
          <FilterChip key={type} active={filterType === type} onClick={() => setFilterType(type)}>
            {incidentTypeIcons[type]} {incidentTypeLabels[type]}
          </FilterChip>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 mb-6">
        {(["all", "active", "escalated", "monitoring", "resolved"] as const).map(s => (
          <FilterChip key={s} active={filterStatus === s} onClick={() => setFilterStatus(s)}>
            {s === "all" ? "All Status" : s.charAt(0).toUpperCase() + s.slice(1)}
          </FilterChip>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map((incident) => (
          <Card key={incident.id} className="hover:border-primary/30 transition-colors cursor-pointer" onClick={() => navigate(`/incidents/${incident.id}`)}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <span className="text-lg">{incidentTypeIcons[incident.type]}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-medium">{incident.title}</span>
                    <IncidentStatusBadge status={incident.status} />
                  </div>
                  <p className="text-xs text-muted-foreground">{incident.zone} · {incident.cameraName} · {incidentTypeLabels[incident.type]}</p>
                </div>
                {incident.licensePlate && (
                  <span className="text-xs font-mono-data font-medium px-2 py-1 rounded bg-muted">{incident.licensePlate}</span>
                )}
                <span className="text-xs text-muted-foreground shrink-0">
                  {formatDistanceToNow(new Date(incident.timestamp), { addSuffix: true })}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </AppLayout>
  );
}

function Detail({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div>
      <div className="flex items-center gap-1 text-muted-foreground mb-0.5">{icon}<span className="text-[10px] uppercase tracking-wide">{label}</span></div>
      <p className="text-sm font-medium">{value}</p>
    </div>
  );
}

function FilterChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${
        active ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border hover:border-primary/30"
      }`}
    >
      {children}
    </button>
  );
}
