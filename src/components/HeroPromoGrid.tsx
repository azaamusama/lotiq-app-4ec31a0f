import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import productGloves from "@/assets/product-gloves.jpg";
import productBurs from "@/assets/product-burs.jpg";
import productComposite from "@/assets/product-composite.jpg";
import productCement from "@/assets/product-cement.jpg";
import productAnesthetic from "@/assets/product-anesthetic.jpg";
import productMasks from "@/assets/product-masks.jpg";
import productProphy from "@/assets/product-prophy.jpg";
import promoLabubu from "@/assets/promo-labubu.png";

const HeroPromoGrid = () => {
  return (
    <section className="py-4">
      <div className="container">
        {/* Top Promo Row - 4 columns like Staples */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
          {/* Large Promo Card - Brand Offers */}
          <div className="relative bg-gradient-to-br from-[hsl(200_30%_96%)] to-[hsl(195_40%_90%)] rounded-lg p-5 flex flex-col justify-between min-h-[220px] overflow-hidden">
            {/* Product image — overlapping right side */}
            <img
              src={productComposite}
              alt="Composite Syringe"
              className="absolute -right-4 bottom-0 h-40 object-contain drop-shadow-xl rotate-[-15deg] opacity-90"
            />
            <div className="relative z-10">
              <p className="text-muted-foreground text-xs font-semibold uppercase tracking-wide mb-1">Brand Offers</p>
              <h2 className="text-2xl font-black text-foreground leading-tight">
                Original Brand<br />Restorative<br />Materials
              </h2>
              <p className="text-sm font-semibold text-[hsl(153_50%_35%)] mt-2 bg-[hsl(153_50%_92%)] inline-block px-2 py-0.5 rounded-full">on Select Products</p>
            </div>
            <Button size="sm" className="w-fit mt-3 relative z-10 bg-primary text-primary-foreground hover:bg-primary/90">
              Shop Now <ArrowRight className="h-3 w-3 ml-1" />
            </Button>
          </div>

          {/* Take Back Your Costs Card */}
          <div className="relative bg-[hsl(200_60%_94%)] rounded-lg p-5 flex flex-col justify-between min-h-[220px] overflow-hidden">
            <div className="flex gap-3">
              {/* Left: headline */}
              <div className="flex-1">
                <h2 className="text-xl font-black text-[hsl(220_70%_30%)] leading-tight tracking-tight uppercase">
                  Take Back<br />Your<br />Costs
                </h2>
              </div>
              {/* Center: icon + body */}
              <div className="flex-1">
                <div className="w-8 h-9 bg-[hsl(145_55%_42%)] flex items-center justify-center rounded-sm mb-2" style={{clipPath: 'polygon(0 0, 100% 0, 100% 80%, 50% 100%, 0 80%)'}}>
                  <span className="text-white font-black text-sm">$</span>
                </div>
                <p className="text-[11px] text-[hsl(220_30%_35%)] leading-snug">
                  Lower pricing across everyday essentials plus a reduced free shipping threshold.
                </p>
              </div>
            </div>

            {/* Free shipping badge */}
            <div className="mt-3 border-2 border-[hsl(220_70%_30%)] rounded-lg px-3 py-2 inline-flex items-baseline gap-1 w-fit">
              <span className="text-[10px] font-bold text-[hsl(220_70%_30%)] uppercase leading-tight">Free Shipping<br />on orders over</span>
              <span className="text-2xl font-black text-[hsl(220_70%_30%)]">$99</span>
            </div>

            <a href="#" className="mt-3 w-fit text-xs font-bold bg-[hsl(220_70%_40%)] text-white px-4 py-2 rounded hover:bg-[hsl(220_70%_30%)] transition-colors inline-block">
              Shop Now
            </a>
          </div>

          {/* Coming Soon: myBrand Card */}
          <div className="relative bg-white rounded-lg p-5 border border-border flex flex-col justify-between min-h-[220px] overflow-hidden">
            {/* Bottom accent bar */}
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-[hsl(220_40%_80%)] rounded-b-lg" />

            <div className="flex items-start justify-between gap-3 flex-1">
              {/* Left: copy */}
              <div className="flex-1">
                <h2 className="text-lg font-black text-foreground leading-tight mb-1">
                  Coming Soon:{" "}
                  <span className="text-primary">
                    <span className="font-black italic">my</span>
                    <span className="font-light">brand</span>
                  </span>
                </h2>
                <p className="text-xs text-muted-foreground mb-4">Easy &amp; On-Demand Personalization</p>

                <div className="flex items-start gap-2">
                  {/* Checkmark */}
                  <div className="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-xs text-foreground leading-snug">
                    Easily <strong>Customize</strong> Patient Giveaways!
                  </p>
                </div>

                <button className="mt-4 bg-primary text-primary-foreground text-xs font-bold px-4 py-2 rounded hover:bg-primary/90 transition-colors">
                  Notify Me
                </button>
              </div>

              {/* Right: product visual */}
              <div className="shrink-0 flex flex-col items-end gap-1 -mr-1">
                <img src={productProphy} alt="Branded product" className="w-20 h-20 object-contain drop-shadow-md" />
                <img src={productMasks} alt="Patient giveaway" className="w-16 h-16 object-contain drop-shadow-md -mt-3" />
              </div>
            </div>
          </div>

          {/* Mepivacaine Promo Card */}
          <div className="relative bg-[hsl(38_55%_95%)] rounded-lg overflow-hidden flex flex-col justify-between min-h-[220px] p-5">
            {/* Top: product name */}
            <div>
              <p className="text-[10px] text-muted-foreground uppercase font-semibold tracking-wide mb-1">Featured Product</p>
              <h3 className="text-base font-black text-foreground leading-snug">Safco Mepivacaine</h3>
              <p className="text-[11px] text-muted-foreground leading-snug mt-0.5">HCI Injection USP 3%<br />Without Vasoconstrictor</p>
            </div>

            {/* Center: product image */}
            <div className="flex items-center justify-center py-2">
              <img
                src={productAnesthetic}
                alt="Safco Mepivacaine HCI Injection USP 3%"
                className="h-24 object-contain drop-shadow-xl"
              />
            </div>

            {/* Bottom: deal + CTA */}
            <div className="flex items-end justify-between">
              <div>
                <p className="text-lg font-black text-foreground leading-tight">Buy 10,</p>
                <p className="text-lg font-black text-[hsl(22_80%_45%)] leading-tight">Get 2 FREE!</p>
              </div>
              <a href="#" className="text-xs font-bold bg-foreground text-background px-3 py-1.5 rounded hover:opacity-80 transition-opacity">
                Shop Now
              </a>
            </div>
          </div>
        </div>

        {/* Second Promo Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Labubu Holiday Promo Card */}
          <div className="relative rounded-lg overflow-hidden flex items-stretch min-h-[120px] bg-gradient-to-br from-[hsl(45_90%_60%)] via-[hsl(40_85%_65%)] to-[hsl(35_80%_55%)]">
            {/* Sparkle overlay */}
            <div className="absolute inset-0 opacity-30" style={{backgroundImage: 'radial-gradient(circle at 20% 30%, white 1px, transparent 1px), radial-gradient(circle at 70% 60%, white 1px, transparent 1px), radial-gradient(circle at 50% 20%, white 1px, transparent 1px)', backgroundSize: '60px 60px, 80px 80px, 40px 40px'}} />

            {/* Left: copy */}
            <div className="flex-1 flex flex-col justify-center px-4 py-3 z-10 relative">
              <h3 className="text-lg font-black text-white leading-tight drop-shadow-sm">
                Merry &amp;<br />Mischievous
              </h3>
              <p className="text-xs font-semibold text-white/90 mt-2 leading-snug">
                Free Labubu with<br />orders over <span className="font-black">$2000</span>
              </p>
              <p className="text-[10px] text-white/80 mt-1">Limited Supply.</p>
              <p className="text-[10px] text-white/80 mt-1">
                Promo Code: <span className="font-black text-white tracking-wider">HOLIDAY</span>
              </p>
            </div>

            {/* Right: Labubu image */}
            <div className="w-24 relative shrink-0">
              <img
                src={promoLabubu}
                alt="Free Labubu gift"
                className="absolute bottom-0 right-0 h-full w-full object-cover object-left"
              />
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
