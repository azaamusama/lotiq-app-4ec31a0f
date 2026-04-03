import { AppLayout } from "@/components/lotiq/AppLayout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import emptyPropertyImg from "@/assets/empty-property.png";

export default function AddProperty() {
  const navigate = useNavigate();

  return (
    <AppLayout
      title="Properties"
      headerRight={
        <Button size="icon" className="h-9 w-9 rounded-xl" onClick={() => navigate("/property/setup")}>
          <Plus className="h-5 w-5" />
        </Button>
      }
    >
      <div className="flex flex-col items-center justify-center flex-1 px-6 pt-12">
        <p className="text-base text-muted-foreground mb-10">
          Start by adding your first property!
        </p>

        <img
          src={emptyPropertyImg}
          alt="Empty property illustration"
          width={280}
          height={280}
          className="mb-8"
        />

        <Button
          className="w-full max-w-sm h-12 rounded-xl text-base font-semibold"
          onClick={() => navigate("/property/setup")}
        >
          Add Property
        </Button>
      </div>
    </AppLayout>
  );
}
