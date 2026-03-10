import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import productGloves from "@/assets/product-gloves.jpg";
import productBurs from "@/assets/product-burs.jpg";
import productComposite from "@/assets/product-composite.jpg";
import productCement from "@/assets/product-cement.jpg";
import productAnesthetic from "@/assets/product-anesthetic.jpg";
import productMasks from "@/assets/product-masks.jpg";
import productProphy from "@/assets/product-prophy.jpg";

const HeroPromoGrid = () => {
  return (
    <section className="py-4">
      <div className="container">
        {/* Top Promo Row - 4 columns like Staples */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
          {/* Large Promo Card */}
          <div className="bg-primary rounded-lg p-6 flex flex-col justify-between min-h-[220px]">
            <div>
              <p className="text-primary-foreground/70 text-xs font-medium uppercase tracking-wide mb-1">Limited Time</p>
              <h2 className="text-2xl font-bold text-primary-foreground leading-tight">
                20% BACK
              </h2>
              <p className="text-primary-foreground/80 text-sm mt-1">on your first order</p>
            </div>
            <Button variant="outline" size="sm" className="w-fit border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 mt-4">
              Shop Now <ArrowRight className="h-3 w-3 ml-1" />
            </Button>
          </div>

          {/* Deals just for you - product mini grid */}
          <div className="bg-card rounded-lg p-4 border border-border">
            <h3 className="text-sm font-bold text-foreground mb-3">Deals just for you</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { img: productGloves, label: "Nitrile Gloves", price: "$15.99" },
                { img: productBurs, label: "Diamond Burs Kit", price: "$42.50" },
                { img: productComposite, label: "Composite Syringe", price: "$89.00" },
                { img: productCement, label: "Luting Cement", price: "$34.75" },
              ].map((item) => (
                <a key={item.label} href="#" className="flex flex-col items-center p-2 rounded hover:bg-muted transition-colors">
                  <img src={item.img} alt={item.label} className="w-14 h-14 object-contain mb-1" />
                  <span className="text-[10px] text-foreground text-center leading-tight">{item.label}</span>
                  <span className="text-[10px] font-bold text-primary">{item.price}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Top Category Deals */}
          <div className="bg-card rounded-lg p-4 border border-border">
            <h3 className="text-sm font-bold text-foreground mb-3">Top seller deals</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { img: productAnesthetic, label: "Septocaine®", price: "$61.99" },
                { img: productMasks, label: "Procedure Masks", price: "$6.99" },
                { img: productProphy, label: "Prophy Paste", price: "$8.49" },
                { img: productGloves, label: "Exam Gloves", price: "$15.99" },
              ].map((item) => (
                <a key={item.label} href="#" className="flex flex-col items-center p-2 rounded hover:bg-muted transition-colors">
                  <img src={item.img} alt={item.label} className="w-14 h-14 object-contain mb-1" />
                  <span className="text-[10px] text-foreground text-center leading-tight">{item.label}</span>
                  <span className="text-[10px] font-bold text-primary">{item.price}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Big visual promo */}
          <div className="bg-safco-blue-dark rounded-lg p-6 flex flex-col justify-between min-h-[220px]">
            <div>
              <p className="text-primary-foreground/70 text-xs font-medium uppercase tracking-wide mb-1">This Week</p>
              <h2 className="text-xl font-bold text-primary-foreground leading-tight">
                Supply Deals
              </h2>
              <p className="text-primary-foreground/80 text-sm mt-1">Save up to 30% on essentials</p>
            </div>
            <Button variant="outline" size="sm" className="w-fit border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 mt-4">
              View All <ArrowRight className="h-3 w-3 ml-1" />
            </Button>
          </div>
        </div>

        {/* Second Promo Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Deal highlight */}
          <div className="bg-card rounded-lg p-4 border border-border flex items-center gap-4">
            <img src={productComposite} alt="Composite" className="w-20 h-20 object-contain" />
            <div>
              <p className="text-[10px] text-muted-foreground uppercase">Hot Deal</p>
              <p className="text-sm font-bold text-foreground">$10 off orders $75+</p>
              <p className="text-xs text-muted-foreground mt-1">Use code DENTAL10</p>
              <a href="#" className="text-xs text-primary font-medium hover:underline mt-1 inline-block">Shop now →</a>
            </div>
          </div>

          {/* 30% off card */}
          <div className="bg-alert rounded-lg p-5 flex flex-col justify-center items-center text-center min-h-[120px]">
            <p className="text-alert-foreground text-3xl font-black">30% OFF</p>
            <p className="text-alert-foreground/80 text-xs mt-1">Select Infection Control</p>
            <a href="#" className="text-alert-foreground text-xs font-medium underline mt-2">Shop Deals →</a>
          </div>

          {/* Top favorites */}
          <div className="bg-card rounded-lg p-4 border border-border">
            <h3 className="text-sm font-bold text-foreground mb-2">Top favorites</h3>
            <div className="flex gap-3">
              {[productBurs, productAnesthetic, productCement].map((img, i) => (
                <a key={i} href="#" className="flex-1">
                  <img src={img} alt="Product" className="w-full aspect-square object-contain rounded bg-muted p-1" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick reorder */}
          <div className="bg-secondary rounded-lg p-4">
            <h3 className="text-sm font-bold text-secondary-foreground mb-2">Quick Reorder</h3>
            <p className="text-xs text-secondary-foreground/70 mb-3">Sign in to see your recent orders</p>
            <Button variant="action" size="sm">
              Sign In <ArrowRight className="h-3 w-3 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroPromoGrid;
