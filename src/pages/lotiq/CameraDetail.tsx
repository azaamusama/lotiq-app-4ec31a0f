import { useState } from "react";
import { AppLayout } from "@/components/lotiq/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Pause, VolumeX, MicOff, Camera, Video, Maximize2, Zap, Settings2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import cameraEntrance from "@/assets/camera-entrance.jpg";
import cameraRow2 from "@/assets/camera-row2.jpg";
import cameraLotB from "@/assets/camera-lot-b.jpg";
import cameraExit from "@/assets/camera-exit.jpg";
import cameraEv from "@/assets/camera-ev.jpg";

type CameraStatus = "online" | "degraded" | "offline";

interface CameraData {
  id: string;
  name: string;
  zone: string;
  status: CameraStatus;
  image: string;
}

const allCameras: CameraData[] = [
  { id: "cam-1", name: "Entrance Camera", zone: "Lot A - Entrance", status: "online", image: cameraEntrance },
  { id: "cam-2", name: "Row 2 Camera", zone: "Lot A - Row 2", status: "online", image: cameraRow2 },
  { id: "cam-3", name: "Lot B Camera", zone: "Lot B - Main", status: "online", image: cameraLotB },
  { id: "cam-4", name: "Exit Ramp Camera", zone: "Garage - Exit", status: "degraded", image: cameraExit },
  { id: "cam-5", name: "EV Station Camera", zone: "Lot A - EV", status: "offline", image: cameraEv },
];

type TabMode = "live" | "config" | "zones";

