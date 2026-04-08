import { useState } from "react";
import { AppLayout } from "@/components/lotiq/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft, TrendingUp, TrendingDown, AlertTriangle, Truck, Car,
  ShieldCheck, Camera, BarChart3, PieChart, Activity, FileText,
  ChevronRight, Download, Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart as RePieChart, Pie, Cell, LineChart, Line, Area, AreaChart,
} from "recharts";

const propertiesData: Record<string, { name: string; address: string }> = {
  "prop-1": { name: "Maple Heights Apt", address: "1200 Maple Ave, Suite 100" },
  "prop-2": { name: "Sunset Gardens", address: "500 Main Street" },
  "prop-3": { name: "Riverside Office", address: "800 River Road" },
};

type Period = "weekly" | "monthly" | "yearly";

// Mock data generators per period
const getIncidentTrendData = (period: Period) => {
  if (period === "weekly") return [
    { name: "Mon", violations: 3, tows: 1, resolved: 2 },
    { name: "Tue", violations: 5, tows: 2, resolved: 4 },
    { name: "Wed", violations: 2, tows: 0, resolved: 3 },
    { name: "Thu", violations: 7, tows: 3, resolved: 5 },
    { name: "Fri", violations: 4, tows: 1, resolved: 6 },
    { name: "Sat", violations: 1, tows: 0, resolved: 2 },
    { name: "Sun", violations: 0, tows: 0, resolved: 1 },
  ];
  if (period === "monthly") return [
    { name: "Week 1", violations: 12, tows: 4, resolved: 10 },
    { name: "Week 2", violations: 18, tows: 6, resolved: 15 },
    { name: "Week 3", violations: 9, tows: 2, resolved: 11 },
    { name: "Week 4", violations: 14, tows: 5, resolved: 12 },
  ];
  return [
    { name: "Jan", violations: 45, tows: 12, resolved: 40 },
    { name: "Feb", violations: 38, tows: 10, resolved: 35 },
    { name: "Mar", violations: 52, tows: 15, resolved: 48 },
    { name: "Apr", violations: 33, tows: 8, resolved: 30 },
    { name: "May", violations: 28, tows: 7, resolved: 26 },
    { name: "Jun", violations: 41, tows: 11, resolved: 38 },
    { name: "Jul", violations: 36, tows: 9, resolved: 33 },
    { name: "Aug", violations: 48, tows: 14, resolved: 44 },
    { name: "Sep", violations: 30, tows: 8, resolved: 28 },
    { name: "Oct", violations: 55, tows: 16, resolved: 50 },
    { name: "Nov", violations: 42, tows: 12, resolved: 39 },
    { name: "Dec", violations: 25, tows: 6, resolved: 23 },
  ];
};

const incidentTypeData = [
  { name: "Unauthorized Parking", value: 45, color: "hsl(0, 84%, 60%)" },
  { name: "EV Misuse", value: 20, color: "hsl(221, 83%, 53%)" },
  { name: "Trash Overflow", value: 15, color: "hsl(38, 92%, 50%)" },
  { name: "Hazardous Condition", value: 12, color: "hsl(280, 67%, 50%)" },
  { name: "Other", value: 8, color: "hsl(240, 4%, 46%)" },
];

const getResponseTimeData = (period: Period) => {
  if (period === "weekly") return [
    { name: "Mon", avg: 12 }, { name: "Tue", avg: 8 },
    { name: "Wed", avg: 15 }, { name: "Thu", avg: 6 },
    { name: "Fri", avg: 10 }, { name: "Sat", avg: 18 },
    { name: "Sun", avg: 22 },
  ];
  if (period === "monthly") return [
    { name: "Week 1", avg: 11 }, { name: "Week 2", avg: 9 },
    { name: "Week 3", avg: 14 }, { name: "Week 4", avg: 8 },
  ];
  return [
    { name: "Jan", avg: 14 }, { name: "Feb", avg: 12 }, { name: "Mar", avg: 10 },
    { name: "Apr", avg: 11 }, { name: "May", avg: 9 }, { name: "Jun", avg: 8 },
    { name: "Jul", avg: 13 }, { name: "Aug", avg: 10 }, { name: "Sep", avg: 7 },
    { name: "Oct", avg: 11 }, { name: "Nov", avg: 9 }, { name: "Dec", avg: 8 },
  ];
};

