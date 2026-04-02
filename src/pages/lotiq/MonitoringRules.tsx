import { useState } from "react";
import { AppLayout } from "@/components/lotiq/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Zap, Moon, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface MonitoringRule {
  id: string;
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  description: string;
  enabled: boolean;
  schedule?: string;
}

const gracePeriodOptions = ["Immediately", "15 min", "30 min", "1 hour"];

export default function MonitoringRules() {
  const navigate = useNavigate();
  const [monitoringOn, setMonitoringOn] = useState(true);
  const [gracePeriod, setGracePeriod] = useState("15 min");
  const [rules, setRules] = useState<MonitoringRule[]>([
    {
      id: "ev",
      icon: <Zap className="h-5 w-5 text-muted-foreground" />,
      iconBg: "bg-muted",
      title: "EV Enforcement",
      description: "Enforce charging requirement for EV spots",
      enabled: true,
    },
    {
      id: "parking",
      icon: <Moon className="h-5 w-5 text-muted-foreground" />,
      iconBg: "bg-muted",
      title: "Parking Enforcement Schedule",
      description: "Enforce parking rules from 10 PM to 6 AM",
      enabled: true,
      schedule: "22:00 - 06:00 · Mon, Tue, Wed, Thu, Fri, Sat, Sun",
    },
    {
      id: "trash",
      icon: <Zap className="h-5 w-5 text-muted-foreground" />,
      iconBg: "bg-muted",
      title: "Trash Detection",
      description: "Detect litter and illegal dumping",
      enabled: false,
    },
    {
      id: "weather",
      icon: <Zap className="h-5 w-5 text-muted-foreground" />,
      iconBg: "bg-muted",
      title: "Weather Detection",
      description: "Adapt rules to weather conditions",
      enabled: false,
    },
  ]);

  const toggleRule = (id: string) => {
    setRules(prev => prev.map(r => r.id === id ? { ...r, enabled: !r.enabled } : r));
  };

  return (
    <AppLayout
      title="Monitoring Rules"
      headerLeft={
        <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center">
          <ArrowLeft className="h-4 w-4 text-foreground" />
        </button>
      }
    >
      {/* MONITORING MASTER TOGGLE */}
      <section className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
            Monitoring
          </h3>
          <Switch checked={monitoringOn} onCheckedChange={setMonitoringOn} />
        </div>

        <Card className={monitoringOn ? "" : "opacity-50 pointer-events-none"}>
          <CardContent className="p-0 divide-y">
            {rules.map((rule) => (
              <div key={rule.id}>
                <div className="flex items-center gap-3 p-4">
                  <div className={`w-10 h-10 rounded-xl ${rule.iconBg} flex items-center justify-center shrink-0`}>
                    {rule.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground">{rule.title}</p>
                    <p className="text-xs text-muted-foreground">{rule.description}</p>
                  </div>
                  <Switch checked={rule.enabled} onCheckedChange={() => toggleRule(rule.id)} />
                </div>
                {rule.schedule && rule.enabled && (
                  <div className="px-4 pb-4">
                    <div className="flex items-center gap-2 bg-muted rounded-lg px-3 py-2.5">
                      <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
                      <span className="text-xs text-muted-foreground">{rule.schedule}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      {/* TOW POLICY */}
      <section className="mb-6">
        <h3 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-3">
          Tow Policy
        </h3>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[hsl(var(--lotiq-amber))]/10 flex items-center justify-center shrink-0">
                <Clock className="h-5 w-5 text-[hsl(var(--lotiq-amber))]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">Grace Period</p>
                <p className="text-xs text-muted-foreground">Time before tow request is issued</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {gracePeriodOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => setGracePeriod(option)}
                  className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 text-sm font-medium transition-colors ${
                    gracePeriod === option
                      ? "border-primary text-primary bg-primary/5"
                      : "border-border text-muted-foreground hover:border-primary/30"
                  }`}
                >
                  {gracePeriod === option && (
                    <div className="w-4 h-4 rounded-full border-2 border-primary flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                  )}
                  {gracePeriod !== option && (
                    <div className="w-4 h-4 rounded-full border-2 border-muted-foreground/30" />
                  )}
                  {option}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </AppLayout>
  );
}
