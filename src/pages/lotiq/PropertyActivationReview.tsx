import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  CheckCircle2,
  Car,
  Trash2,
  MapPin,
  Camera,
  Shield,
  ChevronRight,
  AlertTriangle,
  Eye,
  RotateCcw,
} from "lucide-react";

interface ReviewItem {
  id: string;
  label: string;
  location: string;
  status: "pending" | "approved" | "flagged";
  imageUrl?: string;
}

const STEPS = [
  { key: "parking", label: "Parking Spots", icon: Car },
  { key: "trash", label: "Trash Spots", icon: Trash2 },
  { key: "zones", label: "Zones & Areas", icon: MapPin },
  { key: "cameras", label: "Camera Feeds", icon: Camera },
  { key: "rules", label: "Rules & Enforcement", icon: Shield },
  { key: "confirm", label: "Go Live", icon: CheckCircle2 },
] as const;

type StepKey = (typeof STEPS)[number]["key"];

const mockParkingSpots: ReviewItem[] = [
  { id: "ps-1", label: "Spot A-01", location: "Level 1, Row A", status: "pending" },
  { id: "ps-2", label: "Spot A-02", location: "Level 1, Row A", status: "pending" },
  { id: "ps-3", label: "Spot A-03 (EV)", location: "Level 1, Row A", status: "pending" },
  { id: "ps-4", label: "Spot B-01", location: "Level 1, Row B", status: "pending" },
  { id: "ps-5", label: "Spot B-02 (Handicap)", location: "Level 1, Row B", status: "pending" },
  { id: "ps-6", label: "Spot C-01", location: "Level 2, Row C", status: "pending" },
  { id: "ps-7", label: "Spot C-02", location: "Level 2, Row C", status: "pending" },
  { id: "ps-8", label: "Spot D-01 (Reserved)", location: "Level 2, Row D", status: "pending" },
];

const mockTrashSpots: ReviewItem[] = [
  { id: "ts-1", label: "Dumpster – North", location: "Parking Lot Entrance", status: "pending" },
  { id: "ts-2", label: "Dumpster – South", location: "Building Rear", status: "pending" },
  { id: "ts-3", label: "Recycling Bin – Lobby", location: "Main Lobby", status: "pending" },
  { id: "ts-4", label: "Waste Chute – L2", location: "Level 2, Hallway", status: "pending" },
];

const mockZones: ReviewItem[] = [
  { id: "z-1", label: "Zone A – Visitor", location: "Front lot, 20 spots", status: "pending" },
  { id: "z-2", label: "Zone B – Resident", location: "Rear lot, 30 spots", status: "pending" },
  { id: "z-3", label: "Zone C – EV Charging", location: "Level 1, 4 spots", status: "pending" },
  { id: "z-4", label: "Fire Lane", location: "Building perimeter", status: "pending" },
  { id: "z-5", label: "Loading Dock", location: "East side", status: "pending" },
];

const mockCameras: ReviewItem[] = [
  { id: "c-1", label: "CAM-01 Entrance", location: "Main Gate", status: "pending" },
  { id: "c-2", label: "CAM-02 Exit", location: "Rear Gate", status: "pending" },
  { id: "c-3", label: "CAM-03 Level 1", location: "Level 1 Overview", status: "pending" },
  { id: "c-4", label: "CAM-04 Level 2", location: "Level 2 Overview", status: "pending" },
  { id: "c-5", label: "CAM-05 Dumpster", location: "North Dumpster Area", status: "pending" },
];

const mockRules: ReviewItem[] = [
  { id: "r-1", label: "Unauthorized Parking", location: "All zones, 24/7", status: "pending" },
  { id: "r-2", label: "EV Misuse Detection", location: "Zone C only", status: "pending" },
  { id: "r-3", label: "Trash Overflow Alert", location: "All dumpster areas", status: "pending" },
  { id: "r-4", label: "Fire Lane Violation", location: "Building perimeter", status: "pending" },
  { id: "r-5", label: "After-Hours Access", location: "All zones, 10PM–6AM", status: "pending" },
];

function getItemsForStep(step: StepKey): ReviewItem[] {
  switch (step) {
    case "parking": return mockParkingSpots;
    case "trash": return mockTrashSpots;
    case "zones": return mockZones;
    case "cameras": return mockCameras;
    case "rules": return mockRules;
    default: return [];
  }
}