const getKPIs = (period: Period) => {
  const multiplier = period === "weekly" ? 1 : period === "monthly" ? 4 : 52;
  return {
    totalIncidents: Math.round(22 * multiplier * (0.8 + Math.random() * 0.4)),
    resolvedRate: 87 + Math.round(Math.random() * 8),
    avgResponseTime: 8 + Math.round(Math.random() * 6),
    towsRequested: Math.round(7 * multiplier * (0.7 + Math.random() * 0.6)),
    camerasOnline: 4,
    totalCameras: 5,
    complianceScore: 92 + Math.round(Math.random() * 6),
  };
};

const recentIncidents = [
  { id: "si-4", type: "Unauthorized Parking", plate: "ABC-1234", zone: "Lot B - EV Zone", time: "1 hour ago", status: "violation" as const },
  { id: "si-5", type: "Tow Requested", plate: "JKL-7890", zone: "Lot C - Reserved", time: "2 hours ago", status: "tow_requested" as const },
  { id: "si-3", type: "Trash Overflow", plate: "N/A", zone: "Lot C - Service", time: "3 hours ago", status: "trash_overflow" as const },
  { id: "si-1", type: "EV Misuse", plate: "XYZ-9012", zone: "Lot A - EV Zone", time: "5 hours ago", status: "violation" as const },
  { id: "si-2", type: "Unauthorized Parking", plate: "DEF-3456", zone: "Lot A - Visitor", time: "Yesterday", status: "violation" as const },
];

const statusColor: Record<string, string> = {
  violation: "text-destructive bg-destructive/10",
  tow_requested: "text-[hsl(var(--status-warning))] bg-[hsl(var(--status-warning))]/10",
  trash_overflow: "text-[hsl(var(--status-warning))] bg-[hsl(var(--status-warning))]/10",
};

