import { ArrowRight, Crown, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import partnerVip from "@/assets/partnership-vip.jpg";
import partnerCds from "@/assets/partnership-cds.jpg";
import partnerOda from "@/assets/partnership-oda.jpg";
import safcoLogo from "@/assets/safco-logo.png";

const IndustryPartnerships = () => {
  return (
    <section className="py-12 bg-muted/20 border-t border-border">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-2 block">
            Exclusive Member Benefits
          </span>
          <h2 className="text-2xl font-bold text-foreground">
            Industry Partnerships &amp; Loyalty
          </h2>
          <p className="text-sm text-muted-foreground mt-2 max-w-lg mx-auto">
            Join thousands of dental professionals who save more with Safco's exclusive programs and association partnerships.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* ── Card 1: VIP Loyalty ── */}
          <div className="rounded-2xl overflow-hidden border border-border bg-card flex flex-col group hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
            {/* Top gradient header */}
            <div className="bg-primary px-6 pt-6 pb-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <Crown className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="text-primary-foreground/80 text-xs font-bold uppercase tracking-widest">
                  VIP Loyalty Program
                </span>
              </div>
              <h3 className="text-2xl font-extrabold text-primary-foreground leading-tight">
                Safco <span className="text-alert">VIP</span><br />Rewards
              </h3>
              <p className="text-primary-foreground/70 text-sm mt-1">Your ticket to exclusive savings</p>
            </div>

            {/* Image strip */}
            <div className="relative h-40 overflow-hidden">
              <img
                src={partnerVip}
                alt="Safco VIP dental professionals"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Floating badge */}
              <div className="absolute top-3 right-3 bg-primary rounded-xl px-3 py-2 shadow-lg">
                <div className="flex items-center gap-1 mb-0.5">
                  <Star className="h-3 w-3 text-alert fill-alert" />
                  <Star className="h-3 w-3 text-alert fill-alert" />
                  <Star className="h-3 w-3 text-alert fill-alert" />
                </div>
                <p className="text-[9px] font-bold text-primary-foreground uppercase tracking-wider">
                  Exclusive Member
                </p>
              </div>
            </div>

            {/* Body */}
            <div className="p-5 flex flex-col gap-4 flex-1">
              <ul className="flex flex-col gap-2">
                {[
                  "Earn points on every order",
                  "Access member-only pricing",
                  "Early access to promotions",
                ].map((b) => (
                  <li key={b} className="flex items-center gap-2 text-sm text-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
              <Button variant="action" size="sm" className="w-full mt-auto rounded-full">
                Become a VIP Today
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>

          {/* ── Card 2: Chicago Dental Society ── */}
          <div className="rounded-2xl overflow-hidden border border-border flex flex-col group hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
            {/* Logo bar */}
            <div className="bg-primary px-5 py-3 flex items-center gap-3">
              <img
                src={safcoLogo}
                alt="Safco"
                className="h-6 object-contain brightness-0 invert"
              />
              <span className="text-primary-foreground/60 font-bold text-lg">+</span>
              <div>
                <p className="text-primary-foreground font-extrabold text-sm leading-tight uppercase tracking-tight">
                  Chicago Dental Society
                </p>
                <p className="text-primary-foreground/60 text-[10px] uppercase tracking-widest">
                  Preferred Distributor
                </p>
              </div>
            </div>

            {/* Image with overlay */}
            <div className="relative flex-1 min-h-[200px] overflow-hidden">
              <img
                src={partnerCds}
                alt="Chicago Dental Society"
                className="w-full h-full object-cover absolute inset-0 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="inline-flex items-center gap-1.5 bg-success/90 text-success-foreground text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full mb-2">
                  Guaranteed Savings
                </div>
                <p className="text-white text-sm leading-relaxed">
                  Safco is the <strong>preferred distributor</strong> of the Chicago Dental Society — CDS members enjoy exclusive savings and manufacturer incentives.
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="px-5 py-4 bg-card border-t border-border flex items-center justify-between">
              <span className="text-xs text-muted-foreground">CDS Member?</span>
              <a
                href="#"
                className="text-sm text-primary font-semibold inline-flex items-center gap-1.5 hover:gap-2.5 transition-all"
              >
                Learn More about CDS
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* ── Card 3: OhioDDS ── */}
          <div className="rounded-2xl overflow-hidden border border-border flex flex-col group hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
            {/* Logo bar */}
            <div className="bg-safco-blue-dark px-5 py-3 flex items-center gap-3">
              <img
                src={safcoLogo}
                alt="Safco"
                className="h-6 object-contain brightness-0 invert"
              />
              <span className="text-white/60 font-bold text-lg">+</span>
              <div>
                <p className="text-white font-extrabold text-sm leading-tight uppercase tracking-tight">
                  OhioDDS
                </p>
                <p className="text-white/60 text-[10px] uppercase tracking-widest">
                  GPO Partner
                </p>
              </div>
            </div>

            {/* Image */}
            <div className="relative h-44 overflow-hidden">
              <img
                src={partnerOda}
                alt="Ohio Dental Association"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

            {/* Body */}
            <div className="p-5 flex flex-col gap-4 flex-1 bg-card">
              <div className="inline-flex items-center gap-1.5 bg-safco-blue/10 text-safco-blue text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full w-fit">
                Preferred Distributor — ODA
              </div>
              <p className="text-sm text-foreground leading-relaxed">
                Members of the <strong>OhioDDS Group Purchasing Organization (GPO)</strong> enjoy <strong>exclusive savings</strong> and manufacturer incentives through Safco Dental Supply.
              </p>
              <a
                href="#"
                className="mt-auto text-sm text-primary font-semibold inline-flex items-center gap-1.5 hover:gap-2.5 transition-all"
              >
                Learn More about ODA
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default IndustryPartnerships;
