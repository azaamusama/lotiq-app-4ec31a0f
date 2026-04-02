import { useState } from "react";
import { AppLayout } from "@/components/lotiq/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, FileText } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

type InvoiceStatus = "paid" | "due";
type FilterType = "all" | "paid" | "due";

interface Invoice {
  id: string;
  label: string;
  date: string;
  property: string;
  amount: number;
  status: InvoiceStatus;
}

const invoices: Invoice[] = [
  { id: "PIQ-2026-006", label: "Subscription Mar 1, 2026", date: "2026-03-01", property: "Maple Heights Apts", amount: 299, status: "due" },
  { id: "PIQ-2026-005", label: "Subscription Feb 1, 2026", date: "2026-02-01", property: "Maple Heights Apts", amount: 299, status: "paid" },
];

const filters: { label: string; value: FilterType }[] = [
  { label: "All", value: "all" },
  { label: "Paid", value: "paid" },
  { label: "Due", value: "due" },
];

export default function Invoices() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [filter, setFilter] = useState<FilterType>("all");

  const filtered = filter === "all" ? invoices : invoices.filter(i => i.status === filter);

  return (
    <AppLayout
      title="Invoices"
      headerLeft={
        <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center">
          <ArrowLeft className="h-4 w-4 text-foreground" />
        </button>
      }
    >
      {/* Filters */}
      <div className="flex items-center gap-2 mb-4">
        {filters.map(f => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
              filter === f.value
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Invoice list */}
      <div className="space-y-2.5">
        {filtered.map(inv => (
          <Card
            key={inv.id}
            className="cursor-pointer hover:bg-muted/30 transition-colors"
            onClick={() => navigate(`/property/${id || "prop-1"}/billing/invoices/${inv.id}`)}
          >
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
                <FileText className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">{inv.id}</p>
                <p className="text-xs text-muted-foreground">{inv.label}</p>
                <p className="text-[10px] text-muted-foreground">{inv.property}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-semibold text-foreground">${inv.amount}</p>
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                  inv.status === "paid"
                    ? "bg-[hsl(var(--lotiq-green))]/10 text-[hsl(var(--lotiq-green))]"
                    : "bg-destructive/10 text-destructive"
                }`}>
                  {inv.status === "paid" ? "Paid" : "Due"}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
        {filtered.length === 0 && (
          <Card>
            <CardContent className="p-6 text-center text-sm text-muted-foreground">
              No invoices found
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  );
}
