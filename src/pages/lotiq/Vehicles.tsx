import { AppLayout } from "@/components/lotiq/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLotIQ } from "@/contexts/LotIQContext";
import { Badge } from "@/components/ui/badge";
import { Plus, Car } from "lucide-react";

export default function Vehicles() {
  const { authorizedParkers } = useLotIQ();
  const allVehicles = authorizedParkers.flatMap(p => p.vehicles.map(v => ({ ...v, ownerName: p.name, ownerEmail: p.email })));

  return (
    <AppLayout title="Vehicle Registry" subtitle={`${allVehicles.length} registered vehicles`}>
      <div className="flex justify-end mb-4">
        <Button size="sm"><Plus className="h-4 w-4 mr-1" /> Add Vehicle</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl">
        {allVehicles.map((v) => (
          <Card key={v.id} className="hover:border-primary/30 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 rounded-lg bg-muted">
                  <Car className="h-5 w-5 text-muted-foreground" />
                </div>
                {v.isPrimary && <Badge variant="secondary" className="text-[10px]">Primary</Badge>}
              </div>
              <p className="text-lg font-mono-data font-bold mb-1">{v.licensePlate}</p>
              <p className="text-sm text-foreground">{v.color} {v.make} {v.model}</p>
              <p className="text-xs text-muted-foreground mt-2">{v.ownerName}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </AppLayout>
  );
}
