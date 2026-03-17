import { RotateCcw, Clock, Plus, ChevronRight, Star } from "lucide-react";
import productGloves from "@/assets/product-gloves.jpg";
import productBurs from "@/assets/product-burs.jpg";
import productComposite from "@/assets/product-composite.jpg";
import productCement from "@/assets/product-cement.jpg";
import productAnesthetic from "@/assets/product-anesthetic.jpg";
import productMasks from "@/assets/product-masks.jpg";

const REORDER_ITEMS = [
  { img: productGloves, name: "Nitrile Exam Gloves — Medium", brand: "Microflex", price: "$15.99", unit: "/box", lastOrdered: "3 days ago", sku: "MF-300-M", qty: 2 },
  { img: productBurs, name: "Diamond Bur Kit FG", brand: "Dentsply Sirona", price: "$42.50", unit: "/kit", lastOrdered: "1 week ago", sku: "DS-BUR-KIT", qty: 1 },
  { img: productComposite, name: "Filtek Z350 XT Composite", brand: "3M", price: "$89.00", unit: "/syringe", lastOrdered: "2 weeks ago", sku: "3M-Z350-A2", qty: 3 },
  { img: productCement, name: "RelyX Luting Cement", brand: "3M", price: "$34.75", unit: "/pack", lastOrdered: "3 weeks ago", sku: "3M-RELYX-LUT", qty: 1 },
  { img: productAnesthetic, name: "Septocaine® 4% w/Epi", brand: "Septodont", price: "$61.99", unit: "/box", lastOrdered: "1 month ago", sku: "SEPT-4-EPI", qty: 2 },
  { img: productMasks, name: "Level 3 Procedure Masks", brand: "Crosstex", price: "$6.99", unit: "/box", lastOrdered: "1 month ago", sku: "CTX-L3-MASK", qty: 5 },
];

const SmartReorderV2 = () => {
  return (
    <section className="py-12 bg-v2-section-alt">
      <div className="container">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                <RotateCcw className="h-3.5 w-3.5 text-primary" />
              </div>
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">Smart Reorder</span>
            </div>
            <h2 className="text-2xl font-bold text-v2-section-title">Your Usual Supplies</h2>
            <p className="text-sm text-v2-section-sub mt-0.5">Based on your order history — restock in one click</p>
          </div>
          <a href="#" className="hidden sm:flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
            View all <ChevronRight className="h-4 w-4" />
          </a>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {REORDER_ITEMS.map((item) => (
            <div
              key={item.sku}
              className="group bg-v2-card rounded-2xl border border-v2-card-border p-3 flex flex-col hover:shadow-v2-card-hover hover:border-v2-card-hover-border transition-all duration-200"
            >
              {/* Image */}
              <div className="aspect-square rounded-xl bg-v2-img-bg flex items-center justify-center mb-3 overflow-hidden">
                <img src={item.img} alt={item.name} className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-200" />
              </div>

              {/* Info */}
              <div className="flex-1">
                <p className="text-[10px] font-semibold text-v2-brand-label uppercase tracking-wide mb-0.5">{item.brand}</p>
                <p className="text-xs font-medium text-v2-product-name leading-tight line-clamp-2 mb-1">{item.name}</p>
                <div className="flex items-baseline gap-0.5 mb-1.5">
                  <span className="text-sm font-bold text-v2-price">{item.price}</span>
                  <span className="text-[10px] text-v2-price-unit">{item.unit}</span>
                </div>
                <div className="flex items-center gap-1 mb-3">
                  <Clock className="h-3 w-3 text-v2-timestamp-icon shrink-0" />
                  <span className="text-[10px] text-v2-timestamp">{item.lastOrdered}</span>
                </div>
              </div>

              {/* Reorder Button */}
              <button className="w-full h-8 rounded-lg bg-primary text-primary-foreground text-xs font-semibold flex items-center justify-center gap-1 hover:bg-primary/90 transition-colors group-hover:shadow-sm">
                <Plus className="h-3 w-3" /> Reorder
              </button>
            </div>
          ))}
        </div>

        {/* Saved Lists CTA */}
        <div className="mt-6 flex items-center justify-between p-4 rounded-2xl bg-v2-list-cta-bg border border-v2-list-cta-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Star className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-bold text-v2-section-title">Saved Shopping Lists</p>
              <p className="text-xs text-v2-section-sub">Curate your go-to products for one-click ordering</p>
            </div>
          </div>
          <a href="#" className="shrink-0 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
            Manage Lists
          </a>
        </div>
      </div>
    </section>
  );
};

export default SmartReorderV2;
