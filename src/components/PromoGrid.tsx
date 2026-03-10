import { Button } from "@/components/ui/button";
import { Tag, Percent, Zap } from "lucide-react";

const PROMOS = [
  {
    title: "Glove Week Special",
    description: "Buy 7, Get 3 FREE on select Safco gloves",
    cta: "Shop Gloves",
    icon: Tag,
    accent: true,
  },
  {
    title: "New Practice Starter Kit",
    description: "Everything you need to outfit your operatory — bundled at 15% off",
    cta: "View Kit",
    icon: Zap,
    accent: false,
  },
  {
    title: "Burs & Diamonds Sale",
    description: "Save up to 25% on top-selling carbide and diamond burs",
    cta: "Shop Burs",
    icon: Percent,
    accent: false,
  },
  {
    title: "Free Shipping Event",
    description: "No minimum — free shipping on every order this week",
    cta: "Shop Now",
    icon: Tag,
    accent: true,
  },
];

const PromoGrid = () => {
  return (
    <section className="py-6 lg:py-8">
      <div className="container">
        <h2 className="text-lg font-semibold text-foreground mb-4">Deals & Promotions</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {PROMOS.map((promo) => (
            <div
              key={promo.title}
              className={`p-5 rounded ${promo.accent ? "bg-primary text-primary-foreground" : "bg-bg-green text-foreground"}`}
            >
              <promo.icon className={`h-5 w-5 mb-3 ${promo.accent ? "text-primary-foreground/80" : "text-primary"}`} />
              <h3 className="font-semibold text-sm mb-1">{promo.title}</h3>
              <p className={`text-xs mb-4 ${promo.accent ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                {promo.description}
              </p>
              <Button
                variant={promo.accent ? "outline" : "action"}
                size="sm"
                className={promo.accent ? "border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 rounded-full" : ""}
              >
                {promo.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromoGrid;
