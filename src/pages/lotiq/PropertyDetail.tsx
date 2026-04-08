import { AppLayout } from "@/components/lotiq/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft, ChevronRight, ShieldCheck, Moon, Camera,
  AlertTriangle, Truck, Play, Sparkles, CreditCard, Car, Bell, BarChart3,
} from "lucide-react";

const propertiesData: Record<string, { name: string; address: string }> = {
  "prop-1": { name: "Maple Heights Apt", address: "1200 Maple Ave, Suite 100" },
  "prop-2": { name: "Sunset Gardens", address: "500 Main Street" },
  "prop-3": { name: "Riverside Office", address: "800 River Road" },
};

const slipFallReports = [
  { date: "12 Mar 2026", time: "6:00 AM - 8:00 AM", status: "Delivered", statusColor: "text-[hsl(var(--lotiq-green))]", statusBg: "bg-[hsl(var(--lotiq-green))]/10" },
  { date: "08 Mar 2026", time: "6:00 AM - 8:00 AM", status: "Processing", statusColor: "text-[hsl(var(--lotiq-blue))]", statusBg: "bg-[hsl(var(--lotiq-blue))]/10" },
];

export default function PropertyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const property = propertiesData[id || "prop-1"] || propertiesData["prop-1"];

  return (
    <AppLayout
      title={property.name}
      headerLeft={
        <button onClick={() => navigate("/property")} className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center">
          <ArrowLeft className="h-4 w-4 text-foreground" />
        </button>
      }
    >
      {/* MANAGEMENT */}
      <section className="mb-6">
        <h3 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-3">
          Management
        </h3>
        <Card>
          <CardContent className="p-0 divide-y">
            <DetailRow
              icon={<ShieldCheck className="h-5 w-5 text-[hsl(var(--lotiq-green))]" />}
              iconBg="bg-[hsl(var(--lotiq-green))]/10"
              title="Monitoring"
              subtitle="Active"
              subtitleColor="text-[hsl(var(--lotiq-green))]"
              onClick={() => navigate(`/property/${id || "prop-1"}/monitoring`)}
            />
            <DetailRow
              icon={<Moon className="h-5 w-5 text-muted-foreground" />}
              iconBg="bg-muted"
              title="Parking Enforcement Schedule"
              subtitle="Inactive · Starts 10 PM"
              onClick={() => navigate("/rules")}
            />
            <DetailRow
              icon={<Camera className="h-5 w-5 text-muted-foreground" />}
              iconBg="bg-muted"
              title="Camera"
              subtitle="3 of 5 operational"
              onClick={() => navigate("/cameras")}
            />
          </CardContent>
        </Card>
      </section>

      {/* VIOLATIONS */}
      <section className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
            Violations
          </h3>
          <button onClick={() => navigate("/incidents")} className="text-xs font-medium text-primary">
            View All
          </button>
        </div>
        <Card>
          <CardContent className="p-0 divide-y">
            <DetailRow
              icon={<AlertTriangle className="h-5 w-5 text-destructive" />}
              iconBg="bg-destructive/10"
              title="1 active violation"
              subtitle="In the last hour"
              onClick={() => navigate("/incidents")}
            />
            <DetailRow
              icon={<Truck className="h-5 w-5 text-[hsl(var(--lotiq-amber))]" />}
              iconBg="bg-[hsl(var(--lotiq-amber))]/10"
              title="1 tow in progress"
              subtitle="Today"
              onClick={() => navigate("/towing")}
            />
          </CardContent>
        </Card>
      </section>

      {/* AUTHORIZED PARKERS */}
      <section className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
            Authorized Parkers
          </h3>
          <button onClick={() => navigate("/vehicles")} className="text-xs font-medium text-primary">
            View All
          </button>
        </div>
        <Card>
          <CardContent className="p-0">
            <DetailRow
              icon={<Car className="h-5 w-5 text-[hsl(var(--lotiq-blue))]" />}
              iconBg="bg-[hsl(var(--lotiq-blue))]/10"
              title="12 authorized vehicles"
              subtitle="Manage registered vehicles & permits"
              onClick={() => navigate(`/property/${id || "prop-1"}/parkers`)}
            />
          </CardContent>
        </Card>
      </section>

      <section className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
            Slip & Fall
          </h3>
          <button onClick={() => navigate(`/property/${id || "prop-1"}/slip-fall`)} className="text-xs font-medium text-primary">Request</button>
        </div>
        <div className="space-y-2">
          {slipFallReports.map((report, i) => (
            <Card key={i}>
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-foreground">{report.date}</p>
                  <p className="text-xs text-muted-foreground">{report.time}</p>
                </div>
                <span className={`text-[10px] font-medium px-2.5 py-1 rounded-full ${report.statusBg} ${report.statusColor} flex items-center gap-1`}>
                  {report.status === "Delivered" ? <Play className="h-3 w-3" /> : <Sparkles className="h-3 w-3" />}
                  {report.status}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* REPORTS */}
      <section className="mb-6">
        <h3 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-3">
          Reports
        </h3>
        <Card>
          <CardContent className="p-0">
            <DetailRow
              icon={<BarChart3 className="h-5 w-5 text-primary" />}
              iconBg="bg-primary/10"
              title="Property Reports"
              subtitle="Weekly, monthly & yearly analytics"
              onClick={() => navigate(`/property/${id || "prop-1"}/reports`)}
            />
          </CardContent>
        </Card>
      </section>

      {/* BILLING */}
      <section className="mb-6">
        <h3 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-3">
          Billing
        </h3>
        <Card>
          <CardContent className="p-0">
            <DetailRow
              icon={<CreditCard className="h-5 w-5 text-muted-foreground" />}
              iconBg="bg-muted"
              title="Billing"
              subtitle="Manage subscription, invoices, and payment methods"
              onClick={() => navigate(`/property/${id || "prop-1"}/billing`)}
            />
          </CardContent>
        </Card>
      </section>

      {/* NOTIFICATIONS */}
      <section className="mb-6">
        <h3 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-3">
          Notifications
        </h3>
        <Card>
          <CardContent className="p-0">
            <DetailRow
              icon={<Bell className="h-5 w-5 text-[hsl(var(--lotiq-blue))]" />}
              iconBg="bg-[hsl(var(--lotiq-blue))]/10"
              title="Notification Settings"
              subtitle="Manage alerts, recipients, and preferences"
              onClick={() => navigate(`/property/${id || "prop-1"}/notifications`)}
            />
          </CardContent>
        </Card>
      </section>
    </AppLayout>
  );
}

function DetailRow({
  icon, iconBg, title, subtitle, subtitleColor, onClick,
}: {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  subtitle: string;
  subtitleColor?: string;
  onClick: () => void;
}) {
  return (
    <button onClick={onClick} className="w-full flex items-center gap-3 p-4 hover:bg-muted/30 transition-colors text-left">
      <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center shrink-0`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className={`text-xs ${subtitleColor || "text-muted-foreground"} truncate`}>{subtitle}</p>
      </div>
      <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
    </button>
  );
}
