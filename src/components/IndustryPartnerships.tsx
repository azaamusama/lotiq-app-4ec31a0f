import { Crown, ArrowRight } from "lucide-react";
import partnerVip from "@/assets/partnership-vip.jpg";
import partnerCds from "@/assets/partnership-cds.jpg";
import partnerOda from "@/assets/partnership-oda.jpg";
import safcoLogo from "@/assets/safco-logo.png";

const IndustryPartnerships = () => {
  return (
    <section className="py-12 border-t border-border">
      <div className="container">
        {/* Header */}
        <h2 className="text-xl font-bold text-foreground text-center mb-8">
          Industry Partnerships &amp; Loyalty
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          {/* Card 1 — VIP Loyalty */}
          <div className="rounded-xl border border-border overflow-hidden bg-card flex flex-col group hover:shadow-lg transition-shadow duration-300">
            <div className="flex flex-1">
              {/* Left text side */}
              <div className="flex-1 p-5 flex flex-col justify-between bg-muted/30">
                <div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <Crown className="h-5 w-5 text-alert" />
                    <span className="text-xs font-bold uppercase tracking-wide text-primary">VIP Program</span>
                  </div>
                  <h3 className="text-lg font-extrabold text-foreground leading-tight">
                    Safco <span className="text-primary">VIP</span><br />Loyalty Program
                  </h3>
                  <p className="text-xs text-muted-foreground mt-2">Your ticket to savings!</p>
                </div>
                {/* Ticket badge */}
                <div className="mt-4 bg-primary rounded-lg px-3 py-2 w-fit">
                  <p className="text-[10px] font-bold text-primary-foreground uppercase tracking-widest">Safco Rewards</p>
                  <p className="text-[10px] text-primary-foreground/70 mt-0.5">Become a Safco VIP Today!</p>
                </div>
              </div>
              {/* Right image */}
              <div className="w-2/5 shrink-0">
                <img src={partnerVip} alt="VIP Loyalty" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="px-5 py-3 border-t border-border bg-card">
              <a href="#" className="text-sm text-primary font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all">
                Learn More about VIP! <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Card 2 — Chicago Dental Society */}
          <div className="rounded-xl overflow-hidden flex flex-col group hover:shadow-lg transition-shadow duration-300">
            {/* Logo bar */}
            <div className="bg-primary px-4 py-3 flex items-center gap-2">
              <img src={safcoLogo} alt="Safco" className="h-5 object-contain brightness-0 invert" />
              <span className="text-primary-foreground font-bold text-base">+</span>
              <div className="flex flex-col leading-none">
                <span className="text-primary-foreground font-extrabold text-sm uppercase tracking-tight">Chicago Dental</span>
                <span className="text-primary-foreground/80 text-[10px] uppercase tracking-widest">Society</span>
              </div>
            </div>
            {/* Image */}
            <div className="relative flex-1 min-h-[180px]">
              <img src={partnerCds} alt="Chicago Dental Society" className="w-full h-full object-cover absolute inset-0" />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white font-bold text-base">Guaranteed Savings!</p>
                <p className="text-white/80 text-xs mt-1 leading-relaxed">
                  Safco Dental Supply is the preferred distributor of the Chicago Dental Society — CDS members enjoy exclusive savings and manufacturer incentives.
                </p>
              </div>
            </div>
            <div className="px-4 py-3 bg-card border-t border-border">
              <a href="#" className="text-sm text-primary font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all">
                Learn More about CDS! <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Card 3 — OhioDDS */}
          <div className="rounded-xl overflow-hidden flex flex-col group hover:shadow-lg transition-shadow duration-300 border border-border bg-card">
            {/* Logo bar */}
            <div className="bg-safco-blue-dark px-4 py-3 flex items-center gap-2">
              <img src={safcoLogo} alt="Safco" className="h-5 object-contain brightness-0 invert" />
              <span className="text-white font-bold text-base">+</span>
              <div className="flex flex-col leading-none">
                <span className="text-white font-extrabold text-sm uppercase tracking-tight">OhioDDS</span>
                <span className="text-white/70 text-[10px] uppercase tracking-widest">GPO Partner</span>
              </div>
            </div>
            {/* Image */}
            <div className="relative min-h-[140px] overflow-hidden">
              <img src={partnerOda} alt="Ohio Dental Association" className="w-full h-full object-cover" />
            </div>
            {/* Text */}
            <div className="p-4 flex-1">
              <p className="text-sm text-foreground leading-relaxed">
                <strong>Safco Dental Supply</strong> is the <strong>preferred distributor</strong> of the Ohio Dental Association — members of the OhioDDS Group Purchasing Organization (GPO) enjoy <strong>exclusive savings</strong> and manufacturer incentives.
              </p>
            </div>
            <div className="px-4 py-3 border-t border-border">
              <a href="#" className="text-sm text-primary font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all">
                Learn More about ODA! <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default IndustryPartnerships;
