import { useState } from "react";
import { AppLayout } from "@/components/lotiq/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  ArrowLeft, Mail, Building2, MessageSquare, Phone, Bell,
} from "lucide-react";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function AddNotificationPerson() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [issue, setIssue] = useState("trash");
  const [config, setConfig] = useState({
    properties: true,
    sms: true,
    voice: false,
    notifications: true,
  });

  const handleSave = () => {
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      toast.error("Please enter a valid email address");
      return;
    }
    toast.success("Person added successfully");
    navigate("/settings/notifications");
  };

  return (
    <AppLayout
      title="Add person"
      headerLeft={
        <button onClick={() => navigate("/settings/notifications")} className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center">
          <ArrowLeft className="h-4 w-4 text-foreground" />
        </button>
      }
    >
      <p className="text-sm text-muted-foreground mb-5">
        This person will receive all the notification of the property.
      </p>

      {/* Email */}
      <div className="mb-5">
        <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="email"
            placeholder="abc@xyz.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10"
            maxLength={255}
          />
        </div>
      </div>

      {/* Issues */}
      <div className="mb-5">
        <label className="text-sm font-medium text-foreground mb-1.5 block">Issues</label>
        <Select value={issue} onValueChange={setIssue}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="trash">Trash</SelectItem>
            <SelectItem value="parking">Parking</SelectItem>
            <SelectItem value="safety">Safety</SelectItem>
            <SelectItem value="all">All Issues</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Configuration */}
      <Card className="mb-8">
        <CardContent className="p-4">
          <p className="text-sm font-semibold text-foreground mb-4">Configuration</p>
          <div className="grid grid-cols-2 gap-4">
            <label className="flex items-center gap-2">
              <Switch
                checked={config.properties}
                onCheckedChange={(v) => setConfig((p) => ({ ...p, properties: v }))}
              />
              <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-xs text-foreground">Properties</span>
            </label>
            <label className="flex items-center gap-2">
              <Switch
                checked={config.sms}
                onCheckedChange={(v) => setConfig((p) => ({ ...p, sms: v }))}
              />
              <MessageSquare className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-xs text-foreground">SMS</span>
            </label>
            <label className="flex items-center gap-2">
              <Switch
                checked={config.voice}
                onCheckedChange={(v) => setConfig((p) => ({ ...p, voice: v }))}
              />
              <Phone className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-xs text-foreground">Voice</span>
            </label>
            <label className="flex items-center gap-2">
              <Switch
                checked={config.notifications}
                onCheckedChange={(v) => setConfig((p) => ({ ...p, notifications: v }))}
              />
              <Bell className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-xs text-foreground">Notifications</span>
            </label>
          </div>
        </CardContent>
      </Card>

      <Button className="w-full" size="lg" onClick={handleSave}>
        Save
      </Button>
    </AppLayout>
  );
}
