import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, ArrowLeft, CheckCircle2, Building2, MapPin, ChevronRight } from "lucide-react";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

type Step = 1 | 2 | 3;

export default function Signup() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>(1);

  // Step 1
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState<"landlord" | "manager">("landlord");
  const [workEmail, setWorkEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Step 2
  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("United States");
  const [timezone, setTimezone] = useState("United States");
  const [placeName, setPlaceName] = useState("");
  const [category, setCategory] = useState("");
  const [locatedWithin, setLocatedWithin] = useState("");
  // sub-steps within step 2: "details" | "map" | "addPlace"
  const [subStep, setSubStep] = useState<"details" | "map" | "addPlace">("details");

  const progressWidth = step === 1 ? "33%" : step === 2 ? "66%" : "100%";

  const stepLabels: Record<Step, { icon: React.ReactNode; label: string }> = {
    1: { icon: <CheckCircle2 className="h-3.5 w-3.5" />, label: "Create Account" },
    2: { icon: <Building2 className="h-3.5 w-3.5" />, label: "Business Basics" },
    3: { icon: <CheckCircle2 className="h-3.5 w-3.5" />, label: "Confirmation" },
  };

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-lg mx-auto">
      <div className="w-full flex-1 px-6 pt-6 pb-6 flex flex-col">
        {/* Header */}
        <div className="shrink-0">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              {step > 1 && (
                <button
                  onClick={() => {
                    if (subStep === "addPlace") { setSubStep("map"); return; }
                    if (subStep === "map") { setSubStep("details"); return; }
                    setStep((s) => (s - 1) as Step);
                  }}
                  className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center"
                >
                  <ArrowLeft className="h-4 w-4 text-foreground" />
                </button>
              )}
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold text-[10px]">L</span>
                </div>
                <span className="text-sm font-bold text-foreground">
                  Lot <span className="text-primary">IQ</span>
                </span>
              </div>
            </div>
            <span className="text-xs text-muted-foreground">Step {step} of 3</span>
          </div>

          {/* Progress */}
          <div className="flex gap-1 mb-3">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex-1 h-1 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: s <= step ? "100%" : "0%" }}
                />
              </div>
            ))}
          </div>

          {/* Step label */}
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
            {stepLabels[step].icon}
            <span>{stepLabels[step].label}</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {step === 1 && (
            <div>
              <h2 className="text-lg font-bold text-foreground mb-1">Create your account</h2>
              <p className="text-xs text-muted-foreground mb-5">Get started with Lot IQ.</p>

              <div className="space-y-4">
                <Field label="Full name">
                  <Input placeholder="Jane Smith" value={fullName} onChange={(e) => setFullName(e.target.value)} className="h-11 bg-background border-border" />
                </Field>
                <Field label="Company name">
                  <Input placeholder="Company Name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="h-11 bg-background border-border" />
                </Field>

                {/* Role toggle */}
                <div className="flex gap-2">
                  {(["landlord", "manager"] as const).map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRole(r)}
                      className={`flex-1 h-10 rounded-lg border text-xs font-medium transition-colors ${
                        role === r
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-border text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      {r === "landlord" ? "Landlord" : "Property Manager"}
                    </button>
                  ))}
                </div>

                <Field label="Work email">
                  <Input type="email" placeholder="jan@company.com" value={workEmail} onChange={(e) => setWorkEmail(e.target.value)} className="h-11 bg-background border-border" />
                </Field>
                <Field label="Phone number">
                  <Input type="tel" placeholder="+1 (555) 000-0000" value={phone} onChange={(e) => setPhone(e.target.value)} className="h-11 bg-background border-border" />
                </Field>
                <Field label="Password">
                  <div className="relative">
                    <Input
                      type={showPw ? "text" : "password"}
                      placeholder="Create a strong password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-11 bg-background border-border pr-10"
                    />
                    <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </Field>
                <Field label="Confirm Password">
                  <div className="relative">
                    <Input
                      type={showConfirm ? "text" : "password"}
                      placeholder="Confirm password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="h-11 bg-background border-border pr-10"
                    />
                    <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </Field>
              </div>

              <Button
                className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold text-base mt-6"
                onClick={() => setStep(2)}
              >
                Continue
              </Button>
            </div>
          )}

          {step === 2 && subStep === "details" && (
            <div>
              <h2 className="text-lg font-bold text-foreground mb-1">Business details</h2>
              <p className="text-xs text-muted-foreground mb-5">Tell us about your business.</p>

              <div className="space-y-4">
                <Field label="Business name">
                  <Input placeholder="Sunset Plaza" value={businessName} onChange={(e) => setBusinessName(e.target.value)} className="h-11 bg-background border-border" />
                </Field>
                <Field label="Type">
                  <Select value={businessType} onValueChange={setBusinessType}>
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="office">Office</SelectItem>
                      <SelectItem value="residential">Residential</SelectItem>
                      <SelectItem value="industrial">Industrial</SelectItem>
                      <SelectItem value="mixed">Mixed Use</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Address">
                  <Input placeholder="123 Main St, City, State" value={address} onChange={(e) => setAddress(e.target.value)} className="h-11 bg-background border-border" />
                </Field>
                <Field label="Country / Region">
                  <Input value={country} onChange={(e) => setCountry(e.target.value)} className="h-11 bg-background border-border" />
                </Field>
                <Field label="Timezone">
                  <Input value={timezone} onChange={(e) => setTimezone(e.target.value)} className="h-11 bg-background border-border" />
                </Field>
              </div>

              <button
                type="button"
                onClick={() => setSubStep("map")}
                className="w-full mt-5 h-11 rounded-xl border border-border flex items-center justify-center gap-2 text-sm text-muted-foreground hover:bg-muted transition-colors"
              >
                <MapPin className="h-4 w-4" />
                Add Location Automatically
              </button>

              <Button
                className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold text-base mt-6"
                onClick={() => setSubStep("map")}
              >
                Continue
              </Button>
            </div>
          )}

          {/* Confirm Location - Map View */}
          {step === 2 && subStep === "map" && (
            <div className="flex flex-col -mx-6 -mt-2">
              <div className="flex items-center gap-3 px-6 py-3">
                <h2 className="text-lg font-bold text-foreground">Confirm location</h2>
              </div>
              {/* Map placeholder */}
              <div className="relative w-full h-80 bg-muted overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-primary/10 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-10 w-10 text-primary mx-auto mb-2" />
                    <p className="text-sm font-medium text-foreground">{address || "New York, NY"}</p>
                    <p className="text-xs text-muted-foreground mt-1">Drag pin to adjust location</p>
                  </div>
                </div>
                {/* Simulated map grid */}
                <div className="absolute inset-0 opacity-10">
                  <div className="grid grid-cols-6 grid-rows-6 h-full w-full">
                    {Array.from({ length: 36 }).map((_, i) => (
                      <div key={i} className="border border-foreground/20" />
                    ))}
                  </div>
                </div>
              </div>
              <div className="px-6 pt-4 pb-2">
                <Button
                  className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold text-base"
                  onClick={() => setSubStep("addPlace")}
                >
                  Save
                </Button>
              </div>
            </div>
          )}

          {/* Add a Place */}
          {step === 2 && subStep === "addPlace" && (
            <div>
              <h2 className="text-lg font-bold text-foreground mb-1">Add a place</h2>
              <p className="text-xs text-muted-foreground mb-5">
                Provide some information about this place. This place is added to Maps, it will appear publicly.
              </p>

              <div className="space-y-4">
                <Field label="Place name (required)*" noStar>
                  <Input placeholder="Place name (required)*" value={placeName} onChange={(e) => setPlaceName(e.target.value)} className="h-11 bg-background border-border" />
                </Field>
                <Field label="Category (required)*" noStar>
                  <button
                    type="button"
                    className="w-full h-11 rounded-md border border-border bg-background px-3 flex items-center justify-between text-sm text-muted-foreground"
                  >
                    <span>{category || "Category (required)*"}</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </Field>
                <Field label="Address *">
                  <Input placeholder="123 Main St, City, State" value={address} onChange={(e) => setAddress(e.target.value)} className="h-11 bg-background border-border" />
                </Field>
                <Field label="Located within" noStar>
                  <Input placeholder="Located within" value={locatedWithin} onChange={(e) => setLocatedWithin(e.target.value)} className="h-11 bg-background border-border" />
                </Field>
              </div>

              <Button
                className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold text-base mt-6"
                onClick={() => { setSubStep("details"); setStep(3); }}
              >
                Save
              </Button>
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col items-center pt-8">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-lg font-bold text-foreground text-center mb-1">
                Your request has been submitted.
              </h2>
              <p className="text-xs text-muted-foreground mb-8">Here's what happens next:</p>

              <div className="w-full space-y-4 mb-8">
                {[
                  { num: 1, text: "LotIQ reviews your details" },
                  { num: 3, text: "Finalizes pricing" },
                  { num: 4, text: "Schedules installation" },
                ].map((item) => (
                  <div key={item.num} className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-primary">{item.num}</span>
                    </div>
                    <span className="text-sm text-foreground">{item.text}</span>
                  </div>
                ))}
              </div>

              <Button
                className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold text-base"
                onClick={() => navigate("/login")}
              >
                Open email
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, children, noStar }: { label: string; children: React.ReactNode; noStar?: boolean }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs text-foreground">
        {label} {!noStar && <span className="text-destructive">*</span>}
      </Label>
      {children}
    </div>
  );
}
