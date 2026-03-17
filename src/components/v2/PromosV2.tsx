import { ArrowRight, Tag, Percent, Gift, Shield } from "lucide-react";
import productComposite from "@/assets/product-composite.jpg";
import productAnesthetic from "@/assets/product-anesthetic.jpg";

const PromosV2 = () => {
  return (
    <section className="py-12 bg-v2-section-alt">
      <div className="container">
        <div className="mb-7">
          <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">Offers</p>
          <h2 className="text-2xl font-bold text-v2-section-title">Current Promotions</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Hero Promo */}
          <div className="md:col-span-1 relative overflow-hidden rounded-3xl bg-v2-promo-hero-bg flex flex-col justify-between p-8 min-h-[280px]">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary/20 blur-3xl" />
            </div>
            <div className="relative z-10">
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary-foreground/70 bg-white/10 rounded-full px-3 py-1 mb-4">
                <Tag className="h-3 w-3" /> Limited Time
              </span>
              <p className="text-5xl font-black text-primary-foreground leading-none mb-2">20%</p>
              <p className="text-xl font-bold text-primary-foreground/90 leading-tight">Back on<br />Your First Order</p>
              <p className="text-sm text-primary-foreground/60 mt-2">New accounts only. No code needed.</p>
            </div>
            <a
              href="#"
              className="relative z-10 mt-6 w-fit inline-flex items-center gap-1.5 bg-white text-primary text-sm font-bold rounded-xl px-5 py-2.5 hover:bg-white/90 transition-colors"
            >
              Shop Now <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          {/* Right 2 stacked */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Promo Card 2 */}
            <div className="relative overflow-hidden rounded-3xl bg-v2-card border border-v2-card-border p-6 flex items-center gap-5 hover:shadow-v2-card-hover hover:border-v2-card-hover-border transition-all duration-200">
              <img src={productComposite} alt="Composite" className="w-20 h-20 object-contain rounded-xl bg-v2-img-bg p-2 shrink-0" />
              <div>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-alert uppercase tracking-wide mb-1">
                  <Percent className="h-3 w-3" /> Hot Deal
                </span>
                <p className="text-lg font-bold text-v2-section-title leading-tight">$10 off<br />orders $75+</p>
                <p className="text-xs text-v2-section-sub mt-1">Use code <span className="font-mono font-bold text-primary">DENTAL10</span></p>
                <a href="#" className="inline-flex items-center gap-1 text-xs font-semibold text-primary mt-2 hover:gap-2 transition-all">
                  Shop now <ArrowRight className="h-3 w-3" />
                </a>
              </div>
            </div>

            {/* Promo Card 3 */}
            <div className="relative overflow-hidden rounded-3xl bg-v2-promo-teal-bg border border-v2-promo-teal-border p-6 flex items-center justify-between hover:shadow-v2-card-hover transition-all duration-200">
              <div>
                <p className="text-3xl font-black text-v2-promo-teal-title">30%</p>
                <p className="text-base font-bold text-v2-promo-teal-title leading-tight">Off Infection<br />Control</p>
                <a href="#" className="inline-flex items-center gap-1 text-xs font-semibold text-primary mt-3 hover:gap-2 transition-all">
                  Shop Deals <ArrowRight className="h-3 w-3" />
                </a>
              </div>
              <div className="w-16 h-16 rounded-2xl bg-white/50 flex items-center justify-center">
                <Shield className="h-8 w-8 text-primary" />
              </div>
            </div>

            {/* Promo Card 4 */}
            <div className="sm:col-span-2 relative overflow-hidden rounded-3xl bg-v2-card border border-v2-card-border p-6 flex items-center gap-5 hover:shadow-v2-card-hover hover:border-v2-card-hover-border transition-all duration-200">
              <img src={productAnesthetic} alt="Anesthetic" className="w-20 h-20 object-contain rounded-xl bg-v2-img-bg p-2 shrink-0" />
              <div>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-success uppercase tracking-wide mb-1">
                  <Gift className="h-3 w-3" /> This Week
                </span>
                <p className="text-lg font-bold text-v2-section-title leading-tight">Save Up to 30% on Essentials</p>
                <p className="text-xs text-v2-section-sub mt-1">Top anesthetics & consumables on sale now</p>
                <a href="#" className="inline-flex items-center gap-1 text-xs font-semibold text-primary mt-2 hover:gap-2 transition-all">
                  View All <ArrowRight className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromosV2;
