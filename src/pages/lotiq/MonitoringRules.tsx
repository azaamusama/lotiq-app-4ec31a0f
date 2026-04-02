import { useState } from "react";
import { AppLayout } from "@/components/lotiq/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  ArrowLeft, Zap, Moon, Clock, Trash2, CloudSnow,
  ShieldCheck, ChevronDown, ChevronUp, Bell, AlertTriangle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface MonitoringRule {
  id: string;
  icon: React.ReactNode;
  iconBg: string;
  activeIconBg: string;
  title: string;
  description: string;
  enabled: boolean;
  schedule?: string;
  detections?: number;
}

const gracePeriodOptions = [
  { label: "Immediately", value: "immediately" },
  { label: "15 min", value: "15min" },
  { label: "30 min", value: "30min" },
  { label: "1 hour", value: "1hour" },
];

const notifyOptions = [
  { id: "push", label: "Push Notifications", enabled: true },
  { id: "email", label: "Email Alerts", enabled: true },
  { id: "sms", label: "SMS (Critical only)", enabled: false },
];

export default function MonitoringRules() {
  const navigate = useNavigate();
  const [monitoringOn, setMonitoringOn] = useState(true);
  const [gracePeriod, setGracePeriod] = useState("15min");
  const [expandedRule, setExpandedRule] = useState<string | null>(null);
  const [notifications, setNotifications] = useState(notifyOptions);
  const [rules, setRules] = useState<MonitoringRule[]>([
    {
      id: "ev",
      icon: <Zap className="h-5 w-5" />,
      iconBg: "bg-[hsl(var(--lotiq-amber))]/10 text-[hsl(var(--lotiq-amber))]",
      activeIconBg: "bg-[hsl(var(--lotiq-amber))]/15",
      title: "EV Enforcement",
      description: "Enforce charging requirement for EV spots",
      enabled: true,
      detections: 12,
    },
    {
      id: "parking",
      icon: <Moon className="h-5 w-5" />,
      iconBg: "bg-primary/10 text-primary",
      activeIconBg: "bg-primary/15",
      title: "Parking Enforcement",
      description: "Enforce parking rules during scheduled hours",
      enabled: true,
      schedule: "22:00 – 06:00 · Every day",
      detections: 34,
    },
    {
      id: "trash",
      icon: <Trash2 className="h-5 w-5" />,
      iconBg: "bg-muted text-muted-foreground",
      activeIconBg: "bg-muted",
      title: "Trash Detection",
      description: "Detect litter and illegal dumping",
      enabled: false,
    },
    {
      id: "weather",
      icon: <CloudSnow className="h-5 w-5" />,
      iconBg: "bg-[hsl(var(--lotiq-blue))]/10 text-[hsl(var(--lotiq-blue))]",
      activeIconBg: "bg-[hsl(var(--lotiq-blue))]/15",
      title: "Weather Adaptation",
      description: "Auto-adjust rules based on weather conditions",
      enabled: false,
    },
  ]);

  const toggleRule = (id: string) => {
    setRules(prev => prev.map(r => r.id === id ? { ...r, enabled: !r.enabled } : r));
  };

  const toggleNotification = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, enabled: !n.enabled } : n));
  };

  const activeCount = rules.filter(r => r.enabled).length;

  return (
    <AppLayout
      title="Monitoring Rules"
      headerLeft={
        <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center">
          <ArrowLeft className="h-4 w-4 text-foreground" />
        </button>
      }
    >
      {/* STATUS PILL */}
      <div className="flex items-center gap-2 mb-5">
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${
          monitoringOn
            ? "bg-[hsl(var(--lotiq-green))]/10 text-[hsl(var(--lotiq-green))]"
            : "bg-destructive/10 text-destructive"
        }`}>
          <span className={`w-2 h-2 rounded-full ${monitoringOn ? "bg-[hsl(var(--lotiq-green))] animate-pulse" : "bg-destructive"}`} />
          {monitoringOn ? "System Active" : "System Paused"}
        </div>
        <span className="text-[10px] text-muted-foreground">
          {activeCount} of {rules.length} rules enabled
        </span>
      </div>

      {/* MASTER TOGGLE */}
      <section className="mb-6">
        <Card className={`border-2 transition-colors ${monitoringOn ? "border-[hsl(var(--lotiq-green))]/30" : "border-destructive/30"}`}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${
                monitoringOn ? "bg-[hsl(var(--lotiq-green))]/10" : "bg-destructive/10"
              }`}>
                <ShieldCheck className={`h-5 w-5 ${monitoringOn ? "text-[hsl(var(--lotiq-green))]" : "text-destructive"}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">Master Monitoring</p>
                <p className="text-xs text-muted-foreground">
                  {monitoringOn ? "All enabled rules are actively detecting" : "All monitoring is currently paused"}
                </p>
              </div>
              <Switch checked={monitoringOn} onCheckedChange={setMonitoringOn} />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* DETECTION RULES */}
      <section className={`mb-6 transition-opacity ${monitoringOn ? "" : "opacity-40 pointer-events-none"}`}>
        <h3 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-3">
          Detection Rules
        </h3>
        <div className="space-y-2.5">
          {rules.map((rule) => {
            const isExpanded = expandedRule === rule.id;
            return (
              <Card
                key={rule.id}
                className={`transition-all ${
                  rule.enabled ? "border-border" : "border-border/50"
                }`}
              >
                <CardContent className="p-0">
                  <div className="flex items-center gap-3 p-4">
                    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-colors ${
                      rule.enabled ? rule.iconBg : "bg-muted text-muted-foreground"
                    }`}>
                      {rule.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className={`text-sm font-semibold transition-colors ${rule.enabled ? "text-foreground" : "text-muted-foreground"}`}>
                          {rule.title}
                        </p>
                        {rule.enabled && rule.detections && (
                          <span className="text-[9px] font-medium px-1.5 py-0.5 rounded-md bg-muted text-muted-foreground">
                            {rule.detections} this week
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{rule.description}</p>
                    </div>
                    <Switch checked={rule.enabled} onCheckedChange={() => toggleRule(rule.id)} />
                  </div>

                  {/* Expandable details */}
                  {rule.enabled && (
                    <>
                      {rule.schedule && (
                        <div className="px-4 pb-3">
                          <button
                            onClick={() => setExpandedRule(isExpanded ? null : rule.id)}
                            className="w-full flex items-center gap-2 bg-muted/60 rounded-xl px-3 py-2.5 hover:bg-muted transition-colors"
                          >
                            <Clock className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                            <span className="text-xs text-muted-foreground flex-1 text-left">{rule.schedule}</span>
                            {isExpanded ? (
                              <ChevronUp className="h-3.5 w-3.5 text-muted-foreground" />
                            ) : (
                              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                            )}
                          </button>
                          {isExpanded && (
                            <div className="mt-2 grid grid-cols-7 gap-1">
                              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(day => (
                                <div key={day} className="text-center py-1.5 rounded-lg bg-primary/10 text-[10px] font-medium text-primary">
                                  {day}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* TOW POLICY */}
      <section className={`mb-6 transition-opacity ${monitoringOn ? "" : "opacity-40 pointer-events-none"}`}>
        <h3 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-3">
          Tow Policy
        </h3>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-2xl bg-[hsl(var(--lotiq-amber))]/10 flex items-center justify-center shrink-0">
                <AlertTriangle className="h-5 w-5 text-[hsl(var(--lotiq-amber))]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">Grace Period</p>
                <p className="text-xs text-muted-foreground">Wait time before auto-requesting a tow</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {gracePeriodOptions.map((option) => {
                const selected = gracePeriod === option.value;
                return (
                  <button
                    key={option.value}
                    onClick={() => setGracePeriod(option.value)}
                    className={`relative flex items-center justify-center gap-2 px-3 py-3 rounded-xl border-2 text-sm font-medium transition-all ${
                      selected
                        ? "border-primary bg-primary/5 text-primary shadow-sm"
                        : "border-border text-muted-foreground hover:border-primary/20 hover:bg-muted/30"
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                      selected ? "border-primary" : "border-muted-foreground/30"
                    }`}>
                      {selected && <div className="w-2 h-2 rounded-full bg-primary" />}
                    </div>
                    {option.label}
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* NOTIFICATIONS */}
      <section className="mb-6">
        <h3 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-3">
          Notifications
        </h3>
        <Card>
          <CardContent className="p-0 divide-y">
            {notifications.map(n => (
              <div key={n.id} className="flex items-center gap-3 p-4">
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
                  <Bell className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-sm font-medium text-foreground flex-1">{n.label}</p>
                <Switch checked={n.enabled} onCheckedChange={() => toggleNotification(n.id)} />
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </AppLayout>
  );
}
