import { useState } from "react";
import { AppLayout } from "@/components/lotiq/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  ArrowLeft, Plus, Mail, MessageSquare, Phone, Info,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

interface AlertChannel {
  email: boolean;
  sms: boolean;
  voice: boolean;
}

interface AlertRule {
  label: string;
  channels: AlertChannel;
}

const defaultCritical: AlertRule[] = [
  { label: "Camera Offline", channels: { email: true, sms: true, voice: false } },
  { label: "Detection Degraded", channels: { email: true, sms: true, voice: false } },
  { label: "System Outage", channels: { email: true, sms: true, voice: true } },
];

const defaultOperational: AlertRule[] = [
  { label: "Tow Requested", channels: { email: true, sms: true, voice: false } },
  { label: "Tow Completed", channels: { email: true, sms: false, voice: false } },
  { label: "Tow Cancelled (vehicle exited)", channels: { email: true, sms: true, voice: false } },
];

function AlertRow({
  rule,
  onChange,
}: {
  rule: AlertRule;
  onChange: (channel: keyof AlertChannel, val: boolean) => void;
}) {
  return (
    <div className="p-4 space-y-3">
      <p className="text-sm font-semibold text-foreground">{rule.label}</p>
      <div className="flex items-center gap-5">
        <label className="flex items-center gap-1.5">
          <Switch checked={rule.channels.email} onCheckedChange={(v) => onChange("email", v)} />
          <Mail className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Email</span>
        </label>
        <label className="flex items-center gap-1.5">
          <Switch checked={rule.channels.sms} onCheckedChange={(v) => onChange("sms", v)} />
          <MessageSquare className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">SMS</span>
        </label>
        <label className="flex items-center gap-1.5">
          <Switch checked={rule.channels.voice} onCheckedChange={(v) => onChange("voice", v)} />
          <Phone className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Voice</span>
        </label>
      </div>
    </div>
  );
}

export default function Notifications() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [critical, setCritical] = useState(defaultCritical);
  const [operational, setOperational] = useState(defaultOperational);

  const updateCritical = (idx: number, channel: keyof AlertChannel, val: boolean) => {
    setCritical((prev) => prev.map((r, i) => i === idx ? { ...r, channels: { ...r.channels, [channel]: val } } : r));
  };

  const updateOperational = (idx: number, channel: keyof AlertChannel, val: boolean) => {
    setOperational((prev) => prev.map((r, i) => i === idx ? { ...r, channels: { ...r.channels, [channel]: val } } : r));
  };

  return (
    <AppLayout
      title="Notifications"
      headerLeft={
        <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center">
          <ArrowLeft className="h-4 w-4 text-foreground" />
        </button>
      }
      headerRight={
        <button onClick={() => navigate("/settings/notifications/add")} className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
          <Plus className="h-4 w-4 text-primary-foreground" />
        </button>
      }
    >
      {/* Recipients */}
      <section className="mb-6">
        <h3 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-3">
          Recipients
        </h3>
        <Card>
          <CardContent className="p-4 space-y-2">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-foreground">sarah@mapleheights.com</span>
              <span className="text-[10px] font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full ml-auto">Primary</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-foreground">+1 (555) 123-4567</span>
              <span className="text-[10px] font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full ml-auto">Verified</span>
            </div>
          </CardContent>
        </Card>
        <button onClick={() => navigate("/settings/notifications/add")} className="flex items-center gap-1.5 mt-3 text-sm font-medium text-primary">
          <Plus className="h-4 w-4" /> Add another person
        </button>
      </section>

      {/* Critical System Alerts */}
      <section className="mb-6">
        <h3 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-3">
          Critical System Alerts
        </h3>
        <Card className="divide-y divide-border">
          {critical.map((rule, i) => (
            <AlertRow key={rule.label} rule={rule} onChange={(ch, v) => updateCritical(i, ch, v)} />
          ))}
        </Card>
      </section>

      {/* Operational Alerts */}
      <section className="mb-6">
        <h3 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-3">
          Operational Alerts
        </h3>
        <Card className="divide-y divide-border">
          {operational.map((rule, i) => (
            <AlertRow key={rule.label} rule={rule} onChange={(ch, v) => updateOperational(i, ch, v)} />
          ))}
        </Card>
      </section>

      {/* Footer note */}
      <div className="flex items-start gap-2 px-1 pb-4">
        <Info className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
        <p className="text-xs text-muted-foreground">
          LotIQ does not send notifications to drivers. All alerts are for property managers only.
        </p>
      </div>
    </AppLayout>
  );
}
