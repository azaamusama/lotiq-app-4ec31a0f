import { ShieldCheck, Truck, Clock, Users, Star, Award } from "lucide-react";

const SIGNALS = [
  { icon: ShieldCheck, label: "No Grey Market", detail: "100% authorized products" },
  { icon: Clock, label: "80+ Years", detail: "Trusted since 1941" },
  { icon: Truck, label: "Same-Day Shipping", detail: "88% delivered in 2 days" },
  { icon: Users, label: "Expert Support", detail: "Dedicated account team" },
  { icon: Star, label: "30K+ Products", detail: "Curated top brands" },
  { icon: Award, label: "VIP Program", detail: "Exclusive savings" },
];

const TrustSignals = () => {
  return (
    <section className="py-6 bg-card border-t border-border">
      <div className="container">
        <h2 className="text-base font-bold text-foreground mb-4 text-center">Why Dental Professionals Choose Safco</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {SIGNALS.map(({ icon: Icon, label, detail }) => (
            <div key={label} className="flex flex-col items-center text-center p-3">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mb-2">
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <span className="text-xs font-bold text-foreground">{label}</span>
              <span className="text-[10px] text-muted-foreground mt-0.5">{detail}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSignals;
