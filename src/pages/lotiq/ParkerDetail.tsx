import { AppLayout } from "@/components/lotiq/AppLayout";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Mail, MapPin, Calendar, Car, UserX } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const mockParkerDetails: Record<string, {
  name: string; initials: string; status: "active" | "invited" | "disabled";
  email: string; unit: string; phone: string; invitedDate: string;
  vehicles: { plate: string; description: string }[];
}> = {
  p1: { name: "Jeames Wilson", initials: "J", status: "active", email: "j.wilson@email.com", unit: "Unit 204", phone: "+1 (555) 200-100", invitedDate: "01/15/2026", vehicles: [{ plate: "ABC-1234", description: "Black Honda Civic" }, { plate: "DEF-5678", description: "Silver Toyota Camry" }] },
  p2: { name: "Maria Garcia", initials: "M", status: "active", email: "maria.garcia@email.com", unit: "Unit 312 - EV spot assigned", phone: "+1 (555) 300-200", invitedDate: "06/01/2026", vehicles: [{ plate: "GHI-9012", description: "White Tesla Model 3" }] },
  p3: { name: "Tom Chen", initials: "T", status: "invited", email: "tom.chen@email.com", unit: "Unit 108", phone: "+1 (555) 400-300", invitedDate: "03/20/2026", vehicles: [] },
  p4: { name: "Lisa Park", initials: "L", status: "disabled", email: "lisa.park@email.com", unit: "Unit 405", phone: "+1 (555) 500-400", invitedDate: "02/10/2026", vehicles: [{ plate: "JKL-3456", description: "Red Ford F-150" }] },
};

const statusConfig = {
  active: { label: "Active", color: "text-[hsl(var(--lotiq-green))]", bg: "bg-[hsl(var(--lotiq-green))]/10" },
  invited: { label: "Pending", color: "text-[hsl(var(--lotiq-amber))]", bg: "bg-[hsl(var(--lotiq-amber))]/10" },
  disabled: { label: "Disabled", color: "text-muted-foreground", bg: "bg-muted" },
};

export default function ParkerDetail() {
  const { id, parkerId } = useParams();
  const navigate = useNavigate();
  const parker = mockParkerDetails[parkerId || "p2"] || mockParkerDetails["p2"];
  const sc = statusConfig[parker.status];

  return (
    <AppLayout
      title="Parker Details"
      headerLeft={
        <button onClick={() => navigate(`/property/${id || "prop-1"}/parkers`)} className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center">
          <ArrowLeft className="h-4 w-4 text-foreground" />
        </button>
      }
    >
      {/* Avatar & Name */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center text-xl font-bold text-foreground shrink-0">
          {parker.initials}
        </div>
        <div>
          <h2 className="text-lg font-bold text-foreground">{parker.name}</h2>
          <span className={`text-[10px] font-medium px-2.5 py-0.5 rounded-full ${sc.bg} ${sc.color}`}>
            {sc.label}
          </span>
        </div>
      </div>

      {/* Info rows */}
      <div className="space-y-3 mb-6">
        <InfoRow icon={<Mail className="h-4 w-4" />} text={parker.email} />
        <InfoRow icon={<MapPin className="h-4 w-4" />} text={parker.unit} />
        <InfoRow icon={<Calendar className="h-4 w-4" />} text={`Invited ${parker.invitedDate}`} />
      </div>

      {/* Vehicles */}
      <section className="mb-6">
        <h3 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-3">
          Vehicles ({parker.vehicles.length})
        </h3>
        {parker.vehicles.length > 0 ? (
          <div className="space-y-2">
            {parker.vehicles.map((v, i) => (
              <Card key={i}>
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
                    <Car className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{v.plate}</p>
                    <p className="text-xs text-muted-foreground">{v.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No vehicles registered yet</p>
        )}
      </section>

      {/* Disable Access */}
      <Button
        variant="outline"
        className="w-full h-12 rounded-xl text-destructive border-destructive/20 hover:bg-destructive/5 gap-2"
      >
        <UserX className="h-4 w-4" />
        Disable Access
      </Button>
    </AppLayout>
  );
}

function InfoRow({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-3 text-sm text-muted-foreground">
      {icon}
      <span>{text}</span>
    </div>
  );
}
