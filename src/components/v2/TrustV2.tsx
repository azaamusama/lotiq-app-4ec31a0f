import { ShieldCheck, Truck, Clock, Users, Star, Award, RotateCcw, Headphones } from "lucide-react";

const TRUST = [
  {
    icon: ShieldCheck,
    label: "No Grey Market",
    detail: "100% authorized products from trusted manufacturers",
    color: "bg-v2-trust-blue",
    iconColor: "text-primary",
  },
  {
    icon: Clock,
    label: "80+ Years",
    detail: "Trusted dental supplier since 1941",
    color: "bg-v2-trust-teal",
    iconColor: "text-v2-trust-teal-icon",
  },
  {
    icon: Truck,
    label: "Same-Day Shipping",
    detail: "88% of orders delivered within 2 business days",
    color: "bg-v2-trust-green",
    iconColor: "text-v2-trust-green-icon",
  },
  {
    icon: Users,
    label: "Expert Support",
    detail: "Dedicated account team for every practice",
    color: "bg-v2-trust-purple",
    iconColor: "text-v2-trust-purple-icon",
  },
  {
    icon: Star,
    label: "30K+ Products",
    detail: "Curated catalog from top dental brands",
    color: "bg-v2-trust-orange",
    iconColor: "text-v2-trust-orange-icon",
  },
  {
    icon: Award,
    label: "VIP Program",
    detail: "Exclusive savings for loyal customers",
    color: "bg-v2-trust-blue",
    iconColor: "text-primary",
  },
  {
    icon: RotateCcw,
    label: "Easy Returns",
    detail: "Hassle-free returns and exchange policy",
    color: "bg-v2-trust-teal",
    iconColor: "text-v2-trust-teal-icon",
  },
  {
    icon: Headphones,
    label: "Live Chat Support",
    detail: "Real humans available Mon–Fri 8am–6pm CT",
    color: "bg-v2-trust-green",
    iconColor: "text-v2-trust-green-icon",
  },
];

const TrustV2 = () => {
  return (
    <section className="py-12 bg-v2-section-alt">
      <div className="container">
        <div className="text-center mb-8">
          <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">Why Safco</p>
          <h2 className="text-2xl font-bold text-v2-section-title">Why Dental Professionals Choose Us</h2>
          <p className="text-sm text-v2-section-sub mt-1">Designed for busy dentists, not shoppers</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {TRUST.map(({ icon: Icon, label, detail, color, iconColor }) => (
            <div
              key={label}
              className="group p-5 bg-v2-card rounded-2xl border border-v2-card-border hover:shadow-v2-card-hover hover:border-v2-card-hover-border hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className={`w-11 h-11 rounded-xl ${color} flex items-center justify-center mb-3 group-hover:scale-105 transition-transform duration-200`}>
                <Icon className={`h-5 w-5 ${iconColor}`} />
              </div>
              <p className="text-sm font-bold text-v2-section-title mb-1">{label}</p>
              <p className="text-xs text-v2-section-sub leading-relaxed">{detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustV2;
