import { Wrench, DollarSign, Monitor, ArrowRight, CheckCircle2 } from "lucide-react";

const SERVICES = [
  {
    name: "Uptime Services",
    tagline: "Equipment Repair & Maintenance",
    icon: Wrench,
    accent: "hsl(217 72% 40%)",
    accentLight: "hsl(217 72% 95%)",
    badge: "Official Partner",
    description:
      "Comprehensive dental equipment services to ensure your practice operates efficiently and effectively — from installation to ongoing repairs.",
    bullets: [
      "Same-day equipment repair scheduling",
      "Certified dental equipment technicians",
      "Preventive maintenance programs",
    ],
    cta: "Explore Equipment Services",
  },
  {
    name: "Group Financial Services",
    tagline: "Practice Financing Solutions",
    icon: DollarSign,
    accent: "hsl(28 90% 45%)",
    accentLight: "hsl(28 90% 95%)",
    badge: "Financing Partner",
    description:
      "Customized financing solutions to support your practice's growth — covering equipment purchases, supplies, and office expansions.",
    bullets: [
      "Flexible payment terms up to 84 months",
      "Equipment & supply financing",
      "Quick approval process",
    ],
    cta: "Explore Financing Options",
  },
  {
    name: "Klas Solutions",
    tagline: "Technology & Patient Care Tools",
    icon: Monitor,
    accent: "hsl(145 60% 35%)",
    accentLight: "hsl(145 60% 95%)",
    badge: "Technology Partner",
    description:
      "Top-tier support for dental professionals with cutting-edge tools and technologies to enhance patient care and elevate your practice.",
    bullets: [
      "Practice management software",
      "Digital imaging & diagnostics",
      "Patient engagement platforms",
    ],
    cta: "Explore Technology Solutions",
  },
];

const ServiceSolutions = () => {
  return (
    <section className="py-12 bg-muted/30 border-t border-border">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-2 block">Safco Partner Network</span>
          <h2 className="text-2xl font-bold text-foreground">Professional Service Solutions</h2>
          <p className="text-sm text-muted-foreground mt-2 max-w-xl mx-auto">
            Trusted partners to help your dental practice grow, stay operational, and deliver exceptional patient care.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SERVICES.map(({ name, tagline, icon: Icon, accent, accentLight, badge, description, bullets, cta }) => (
            <div
              key={name}
              className="bg-card rounded-xl border border-border flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300 group"
            >
              {/* Top accent bar */}
              <div className="h-1.5 w-full" style={{ backgroundColor: accent }} />

              <div className="p-6 flex flex-col gap-5 flex-1">
                {/* Icon + Badge */}
                <div className="flex items-start justify-between">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: accentLight }}
                  >
                    <Icon className="h-6 w-6" style={{ color: accent }} />
                  </div>
                  <span
                    className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full"
                    style={{ backgroundColor: accentLight, color: accent }}
                  >
                    {badge}
                  </span>
                </div>

                {/* Title */}
                <div>
                  <h3 className="text-base font-bold text-foreground">{name}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{tagline}</p>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>

                {/* Bullets */}
                <ul className="flex flex-col gap-2">
                  {bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-foreground">
                      <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0" style={{ color: accent }} />
                      {b}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href="#"
                  className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold transition-colors group-hover:gap-2.5"
                  style={{ color: accent }}
                >
                  {cta}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceSolutions;
