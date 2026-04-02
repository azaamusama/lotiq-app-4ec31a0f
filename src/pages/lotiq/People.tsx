import { AppLayout } from "@/components/lotiq/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
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
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="parkers" className="flex-1 sm:flex-none text-xs md:text-sm">Authorized Parkers</TabsTrigger>
          <TabsTrigger value="towing" className="flex-1 sm:flex-none text-xs md:text-sm">Towing Companies</TabsTrigger>
        </TabsList>

        <TabsContent value="parkers">
          <div className="flex justify-between items-center mb-4 mt-2">
            <p className="text-xs md:text-sm text-muted-foreground">{authorizedParkers.length} authorized parkers</p>
            <Button size="sm" className="text-xs md:text-sm"><UserPlus className="h-4 w-4 mr-1" /> <span className="hidden sm:inline">Invite Parker</span><span className="sm:hidden">Invite</span></Button>
          </div>
          <div className="space-y-3">
            {authorizedParkers.map((parker) => (
              <Card key={parker.id}>
                <CardContent className="p-3 md:p-4">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="text-[10px] md:text-sm font-semibold text-primary">{parker.name.split(" ").map(n => n[0]).join("")}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs md:text-sm font-semibold truncate">{parker.name}</h4>
                      <p className="text-[10px] md:text-xs text-muted-foreground truncate">{parker.email}</p>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] md:text-xs text-muted-foreground shrink-0">
                      <Car className="h-3.5 w-3.5" />
                      {parker.vehicles.length}
                    </div>
                  </div>
                  {parker.vehicles.length > 0 && (
                    <div className="mt-2 md:mt-3 pl-11 md:pl-14 flex gap-1.5 md:gap-2 flex-wrap">
                      {parker.vehicles.map(v => (
                        <span key={v.id} className="text-[10px] md:text-xs font-mono-data px-1.5 md:px-2 py-0.5 md:py-1 rounded bg-muted">
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
            <p className="text-xs md:text-sm text-muted-foreground">{towingCompanies.length} towing partners</p>
            <Button size="sm" className="text-xs md:text-sm"><UserPlus className="h-4 w-4 mr-1" /> <span className="hidden sm:inline">Invite Company</span><span className="sm:hidden">Invite</span></Button>
          </div>
          <div className="space-y-3">
            {towingCompanies.map((tc) => (
              <Card key={tc.id}>
                <CardContent className="p-3 md:p-4">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-muted flex items-center justify-center shrink-0">
                      <Truck className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-xs md:text-sm font-semibold">{tc.name}</h4>
                        <Badge variant={tc.status === "active" ? "default" : "secondary"} className="text-[10px] capitalize">
                          {tc.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 md:gap-3 text-[10px] md:text-xs text-muted-foreground mt-0.5 flex-wrap">
                        <span className="flex items-center gap-1"><Mail className="h-3 w-3" /><span className="truncate max-w-[120px] md:max-w-none">{tc.contactEmail}</span></span>
                        <span className="flex items-center gap-1 hidden sm:flex"><Phone className="h-3 w-3" />{tc.phone}</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-base md:text-lg font-mono-data font-bold">{tc.completedJobs}</p>
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