export default function PropertyReporting() {
  const { id } = useParams();
  const navigate = useNavigate();
  const property = propertiesData[id || "prop-1"] || propertiesData["prop-1"];
  const [period, setPeriod] = useState<Period>("monthly");
  const [kpis] = useState(() => getKPIs("monthly"));

  const trendData = getIncidentTrendData(period);
  const responseData = getResponseTimeData(period);

  const periodLabel = period === "weekly" ? "This Week" : period === "monthly" ? "This Month" : "This Year";

  return (
    <AppLayout
      title="Reports"
      headerLeft={
        <button onClick={() => navigate(`/property/${id || "prop-1"}`)} className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center">
          <ArrowLeft className="h-4 w-4 text-foreground" />
        </button>
      }
      headerRight={
        <Button variant="ghost" size="icon" className="w-9 h-9 rounded-xl">
          <Download className="h-4 w-4" />
        </Button>
      }
    >
      {/* Property Header */}
      <div className="mb-5">
        <p className="text-xs text-muted-foreground">{property.name}</p>
        <div className="flex items-center gap-2 mt-1">
          <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">{periodLabel}</span>
        </div>
      </div>

      {/* Period Tabs */}
      <Tabs value={period} onValueChange={(v) => setPeriod(v as Period)} className="mb-6">
        <TabsList className="w-full bg-muted/60 h-10 rounded-xl p-1">
          <TabsTrigger value="weekly" className="flex-1 rounded-lg text-xs font-medium data-[state=active]:bg-card data-[state=active]:shadow-sm">
            Weekly
          </TabsTrigger>
          <TabsTrigger value="monthly" className="flex-1 rounded-lg text-xs font-medium data-[state=active]:bg-card data-[state=active]:shadow-sm">
            Monthly
          </TabsTrigger>
          <TabsTrigger value="yearly" className="flex-1 rounded-lg text-xs font-medium data-[state=active]:bg-card data-[state=active]:shadow-sm">
            Yearly
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* KPI Cards */}
      <section className="mb-6">
        <h3 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-3">Overview</h3>
        <div className="grid grid-cols-2 gap-3">
          <KPICard
            icon={<AlertTriangle className="h-4 w-4" />}
            iconColor="text-destructive"
            iconBg="bg-destructive/10"
            label="Total Incidents"
            value={kpis.totalIncidents.toString()}
            trend={{ value: 12, direction: "down" }}
          />
          <KPICard
            icon={<ShieldCheck className="h-4 w-4" />}
            iconColor="text-[hsl(var(--status-success))]"
            iconBg="bg-[hsl(var(--status-success))]/10"
            label="Resolved Rate"
            value={`${kpis.resolvedRate}%`}
            trend={{ value: 3, direction: "up" }}
          />
          <KPICard
            icon={<Activity className="h-4 w-4" />}
            iconColor="text-primary"
            iconBg="bg-primary/10"
            label="Avg Response"
            value={`${kpis.avgResponseTime} min`}
            trend={{ value: 8, direction: "down" }}
          />
          <KPICard
            icon={<Truck className="h-4 w-4" />}
            iconColor="text-[hsl(var(--status-warning))]"
            iconBg="bg-[hsl(var(--status-warning))]/10"
            label="Tows Requested"
            value={kpis.towsRequested.toString()}
            trend={{ value: 5, direction: "up" }}
          />
        </div>
      </section>

      {/* Compliance & Camera Row */}
      <section className="mb-6">
        <div className="grid grid-cols-2 gap-3">
          <Card>
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <div className="relative w-16 h-16 mb-2">
                <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
                  <circle cx="32" cy="32" r="28" fill="none" stroke="hsl(var(--muted))" strokeWidth="5" />
                  <circle cx="32" cy="32" r="28" fill="none" stroke="hsl(var(--status-success))" strokeWidth="5"
                    strokeDasharray={`${kpis.complianceScore * 1.76} 176`} strokeLinecap="round" />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-foreground">
                  {kpis.complianceScore}%
                </span>
              </div>
              <p className="text-[10px] text-muted-foreground font-medium">Compliance Score</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <div className="flex items-center gap-1.5 mb-2">
                <Camera className="h-5 w-5 text-[hsl(var(--status-success))]" />
                <span className="text-2xl font-bold text-foreground">{kpis.camerasOnline}</span>
                <span className="text-sm text-muted-foreground">/ {kpis.totalCameras}</span>
              </div>
              <p className="text-[10px] text-muted-foreground font-medium">Cameras Online</p>
              <div className="flex gap-1 mt-2">
                {Array.from({ length: kpis.totalCameras }).map((_, i) => (
                  <div key={i} className={`w-2 h-2 rounded-full ${i < kpis.camerasOnline ? "bg-[hsl(var(--status-success))]" : "bg-muted-foreground/30"}`} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Incident Trends Chart */}
      <section className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Incident Trends</h3>
          <BarChart3 className="h-3.5 w-3.5 text-muted-foreground" />
        </div>
        <Card>
          <CardContent className="p-4 pb-2">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={trendData} barGap={2}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} width={28} />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--card))", border: "1px solid hsl(var(--border))",
                    borderRadius: "8px", fontSize: "11px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  }}
                />
                <Bar dataKey="violations" fill="hsl(var(--destructive))" radius={[3, 3, 0, 0]} barSize={period === "yearly" ? 10 : 16} />
                <Bar dataKey="tows" fill="hsl(var(--status-warning))" radius={[3, 3, 0, 0]} barSize={period === "yearly" ? 10 : 16} />
                <Bar dataKey="resolved" fill="hsl(var(--status-success))" radius={[3, 3, 0, 0]} barSize={period === "yearly" ? 10 : 16} />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex items-center justify-center gap-4 mt-3 pb-2">
              <Legend color="hsl(var(--destructive))" label="Violations" />
              <Legend color="hsl(var(--status-warning))" label="Tows" />
              <Legend color="hsl(var(--status-success))" label="Resolved" />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Incident Breakdown Pie */}
      <section className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Incident Breakdown</h3>
          <PieChart className="h-3.5 w-3.5 text-muted-foreground" />
        </div>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="w-32 h-32 shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <RePieChart>
                    <Pie
                      data={incidentTypeData} dataKey="value" cx="50%" cy="50%"
                      innerRadius={30} outerRadius={55} paddingAngle={3} strokeWidth={0}
                    >
                      {incidentTypeData.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        background: "hsl(var(--card))", border: "1px solid hsl(var(--border))",
                        borderRadius: "8px", fontSize: "11px",
                      }}
                    />
                  </RePieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 space-y-2">
                {incidentTypeData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                      <span className="text-[11px] text-foreground">{item.name}</span>
                    </div>
                    <span className="text-[11px] font-semibold text-foreground">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Response Time Chart */}
      <section className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Avg Response Time</h3>
          <Activity className="h-3.5 w-3.5 text-muted-foreground" />
        </div>
        <Card>
          <CardContent className="p-4 pb-2">
            <ResponsiveContainer width="100%" height={160}>
              <AreaChart data={responseData}>
                <defs>
                  <linearGradient id="responseGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} width={28} unit="m" />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--card))", border: "1px solid hsl(var(--border))",
                    borderRadius: "8px", fontSize: "11px",
                  }}
                  formatter={(value: number) => [`${value} min`, "Avg Response"]}
                />
                <Area type="monotone" dataKey="avg" stroke="hsl(var(--primary))" fill="url(#responseGradient)" strokeWidth={2} dot={{ r: 3, fill: "hsl(var(--primary))" }} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </section>

      {/* Recent Incidents Table */}
      <section className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Recent Incidents</h3>
          <button onClick={() => navigate("/incidents")} className="text-xs font-medium text-primary">View All</button>
        </div>
        <Card>
          <CardContent className="p-0 divide-y divide-border">
            {recentIncidents.map((inc) => (
              <button
                key={inc.id}
                onClick={() => navigate(`/incidents/${inc.id}`)}
                className="w-full flex items-center gap-3 p-3.5 hover:bg-muted/30 transition-colors text-left"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-xs font-semibold text-foreground">{inc.type}</p>
                    <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded-full ${statusColor[inc.status] || "text-muted-foreground bg-muted"}`}>
                      {inc.status.replace("_", " ")}
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    {inc.plate} · {inc.zone} · {inc.time}
                  </p>
                </div>
                <ChevronRight className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              </button>
            ))}
          </CardContent>
        </Card>
      </section>

      {/* Export Options */}
      <section className="mb-8">
        <h3 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-3">Export</h3>
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="h-11 rounded-xl text-xs font-medium gap-2">
            <FileText className="h-3.5 w-3.5" />
            PDF Report
          </Button>
          <Button variant="outline" className="h-11 rounded-xl text-xs font-medium gap-2">
            <Download className="h-3.5 w-3.5" />
            CSV Export
          </Button>
        </div>
      </section>
    </AppLayout>
  );
}

function KPICard({ icon, iconColor, iconBg, label, value, trend }: {
  icon: React.ReactNode;
  iconColor: string;
  iconBg: string;
  label: string;
  value: string;
  trend: { value: number; direction: "up" | "down" };
}) {
  const isPositive = (trend.direction === "up" && label.includes("Resolved")) ||
    (trend.direction === "down" && !label.includes("Resolved"));

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className={`w-8 h-8 rounded-lg ${iconBg} flex items-center justify-center ${iconColor}`}>
            {icon}
          </div>
          <div className={`flex items-center gap-0.5 text-[10px] font-medium ${isPositive ? "text-[hsl(var(--status-success))]" : "text-destructive"}`}>
            {trend.direction === "up" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {trend.value}%
          </div>
        </div>
        <p className="text-xl font-bold text-foreground">{value}</p>
        <p className="text-[10px] text-muted-foreground mt-0.5">{label}</p>
      </CardContent>
    </Card>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
      <span className="text-[10px] text-muted-foreground">{label}</span>
    </div>
  );
}
