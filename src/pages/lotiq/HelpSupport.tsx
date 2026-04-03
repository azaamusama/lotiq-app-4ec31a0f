import { AppLayout } from "@/components/lotiq/AppLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Mail, Phone, Camera, Truck, Shield, ChevronRight, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

const contactItems = [
  { icon: Mail, title: "Email Support", subtitle: "support@parkiq.com", external: true },
  { icon: Phone, title: "Phone Support", subtitle: "1-800-5555-1234", external: true },
];

const commonTopics = [
  { icon: Camera, title: "Camera offline", subtitle: "What to do when a camera goes offline" },
  { icon: Truck, title: "Tow cancellation", subtitle: "How to handle tow cancellations" },
  { icon: Shield, title: "Authorized Parker issues", subtitle: "Managing parker access problems" },
];

export default function HelpSupport() {
  const navigate = useNavigate();

  return (
    <AppLayout
      title="Help & Support"
      headerLeft={
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => navigate("/rules")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
      }
      headerRight={<div />}
    >
      <div className="space-y-6">
        <div>
          <p className="text-[11px] font-semibold text-muted-foreground tracking-wider mb-2 px-1">
            CONTACT SUPPORT
          </p>
          <div className="space-y-2">
            {contactItems.map((item) => (
              <Card key={item.title} className="flex items-center gap-3 p-3.5 cursor-pointer hover:bg-muted/50 transition-colors">
                <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center shrink-0">
                  <item.icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.subtitle}</p>
                </div>
                {item.external && <ExternalLink className="h-4 w-4 text-muted-foreground shrink-0" />}
              </Card>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[11px] font-semibold text-muted-foreground tracking-wider mb-2 px-1">
            COMMON TOPICS
          </p>
          <div className="space-y-2">
            {commonTopics.map((item) => (
              <Card key={item.title} className="flex items-center gap-3 p-3.5 cursor-pointer hover:bg-muted/50 transition-colors">
                <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center shrink-0">
                  <item.icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.subtitle}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
              </Card>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
