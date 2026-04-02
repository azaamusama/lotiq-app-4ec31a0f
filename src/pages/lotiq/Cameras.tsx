import { AppLayout } from "@/components/lotiq/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { useLotIQ } from "@/contexts/LotIQContext";
import { Badge } from "@/components/ui/badge";
import { Video, MapPin, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default function Cameras() {
  const { cameras } = useLotIQ();

  return (
    <AppLayout title="Cameras" subtitle={`${cameras.length} cameras configured`}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl">
        {cameras.map((cam) => (
          <Card key={cam.id} className={cam.status === "offline" ? "opacity-60" : ""}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 rounded-lg bg-muted">
                  <Video className="h-5 w-5 text-muted-foreground" />
                </div>
                <Badge variant={cam.status === "online" ? "default" : "secondary"} className="text-[10px] capitalize">
                  <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${cam.status === "online" ? "bg-status-online" : "bg-status-offline"}`} />
                  {cam.status}
                </Badge>
              </div>
              <h3 className="text-sm font-semibold mb-1">{cam.name}</h3>
              <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                <MapPin className="h-3 w-3" /> {cam.zone}
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" /> Last seen {formatDistanceToNow(new Date(cam.lastSeen), { addSuffix: true })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </AppLayout>
  );
}
