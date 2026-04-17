import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  Clock,
  CreditCard,
  MapPin,
  Building2,
  Shield,
  Zap,
} from "lucide-react";

const TOTAL_STEPS = 8;

const stepLabels = [
  "Property Basics",
  "Services",
  "Property Mapping",
  "Tow Partner",
  "Pricing",
  "Payment",
  "Schedule Installation",
  "Confirmation",
];

export default function PropertySetup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  // Step 1 – Property Basics
  const [propertyName, setPropertyName] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("United States");
  const [timezone, setTimezone] = useState("United States");

  // Step 2 – Services
  const [serviceType, setServiceType] = useState("full");

  // Step 3 – Property Mapping
  const [hasUnderground, setHasUnderground] = useState(false);
  const [parkingSpots, setParkingSpots] = useState("");
  const [indoorMonitoring, setIndoorMonitoring] = useState(false);
  const [indoorCameras, setIndoorCameras] = useState("");

  // Step 4 – Tow Partner
  const [towCompanyName, setTowCompanyName] = useState("");
  const [towContact, setTowContact] = useState("");
  const [hasTowAgreement, setHasTowAgreement] = useState(true);

  // Step 5 – Pricing
  const [pricingTab, setPricingTab] = useState<"quarterly" | "monthly" | "annual">("quarterly");
  const [selectedPlan, setSelectedPlan] = useState("standard");

  // Step 6 – Payment
  const [nameOnAccount, setNameOnAccount] = useState("");
  const [routingNumber, setRoutingNumber] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [refugeAccountNumber, setRefugeAccountNumber] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Step 7 – Schedule
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  // Step 8 – Billing Setup path
  const [billingPath, setBillingPath] = useState<"onetime" | "subscription" | null>(null);

  const next = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  const back = () => {
    if (step === 0) navigate(-1);
    else setStep((s) => s - 1);
  };

  const progressPercent = ((step + 1) / TOTAL_STEPS) * 100;

  const pricingPlans = {
    quarterly: [
      { id: "standard", name: "Standard", price: "$22/mth", desc: "Billed $66 quarterly", recommended: true },
    ],
    monthly: [
      { id: "standard", name: "Standard", price: "$24/mth", desc: "Switch to quarterly to save more", recommended: false },
    ],
    annual: [
      { id: "standard", name: "Standard", price: "$20/mth", desc: "Billed $240 annually", recommended: false },
    ],
  };

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-lg mx-auto">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-background">
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={back} className="p-1">
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </button>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <span className="font-bold text-sm">Lot IQ</span>
          </div>
          <span className="text-xs text-muted-foreground">
            Step {step + 1} of {TOTAL_STEPS}
          </span>
        </div>
        {/* Progress bar */}
        <div className="h-1 bg-muted">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        {/* Step breadcrumb */}
        <div className="px-4 py-2 border-b border-border">
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <span className="text-primary">●</span> {stepLabels[step]}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-5">
        {/* STEP 1: Property Basics */}
        {step === 0 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-xl font-bold text-foreground">Property Basics</h2>
              <p className="text-sm text-muted-foreground mt-1">Tell us about your property.</p>
            </div>
            <div className="space-y-4">
              <div>
                <Label className="text-xs text-muted-foreground">Property Name</Label>
                <Input placeholder="Sunset Plaza" value={propertyName} onChange={(e) => setPropertyName(e.target.value)} className="mt-1.5" />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Type</Label>
                <Select value={propertyType} onValueChange={setPropertyType}>
                  <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select Type" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="residential">Residential</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                    <SelectItem value="mixed">Mixed Use</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Address</Label>
                <Input placeholder="123 Main St, City, State" value={address} onChange={(e) => setAddress(e.target.value)} className="mt-1.5" />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Country / Region</Label>
                <Input value={country} onChange={(e) => setCountry(e.target.value)} className="mt-1.5" />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Timezone</Label>
                <Input value={timezone} onChange={(e) => setTimezone(e.target.value)} className="mt-1.5" />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Services */}
        {step === 1 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-xl font-bold text-foreground">What service are you looking for?</h2>
              <p className="text-sm text-muted-foreground mt-1">Select the enforcement type for this property</p>
            </div>
            <div className="space-y-3">
              <button
                onClick={() => setServiceType("full")}
                className={`w-full text-left p-4 rounded-xl border-2 transition-colors ${serviceType === "full" ? "border-primary bg-primary/5" : "border-border"}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold">Full Lot Enforcement</span>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">Recommended</span>
                </div>
                <p className="text-xs text-muted-foreground mb-3">Comprehensive monitoring and enforcement across the entire property.</p>
                <div className="space-y-1.5 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary" /> Full property coverage
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary" /> Unauthorized vehicles
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary" /> Tow / violation
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary" /> 24/7 continuous
                  </div>
                </div>
                <p className="text-xs font-semibold text-primary mt-3">Starting at $150/month</p>
                <p className="text-[10px] text-muted-foreground">Pricing varies based on lot size and usage</p>
              </button>

              <button
                onClick={() => setServiceType("fixed")}
                className={`w-full text-left p-4 rounded-xl border-2 transition-colors ${serviceType === "fixed" ? "border-primary bg-primary/5" : "border-border"}`}
              >
                <span className="text-sm font-semibold">Fixed Parking Enforcement</span>
                <p className="text-xs text-muted-foreground mt-1">Enforcement limited to fixed number of vehicles or specific, designated zones.</p>
                <div className="space-y-1.5 text-xs text-muted-foreground mt-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-muted-foreground" /> Ideal for reserved or permit-only areas
                  </div>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Property Mapping */}
        {step === 2 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-xl font-bold text-foreground">Property Mapping</h2>
              <p className="text-sm text-muted-foreground mt-1">Define Your Property Area</p>
            </div>
            {/* Map placeholder */}
            <div className="w-full h-48 rounded-xl bg-muted flex items-center justify-center border border-border">
              <div className="text-center">
                <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-xs text-muted-foreground">Map view – drag to define property area</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Do you have underground parking?</p>
                </div>
                <Switch checked={hasUnderground} onCheckedChange={setHasUnderground} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Indoor monitoring</p>
                </div>
                <Switch checked={indoorMonitoring} onCheckedChange={setIndoorMonitoring} />
              </div>
              {indoorMonitoring && (
                <div className="animate-accordion-down overflow-hidden">
                  <Label className="text-xs text-muted-foreground">How many cameras do you envision?</Label>
                  <Input
                    type="number"
                    min={1}
                    placeholder="e.g. 6"
                    value={indoorCameras}
                    onChange={(e) => setIndoorCameras(e.target.value)}
                    className="mt-1.5"
                  />
                  <p className="text-xs text-muted-foreground mt-1.5">
                    This is just an estimate — LotIQ will finalize camera placement during setup.
                  </p>
                </div>
              )}
              <div>
                <Label className="text-xs text-muted-foreground">Number of Parking Spots</Label>
                <Input
                  type="number"
                  placeholder="e.g. 120"
                  value={parkingSpots}
                  onChange={(e) => setParkingSpots(e.target.value)}
                  className="mt-1.5"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Tow Partner */}
        {step === 3 && (
          <div className="space-y-5">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-foreground">Tow Partner</h2>
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-muted text-muted-foreground">Optional</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Add a towing company which will be automatically contacted when the towing service is required.
              </p>
            </div>
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-3 text-xs text-primary flex items-start gap-2">
                <Zap className="h-4 w-4 shrink-0 mt-0.5" />
                <p>Adding a tow partner allows for automatic tow dispatch once an incident is confirmed.</p>
              </CardContent>
            </Card>
            <div className="space-y-4">
              <div>
                <Label className="text-xs text-muted-foreground">Company Name</Label>
                <Input placeholder="e.g. Rapid Towing Co." value={towCompanyName} onChange={(e) => setTowCompanyName(e.target.value)} className="mt-1.5" />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Contact Number</Label>
                <Input placeholder="+1 (555) 000-0000" value={towContact} onChange={(e) => setTowContact(e.target.value)} className="mt-1.5" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">I have an existing tow service agreement with this towing company</p>
                </div>
                <Switch checked={hasTowAgreement} onCheckedChange={setHasTowAgreement} />
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: Pricing */}
        {step === 4 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-xl font-bold text-foreground">Pricing estimate</h2>
              <p className="text-sm text-muted-foreground mt-1">Transparent pricing, confirmed after on-site assessment.</p>
            </div>
            {/* Tabs */}
            <div className="flex rounded-xl bg-muted p-1">
              {(["quarterly", "monthly", "annual"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setPricingTab(tab)}
                  className={`flex-1 py-2 text-xs font-medium rounded-lg capitalize transition-colors ${
                    pricingTab === tab ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            {/* Plans */}
            <div className="space-y-3">
              {pricingPlans[pricingTab].map((plan) => (
                <button
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-colors ${
                    selectedPlan === plan.id ? "border-primary" : "border-border"
                  }`}
                >
                  {plan.recommended && (
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary mb-2 inline-block">
                      Recommended
                    </span>
                  )}
                  <p className="text-2xl font-bold text-foreground">{plan.price}</p>
                  <p className="text-sm font-semibold text-foreground">{plan.name}</p>
                  <p className="text-xs text-primary mt-1 whitespace-pre-line">{plan.desc}</p>
                  <div className="mt-3 space-y-1.5">
                    <p className="text-xs text-muted-foreground font-medium">Services Include:</p>
                    {["Camera Hardware", "Installation", "Platform Fee"].map((s) => (
                      <div key={s} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <CheckCircle2 className="h-3.5 w-3.5 text-primary" /> {s}
                      </div>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 6: Payment (ACH / Bank Account) */}
        {step === 5 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-xl font-bold text-foreground">ACH / Bank Account</h2>
            </div>
            <div className="space-y-4">
              <div>
                <Label className="text-xs text-muted-foreground">Name on Account</Label>
                <Input placeholder="Sarah Johnson" value={nameOnAccount} onChange={(e) => setNameOnAccount(e.target.value)} className="mt-1.5" />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Routing Number</Label>
                <Input placeholder="110000000" value={routingNumber} onChange={(e) => setRoutingNumber(e.target.value)} className="mt-1.5" />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Account Number</Label>
                <Input placeholder="000123456789" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} className="mt-1.5" />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Refuge Account Number</Label>
                <Input placeholder="000123456789" value={refugeAccountNumber} onChange={(e) => setRefugeAccountNumber(e.target.value)} className="mt-1.5" />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Billing Address</Label>
                <Input placeholder="1200 Maple Ave, Toronto ON" value={billingAddress} onChange={(e) => setBillingAddress(e.target.value)} className="mt-1.5" />
              </div>
              <p className="text-xs text-muted-foreground">You will be charged now.</p>
              <div className="flex items-center gap-2">
                <Switch checked={agreeTerms} onCheckedChange={setAgreeTerms} />
                <p className="text-xs text-muted-foreground">
                  I agree to the <span className="text-primary underline cursor-pointer">Terms and Conditions</span>.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* STEP 7: Schedule Installation */}
        {step === 6 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-xl font-bold text-foreground">Schedule Installation</h2>
              <p className="text-sm text-muted-foreground mt-1">Pick a date and time for your on-site setup.</p>
            </div>

            <Card>
              <CardContent className="p-3">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                  className="rounded-xl mx-auto w-full"
                />
              </CardContent>
            </Card>

            {selectedDate && (
              <div>
                <Label className="text-xs text-muted-foreground mb-2 block">Preferred Time Slot</Label>
                <div className="grid grid-cols-2 gap-2">
                  {["9:00 AM – 12:00 PM", "12:00 PM – 3:00 PM", "3:00 PM – 6:00 PM", "6:00 PM – 8:00 PM"].map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setSelectedTimeSlot(slot)}
                      className={`p-3 rounded-xl text-xs font-medium border-2 transition-colors ${
                        selectedTimeSlot === slot
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-border text-muted-foreground"
                      }`}
                    >
                      <Clock className="h-3.5 w-3.5 mb-1 mx-auto" />
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <Card className="bg-muted/50 border-0">
              <CardContent className="p-3 text-xs text-muted-foreground">
                A LotIQ technician will arrive during your selected window. Installation typically takes 2–4 hours depending on property size.
              </CardContent>
            </Card>
          </div>
        )}

        {/* STEP 8: Confirmation */}
        {step === 7 && (
          <div className="space-y-6 py-4">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-xl font-bold text-foreground">Your order is placed</h2>
              <p className="text-sm text-muted-foreground mt-1">You'll receive a confirmation email shortly.</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">Order Summary</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] font-semibold text-muted-foreground tracking-wider uppercase">Service Details</p>
                  <p className="text-sm font-semibold mt-1">LotIQ Pro Home Security</p>
                  <p className="text-xs text-muted-foreground">4x HD Outdoor Cameras, 1x Smart Hub, 24/7 Monitoring</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-muted-foreground tracking-wider uppercase">Installation Address</p>
                  <p className="text-xs text-muted-foreground mt-1">{address || "123 Security Lane, Safe City, SC 54321"}</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-muted-foreground tracking-wider uppercase">Service Details</p>
                  <div className="mt-1 space-y-0.5">
                    <p className="text-xs font-semibold">
                      {selectedDate ? selectedDate.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }) : "Friday, April 10, 2026"}
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" /> 9:00 AM – 1:00 PM
                    </p>
                    <p className="text-xs text-primary underline cursor-pointer mt-1">Click here to change your install date →</p>
                  </div>
                </div>

                <div className="border-t border-border pt-3">
                  <p className="text-[10px] font-semibold text-muted-foreground tracking-wider uppercase mb-2">Pricing Breakdown</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">One-time installation fee</span>
                    <span className="font-medium">$150.00</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-1">
                    <span className="text-muted-foreground">Taxes</span>
                    <span className="font-medium">$45.43</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-2 pt-2 border-t border-border font-bold">
                    <span>Total Price</span>
                    <span>$604.43</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom button */}
      <div className="sticky bottom-0 bg-background border-t border-border px-4 py-3">
        {step === 3 ? (
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1 h-12 rounded-xl" onClick={next}>
              Skip for Now
            </Button>
            <Button className="flex-1 h-12 rounded-xl" onClick={next}>
              Save Partner
            </Button>
          </div>
        ) : step === 5 ? (
          <Button className="w-full h-12 rounded-xl text-base font-semibold" onClick={next}>
            Add Payment Information
          </Button>
        ) : step === 6 ? (
          <Button className="w-full h-12 rounded-xl text-base font-semibold" onClick={next} disabled={!selectedDate || !selectedTimeSlot}>
            Schedule Now
          </Button>
        ) : step === 7 ? (
          <Button className="w-full h-12 rounded-xl text-base font-semibold" onClick={() => navigate("/property")}>
            Home
          </Button>
        ) : (
          <Button className="w-full h-12 rounded-xl text-base font-semibold" onClick={next}>
            Continue
          </Button>
        )}
      </div>
    </div>
  );
}
