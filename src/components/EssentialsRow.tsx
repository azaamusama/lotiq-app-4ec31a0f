import ProductCard from "./ProductCard";
import productGloves from "@/assets/product-gloves.jpg";
import productMasks from "@/assets/product-masks.jpg";
import productBurs from "@/assets/product-burs.jpg";
import productComposite from "@/assets/product-composite.jpg";
import productCement from "@/assets/product-cement.jpg";
import productAnesthetic from "@/assets/product-anesthetic.jpg";
import productProphy from "@/assets/product-prophy.jpg";

const PRODUCTS = [
  { image: productGloves, brand: "Safco", name: "Nitrilex Soothe Nitrile Gloves", sku: "GLV-4521", price: "$15.99", originalPrice: "$19.99", badge: "Best Seller", badgeType: "promo" as const },
  { image: productMasks, brand: "Safco", name: "DuraSoft™ Procedure Masks", sku: "MSK-1102", price: "$6.99", badge: "Low Stock", badgeType: "low-stock" as const },
  { image: productBurs, brand: "Kerr", name: "Multi-Use Diamond Burs Assorted Kit", sku: "BUR-7890", price: "$42.50" },
  { image: productComposite, brand: "Ivoclar", name: "Tetric EvoCeram Composite Syringe", sku: "CMP-3344", price: "$89.00", originalPrice: "$99.00", badge: "Save 10%", badgeType: "promo" as const },
  { image: productCement, brand: "3M", name: "RelyX™ Luting Cement", sku: "CMT-5567", price: "$34.75" },
  { image: productAnesthetic, brand: "Septodont", name: "Septocaine® Articaine HCl", sku: "ANS-2201", price: "$61.99", badge: "New", badgeType: "new" as const },
  { image: productProphy, brand: "Safco", name: "ProPaste™ Prophy Paste Medium", sku: "PPT-8834", price: "$8.49" },
];

const EssentialsRow = () => {
  return (
    <section className="py-6 lg:py-8">
      <div className="container">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-foreground">High-Volume Essentials</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Competitive pricing on your most-ordered consumables</p>
          </div>
          <a href="#" className="text-sm text-primary font-medium hover:underline">View All →</a>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.sku} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EssentialsRow;
