import { AppLayout } from "@/components/lotiq/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronRight, CreditCard, FileText } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const propertyNames: Record<string, string> = {
  "prop-1": "Maple Heights Apts",
  "prop-2": "Sunset Gardens",
  "prop-3": "Riverside Office",
};

export default function Billing() {
  const navigate = useNavigate();
  const { id } = useParams();
  const propertyName = propertyNames[id || "prop-1"] || "Maple Heights Apts";

  return (
    <AppLayout
      title="Billing"
      headerLeft={
        <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center">
          <ArrowLeft className="h-4 w-4 text-foreground" />
        </button>
      }
    >
      {/* Current Plan */}
      <section className="mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs text-muted-foreground">Current Plan</p>
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[hsl(var(--lotiq-green))]/10 text-[hsl(var(--lotiq-green))]">
                Active
              </span>
            </div>
            <p className="text-sm font-semibold text-foreground mb-4">Managed Service Plan</p>

            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-2">
              Portfolio Overview
            </p>
            <div className="bg-muted/50 rounded-xl p-4">
              <p className="text-xs text-muted-foreground mb-0.5">Monthly Subscription</p>
              <p className="text-2xl font-bold text-foreground">$299</p>
              <p className="text-xs text-muted-foreground mt-0.5">Managed service</p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Billing Management */}
      <section className="mb-6">
        <h3 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-3">
          Billing Management
        </h3>
        <Card>
          <CardContent className="p-0 divide-y">
            <button
              onClick={() => navigate(`/property/${id || "prop-1"}/billing/payment`)}
              className="w-full flex items-center gap-3 p-4 hover:bg-muted/30 transition-colors text-left"
            >
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
                <CreditCard className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">Payment Method</p>
                <p className="text-xs text-muted-foreground">ACH</p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
            <button
              onClick={() => navigate(`/property/${id || "prop-1"}/billing/invoices`)}
              className="w-full flex items-center gap-3 p-4 hover:bg-muted/30 transition-colors text-left"
            >
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
                <FileText className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">Invoice History</p>
                <p className="text-xs text-muted-foreground">2 Invoices</p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
          </CardContent>
        </Card>
      </section>

      {/* Subscription Details */}
      <section className="mb-6">
        <h3 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-3">
          Subscription
        </h3>
        <Card>
          <CardContent className="p-4">
            <div className="space-y-3">
              {[
                ["Plan", "Managed Service Plan"],
                ["Monthly Charge", "$299/mo"],
                ["Billing Cycle", "Monthly"],
                ["Property", propertyName],
                ["Start Date", "Sep 1, 2025"],
                ["Next Billing", "Apr 1, 2026"],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className="text-xs font-medium text-foreground">{value}</p>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-muted-foreground mt-4 mb-3">
              Contact LotIQ to adjust your service plan
            </p>
            <Button variant="outline" className="w-full text-destructive border-destructive/30 hover:bg-destructive/5">
              Cancel Renewal
            </Button>
          </CardContent>
        </Card>
      </section>
    </AppLayout>
  );
}
