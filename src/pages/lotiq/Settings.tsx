import { AppLayout } from "@/components/lotiq/AppLayout";
import { Card } from "@/components/ui/card";
import { Bell, HelpCircle, FileText, ShieldCheck, Lock, LogOut, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const sections = [
  {
    label: "NOTIFICATIONS",
    items: [
      { icon: Bell, title: "Notifications", subtitle: "Choose how you receive system alerts", path: "" },
    ],
  },
  {
    label: "SYSTEM & SUPPORT",
    items: [
      { icon: HelpCircle, title: "Help & Support", subtitle: "Contact support and view documentation", path: "/settings/help" },
    ],
  },
  {
    label: "TERMS & POLICIES",
    items: [
      { icon: FileText, title: "Terms & Condition", path: "/settings/terms" },
      { icon: ShieldCheck, title: "Privacy Policy", path: "/settings/privacy" },
    ],
  },
  {
    label: "SECURITY",
    items: [
      { icon: Lock, title: "Change Password", subtitle: "Update your account password", path: "/settings/password" },
    ],
  },
];

export default function Settings() {
  const navigate = useNavigate();

  return (
    <AppLayout title="Settings">
      <div className="space-y-6">
        {sections.map((section) => (
          <div key={section.label}>
            <p className="text-[11px] font-semibold text-muted-foreground tracking-wider mb-2 px-1">
              {section.label}
            </p>
            <div className="space-y-2">
              {section.items.map((item) => (
                <Card
                  key={item.title}
                  className="flex items-center gap-3 p-3.5 cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => item.path && navigate(item.path)}
                >
                  <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center shrink-0">
                    <item.icon className="h-4.5 w-4.5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{item.title}</p>
                    {item.subtitle && (
                      <p className="text-xs text-muted-foreground">{item.subtitle}</p>
                    )}
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
                </Card>
              ))}
            </div>
          </div>
        ))}

        <Button
          variant="outline"
          className="w-full border-destructive text-destructive hover:bg-destructive/10 mt-4"
          onClick={() => navigate("/login")}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Log Out
        </Button>

        <p className="text-center text-xs text-muted-foreground pb-4">LotIQ v1.0.0</p>
      </div>
    </AppLayout>
  );
}
