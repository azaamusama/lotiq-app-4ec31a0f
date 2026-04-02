import { useState } from "react";
import { AppLayout } from "@/components/lotiq/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Building2, MapPin, Settings2, Video, CreditCard, Rocket } from "lucide-react";

const steps = [
  { label: "Property", icon: Building2 },
  { label: "Zones", icon: MapPin },
  { label: "Use Cases", icon: Settings2 },
  { label: "Cameras", icon: Video },
  { label: "Plan", icon: CreditCard },
  { label: "Go Live", icon: Rocket },
];

const useCases = [
  { id: "parking", label: "Unauthorized Parking", desc: "Detect and enforce parking violations" },
  { id: "ev", label: "EV Charging", desc: "Monitor EV charging station misuse" },
  { id: "safety", label: "Slip & Fall", desc: "Detect safety incidents for liability" },
  { id: "snow", label: "Snow Operations", desc: "Track ploughing and salting activity" },
  { id: "hazard", label: "Hazard Detection", desc: "Identify surface hazards" },
];

export default function PropertySetup() {
  const [step, setStep] = useState(0);
  const [selectedUseCases, setSelectedUseCases] = useState<string[]>(["parking"]);

  const toggleUseCase = (id: string) => {
    setSelectedUseCases(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <AppLayout title="Property Setup" subtitle="Configure your property">
      {/* Progress - horizontal scroll on mobile */}
      <div className="flex items-center gap-1.5 md:gap-2 mb-6 md:mb-8 max-w-3xl overflow-x-auto pb-2 -mx-1 px-1">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center gap-1.5 md:gap-2 shrink-0">
            <button
              onClick={() => setStep(i)}
              className={`flex items-center gap-1.5 md:gap-2 px-2.5 md:px-3 py-1.5 md:py-2 rounded-lg text-[10px] md:text-xs font-medium transition-colors whitespace-nowrap ${
                i === step ? "bg-primary text-primary-foreground" :
                i < step ? "bg-status-resolved/10 text-status-resolved" :
                "bg-muted text-muted-foreground"
              }`}
            >
              {i < step ? <CheckCircle2 className="h-3 md:h-3.5 w-3 md:w-3.5" /> : <s.icon className="h-3 md:h-3.5 w-3 md:w-3.5" />}
              <span className="hidden sm:inline">{s.label}</span>
            </button>
            {i < steps.length - 1 && <div className="w-3 md:w-4 h-px bg-border" />}
          </div>
        ))}
      </div>

      <Card className="max-w-2xl">
        <CardContent className="p-4 md:p-6">
          {step === 0 && (
            <div className="space-y-4">
              <h3 className="text-base md:text-lg font-semibold">Property Details</h3>
              <div className="space-y-3">
                <div><Label>Property Name</Label><Input placeholder="Metro Plaza" defaultValue="Metro Plaza" /></div>
                <div><Label>Address</Label><Input placeholder="1250 Commerce Drive" defaultValue="1250 Commerce Drive, Austin, TX 78701" /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><Label>City</Label><Input defaultValue="Austin" /></div>
                  <div><Label>State</Label><Input defaultValue="TX" /></div>
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-base md:text-lg font-semibold">Parking Zones & Size</h3>
              <div className="space-y-3">
                <div><Label>Total Parking Spots</Label><Input type="number" defaultValue={120} /></div>
                <div><Label>Number of Zones</Label><Input type="number" defaultValue={4} /></div>
                <div><Label>EV Charging Spots</Label><Input type="number" defaultValue={8} /></div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-base md:text-lg font-semibold">Select Use Cases</h3>
              <div className="space-y-2">
                {useCases.map(uc => (
                  <button
                    key={uc.id}
                    onClick={() => toggleUseCase(uc.id)}
                    className={`w-full text-left p-3 md:p-4 rounded-lg border transition-colors ${
                      selectedUseCases.includes(uc.id) ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs md:text-sm font-medium">{uc.label}</p>
                        <p className="text-[10px] md:text-xs text-muted-foreground">{uc.desc}</p>
                      </div>
                      {selectedUseCases.includes(uc.id) && <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-base md:text-lg font-semibold">Camera Estimation</h3>
              <div className="p-4 md:p-6 rounded-lg bg-muted/50 text-center">
                <Video className="h-6 md:h-8 w-6 md:w-8 text-primary mx-auto mb-3" />
                <p className="text-xl md:text-2xl font-bold font-mono-data">8 cameras</p>
                <p className="text-xs md:text-sm text-muted-foreground mt-1">Recommended for your property size and use cases</p>
                <p className="text-[10px] md:text-xs text-muted-foreground mt-3">Based on 120 spots, 4 zones, {selectedUseCases.length} active use cases</p>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <h3 className="text-base md:text-lg font-semibold">Subscription</h3>
              <div className="p-4 md:p-6 rounded-lg border-2 border-primary">
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-2xl md:text-3xl font-bold">$149</span>
                  <span className="text-xs md:text-sm text-muted-foreground">/month</span>
                </div>
                <p className="text-xs md:text-sm text-muted-foreground mb-4">Everything included. No hardware costs.</p>
                <ul className="space-y-2 text-xs md:text-sm">
                  {["All detection use cases", "Unlimited incidents", "Real-time monitoring", "Tow coordination", "Evidence storage", "One-time installation included"].map(f => (
                    <li key={f} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-status-resolved shrink-0" />{f}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4 text-center py-4 md:py-6">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-status-resolved/10 flex items-center justify-center mx-auto">
                <Rocket className="h-6 md:h-8 w-6 md:w-8 text-status-resolved" />
              </div>
              <h3 className="text-base md:text-lg font-semibold">Ready to Go Live</h3>
              <p className="text-xs md:text-sm text-muted-foreground max-w-md mx-auto">
                Your property is configured. Once you activate, LotIQ will begin monitoring and detecting incidents in real-time.
              </p>
              <Button size="lg" className="mt-4">
                Activate LotIQ
              </Button>
            </div>
          )}

          {step < 5 && (
            <div className="flex justify-between mt-4 md:mt-6 pt-4 border-t">
              <Button variant="outline" disabled={step === 0} onClick={() => setStep(s => s - 1)}>Back</Button>
              <Button onClick={() => setStep(s => s + 1)}>Continue</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </AppLayout>
  );
}
