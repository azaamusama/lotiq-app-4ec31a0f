import ProductCard from "./ProductCard";
import productGloves from "@/assets/product-gloves.jpg";
import productMasks from "@/assets/product-masks.jpg";
import productBurs from "@/assets/product-burs.jpg";
import productComposite from "@/assets/product-composite.jpg";
import productCement from "@/assets/product-cement.jpg";
import productAnesthetic from "@/assets/product-anesthetic.jpg";
import productProphy from "@/assets/product-prophy.jpg";

interface DealProductRowProps {
  title: string;
  subtitle?: string;
}

const PRODUCTS_SET_1 = [
  { image: productGloves, brand: "Safco", name: "Nitrilex Soothe Nitrile Gloves", sku: "GLV-4521", price: "$15.99", originalPrice: "$19.99", badge: "Best Seller", badgeType: "promo" as const },
  { image: productMasks, brand: "Safco", name: "DuraSoft™ Procedure Masks", sku: "MSK-1102", price: "$6.99", badge: "Low Stock", badgeType: "low-stock" as const },
  { image: productBurs, brand: "Kerr", name: "Multi-Use Diamond Burs Kit", sku: "BUR-7890", price: "$42.50" },
  { image: productComposite, brand: "Ivoclar", name: "Tetric EvoCeram Composite", sku: "CMP-3344", price: "$89.00", originalPrice: "$99.00", badge: "Save 10%", badgeType: "promo" as const },
  { image: productCement, brand: "3M", name: "RelyX™ Luting Cement", sku: "CMT-5567", price: "$34.75" },
  { image: productAnesthetic, brand: "Septodont", name: "Septocaine® Articaine HCl", sku: "ANS-2201", price: "$61.99", badge: "New", badgeType: "new" as const },
];

const DealProductRow = ({ title, subtitle }: DealProductRowProps) => {
  return (
    <section className="py-4">
      <div className="container">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-base font-bold text-foreground">{title}</h2>
            {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
          </div>
          <a href="#" className="text-sm text-primary font-medium hover:underline">View All →</a>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {PRODUCTS_SET_1.map((product) => (
            <ProductCard key={product.sku} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DealProductRow;
