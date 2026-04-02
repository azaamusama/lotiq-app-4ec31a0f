import { AppLayout } from "@/components/lotiq/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLotIQ } from "@/contexts/LotIQContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserPlus, Mail, Phone, Car, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function People() {
  const { authorizedParkers, towingCompanies } = useLotIQ();

  return (
    <AppLayout title="People & Access" subtitle="Manage authorized users and partners">
      <Tabs defaultValue="parkers" className="max-w-4xl">
        <TabsList>
          <TabsTrigger value="parkers">Authorized Parkers</TabsTrigger>
          <TabsTrigger value="towing">Towing Companies</TabsTrigger>
        </TabsList>

        <TabsContent value="parkers">
          <div className="flex justify-between items-center mb-4 mt-2">
            <p className="text-sm text-muted-foreground">{authorizedParkers.length} authorized parkers</p>
            <Button size="sm"><UserPlus className="h-4 w-4 mr-1" /> Invite Parker</Button>
          </div>
          <div className="space-y-3">
            {authorizedParkers.map((parker) => (
              <Card key={parker.id}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-semibold text-primary">{parker.name.split(" ").map(n => n[0]).join("")}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold">{parker.name}</h4>
                      <p className="text-xs text-muted-foreground">{parker.email}</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Car className="h-3.5 w-3.5" />
                      {parker.vehicles.length} vehicle{parker.vehicles.length !== 1 ? "s" : ""}
                    </div>
                  </div>
                  {parker.vehicles.length > 0 && (
                    <div className="mt-3 pl-14 flex gap-2 flex-wrap">
                      {parker.vehicles.map(v => (
                        <span key={v.id} className="text-xs font-mono-data px-2 py-1 rounded bg-muted">
                          {v.licensePlate} {v.isPrimary && <Badge variant="secondary" className="text-[9px] ml-1">Primary</Badge>}
                        </span>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="towing">
          <div className="flex justify-between items-center mb-4 mt-2">
            <p className="text-sm text-muted-foreground">{towingCompanies.length} towing partners</p>
            <Button size="sm"><UserPlus className="h-4 w-4 mr-1" /> Invite Company</Button>
          </div>
          <div className="space-y-3">
            {towingCompanies.map((tc) => (
              <Card key={tc.id}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      <Truck className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-semibold">{tc.name}</h4>
                        <Badge variant={tc.status === "active" ? "default" : "secondary"} className="text-[10px] capitalize">
                          {tc.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                        <span className="flex items-center gap-1"><Mail className="h-3 w-3" />{tc.contactEmail}</span>
                        <span className="flex items-center gap-1"><Phone className="h-3 w-3" />{tc.phone}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-mono-data font-bold">{tc.completedJobs}</p>
                      <p className="text-[10px] text-muted-foreground">completed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
}
