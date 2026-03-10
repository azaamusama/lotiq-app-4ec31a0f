import { ArrowRight, Truck, Package, Headphones, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const VALUE_PROPS = [
  { icon: Package, label: "30,000+ Products" },
  { icon: Truck, label: "Free Shipping $99+" },
  { icon: Headphones, label: "Expert Support" },
  { icon: ShieldCheck, label: "80+ Years Trusted" },
];

const HeroSplitUtility = () => {
  const [skuInput, setSkuInput] = useState("");
  const [qtyInput, setQtyInput] = useState("1");

  const handleQuickAdd = () => {
    if (skuInput.trim()) {
      setSkuInput("");
      setQtyInput("1");
    }
  };

  return (
    <section className="bg-card">
      <div className="container py-6 lg:py-8">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left: Value Proposition */}
          <div className="flex flex-col justify-center">
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground leading-tight mb-3">
              Your Trusted Partner for
              <span className="text-primary"> Dental Supplies</span>
            </h1>
            <p className="text-muted-foreground text-sm lg:text-base mb-6 max-w-lg">
              Professional-grade dental products at competitive prices. Fast ordering, same-day shipping, and dedicated support for your practice.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {VALUE_PROPS.map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-1.5 p-3 bg-bg-green-light rounded text-center">
                  <Icon className="h-5 w-5 text-primary" />
                  <span className="text-xs font-medium text-foreground">{label}</span>
                </div>
              ))}
            </div>
            <Button variant="action" size="lg" className="w-fit">
              Shop All Products <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>

          {/* Right: Quick Order by SKU */}
          <div className="bg-bg-green rounded-lg p-6">
            <h2 className="text-lg font-semibold text-foreground mb-1">Quick Order by SKU</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Enter SKU numbers to add items directly to your cart
            </p>
            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter SKU (e.g., BUR-1234)"
                  value={skuInput}
                  onChange={(e) => setSkuInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleQuickAdd()}
                  className="flex-1 h-10 px-3 rounded border border-input bg-card text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  type="number"
                  min="1"
                  value={qtyInput}
                  onChange={(e) => setQtyInput(e.target.value)}
                  className="w-16 h-10 px-2 rounded border border-input bg-card text-sm text-center font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button variant="action" onClick={handleQuickAdd}>
                  Add
                </Button>
              </div>
              <div className="flex gap-2">
                <input type="text" placeholder="Enter SKU" className="flex-1 h-10 px-3 rounded border border-input bg-card text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary" />
                <input type="number" min="1" defaultValue="1" className="w-16 h-10 px-2 rounded border border-input bg-card text-sm text-center font-mono focus:outline-none focus:ring-2 focus:ring-primary" />
                <Button variant="action">Add</Button>
              </div>
              <div className="flex gap-2">
                <input type="text" placeholder="Enter SKU" className="flex-1 h-10 px-3 rounded border border-input bg-card text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary" />
                <input type="number" min="1" defaultValue="1" className="w-16 h-10 px-2 rounded border border-input bg-card text-sm text-center font-mono focus:outline-none focus:ring-2 focus:ring-primary" />
                <Button variant="action">Add</Button>
              </div>
              <p className="text-xs text-muted-foreground">Press Enter or click Add to queue items. Use the SKU Pad for bulk entry →</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSplitUtility;
