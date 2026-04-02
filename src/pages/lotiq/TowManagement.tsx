import { AppLayout } from "@/components/lotiq/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLotIQ } from "@/contexts/LotIQContext";
import { TowStatusBadge } from "@/components/lotiq/StatusBadge";
import { towStatusLabels, TowStatus } from "@/lib/mock-data";
import { format } from "date-fns";
import { Truck, ArrowRight } from "lucide-react";

const statusFlow: TowStatus[] = ["requested", "accepted", "en_route", "arrived", "completed"];

export default function TowManagement() {
  const { towJobs, updateTowStatus } = useLotIQ();

  const getNextStatus = (current: TowStatus): TowStatus | null => {
    const idx = statusFlow.indexOf(current);
    if (idx === -1 || idx >= statusFlow.length - 1) return null;
    return statusFlow[idx + 1];
  };

  const active = towJobs.filter(t => !["completed", "cancelled"].includes(t.status));
  const history = towJobs.filter(t => ["completed", "cancelled"].includes(t.status));

  return (
    <AppLayout title="Tow Management" subtitle="Track and manage tow operations">
      {/* Active */}
      <div className="mb-6 md:mb-8">
        <h3 className="text-xs md:text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Active Operations</h3>
        {active.length === 0 ? (
          <Card><CardContent className="p-6 md:p-8 text-center text-sm text-muted-foreground">No active tow operations</CardContent></Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {active.map((tow) => {
              const next = getNextStatus(tow.status);
              return (
                <Card key={tow.id} className="border-l-4 border-l-primary">
                  <CardContent className="p-4 md:p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-base md:text-lg font-mono-data font-bold">{tow.licensePlate}</span>
                      <TowStatusBadge status={tow.status} />
                    </div>
                    <p className="text-xs md:text-sm text-muted-foreground mb-1">{tow.vehicleDescription}</p>
                    <p className="text-[10px] md:text-xs text-muted-foreground mb-3 md:mb-4">{tow.towingCompany}</p>

                    {/* Progress */}
                    <div className="flex items-center gap-1 mb-3 md:mb-4">
                      {statusFlow.map((s, i) => (
                        <div key={s} className="flex items-center gap-1 flex-1">
                          <div className={`h-1.5 flex-1 rounded-full ${statusFlow.indexOf(tow.status) >= i ? "bg-primary" : "bg-muted"}`} />
                        </div>
                      ))}
                    </div>

                    {/* Timeline */}
                    <div className="space-y-1.5 mb-3 md:mb-4">
                      {tow.timeline.slice(-3).map((e, i) => (
                        <p key={i} className="text-[10px] md:text-xs text-muted-foreground">
                          <span className="font-medium text-foreground">{e.action}</span> · {format(new Date(e.timestamp), "h:mm a")}
                        </p>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      {next && (
                        <Button size="sm" onClick={() => updateTowStatus(tow.id, next)} className="flex-1 text-xs md:text-sm">
                          <ArrowRight className="h-3.5 w-3.5 mr-1" />
                          Mark {towStatusLabels[next]}
                        </Button>
                      )}
                      <Button size="sm" variant="outline" onClick={() => updateTowStatus(tow.id, "cancelled")} className="text-xs md:text-sm">
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* History */}
      <div>
        <h3 className="text-xs md:text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">History</h3>
        <div className="space-y-2">
          {history.map((tow) => (
            <Card key={tow.id}>
              <CardContent className="p-3 md:p-4 flex items-center gap-3 md:gap-4">
                <Truck className="h-4 w-4 text-muted-foreground shrink-0" />
                <div className="flex-1 min-w-0">
                  <span className="text-xs md:text-sm font-mono-data font-medium">{tow.licensePlate}</span>
                  <span className="text-[10px] md:text-xs text-muted-foreground ml-2 hidden sm:inline">{tow.towingCompany}</span>
                </div>
                <TowStatusBadge status={tow.status} />
                <span className="text-[10px] md:text-xs text-muted-foreground shrink-0">{format(new Date(tow.updatedAt), "MMM d, h:mm a")}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
