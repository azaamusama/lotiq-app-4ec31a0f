import { AppLayout } from "@/components/lotiq/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Zap } from "lucide-react";

const features = [
  "AI-powered incident detection",
  "Unlimited cameras & zones",
  "Real-time monitoring dashboard",
  "Automated tow coordination",
  "Evidence capture & storage",
  "EV charging enforcement",
  "Slip & fall detection",
  "Snow operations tracking",
  "Role-based access control",
  "Audit trail & compliance",
];

export default function Pricing() {
  return (
    <AppLayout title="Pricing" subtitle="Simple, transparent pricing">
      <div className="max-w-lg mx-auto mt-8">
        <Card className="border-2 border-primary relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-primary" />
          <CardContent className="p-8">
            <div className="flex items-center gap-2 mb-6">
              <Zap className="h-5 w-5 text-primary" />
              <span className="text-sm font-semibold text-primary uppercase tracking-wide">LotIQ Pro</span>
            </div>

            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-5xl font-bold tracking-tight">$149</span>
              <span className="text-lg text-muted-foreground">/month</span>
            </div>
            <p className="text-sm text-muted-foreground mb-6">Per property · No hardware cost · One-time installation</p>

            <Button className="w-full mb-8" size="lg">Get Started</Button>

            <div className="space-y-3">
              {features.map(f => (
                <div key={f} className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 text-status-resolved shrink-0" />
                  <span className="text-sm">{f}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
