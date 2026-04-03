import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, ArrowLeft, CheckCircle2, Building2, MapPin, ChevronRight, Shield } from "lucide-react";
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
  const [subStep, setSubStep] = useState<"details" | "map" | "addPlace">("details");

  const stepLabels: Record<Step, { icon: React.ReactNode; label: string }> = {
    1: { icon: <CheckCircle2 className="h-3.5 w-3.5" />, label: "Create Account" },
    2: { icon: <Building2 className="h-3.5 w-3.5" />, label: "Business Basics" },
    3: { icon: <CheckCircle2 className="h-3.5 w-3.5" />, label: "Confirmation" },
  };

  const handleBack = () => {
    if (step === 2) {
      if (subStep === "addPlace") { setSubStep("map"); return; }
      if (subStep === "map") { setSubStep("details"); return; }
    }
    if (step > 1) {
      setStep((s) => (s - 1) as Step);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-lg mx-auto">
      {/* Header */}
      <div className="px-6 pt-6 pb-2 shrink-0">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={handleBack}
            className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center"
          >
            <ArrowLeft className="h-4 w-4 text-foreground" />
          </button>
          <div className="flex items-center gap-1.5">
            <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
              <Shield className="h-4 w-4 text-primary" />
            </div>
            <span className="text-sm font-bold text-foreground">
              Lot <span className="text-primary">IQ</span>
            </span>
          </div>
          <span className="text-xs text-muted-foreground">Step {step}/3</span>
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
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
          {stepLabels[step].icon}
          <span>{stepLabels[step].label}</span>
        </div>
      </div>

      {/* Content - scrollable */}
      <div className="flex-1 overflow-y-auto px-6 pb-8">
        {step === 1 && (
          <div>
            <h2 className="text-xl font-bold text-foreground mb-1">Create your account</h2>
            <p className="text-sm text-muted-foreground mb-6">Get started with Lot IQ.</p>

            <div className="space-y-4">
              <Field label="Full name">
                <Input placeholder="Jane Smith" value={fullName} onChange={(e) => setFullName(e.target.value)} className="h-12 bg-muted/50 border-0 rounded-xl" />
              </Field>
              <Field label="Company name">
                <Input placeholder="Company Name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="h-12 bg-muted/50 border-0 rounded-xl" />
              </Field>

              {/* Role toggle */}
              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-muted-foreground">Role</Label>
                <div className="flex gap-2">
                  {(["landlord", "manager"] as const).map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRole(r)}
                      className={`flex-1 h-12 rounded-xl text-sm font-medium transition-colors ${
                        role === r
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted/50 text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      {r === "landlord" ? "Landlord" : "Property Manager"}
                    </button>
                  ))}
                </div>
              </div>

              <Field label="Work email">
                <Input type="email" placeholder="jane@company.com" value={workEmail} onChange={(e) => setWorkEmail(e.target.value)} className="h-12 bg-muted/50 border-0 rounded-xl" />
              </Field>
              <Field label="Phone number">
                <Input type="tel" placeholder="+1 (555) 000-0000" value={phone} onChange={(e) => setPhone(e.target.value)} className="h-12 bg-muted/50 border-0 rounded-xl" />
              </Field>
              <Field label="Password">
                <div className="relative">
                  <Input
                    type={showPw ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 bg-muted/50 border-0 rounded-xl pr-11"
                  />
                  <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                    {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </Field>
              <Field label="Confirm password">
                <div className="relative">
                  <Input
                    type={showConfirm ? "text" : "password"}
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="h-12 bg-muted/50 border-0 rounded-xl pr-11"
                  />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                    {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </Field>
            </div>

            <Button
              className="w-full h-12 rounded-xl font-semibold text-base mt-6"
              onClick={() => setStep(2)}
            >
              Continue
            </Button>

            <p className="text-center text-sm text-muted-foreground mt-5">
              Already have an account?{" "}
              <button type="button" onClick={() => navigate("/login")} className="text-primary font-semibold hover:underline">
                Log In
              </button>
            </p>
          </div>
        )}

        {step === 2 && subStep === "details" && (
          <div>
            <h2 className="text-xl font-bold text-foreground mb-1">Business details</h2>
            <p className="text-sm text-muted-foreground mb-6">Tell us about your business.</p>

            <div className="space-y-4">
              <Field label="Business name">
                <Input placeholder="Sunset Plaza" value={businessName} onChange={(e) => setBusinessName(e.target.value)} className="h-12 bg-muted/50 border-0 rounded-xl" />
              </Field>
              <Field label="Type">
                <Select value={businessType} onValueChange={setBusinessType}>
                  <SelectTrigger className="h-12 bg-muted/50 border-0 rounded-xl">
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
                <Input placeholder="123 Main St, City, State" value={address} onChange={(e) => setAddress(e.target.value)} className="h-12 bg-muted/50 border-0 rounded-xl" />
              </Field>
              <Field label="Country / Region">
                <Input value={country} onChange={(e) => setCountry(e.target.value)} className="h-12 bg-muted/50 border-0 rounded-xl" />
              </Field>
              <Field label="Timezone">
                <Input value={timezone} onChange={(e) => setTimezone(e.target.value)} className="h-12 bg-muted/50 border-0 rounded-xl" />
              </Field>
            </div>

            <button
              type="button"
              onClick={() => setSubStep("map")}
              className="w-full mt-5 h-12 rounded-xl bg-muted/50 flex items-center justify-center gap-2 text-sm text-muted-foreground hover:bg-muted transition-colors"
            >
              <MapPin className="h-4 w-4" />
              Add Location Automatically
            </button>

            <Button
              className="w-full h-12 rounded-xl font-semibold text-base mt-6"
              onClick={() => setSubStep("map")}
            >
              Continue
            </Button>
          </div>
        )}

        {step === 2 && subStep === "map" && (
          <div className="-mx-6 -mt-2">
            <div className="flex items-center gap-3 px-6 py-3">
              <h2 className="text-xl font-bold text-foreground">Confirm location</h2>
            </div>
            <div className="relative w-full h-80 bg-muted overflow-hidden">
              <div className="absolute inset-0 bg-primary/5 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-10 w-10 text-primary mx-auto mb-2" />
                  <p className="text-sm font-medium text-foreground">{address || "New York, NY"}</p>
                  <p className="text-xs text-muted-foreground mt-1">Drag pin to adjust location</p>
                </div>
              </div>
              <div className="absolute inset-0 opacity-10">
                <div className="grid grid-cols-6 grid-rows-6 h-full w-full">
                  {Array.from({ length: 36 }).map((_, i) => (
                    <div key={i} className="border border-foreground/20" />
                  ))}
                </div>
              </div>
            </div>
            <div className="px-6 pt-5">
              <Button
                className="w-full h-12 rounded-xl font-semibold text-base"
                onClick={() => setSubStep("addPlace")}
              >
                Save
              </Button>
            </div>
          </div>
        )}

        {step === 2 && subStep === "addPlace" && (
          <div>
            <h2 className="text-xl font-bold text-foreground mb-1">Add a place</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Provide some information about this place. This place is added to Maps, it will appear publicly.
            </p>

            <div className="space-y-4">
              <Field label="Place name" required>
                <Input placeholder="Place name" value={placeName} onChange={(e) => setPlaceName(e.target.value)} className="h-12 bg-muted/50 border-0 rounded-xl" />
              </Field>
              <Field label="Category" required>
                <button
                  type="button"
                  className="w-full h-12 rounded-xl bg-muted/50 px-4 flex items-center justify-between text-sm text-muted-foreground"
                >
                  <span>{category || "Select category"}</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </Field>
              <Field label="Address" required>
                <Input placeholder="123 Main St, City, State" value={address} onChange={(e) => setAddress(e.target.value)} className="h-12 bg-muted/50 border-0 rounded-xl" />
              </Field>
              <Field label="Located within">
                <Input placeholder="Located within" value={locatedWithin} onChange={(e) => setLocatedWithin(e.target.value)} className="h-12 bg-muted/50 border-0 rounded-xl" />
              </Field>
            </div>

            <Button
              className="w-full h-12 rounded-xl font-semibold text-base mt-6"
              onClick={() => { setSubStep("details"); setStep(3); }}
            >
              Save
            </Button>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col items-center pt-10">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <CheckCircle2 className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-xl font-bold text-foreground text-center mb-1">
              Your request has been submitted.
            </h2>
            <p className="text-sm text-muted-foreground mb-8">Here's what happens next:</p>

            <div className="w-full space-y-4 mb-8">
              {[
                { num: 1, text: "LotIQ reviews your details" },
                { num: 2, text: "Finalizes pricing" },
                { num: 3, text: "Schedules installation" },
              ].map((item) => (
                <div key={item.num} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-primary">{item.num}</span>
                  </div>
                  <span className="text-sm text-foreground">{item.text}</span>
                </div>
              ))}
            </div>

            <Button
              className="w-full h-12 rounded-xl font-semibold text-base"
              onClick={() => navigate("/login")}
            >
              Open email
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, children, required }: { label: string; children: React.ReactNode; required?: boolean }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium text-muted-foreground">
        {label} {required && <span className="text-destructive">*</span>}
      </Label>
      {children}
    </div>
  );
}