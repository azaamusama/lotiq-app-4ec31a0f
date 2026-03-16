import { ArrowRight, Crown, Sparkles, Shield } from "lucide-react";
import partnerVip from "@/assets/partnership-vip.jpg";
import partnerCds from "@/assets/partnership-cds.jpg";
import partnerOda from "@/assets/partnership-oda.jpg";
import safcoLogo from "@/assets/safco-logo.png";

const IndustryPartnerships = () => {
  return (
    <section className="py-16 bg-background border-t border-border">
      <div className="container">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-3 mb-10">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/8 px-3 py-1 rounded-full">
            <Sparkles className="h-3 w-3" />
            Exclusive Member Benefits
          </span>
          <h2 className="text-3xl font-extrabold text-foreground tracking-tight">
            Partnerships &amp; Loyalty
          </h2>
          <p className="text-sm text-muted-foreground max-w-md">
            Thousands of dental professionals save more through Safco's programs and association partnerships.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

          {/* ── Card 1: VIP Loyalty — wide ── */}
          <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-border bg-card group hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300 flex flex-col">
            {/* Image hero */}
            <div className="relative h-52 overflow-hidden">
              <img
                src={partnerVip}
                alt="Safco VIP dental professionals"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              {/* Top-left badge */}
              <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-primary/90 backdrop-blur-sm text-primary-foreground text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                <Crown className="h-3 w-3" />
                VIP Loyalty
              </div>

              {/* Bottom text */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-white/70 text-xs font-medium uppercase tracking-widest mb-1">Safco Rewards</p>
                <h3 className="text-2xl font-extrabold text-white leading-tight">
                  Earn More.<br />Save More.
                </h3>
              </div>
            </div>

            {/* Body */}
            <div className="p-5 flex flex-col gap-4 flex-1">
              <ul className="grid grid-cols-1 gap-2">
                {[
                  "Earn points on every order",
                  "Access member-only pricing",
                  "Early access to promotions",
                ].map((b) => (
                  <li key={b} className="flex items-center gap-2.5 text-sm text-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className="mt-auto group/btn inline-flex items-center justify-between w-full bg-primary text-primary-foreground text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-primary/90 transition-colors"
              >
                Become a VIP Today
                <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* ── Right column: two stacked cards ── */}
          <div className="lg:col-span-7 flex flex-col gap-5">

            {/* ── Card 2: Chicago Dental Society ── */}
            <div className="rounded-2xl overflow-hidden border border-border bg-card group hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300 flex flex-col sm:flex-row">
              {/* Image side */}
              <div className="relative sm:w-52 h-44 sm:h-auto shrink-0 overflow-hidden">
                <img
                  src={partnerCds}
                  alt="Chicago Dental Society"
                  className="w-full h-full object-cover absolute inset-0 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20 sm:block hidden" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent sm:hidden" />
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col gap-3 flex-1">
                {/* Logo bar */}
                <div className="flex items-center gap-2">
                  <img src={safcoLogo} alt="Safco" className="h-5 object-contain" />
                  <span className="text-muted-foreground font-bold text-sm">×</span>
                  <span className="text-xs font-bold text-foreground uppercase tracking-tight">Chicago Dental Society</span>
                </div>

                <div>
                  <span className="inline-flex items-center gap-1 bg-success/15 text-success text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                    <Shield className="h-3 w-3" />
                    Preferred Distributor
                  </span>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  CDS members enjoy <strong className="text-foreground">exclusive savings</strong> and manufacturer incentives through Safco — their preferred dental distributor.
                </p>

                <a href="#" className="inline-flex items-center gap-1.5 text-sm text-primary font-semibold hover:gap-2.5 transition-all">
                  Learn more about CDS
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* ── Card 3: OhioDDS ── */}
            <div className="rounded-2xl overflow-hidden border border-border bg-card group hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300 flex flex-col sm:flex-row">
              {/* Image side */}
              <div className="relative sm:w-52 h-44 sm:h-auto shrink-0 overflow-hidden">
                <img
                  src={partnerOda}
                  alt="Ohio Dental Association"
                  className="w-full h-full object-cover absolute inset-0 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20 sm:block hidden" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent sm:hidden" />
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col gap-3 flex-1">
                {/* Logo bar */}
                <div className="flex items-center gap-2">
                  <img src={safcoLogo} alt="Safco" className="h-5 object-contain" />
                  <span className="text-muted-foreground font-bold text-sm">×</span>
                  <span className="text-xs font-bold text-foreground uppercase tracking-tight">OhioDDS GPO</span>
                </div>

                <div>
                  <span className="inline-flex items-center gap-1 bg-safco-blue/10 text-safco-blue text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                    <Shield className="h-3 w-3" />
                    GPO Partner
                  </span>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  OhioDDS GPO members receive <strong className="text-foreground">exclusive savings</strong> and manufacturer incentives through Safco Dental Supply.
                </p>

                <a href="#" className="inline-flex items-center gap-1.5 text-sm text-primary font-semibold hover:gap-2.5 transition-all">
                  Learn more about ODA
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustryPartnerships;