export default function PropertyActivationReview() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [currentStep, setCurrentStep] = useState(0);
  const [reviewState, setReviewState] = useState<Record<string, Record<string, "approved" | "flagged">>>({});

  const stepInfo = STEPS[currentStep];
  const isConfirmStep = stepInfo.key === "confirm";
  const progressPercent = ((currentStep + 1) / STEPS.length) * 100;

  const setItemStatus = (stepKey: string, itemId: string, status: "approved" | "flagged") => {
    setReviewState(prev => ({
      ...prev,
      [stepKey]: { ...prev[stepKey], [itemId]: status },
    }));
  };

  const getItemStatus = (stepKey: string, itemId: string) => {
    return reviewState[stepKey]?.[itemId] || "pending";
  };

  const currentItems = isConfirmStep ? [] : getItemsForStep(stepInfo.key);
  const reviewedCount = Object.keys(reviewState[stepInfo.key] || {}).length;
  const allReviewed = reviewedCount === currentItems.length;

  const approveAll = () => {
    const items = getItemsForStep(stepInfo.key);
    const newState: Record<string, "approved" | "flagged"> = {};
    items.forEach(item => { newState[item.id] = "approved"; });
    setReviewState(prev => ({ ...prev, [stepInfo.key]: newState }));
  };

  // Summary for confirm step
  const getSummary = () => {
    return STEPS.filter(s => s.key !== "confirm").map(s => {
      const items = getItemsForStep(s.key);
      const reviewed = reviewState[s.key] || {};
      const approved = Object.values(reviewed).filter(v => v === "approved").length;
      const flagged = Object.values(reviewed).filter(v => v === "flagged").length;
      const pending = items.length - approved - flagged;
      return { ...s, total: items.length, approved, flagged, pending };
    });
  };

  const allStepsComplete = getSummary().every(s => s.pending === 0);
  const hasFlagged = getSummary().some(s => s.flagged > 0);

  const next = () => {
    if (currentStep < STEPS.length - 1) setCurrentStep(currentStep + 1);
  };
  const back = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
    else navigate(-1);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-background border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={back} className="p-1">
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </button>
          <div className="text-center">
            <p className="text-sm font-semibold text-foreground">Activation Review</p>
            <p className="text-[10px] text-muted-foreground">
              Step {currentStep + 1} of {STEPS.length}: {stepInfo.label}
            </p>
          </div>
          <div className="w-6" />
        </div>
        <div className="h-1 bg-muted">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Step navigation chips */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {STEPS.map((s, idx) => {
            const Icon = s.icon;
            const isActive = idx === currentStep;
            const stepReview = reviewState[s.key] || {};
            const items = s.key !== "confirm" ? getItemsForStep(s.key) : [];
            const done = items.length > 0 && Object.keys(stepReview).length === items.length;
            return (
              <button
                key={s.key}
                onClick={() => setCurrentStep(idx)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all shrink-0 ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : done
                    ? "bg-success/10 text-success border border-success/20"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {done && !isActive ? (
                  <CheckCircle2 className="h-3.5 w-3.5" />
                ) : (
                  <Icon className="h-3.5 w-3.5" />
                )}
                {s.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 pb-32 overflow-y-auto">
        {!isConfirmStep ? (
          <>
            {/* Section header with bulk action */}
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  Review {stepInfo.label}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {reviewedCount}/{currentItems.length} reviewed
                </p>
              </div>
              {!allReviewed && (
                <Button variant="outline" size="sm" className="text-xs h-8 rounded-lg" onClick={approveAll}>
                  <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                  Approve All
                </Button>
              )}
            </div>

            {/* Items */}
            <div className="space-y-2.5">
              {currentItems.map(item => {
                const status = getItemStatus(stepInfo.key, item.id);
                return (
                  <Card
                    key={item.id}
                    className={`transition-all ${
                      status === "approved"
                        ? "border-success/30 bg-success/5"
                        : status === "flagged"
                        ? "border-destructive/30 bg-destructive/5"
                        : "border-border"
                    }`}
                  >
                    <CardContent className="p-3.5">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                          status === "approved"
                            ? "bg-success/10"
                            : status === "flagged"
                            ? "bg-destructive/10"
                            : "bg-muted"
                        }`}>
                          {status === "approved" ? (
                            <CheckCircle2 className="h-4 w-4 text-success" />
                          ) : status === "flagged" ? (
                            <AlertTriangle className="h-4 w-4 text-destructive" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{item.label}</p>
                          <p className="text-xs text-muted-foreground truncate">{item.location}</p>
                        </div>
                        {status === "pending" ? (
                          <div className="flex gap-1.5 shrink-0">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0 rounded-lg border-success/30 text-success hover:bg-success/10"
                              onClick={() => setItemStatus(stepInfo.key, item.id, "approved")}
                            >
                              <CheckCircle2 className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0 rounded-lg border-destructive/30 text-destructive hover:bg-destructive/10"
                              onClick={() => setItemStatus(stepInfo.key, item.id, "flagged")}
                            >
                              <AlertTriangle className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 rounded-lg text-muted-foreground"
                            onClick={() => {
                              setReviewState(prev => {
                                const copy = { ...prev[stepInfo.key] };
                                delete copy[item.id];
                                return { ...prev, [stepInfo.key]: copy };
                              });
                            }}
                          >
                            <RotateCcw className="h-3.5 w-3.5" />
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </>
        ) : (
          /* Confirmation / Go Live step */
          <div className="space-y-4">
            <div className="text-center py-4">
              <div className={`w-16 h-16 rounded-2xl mx-auto mb-3 flex items-center justify-center ${
                allStepsComplete && !hasFlagged ? "bg-success/10" : "bg-warning/10"
              }`}>
                {allStepsComplete && !hasFlagged ? (
                  <CheckCircle2 className="h-8 w-8 text-success" />
                ) : (
                  <AlertTriangle className="h-8 w-8 text-warning" />
                )}
              </div>
              <h3 className="text-lg font-bold text-foreground">
                {allStepsComplete && !hasFlagged ? "Ready to Go Live!" : "Review Summary"}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                {allStepsComplete && !hasFlagged
                  ? "All items have been reviewed and approved."
                  : hasFlagged
                  ? "Some items need attention before going live."
                  : "Complete all review steps to activate."}
              </p>
            </div>

            {getSummary().map(s => {
              const Icon = s.icon;
              return (
                <Card
                  key={s.key}
                  className={`cursor-pointer transition-all ${
                    s.flagged > 0
                      ? "border-destructive/30"
                      : s.pending === 0
                      ? "border-success/30"
                      : "border-border"
                  }`}
                  onClick={() => setCurrentStep(STEPS.findIndex(st => st.key === s.key))}
                >
                  <CardContent className="p-3.5 flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                      s.pending === 0 && s.flagged === 0
                        ? "bg-success/10"
                        : s.flagged > 0
                        ? "bg-destructive/10"
                        : "bg-muted"
                    }`}>
                      {s.pending === 0 && s.flagged === 0 ? (
                        <CheckCircle2 className="h-4 w-4 text-success" />
                      ) : (
                        <Icon className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{s.label}</p>
                      <div className="flex gap-2 text-[10px] mt-0.5">
                        <span className="text-success font-medium">{s.approved} approved</span>
                        {s.flagged > 0 && (
                          <span className="text-destructive font-medium">{s.flagged} flagged</span>
                        )}
                        {s.pending > 0 && (
                          <span className="text-muted-foreground">{s.pending} pending</span>
                        )}
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Bottom action */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 z-10">
        <div className="max-w-3xl mx-auto">
          {isConfirmStep ? (
            <Button
              className="w-full h-12 rounded-xl text-sm font-semibold"
              disabled={!allStepsComplete || hasFlagged}
              onClick={() => {
                navigate(id ? `/property/${id}` : "/dashboard");
              }}
            >
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Activate Property — Go Live
            </Button>
          ) : (
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 h-12 rounded-xl text-sm"
                onClick={back}
              >
                Back
              </Button>
              <Button
                className="flex-1 h-12 rounded-xl text-sm font-semibold"
                onClick={next}
              >
                {allReviewed ? "Continue" : `Continue (${reviewedCount}/${currentItems.length})`}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
