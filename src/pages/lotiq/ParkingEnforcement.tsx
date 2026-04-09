import { useState } from "react";
import { AppLayout } from "@/components/lotiq/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft, Moon, Clock, Shield, Car, AlertTriangle,
  ChevronDown, ChevronUp, Plus, Minus,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

interface DaySchedule {
  day: string;
  short: string;
  enabled: boolean;
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
}

interface EnforcementZone {
  id: string;
  name: string;
  spots: number;
  enabled: boolean;
}

const formatTime = (hour: number, minute: number) => {
  const period = hour >= 12 ? "PM" : "AM";
  const h = hour % 12 || 12;
  const m = minute.toString().padStart(2, "0");
  return `${h}:${m} ${period}`;
};

const defaultSchedule: DaySchedule[] = [
  { day: "Monday", short: "Mon", enabled: true, startHour: 22, startMinute: 0, endHour: 6, endMinute: 0 },
  { day: "Tuesday", short: "Tue", enabled: true, startHour: 22, startMinute: 0, endHour: 6, endMinute: 0 },
  { day: "Wednesday", short: "Wed", enabled: true, startHour: 22, startMinute: 0, endHour: 6, endMinute: 0 },
  { day: "Thursday", short: "Thu", enabled: true, startHour: 22, startMinute: 0, endHour: 6, endMinute: 0 },
  { day: "Friday", short: "Fri", enabled: true, startHour: 22, startMinute: 0, endHour: 6, endMinute: 0 },
  { day: "Saturday", short: "Sat", enabled: true, startHour: 20, startMinute: 0, endHour: 8, endMinute: 0 },
  { day: "Sunday", short: "Sun", enabled: true, startHour: 20, startMinute: 0, endHour: 8, endMinute: 0 },
];

const enforcementModes = [
  { id: "tow", label: "Tow", icon: <Car className="h-4 w-4" />, description: "Auto-request tow for violations" },
  { id: "warn", label: "Warning", icon: <AlertTriangle className="h-4 w-4" />, description: "Issue warning notification first" },
  { id: "monitor", label: "Monitor", icon: <Shield className="h-4 w-4" />, description: "Log violations without action" },
];

