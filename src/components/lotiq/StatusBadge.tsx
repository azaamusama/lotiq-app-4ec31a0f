import { cn } from "@/lib/utils";
import { IncidentStatus, TowStatus, statusColors, towStatusColors, towStatusLabels } from "@/lib/mock-data";

export function IncidentStatusBadge({ status }: { status: IncidentStatus }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium border", statusColors[status])}>
      <span className={cn("w-1.5 h-1.5 rounded-full", {
        "bg-status-active animate-pulse-dot": status === "active",
        "bg-status-resolved": status === "resolved",
        "bg-status-escalated": status === "escalated",
        "bg-primary": status === "monitoring",
      })} />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

export function TowStatusBadge({ status }: { status: TowStatus }) {
  return (
    <span className={cn("inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium", towStatusColors[status])}>
      {towStatusLabels[status]}
    </span>
  );
}
