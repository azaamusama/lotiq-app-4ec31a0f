import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Eye, EyeOff, ArrowLeft, CheckCircle2, Clock, MapPin, Shield, Zap,
} from "lucide-react";

const TOTAL_STEPS = 8;
const stepLabels = [
  "Create Account",
  "Property Basics",
  "Property Mapping",
  "Tow Partner",
  "Pricing",
  "Payment",
  "Schedule Installation",
  "Confirmation",
];

export default function Signup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  // Step 1 – Account
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState<"landlord" | "manager">("landlord");
  const [workEmail, setWorkEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Step 2 – Property Basics
  const [propertyName, setPropertyName] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("United States");
  const [timezone, setTimezone] = useState("United States");

  // Step 3 – Property Mapping
  const [hasUnderground, setHasUnderground] = useState(false);
  const [parkingSpots, setParkingSpots] = useState("");
  const [indoorMonitoring, setIndoorMonitoring] = useState(false);
  const [indoorCameras, setIndoorCameras] = useState("");
  const [trashMonitoring, setTrashMonitoring] = useState(false);
  const [trashSpots, setTrashSpots] = useState("");

  // Step 4 – Tow Partner
  const [towCompanyName, setTowCompanyName] = useState("");
  const [towContact, setTowContact] = useState("");
  const [hasTowAgreement, setHasTowAgreement] = useState(true);

  // Step 5 – Pricing
  const [pricingTab, setPricingTab] = useState<"quarterly" | "yearly" | "monthly">("quarterly");
  const [selectedPlan, setSelectedPlan] = useState("standard");

  // Step 6 – Payment
  const [paymentMethod, setPaymentMethod] = useState<"ach" | "cheque" | "monthly">("ach");
  const [nameOnAccount, setNameOnAccount] = useState("Sarah Johnson");
  const [routingNumber, setRoutingNumber] = useState("110000000");
  const [accountNumber, setAccountNumber] = useState("000123456789");
  const [refugeAccountNumber, setRefugeAccountNumber] = useState("000123456789");
  const [billingAddress, setBillingAddress] = useState("1200 Maple Ave, Toronto ON");
  const [invoiceEmail, setInvoiceEmail] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Step 7 – Schedule
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");

  const next = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  const back = () => {
    if (step === 0) navigate(-1);
    else setStep((s) => s - 1);
  };

  const progressPercent = ((step + 1) / TOTAL_STEPS) * 100;

  const pricingPlans = {
    quarterly: [
      { id: "standard", name: "Standard", price: "$22/mth", desc: "Billed $66 quarterly" },
    ],
    yearly: [
      { id: "standard", name: "Standard", price: "$20/mth", desc: "Billed $240 annually" },
    ],
    monthly: [
      { id: "standard", name: "Standard", price: "$24/mth", desc: "Switch to quarterly to save more" },
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
        <div className="h-1 bg-muted">
          <div className="h-full bg-primary transition-all duration-300" style={{ width: `${progressPercent}%` }} />
        </div>
        <div className="px-4 py-2 border-b border-border">
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <span className="text-primary">●</span> {stepLabels[step]}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-5">
        {/* STEP 1: Create Account */}
        {step === 0 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-xl font-bold text-foreground">Create your account</h2>
              <p className="text-sm text-muted-foreground mt-1">Get started with LotIQ.</p>
            </div>
            <div className="space-y-4">
              <Field label="Full Name">
                <Input placeholder="Jane Smith" value={fullName} onChange={(e) => setFullName(e.target.value)} className="mt-1.5" />
              </Field>
              <Field label="Company Name">
                <Input placeholder="Company Name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="mt-1.5" />
              </Field>
              <div>
                <Label className="text-xs text-muted-foreground">Role</Label>
                <div className="flex gap-2 mt-1.5">
                  {(["landlord", "manager"] as const).map((r) => (
                    <button key={r} type="button" onClick={() => setRole(r)}
                      className={`flex-1 h-10 rounded-xl border-2 text-xs font-medium transition-colors ${role === r ? "border-primary bg-primary/5 text-primary" : "border-border text-muted-foreground hover:bg-muted"}`}>
                      {r === "landlord" ? "Landlord" : "Property Manager"}
                    </button>
                  ))}
                </div>
              </div>
              <Field label="Work Email">
                <Input type="email" placeholder="jan@company.com" value={workEmail} onChange={(e) => setWorkEmail(e.target.value)} className="mt-1.5" />
              </Field>
              <Field label="Phone Number">
                <Input type="tel" placeholder="+1 (555) 000-0000" value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1.5" />
              </Field>
              <Field label="Password">
                <div className="relative mt-1.5">
                  <Input type={showPw ? "text" : "password"} placeholder="Create a strong password" value={password} onChange={(e) => setPassword(e.target.value)} className="pr-10" />
                  <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </Field>
              <Field label="Confirm Password">
                <div className="relative mt-1.5">
                  <Input type={showConfirm ? "text" : "password"} placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="pr-10" />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </Field>
            </div>
          </div>
        )}

        {/* STEP 2: Property Basics */}
        {step === 1 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-xl font-bold text-foreground">Property Basics</h2>
              <p className="text-sm text-muted-foreground mt-1">Tell us about your property.</p>
            </div>
            <div className="space-y-4">
              <Field label="Property Name">
                <Input placeholder="Sunset Plaza" value={propertyName} onChange={(e) => setPropertyName(e.target.value)} className="mt-1.5" />
              </Field>
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
              <Field label="Address">
                <Input placeholder="123 Main St, City, State" value={address} onChange={(e) => setAddress(e.target.value)} className="mt-1.5" />
              </Field>
              <Field label="Country / Region">
                <Input value={country} onChange={(e) => setCountry(e.target.value)} className="mt-1.5" />
              </Field>
              <Field label="Timezone">
                <Input value={timezone} onChange={(e) => setTimezone(e.target.value)} className="mt-1.5" />
              </Field>
            </div>
          </div>
        )}

        {/* STEP 3: Property Mapping */}
        {step === 2 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-xl font-bold text-foreground">Property Mapping</h2>
              <p className="text-sm text-muted-foreground mt-1">Define your property area.</p>
            </div>
            <div className="w-full h-48 rounded-xl bg-muted flex items-center justify-center border border-border">
              <div className="text-center">
                <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-xs text-muted-foreground">Map view – drag to define property area</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Do you have underground parking?</p>
                <Switch checked={hasUnderground} onCheckedChange={setHasUnderground} />
              </div>
              {hasUnderground && (
                <div className="animate-accordion-down overflow-hidden">
                  <Field label="Number of Parking Spots">
                    <Input type="number" min={1} placeholder="e.g. 120" value={parkingSpots} onChange={(e) => setParkingSpots(e.target.value)} className="mt-1.5" />
                  </Field>
                </div>
              )}
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Indoor monitoring</p>
                <Switch checked={indoorMonitoring} onCheckedChange={setIndoorMonitoring} />
              </div>
              {indoorMonitoring && (
                <div className="animate-accordion-down overflow-hidden">
                  <Field label="How many cameras do you envision?">
                    <Input
                      type="number"
                      min={1}
                      placeholder="e.g. 6"
                      value={indoorCameras}
                      onChange={(e) => setIndoorCameras(e.target.value)}
                      className="mt-1.5"
                    />
                  </Field>
                </div>
              )}
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Do you want trash monitoring?</p>
                <Switch checked={trashMonitoring} onCheckedChange={setTrashMonitoring} />
              </div>
              {trashMonitoring && (
                <div className="animate-accordion-down overflow-hidden">
                  <Field label="Number of trash spots">
                    <Input type="number" min={1} placeholder="e.g. 4" value={trashSpots} onChange={(e) => setTrashSpots(e.target.value)} className="mt-1.5" />
                  </Field>
                </div>
              )}
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
              <p className="text-sm text-muted-foreground mt-1">Add a towing company for automatic dispatch.</p>
            </div>
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-3 text-xs text-primary flex items-start gap-2">
                <Zap className="h-4 w-4 shrink-0 mt-0.5" />
                <p>Adding a tow partner allows for automatic tow dispatch once an incident is confirmed.</p>
              </CardContent>
            </Card>
            <div className="space-y-4">
              <Field label="Company Name">
                <Input placeholder="e.g. Rapid Towing Co." value={towCompanyName} onChange={(e) => setTowCompanyName(e.target.value)} className="mt-1.5" />
              </Field>
              <Field label="Contact Number">
                <Input placeholder="+1 (555) 000-0000" value={towContact} onChange={(e) => setTowContact(e.target.value)} className="mt-1.5" />
              </Field>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">I have an existing tow service agreement</p>
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
            <div className="flex rounded-xl bg-muted p-1">
              {([
                { id: "quarterly", label: "Quarterly", badge: "Recommended" },
                { id: "yearly", label: "Yearly", badge: "Cheapest" },
                { id: "monthly", label: "Monthly", badge: "" },
              ] as const).map((tab) => (
                <button key={tab.id} onClick={() => setPricingTab(tab.id)}
                  className={`flex-1 py-2 text-xs font-medium rounded-lg transition-colors flex flex-col items-center justify-center gap-0.5 ${pricingTab === tab.id ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"}`}>
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className="text-[9px] font-medium px-1.5 py-0.5 rounded-full bg-primary/10 text-primary leading-none">
                      {tab.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>
            <div className="space-y-3">
              {pricingPlans[pricingTab].map((plan) => (
                <button key={plan.id} onClick={() => setSelectedPlan(plan.id)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-colors ${selectedPlan === plan.id ? "border-primary" : "border-border"}`}>
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

        {/* STEP 6: Payment */}
        {step === 5 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-foreground">Payment Method</h2>
              <p className="text-sm text-muted-foreground mt-1">Choose how you'd like to pay for LotIQ.</p>
            </div>

            <RadioGroup value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as typeof paymentMethod)} className="space-y-3">
              {[
                { id: "ach", label: "ACH / Bank Transfer", badge: "Recommended" },
                { id: "cheque", label: "Bank Cheque" },
                { id: "monthly", label: "Monthly Push to Account" },
              ].map((opt) => {
                const isSelected = paymentMethod === opt.id;
                return (
                  <div
                    key={opt.id}
                    className={`rounded-xl border-2 transition-colors overflow-hidden ${
                      isSelected ? "border-primary bg-primary/5" : "border-border"
                    }`}
                  >
                    <label
                      htmlFor={`pm-${opt.id}`}
                      className="flex items-center gap-3 p-4 cursor-pointer"
                    >
                      <RadioGroupItem value={opt.id} id={`pm-${opt.id}`} />
                      <span className="text-sm font-medium text-foreground flex-1">{opt.label}</span>
                      {opt.badge && (
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                          {opt.badge}
                        </span>
                      )}
                    </label>

                    {isSelected && (
                      <div className="px-4 pb-4 pt-1 animate-accordion-down">
                        {opt.id === "ach" && (
                          <div className="space-y-4">
                            <Field label="Name on Account">
                              <Input value={nameOnAccount} onChange={(e) => setNameOnAccount(e.target.value)} className="mt-1.5" />
                            </Field>
                            <Field label="Routing Number">
                              <Input value={routingNumber} onChange={(e) => setRoutingNumber(e.target.value)} className="mt-1.5" />
                            </Field>
                            <Field label="Account Number">
                              <Input value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} className="mt-1.5" />
                            </Field>
                            <Field label="Confirm Account Number">
                              <Input value={refugeAccountNumber} onChange={(e) => setRefugeAccountNumber(e.target.value)} className="mt-1.5" />
                            </Field>
                            <Field label="Billing Address">
                              <Input value={billingAddress} onChange={(e) => setBillingAddress(e.target.value)} className="mt-1.5" />
                            </Field>
                          </div>
                        )}

                        {opt.id === "cheque" && (
                          <div className="space-y-3">
                            <p className="text-sm text-foreground">Please send a cheque to the following address:</p>
                            <Card className="border border-border bg-background">
                              <CardContent className="p-4">
                                <p className="text-sm font-semibold text-foreground">LotIQ Inc.</p>
                                <p className="text-sm text-muted-foreground mt-0.5">123 Business Ave</p>
                                <p className="text-sm text-muted-foreground">Boston, MA 02101</p>
                                <p className="text-sm text-muted-foreground">United States</p>
                              </CardContent>
                            </Card>
                            <p className="text-xs text-muted-foreground">Your account will be activated once the cheque is received.</p>
                          </div>
                        )}

                        {opt.id === "monthly" && (
                          <p className="text-sm text-foreground">We will send you a monthly invoice. Payment must be completed via bank transfer.</p>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </RadioGroup>

            <div className="space-y-2 pt-2 border-t border-border">
              <Label className="text-sm font-semibold text-foreground">Where should we send your invoices?</Label>
              <Input
                type="email"
                placeholder="e.g. billing@company.com"
                value={invoiceEmail}
                onChange={(e) => setInvoiceEmail(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">Invoices and receipts will be sent to this email.</p>
            </div>

            <div className="space-y-3 pt-2">
              <p className="text-xs text-muted-foreground">
                {paymentMethod === "ach" ? "You will be charged immediately." : "Billing will follow your selected method."}
              </p>
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
                    <button key={slot} onClick={() => setSelectedTimeSlot(slot)}
                      className={`p-3 rounded-xl text-xs font-medium border-2 transition-colors ${selectedTimeSlot === slot ? "border-primary bg-primary/5 text-primary" : "border-border text-muted-foreground"}`}>
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
              <h2 className="text-xl font-bold text-foreground">Your request has been submitted.</h2>
              <p className="text-sm text-muted-foreground mt-1">You'll receive a confirmation email shortly.</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">Order Summary</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] font-semibold text-muted-foreground tracking-wider uppercase">Property</p>
                  <p className="text-sm font-semibold mt-1">{propertyName || "Sunset Plaza"}</p>
                  <p className="text-xs text-muted-foreground">{address || "123 Main St, City, State"}</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-muted-foreground tracking-wider uppercase">Installation</p>
                  <p className="text-xs font-semibold mt-1">
                    {selectedDate ? selectedDate.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }) : "TBD"}
                  </p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {selectedTimeSlot || "TBD"}
                  </p>
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
            <Button variant="outline" className="flex-1 h-12 rounded-xl" onClick={next}>Skip for Now</Button>
            <Button className="flex-1 h-12 rounded-xl" onClick={next}>Save Partner</Button>
          </div>
        ) : step === 5 ? (
          <Button className="w-full h-12 rounded-xl text-base font-semibold" onClick={next} disabled={!agreeTerms}>
            {paymentMethod === "ach" ? "Add Payment Information" : "Continue"}
          </Button>
        ) : step === 6 ? (
          <Button className="w-full h-12 rounded-xl text-base font-semibold" onClick={next} disabled={!selectedDate || !selectedTimeSlot}>Schedule Now</Button>
        ) : step === 7 ? (
          <Button className="w-full h-12 rounded-xl text-base font-semibold" onClick={() => navigate("/login")}>Open Email</Button>
        ) : (
          <Button className="w-full h-12 rounded-xl text-base font-semibold" onClick={next}>Continue</Button>
        )}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <Label className="text-xs text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}