export default function CameraDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const camera = allCameras.find(c => c.id === id) || allCameras[0];
  const otherCameras = allCameras.filter(c => c.id !== camera.id && c.status !== "offline").slice(0, 3);

  const [tab, setTab] = useState<TabMode>("live");
  const [slots, setSlots] = useState([
    { id: "1a", name: "Parking slot 1a", isEv: false },
    { id: "1b", name: "Parking slot 1b", isEv: false },
    { id: "1c", name: "Parking slot 1c", isEv: false },
    { id: "1d", name: "Parking slot 1d", isEv: false },
    { id: "1e", name: "Parking slot 1e", isEv: true },
  ]);

  const statusDot = camera.status === "online" ? "bg-[hsl(var(--lotiq-green))]" : camera.status === "degraded" ? "bg-[hsl(var(--lotiq-amber))]" : "bg-destructive";
  const statusText = camera.status === "online" ? "Online" : camera.status === "degraded" ? "Degraded" : "Offline";

  const addSlot = () => {
    const num = slots.length + 1;
    const letter = String.fromCharCode(96 + num);
    setSlots([...slots, { id: `1${letter}`, name: `Parking slot 1${letter}`, isEv: false }]);
  };

  const handleSaveZones = () => {
    toast.success("Zones saved successfully");
    setTab("live");
  };

  return (
    <AppLayout
      title={camera.name}
      subtitle={camera.zone}
      headerLeft={
        <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center">
          <ArrowLeft className="h-4 w-4 text-foreground" />
        </button>
      }
      headerRight={
        <span className="flex items-center gap-1 text-xs font-medium text-[hsl(var(--lotiq-green))]">
          <span className={`w-2 h-2 rounded-full ${statusDot}`} />
          {statusText}
        </span>
      }
    >
      {tab === "zones" ? (
        <div className="flex flex-col min-h-[calc(100vh-80px)]">
          <div className="relative flex-1">
            <img
              src={camera.image}
              alt={camera.name}
              className="w-full h-full object-cover rounded-xl"
              style={{ minHeight: 400 }}
            />
            <div className="absolute bottom-[40%] left-[8%] flex gap-1">
              {slots.map((slot, i) => (
                <div
                  key={slot.id}
                  className={`w-12 h-16 border-2 rounded-sm flex items-center justify-center text-[10px] font-bold text-white ${
                    slot.isEv ? "border-destructive bg-destructive/30" : i === 0 ? "border-primary bg-primary/30" : "border-[hsl(var(--lotiq-green))] bg-[hsl(var(--lotiq-green))]/30"
                  }`}
                >
                  {slot.id}
                </div>
              ))}
            </div>
          </div>

          <div className="py-4 space-y-3">
            <div>
              <p className="text-sm font-semibold text-foreground">Tap on the video to create a zone</p>
              <p className="text-xs text-muted-foreground">Activity will be selected inside the selected area.</p>
            </div>
            <Button className="w-full h-12 rounded-xl text-base font-semibold" onClick={handleSaveZones}>
              Save
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="relative mb-4">
            <img
              src={camera.image}
              alt={camera.name}
              className="w-full h-52 object-cover rounded-xl"
            />
            <div className="absolute top-2 left-2">
              <span className="inline-flex items-center gap-1.5 bg-card/90 backdrop-blur-sm rounded-full px-2.5 py-1 text-[10px] font-medium text-foreground">
                <span className={`w-1.5 h-1.5 rounded-full ${statusDot}`} />
                {camera.name}
              </span>
            </div>
            <div className="absolute bottom-[30%] left-[15%] flex gap-0.5">
              {slots.map((slot, i) => (
                <div
                  key={slot.id}
                  className={`w-8 h-10 border rounded-sm flex items-center justify-center text-[7px] font-bold text-white ${
                    slot.isEv ? "border-destructive bg-destructive/30" : i === 0 ? "border-primary bg-primary/30" : "border-[hsl(var(--lotiq-green))] bg-[hsl(var(--lotiq-green))]/30"
                  }`}
                >
                  {slot.id}
                </div>
              ))}
            </div>
          </div>

          <Card className="mb-4">
            <CardContent className="p-1 flex">
              <button
                onClick={() => setTab("live")}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                  tab === "live" ? "bg-muted text-foreground" : "text-muted-foreground"
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${tab === "live" ? "bg-[hsl(var(--lotiq-green))]" : "bg-muted-foreground"}`} />
                Live
              </button>
              <button
                onClick={() => setTab("config")}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                  tab === "config" ? "bg-muted text-foreground" : "text-muted-foreground"
                }`}
              >
                <Settings2 className="h-3.5 w-3.5" />
                Configuration
              </button>
            </CardContent>
          </Card>

          {tab === "live" ? (
            <>
              <div className="flex items-center justify-between px-4 mb-6">
                {[Pause, VolumeX, MicOff, Camera, Video, Maximize2].map((Icon, i) => (
                  <button key={i} className="w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                    <Icon className="h-4 w-4" />
                  </button>
                ))}
              </div>

              <div>
                <h3 className="text-sm font-bold text-foreground mb-3">Other Cameras</h3>
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {otherCameras.map((cam) => (
                    <button
                      key={cam.id}
                      onClick={() => navigate(`/cameras/${cam.id}`)}
                      className="flex-shrink-0 w-24"
                    >
                      <div className="relative">
                        <img
                          src={cam.image}
                          alt={cam.name}
                          className="w-24 h-16 object-cover rounded-lg"
                        />
                        <span className={`absolute top-1 right-1 w-2 h-2 rounded-full ${
                          cam.status === "online" ? "bg-[hsl(var(--lotiq-green))]" : "bg-[hsl(var(--lotiq-amber))]"
                        }`} />
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-1 text-center truncate">{cam.name}</p>
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-0">
                {slots.map((slot) => (
                  <div key={slot.id} className="flex items-center justify-between py-3.5 border-b border-border">
                    <span className="text-sm text-foreground">
                      {slot.name}
                      {slot.isEv && <Zap className="inline h-3.5 w-3.5 ml-1 text-[hsl(var(--lotiq-amber))]" />}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-3">
                <Button className="w-full h-12 rounded-xl text-base font-semibold" onClick={addSlot}>
                  Add New Slot
                </Button>
                <Button
                  variant="outline"
                  className="w-full h-12 rounded-xl text-base font-semibold"
                  onClick={() => setTab("zones")}
                >
                  Edit Zones
                </Button>
              </div>
            </>
          )}
        </>
      )}
    </AppLayout>
  );
}
