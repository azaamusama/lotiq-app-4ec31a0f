import { AppLayout } from "@/components/lotiq/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Camera, Wifi, WifiOff, AlertTriangle, Truck, ChevronRight, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface PropertyItem {
  id: string;
  name: string;
  address: string;
  status: "active" | "inactive";
  cameras: number;
  camerasOnline: number;
  violations: number;
  towRequested: number;
  healthCritical?: boolean;
}

const mockProperties: PropertyItem[] = [
  {
    id: "prop-1",
    name: "Maple Heights Apt",
    address: "1200 Maple Ave, Suite 100",
    status: "active",
    cameras: 5,
    camerasOnline: 4,
    violations: 3,
    towRequested: 1,
  },
  {
    id: "prop-2",
    name: "Sunset Gardens",
    address: "500 Main Street",
    status: "active",
    cameras: 5,
    camerasOnline: 5,
    violations: 3,
    towRequested: 1,
    healthCritical: true,
  },
  {
    id: "prop-3",
    name: "Riverside Office",
    address: "800 River Road",
    status: "active",
    cameras: 5,
    camerasOnline: 0,
    violations: 0,
    towRequested: 0,
  },
];

export default function Properties() {
  const navigate = useNavigate();

  return (
    <AppLayout
      title="Properties"
      headerRight={
        <Button size="icon" className="h-9 w-9 rounded-xl">
          <Plus className="h-5 w-5" />
        </Button>
      }
    >
      <div className="space-y-3">
        {mockProperties.map((prop) => {
          const allOnline = prop.camerasOnline === prop.cameras;
          const allOffline = prop.camerasOnline === 0;

          return (
            <Card
              key={prop.id}
              className="cursor-pointer hover:bg-muted/30 transition-colors"
              onClick={() => navigate(`/property/${prop.id}`)}
            >
              <CardContent className="p-4">
                {/* Top row: icon + name/address + status badge + chevron */}
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Building2 className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{prop.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{prop.address}</p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="text-[10px] font-medium px-2.5 py-1 rounded-full bg-[hsl(var(--lotiq-green))]/10 text-[hsl(var(--lotiq-green))] capitalize">
                      {prop.status}
                    </span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>

                {/* Camera row */}
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2 pb-2 border-b border-border/50">
                  <span className="flex items-center gap-1">
                    <Camera className="h-3.5 w-3.5" />
                    {prop.cameras} cameras
                  </span>
                  <span className={`flex items-center gap-1 font-medium ${
                    allOnline ? "text-[hsl(var(--lotiq-green))]" :
                    allOffline ? "text-destructive" :
                    "text-[hsl(var(--lotiq-amber))]"
                  }`}>
                    {allOffline ? (
                      <WifiOff className="h-3.5 w-3.5" />
                    ) : (
                      <Wifi className="h-3.5 w-3.5" />
                    )}
                    {allOnline ? "All online" : allOffline ? "All Offline" : `${prop.camerasOnline} online`}
                  </span>
                </div>

                {/* Stats row */}
                <div className="flex items-center gap-3 flex-wrap">
                  {prop.violations > 0 && (
                    <span className="flex items-center gap-1 text-xs font-medium text-destructive">
                      <AlertTriangle className="h-3.5 w-3.5" />
                      {prop.violations} violations
                    </span>
                  )}
                  {prop.towRequested > 0 && (
                    <span className="flex items-center gap-1 text-xs font-medium text-[hsl(var(--lotiq-amber))]">
                      <Truck className="h-3.5 w-3.5" />
                      {prop.towRequested} tow requested
                    </span>
                  )}
                  {prop.healthCritical && (
                    <span className="flex items-center gap-1 text-xs font-medium text-destructive">
                      <Building2 className="h-3.5 w-3.5" />
                      Health Critical
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </AppLayout>
  );
}