export default function ParkingEnforcement() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [enforcementOn, setEnforcementOn] = useState(false);
  const [schedule, setSchedule] = useState<DaySchedule[]>(defaultSchedule);
  const [expandedDay, setExpandedDay] = useState<string | null>(null);
  const [mode, setMode] = useState("tow");
  const [gracePeriod, setGracePeriod] = useState(15);
  const [zones, setZones] = useState<EnforcementZone[]>([
    { id: "z1", name: "Main Lot", spots: 45, enabled: true },
    { id: "z2", name: "Visitor Parking", spots: 12, enabled: true },
    { id: "z3", name: "Underground Garage", spots: 30, enabled: false },
  ]);

  const toggleDay = (day: string) => {
    setSchedule(prev => prev.map(d => d.day === day ? { ...d, enabled: !d.enabled } : d));
  };

  const adjustTime = (day: string, field: "startHour" | "endHour", delta: number) => {
    setSchedule(prev => prev.map(d => {
      if (d.day !== day) return d;
      const newVal = (d[field] + delta + 24) % 24;
      return { ...d, [field]: newVal };
    }));
  };

  const toggleZone = (zoneId: string) => {
    setZones(prev => prev.map(z => z.id === zoneId ? { ...z, enabled: !z.enabled } : z));
  };

  const activeDays = schedule.filter(d => d.enabled).length;

  const gracePeriodOptions = [
    { label: "None", value: 0 },
    { label: "15 min", value: 15 },
    { label: "30 min", value: 30 },
    { label: "1 hour", value: 60 },
  ];

  return (
    <AppLayout
      title="Enforcement Schedule"
      headerLeft={
        <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center">
          <ArrowLeft className="h-4 w-4 text-foreground" />
        </button>
      }
    >
      {/* STATUS */}
      <div className="flex items-center gap-2 mb-5">
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${
          enforcementOn
            ? "bg-[hsl(var(--lotiq-green))]/10 text-[hsl(var(--lotiq-green))]"
            : "bg-muted text-muted-foreground"
        }`}>
          <span className={`w-2 h-2 rounded-full ${enforcementOn ? "bg-[hsl(var(--lotiq-green))] animate-pulse" : "bg-muted-foreground"}`} />
          {enforcementOn ? "Active" : "Inactive"}
        </div>
        {enforcementOn && (
          <span className="text-[10px] text-muted-foreground">
            {activeDays} days configured
          </span>
        )}
      </div>

      {/* MASTER TOGGLE */}
      <section className="mb-6">
        <Card className={`border-2 transition-colors ${enforcementOn ? "border-primary/30" : "border-border"}`}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${
                enforcementOn ? "bg-primary/10" : "bg-muted"
              }`}>
                <Moon className={`h-5 w-5 ${enforcementOn ? "text-primary" : "text-muted-foreground"}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">Parking Enforcement</p>
                <p className="text-xs text-muted-foreground">
                  {enforcementOn ? "Enforcing during scheduled hours" : "Enable to set enforcement hours"}
                </p>
              </div>
              <Switch checked={enforcementOn} onCheckedChange={setEnforcementOn} />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* WEEKLY SCHEDULE */}
      <section className={`mb-6 transition-opacity ${enforcementOn ? "" : "opacity-40 pointer-events-none"}`}>
        <h3 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-3">
          Weekly Schedule
        </h3>

        {/* Quick day toggles */}
        <div className="flex gap-1.5 mb-3">
          {schedule.map(d => (
            <button
              key={d.short}
              onClick={() => toggleDay(d.day)}
              className={`flex-1 py-2 rounded-xl text-[10px] font-semibold transition-all ${
                d.enabled
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {d.short}
            </button>
          ))}
        </div>

        {/* Day details */}
        <div className="space-y-2">
          {schedule.map(d => {
            const isExpanded = expandedDay === d.day;
            return (
              <Card key={d.day} className={`transition-all ${d.enabled ? "" : "opacity-50"}`}>
                <CardContent className="p-0">
                  <button
                    onClick={() => d.enabled && setExpandedDay(isExpanded ? null : d.day)}
                    className="w-full flex items-center gap-3 p-3.5 text-left"
                  >
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                      d.enabled ? "bg-primary/10" : "bg-muted"
                    }`}>
                      <Clock className={`h-4 w-4 ${d.enabled ? "text-primary" : "text-muted-foreground"}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium ${d.enabled ? "text-foreground" : "text-muted-foreground"}`}>
                        {d.day}
                      </p>
                      {d.enabled && (
                        <p className="text-xs text-muted-foreground">
                          {formatTime(d.startHour, d.startMinute)} → {formatTime(d.endHour, d.endMinute)}
                        </p>
                      )}
                    </div>
                    {d.enabled && (
                      isExpanded
                        ? <ChevronUp className="h-4 w-4 text-muted-foreground" />
                        : <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    )}
                    <Switch
                      checked={d.enabled}
                      onCheckedChange={() => toggleDay(d.day)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </button>

                  {isExpanded && d.enabled && (
                    <div className="px-4 pb-4 space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        {/* Start time */}
                        <div className="space-y-1.5">
                          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Start</p>
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => adjustTime(d.day, "startHour", -1)}
                              className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center hover:bg-muted/80"
                            >
                              <Minus className="h-3 w-3 text-foreground" />
                            </button>
                            <div className="flex-1 text-center bg-muted/50 rounded-lg py-2">
                              <p className="text-sm font-semibold text-foreground">
                                {formatTime(d.startHour, d.startMinute)}
                              </p>
                            </div>
                            <button
                              onClick={() => adjustTime(d.day, "startHour", 1)}
                              className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center hover:bg-muted/80"
                            >
                              <Plus className="h-3 w-3 text-foreground" />
                            </button>
                          </div>
                        </div>
                        {/* End time */}
                        <div className="space-y-1.5">
                          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">End</p>
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => adjustTime(d.day, "endHour", -1)}
                              className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center hover:bg-muted/80"
                            >
                              <Minus className="h-3 w-3 text-foreground" />
                            </button>
                            <div className="flex-1 text-center bg-muted/50 rounded-lg py-2">
                              <p className="text-sm font-semibold text-foreground">
                                {formatTime(d.endHour, d.endMinute)}
                              </p>
                            </div>
                            <button
                              onClick={() => adjustTime(d.day, "endHour", 1)}
                              className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center hover:bg-muted/80"
                            >
                              <Plus className="h-3 w-3 text-foreground" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* ENFORCEMENT MODE */}
      <section className={`mb-6 transition-opacity ${enforcementOn ? "" : "opacity-40 pointer-events-none"}`}>
        <h3 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-3">
          Enforcement Mode
        </h3>
        <div className="space-y-2">
          {enforcementModes.map(m => {
            const selected = mode === m.id;
            return (
              <Card
                key={m.id}
                className={`cursor-pointer transition-all border-2 ${
                  selected ? "border-primary bg-primary/5" : "border-border"
                }`}
                onClick={() => setMode(m.id)}
              >
                <CardContent className="p-4 flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    selected ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                  }`}>
                    {m.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-semibold ${selected ? "text-primary" : "text-foreground"}`}>{m.label}</p>
                    <p className="text-xs text-muted-foreground">{m.description}</p>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selected ? "border-primary" : "border-muted-foreground/30"
                  }`}>
                    {selected && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* GRACE PERIOD */}
      <section className={`mb-6 transition-opacity ${enforcementOn ? "" : "opacity-40 pointer-events-none"}`}>
        <h3 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-3">
          Grace Period
        </h3>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground mb-3">Wait time before taking enforcement action</p>
            <div className="grid grid-cols-4 gap-2">
              {gracePeriodOptions.map(opt => {
                const selected = gracePeriod === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => setGracePeriod(opt.value)}
                    className={`py-2.5 rounded-xl text-xs font-semibold transition-all border-2 ${
                      selected
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border text-muted-foreground hover:border-primary/20"
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* ENFORCEMENT ZONES */}
      <section className={`mb-6 transition-opacity ${enforcementOn ? "" : "opacity-40 pointer-events-none"}`}>
        <h3 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-3">
          Enforcement Zones
        </h3>
        <Card>
          <CardContent className="p-0 divide-y">
            {zones.map(zone => (
              <div key={zone.id} className="flex items-center gap-3 p-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  zone.enabled ? "bg-primary/10" : "bg-muted"
                }`}>
                  <Car className={`h-4 w-4 ${zone.enabled ? "text-primary" : "text-muted-foreground"}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium ${zone.enabled ? "text-foreground" : "text-muted-foreground"}`}>
                    {zone.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{zone.spots} spots</p>
                </div>
                <Switch checked={zone.enabled} onCheckedChange={() => toggleZone(zone.id)} />
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      {/* SAVE */}
      <div className="sticky bottom-20 pb-2">
        <Button className="w-full h-12 rounded-xl text-base font-semibold" onClick={() => navigate(-1)}>
          Save Schedule
        </Button>
      </div>
    </AppLayout>
  );
}
