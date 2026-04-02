import { AppLayout } from "@/components/lotiq/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useLotIQ } from "@/contexts/LotIQContext";
import { incidentTypeLabels, incidentTypeIcons } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";

export default function Rules() {
  const { rules, toggleRule } = useLotIQ();

  return (
    <AppLayout title="Rules Engine" subtitle="Configure detection and enforcement rules">
      <div className="space-y-3 max-w-3xl">
        {rules.map((rule) => (
          <Card key={rule.id} className={!rule.enabled ? "opacity-60" : ""}>
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <span className="text-xl mt-0.5">{incidentTypeIcons[rule.type]}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-semibold">{rule.name}</h3>
                    <Badge variant="secondary" className="text-[10px]">
                      {incidentTypeLabels[rule.type]}
                    </Badge>
                    {rule.towPolicy === "grace_period" && rule.gracePeriodMinutes && (
                      <Badge variant="outline" className="text-[10px]">
                        {rule.gracePeriodMinutes} min grace
                      </Badge>
                    )}
                    {rule.towPolicy === "instant" && (
                      <Badge variant="outline" className="text-[10px]">Instant</Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{rule.description}</p>
                </div>
                <Switch checked={rule.enabled} onCheckedChange={() => toggleRule(rule.id)} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </AppLayout>
  );
}
