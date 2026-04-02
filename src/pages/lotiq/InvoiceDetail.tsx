import { AppLayout } from "@/components/lotiq/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Mail, HelpCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const invoiceData: Record<string, {
  id: string; status: "paid" | "due"; period: string; property: string;
  date: string; paymentMethod: string; lineItems: { label: string; amount: number }[]; total: number;
}> = {
  "PIQ-2026-006": {
    id: "PIQ-2026-006", status: "due", period: "Mar 1 – Mar 31, 2026",
    property: "Maple Heights Apts", date: "March 1, 2026", paymentMethod: "ACH ••••6789",
    lineItems: [
      { label: "Managed Service Subscription Monthly", amount: 299.00 },
      { label: "HST (13%)", amount: 38.87 },
    ],
    total: 337.87,
  },
  "PIQ-2026-005": {
    id: "PIQ-2026-005", status: "paid", period: "Feb 1 – Feb 28, 2026",
    property: "Maple Heights Apts", date: "February 1, 2026", paymentMethod: "ACH ••••6789",
    lineItems: [
      { label: "Managed Service Subscription Monthly", amount: 299.00 },
      { label: "HST (13%)", amount: 38.87 },
    ],
    total: 337.87,
  },
};

export default function InvoiceDetail() {
  const navigate = useNavigate();
  const { invoiceId } = useParams();
  const invoice = invoiceData[invoiceId || "PIQ-2026-006"] || invoiceData["PIQ-2026-006"];

  return (
    <AppLayout
      title={invoice.id}
      headerLeft={
        <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center">
          <ArrowLeft className="h-4 w-4 text-foreground" />
        </button>
      }
    >
      {/* Invoice header */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-semibold text-foreground">{invoice.id}</p>
            <span className={`text-[10px] font-medium px-2.5 py-0.5 rounded-full ${
              invoice.status === "paid"
                ? "bg-[hsl(var(--lotiq-green))]/10 text-[hsl(var(--lotiq-green))]"
                : "bg-destructive/10 text-destructive"
            }`}>
              {invoice.status === "paid" ? "Paid" : "Due"}
            </span>
          </div>
          <div className="space-y-2.5">
            {[
              ["Billing Period", invoice.period],
              ["Property", invoice.property],
              ["Date", invoice.date],
              ["Payment Method", invoice.paymentMethod],
            ].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="text-xs font-medium text-foreground">{value}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Line items */}
      <section className="mb-6">
        <h3 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-3">
          Line Items
        </h3>
        <Card>
          <CardContent className="p-4">
            <div className="space-y-3 mb-4">
              {invoice.lineItems.map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <p className="text-xs text-foreground">{item.label}</p>
                  <p className="text-xs font-medium text-foreground">${item.amount.toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="border-t pt-3 flex items-center justify-between">
              <p className="text-sm font-semibold text-foreground">Total</p>
              <p className="text-lg font-bold text-foreground">${invoice.total.toFixed(2)}</p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Actions */}
      <div className="space-y-2.5">
        <Button variant="outline" className="w-full justify-center gap-2">
          <Download className="h-4 w-4" />
          Download PDF
        </Button>
        <Button variant="outline" className="w-full justify-center gap-2">
          <Mail className="h-4 w-4" />
          Email Receipt
        </Button>
        <Button variant="outline" className="w-full justify-center gap-2">
          <HelpCircle className="h-4 w-4" />
          Contact Support
        </Button>
      </div>
    </AppLayout>
  );
}
