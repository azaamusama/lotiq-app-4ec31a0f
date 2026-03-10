import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const BANNERS = [
  {
    title: "New Practice Setup?",
    subtitle: "Get started fast.",
    description: "Everything you need to outfit your operatory — bundled at 15% off",
    bgClass: "bg-primary",
    textClass: "text-primary-foreground",
  },
  {
    title: "Glove Week",
    subtitle: "Buy 7, Get 3 FREE",
    description: "On select Safco nitrile gloves",
    bgClass: "bg-safco-blue-dark",
    textClass: "text-primary-foreground",
  },
  {
    title: "Free Shipping",
    subtitle: "No minimum this week",
    description: "Free shipping on every order — no code needed",
    bgClass: "bg-accent",
    textClass: "text-accent-foreground",
  },
];

const PromoBanners = () => {
  return (
    <section className="py-4">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {BANNERS.map((banner) => (
            <div
              key={banner.title}
              className={`${banner.bgClass} rounded-lg p-6 flex flex-col justify-between min-h-[160px]`}
            >
              <div>
                <p className={`${banner.textClass}/70 text-xs font-medium uppercase tracking-wide`}>{banner.subtitle}</p>
                <h3 className={`text-lg font-bold ${banner.textClass} mt-1`}>{banner.title}</h3>
                <p className={`${banner.textClass}/80 text-xs mt-1`}>{banner.description}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className={`w-fit mt-3 border-current/30 ${banner.textClass} hover:bg-white/10`}
              >
                Shop Now <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromoBanners;
