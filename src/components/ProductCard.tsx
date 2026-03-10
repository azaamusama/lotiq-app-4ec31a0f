import { ShoppingCart, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ProductCardProps {
  image: string;
  brand: string;
  name: string;
  sku: string;
  price: string;
  originalPrice?: string;
  badge?: string;
  badgeType?: "promo" | "low-stock" | "new";
}

const ProductCard = ({ image, brand, name, sku, price, originalPrice, badge, badgeType }: ProductCardProps) => {
  const [qty, setQty] = useState(1);

  const badgeStyles = {
    promo: "bg-alert text-alert-foreground",
    "low-stock": "bg-destructive text-destructive-foreground",
    new: "bg-accent text-accent-foreground",
  };

  return (
    <div className="bg-card border border-border rounded p-3 flex flex-col h-full group">
      {/* Image */}
      <div className="relative aspect-square mb-3 overflow-hidden rounded bg-background">
        {badge && (
          <span className={`absolute top-2 left-2 text-[10px] font-semibold px-2 py-0.5 rounded-full ${badgeStyles[badgeType || "promo"]}`}>
            {badge}
          </span>
        )}
        <img src={image} alt={name} className="w-full h-full object-contain p-2" loading="lazy" />
      </div>

      {/* Details */}
      <div className="flex-1 flex flex-col">
        <span className="text-[10px] text-primary font-medium uppercase tracking-wide">{brand}</span>
        <h3 className="text-sm font-medium text-foreground leading-tight mt-0.5 mb-1 line-clamp-2">{name}</h3>
        <span className="text-[10px] text-muted-foreground font-mono mb-2">SKU: {sku}</span>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-3 mt-auto">
          <span className="text-base font-bold text-foreground font-mono">{price}</span>
          {originalPrice && (
            <span className="text-xs text-muted-foreground line-through font-mono">{originalPrice}</span>
          )}
        </div>

        {/* QTY + Add to Cart - always visible per brief */}
        <div className="flex items-center gap-2">
          <div className="flex items-center border border-input rounded">
            <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-1.5 hover:bg-muted transition-colors" aria-label="Decrease quantity">
              <Minus className="h-3 w-3" />
            </button>
            <span className="w-8 text-center text-sm font-mono">{qty}</span>
            <button onClick={() => setQty(qty + 1)} className="p-1.5 hover:bg-muted transition-colors" aria-label="Increase quantity">
              <Plus className="h-3 w-3" />
            </button>
          </div>
          <Button variant="cart" className="flex-1 flex items-center justify-center gap-1">
            <ShoppingCart className="h-3 w-3" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
