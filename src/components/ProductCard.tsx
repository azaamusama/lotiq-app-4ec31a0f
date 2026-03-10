import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

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

const ProductCard = ({ image, name, price, originalPrice }: ProductCardProps) => {
  return (
    <div className="bg-card border border-border rounded-lg p-4 flex flex-col h-full group hover:shadow-md transition-shadow">
      {/* Image */}
      <div className="relative aspect-square mb-4 overflow-hidden rounded-lg border border-border/50 bg-background flex items-center justify-center">
        <img src={image} alt={name} className="w-4/5 h-4/5 object-contain" loading="lazy" />
      </div>

      {/* Details */}
      <div className="flex-1 flex flex-col">
        <h3 className="text-sm font-medium text-foreground leading-tight mb-2 line-clamp-2">{name}</h3>

        {/* Price */}
        <div className="flex items-baseline gap-1 mb-4 mt-auto">
          <span className="text-xs text-muted-foreground">As low as</span>
          <span className="text-xl font-bold text-foreground">{price}</span>
          {originalPrice && (
            <span className="text-xs text-muted-foreground line-through ml-1">{originalPrice}</span>
          )}
        </div>

        {/* Shop Now Button */}
        <Button variant="cart" className="w-full flex items-center justify-center gap-2 py-2.5 text-sm rounded-lg">
          <ShoppingCart className="h-4 w-4" />
          Shop Now
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
