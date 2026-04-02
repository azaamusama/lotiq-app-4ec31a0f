import { useState } from "react";
import { AppLayout } from "@/components/lotiq/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function PaymentMethod() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "Sarah Johnson",
    routing: "110000000000",
    account: "000123456789",
    confirmAccount: "000123456789",
    address: "1200 Maple Ave, Toronto ON",
  });

  const update = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!form.name.trim() || !form.routing.trim() || !form.account.trim() || !form.address.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    if (form.account !== form.confirmAccount) {
      toast.error("Account numbers do not match");
      return;
    }
    toast.success("Payment method updated");
    navigate(-1);
  };

  return (
    <AppLayout
      title="ACH / Routing"
      headerLeft={
        <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center">
          <ArrowLeft className="h-4 w-4 text-foreground" />
        </button>
      }
    >
      <Card>
        <CardContent className="p-4 space-y-4">
          <div>
            <Label className="text-xs text-muted-foreground mb-1.5">Name on Account</Label>
            <Input
              value={form.name}
              onChange={e => update("name", e.target.value)}
              maxLength={100}
            />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground mb-1.5">Routing Number</Label>
            <Input
              value={form.routing}
              onChange={e => update("routing", e.target.value.replace(/\D/g, ""))}
              maxLength={12}
              inputMode="numeric"
            />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground mb-1.5">Account Number</Label>
            <Input
              value={form.account}
              onChange={e => update("account", e.target.value.replace(/\D/g, ""))}
              maxLength={17}
              inputMode="numeric"
            />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground mb-1.5">Retype Account Number</Label>
            <Input
              value={form.confirmAccount}
              onChange={e => update("confirmAccount", e.target.value.replace(/\D/g, ""))}
              maxLength={17}
              inputMode="numeric"
            />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground mb-1.5">Billing Address</Label>
            <Input
              value={form.address}
              onChange={e => update("address", e.target.value)}
              maxLength={200}
            />
          </div>

          <Button onClick={handleSubmit} className="w-full mt-2">
            Send
          </Button>
        </CardContent>
      </Card>
    </AppLayout>
  );
}
