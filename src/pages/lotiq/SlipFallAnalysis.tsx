import { useState } from "react";
import { AppLayout } from "@/components/lotiq/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, CalendarDays, Clock } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export default function SlipFallAnalysis() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSave = () => {
    if (!date) return toast.error("Please enter a date");
    if (!time) return toast.error("Please enter a time range");
    toast.success("Slip & Fall analysis request submitted");
    navigate(`/property/${id || "prop-1"}`);
  };

  return (
    <AppLayout
      title="Slip & Fall Analysis"
      headerLeft={
        <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center">
          <ArrowLeft className="h-4 w-4 text-foreground" />
        </button>
      }
    >
      <p className="text-sm text-muted-foreground mb-6">
        Please enter the date and time and we'll provide you with the footage within 24 hours.
      </p>

      <div className="space-y-5">
        <div>
          <Label className="text-sm font-medium text-foreground">Date</Label>
          <div className="relative mt-1.5">
            <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="pl-10 h-12 rounded-xl"
              placeholder="11/02/2026"
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1.5">At least one of email or phone is required</p>
        </div>

        <div>
          <Label className="text-sm font-medium text-foreground">Time</Label>
          <div className="relative mt-1.5">
            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="pl-10 h-12 rounded-xl"
              placeholder="6:00 AM - 8:00 AM"
              maxLength={30}
            />
          </div>
        </div>
      </div>

      {/* Illustration area */}
      <div className="flex-1 flex items-center justify-center py-10">
        <div className="text-center">
          <div className="w-40 h-40 mx-auto mb-2 flex items-center justify-center">
            <svg viewBox="0 0 200 200" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Umbrella */}
              <path d="M100 40 C60 40 30 70 30 100 L100 100 L170 100 C170 70 140 40 100 40Z" fill="hsl(var(--primary))" opacity="0.7" />
              <path d="M100 40 C80 40 60 55 50 75 L100 100Z" fill="hsl(var(--primary))" opacity="0.9" />
              <line x1="100" y1="40" x2="100" y2="160" stroke="hsl(var(--foreground))" strokeWidth="2" />
              {/* Handle */}
              <path d="M100 155 C100 165 90 165 90 155" stroke="hsl(var(--foreground))" strokeWidth="2" fill="none" />
              {/* Person body */}
              <circle cx="105" cy="110" r="8" fill="hsl(var(--muted-foreground))" opacity="0.5" />
              <line x1="105" y1="118" x2="105" y2="145" stroke="hsl(var(--muted-foreground))" strokeWidth="2" opacity="0.5" />
              <line x1="105" y1="145" x2="95" y2="170" stroke="hsl(var(--muted-foreground))" strokeWidth="2" opacity="0.5" />
              <line x1="105" y1="145" x2="115" y2="170" stroke="hsl(var(--muted-foreground))" strokeWidth="2" opacity="0.5" />
              {/* Ground line */}
              <line x1="40" y1="175" x2="160" y2="175" stroke="hsl(var(--border))" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </div>

      {/* Save button */}
      <div className="mt-auto pt-4">
        <Button className="w-full h-12 rounded-xl text-base font-semibold" onClick={handleSave}>
          Save
        </Button>
      </div>
    </AppLayout>
  );
}
