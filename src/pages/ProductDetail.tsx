import { useState } from "react";
import { Star, Heart, ChevronRight, Minus, Plus, Truck, RotateCcw, ShieldCheck, Award, Package, X, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import SafcoHeader from "@/components/SafcoHeader";
import SafcoFooter from "@/components/SafcoFooter";
import productGloves from "@/assets/product-gloves.jpg";

const PRODUCT = {
  brand: "Safco",
  name: "Safco Nitrilex Soothe",
  itemNum: "1028073",
  mfrNum: "1028073",
  rating: 4.5,
  reviewCount: 5,
  purchasedTimes: 3,
  lastPurchased: "Oct 8, 2025",
  description:
    "Powder-free nitrile exam gloves. Our reliably strong and thin nitrile glove, but now with a colloidal oatmeal coating. This is specifically formulated to lock in moisture, giving your skin a chance to rehydrate from handwashing. Designed to soften your skin and soothe itching, our anti-inflammatory properties make our Safco Nitrilex Soothe perfect for clinicians with dry skin, returning your hands to their natural pH balance.",
  originalPrice: 24.99,
  salePrice: 12.97,
  subscribePrice: 10.99,
  sizes: ["Extra Small", "Small", "Large", "XLarge", "2xl Large"],
  piecesPerBox: ["50/Box", "100/Box", "150/Box", "200/Box", "300/Box"],
  colors: ["Black"],
  specs: [
    { label: "Item #", value: "1028073" },
    { label: "Manufacturer #", value: "1028073" },
    { label: "Stock", value: "100000 in stock" },
    { label: "Made", value: "Made in Malaysia" },
    { label: "Brand", value: "Safco" },
    { label: "Texture", value: "Textured fingertip finish" },
    { label: "Cuff", value: "Beaded cuff" },
    { label: "Material", value: "Powder-free nitrile exam gloves." },
    { label: "Product Type", value: "Powder-free nitrile exam gloves." },
    { label: "Packaging", value: "Powder-free nitrile exam gloves." },
    { label: "Color", value: "Robin Egg Blue color" },
    { label: "Size", value: "Extra Large" },
    { label: "Testing", value: "Chemotherapy drug tested per ASTM D6978" },
    { label: "Thickness", value: "Thickness: at palm 2.5 mils; at fingertip 3.3 mils" },
    { label: "Hand Use", value: "Ambidextrous" },
    { label: "Chemical Safety", value: "Non-chlorinated" },
    { label: "Coating", value: "Moisturizing anti-irritant and anti-inflammatory colloidal oatmeal coated" },
    { label: "Order Information", value: "To purchase a full case, please order as qty of 10" },
  ],
};

const TRUST_ITEMS = [
  { icon: "💲", label: "Low Prices" },
  { icon: "🚚", label: "Free shipping" },
  { icon: "↩️", label: "Risk-free return policy" },
  { icon: "✓", label: "Accuracy and reliability" },
  { icon: "🏥", label: "Fully authorized and licensed" },
];

const REVIEWS = [
  {
    name: "Caitlyn King",
    verified: true,
    date: "07/26/25",
    rating: 5,
    text: "Love the simplicity of the service and the prompt customer support. We can't imagine working without it.",
  },
];

const StarRating = ({ rating, size = "sm" }: { rating: number; size?: "sm" | "lg" }) => {
  const sz = size === "lg" ? "h-6 w-6" : "h-4 w-4";
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`${sz} ${i <= Math.floor(rating) ? "fill-alert text-alert" : i - 0.5 <= rating ? "fill-alert/50 text-alert" : "text-muted-foreground"}`}
        />
      ))}
    </div>
  );
};

const ProductDetail = () => {
  const [selectedSize, setSelectedSize] = useState("Large");
  const [selectedPieces, setSelectedPieces] = useState("100/Box");
  const [selectedColor, setSelectedColor] = useState("Black");
  const [purchaseType, setPurchaseType] = useState<"one-time" | "subscribe">("one-time");
  const [qty, setQty] = useState(10);
  const [activeImage, setActiveImage] = useState(0);
  const [specOpen, setSpecOpen] = useState(true);
  const [descOpen, setDescOpen] = useState(true);
  const [promoVisible, setPromoVisible] = useState(true);
  const [reviewSearch, setReviewSearch] = useState("");

  const images = [productGloves, productGloves, productGloves, productGloves, productGloves];
  const total = (purchaseType === "subscribe" ? PRODUCT.subscribePrice : PRODUCT.salePrice) * qty;

  return (
    <div className="min-h-screen bg-background">
      <SafcoHeader />

      <main className="container py-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-xs text-muted-foreground mb-4">
          {["Home", "Dental Supplies", "Gloves", "Nitrile Gloves", "Safco Nitrilex Soothe"].map((crumb, i, arr) => (
            <span key={crumb} className="flex items-center gap-1">
              {i < arr.length - 1 ? (
                <>
                  <a href="#" className="hover:text-primary hover:underline">{crumb}</a>
                  <ChevronRight className="h-3 w-3" />
                </>
              ) : (
                <span className="text-foreground font-medium">{crumb}</span>
              )}
            </span>
          ))}
        </nav>

        {/* Promo Banner */}
        {promoVisible && (
          <div className="border border-alert/40 bg-alert/5 rounded-lg px-4 py-3 flex items-start gap-3 mb-6 relative">
            <span className="text-alert mt-0.5">⊙</span>
            <div className="flex-1 text-sm">
              <p className="font-semibold text-alert">Winter Sale is Here!</p>
              <p className="text-muted-foreground text-xs mt-0.5">
                Save up to 25% on select nitrile gloves and dental essentials. Offer valid through January 31, 2026.
              </p>
              <p className="text-xs mt-1">
                <a href="#" className="text-alert font-semibold hover:underline">Later &nbsp; View all Offers →</a>
              </p>
            </div>
            <button onClick={() => setPromoVisible(false)} className="text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Main PDP Grid */}
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10 mb-10">
          {/* Left: Image Gallery */}
          <div>
            <div className="relative bg-card border border-border rounded-lg overflow-hidden aspect-square flex items-center justify-center mb-3">
              <img src={images[activeImage]} alt={PRODUCT.name} className="w-4/5 h-4/5 object-contain" />
            </div>
            {/* Thumbnails */}
            <div className="flex items-center gap-2">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`w-14 h-14 rounded border-2 overflow-hidden transition-colors ${activeImage === i ? "border-primary" : "border-border hover:border-muted-foreground"}`}
                >
                  <img src={img} alt="" className="w-full h-full object-contain p-1" />
                </button>
              ))}
              <span className="ml-auto text-xs text-muted-foreground">1 of {images.length}</span>
            </div>
          </div>

          {/* Right: Product Info */}
          <div>
            {/* Brand + Name + Rating */}
            <a href="#" className="text-xs text-primary font-semibold hover:underline uppercase tracking-wide">{PRODUCT.brand}</a>
            <h1 className="text-2xl font-bold text-foreground mt-1 mb-2">{PRODUCT.name}</h1>

            <div className="flex items-center gap-3 mb-2">
              <StarRating rating={PRODUCT.rating} />
              <a href="#reviews" className="text-xs text-primary hover:underline">{PRODUCT.reviewCount} Reviews</a>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-4">
              <span>Item #: <span className="font-mono text-foreground">{PRODUCT.itemNum}</span></span>
              <span>Mfr #: <span className="font-mono text-foreground">{PRODUCT.mfrNum}</span></span>
              <span className="bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-[11px] font-semibold">
                Purchased {PRODUCT.purchasedTimes} times
              </span>
              <span>Last purchased <strong>{PRODUCT.lastPurchased}</strong></span>
            </div>

            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              {PRODUCT.description.slice(0, 80)}...{" "}
              <a href="#description" className="text-primary hover:underline text-xs">Read More</a>
            </p>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-5">
              <span className="text-sm text-muted-foreground line-through">${PRODUCT.originalPrice.toFixed(2)}</span>
              <span className="text-3xl font-bold text-foreground">${PRODUCT.salePrice.toFixed(2)}</span>
              <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded">PERSONALIZATION</span>
              <button className="ml-auto text-muted-foreground hover:text-destructive transition-colors">
                <Heart className="h-5 w-5" />
              </button>
            </div>

            {/* Size */}
            <div className="mb-4">
              <p className="text-xs font-semibold text-foreground mb-2">Size:</p>
              <div className="flex flex-wrap gap-2">
                {PRODUCT.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`px-3 py-1.5 text-xs rounded border font-medium transition-colors ${
                      selectedSize === s
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card text-foreground hover:border-primary"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Pieces/Box */}
            <div className="mb-4">
              <p className="text-xs font-semibold text-foreground mb-2">Pieces/Box:</p>
              <div className="flex flex-wrap gap-2">
                {PRODUCT.piecesPerBox.map((p) => (
                  <button
                    key={p}
                    onClick={() => setSelectedPieces(p)}
                    className={`px-3 py-1.5 text-xs rounded border font-medium transition-colors ${
                      selectedPieces === p
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card text-foreground hover:border-primary"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Color */}
            <div className="mb-5">
              <p className="text-xs font-semibold text-foreground mb-2">Color:</p>
              <div className="flex items-center gap-2 border border-border rounded px-3 py-2 w-36 bg-card">
                <span className="h-3 w-3 rounded-full bg-foreground inline-block" />
                <span className="text-sm text-foreground">{selectedColor}</span>
                <ChevronDown className="h-4 w-4 text-muted-foreground ml-auto" />
              </div>
            </div>

            {/* Purchase Type */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <button
                onClick={() => setPurchaseType("one-time")}
                className={`rounded-lg border-2 px-4 py-3 text-sm font-medium transition-colors text-left ${
                  purchaseType === "one-time" ? "border-primary bg-primary/5" : "border-border bg-card hover:border-muted-foreground"
                }`}
              >
                <span className="block font-semibold text-foreground">One-time purchase</span>
                <span className="text-primary font-bold">${PRODUCT.salePrice.toFixed(2)}</span>
              </button>
              <button
                onClick={() => setPurchaseType("subscribe")}
                className={`rounded-lg border-2 px-4 py-3 text-sm font-medium transition-colors text-left ${
                  purchaseType === "subscribe" ? "border-primary bg-primary/5" : "border-border bg-card hover:border-muted-foreground"
                }`}
              >
                <span className="block font-semibold text-foreground">Subscribe &amp; Save</span>
                <span className="text-primary font-bold">${PRODUCT.subscribePrice.toFixed(2)}</span>
              </button>
            </div>

            {/* Promo Callout */}
            <div className="border border-alert/30 bg-alert/5 rounded-lg px-4 py-3 mb-5">
              <p className="text-sm font-semibold text-alert mb-0.5">Safco Nitrilex Soothe</p>
              <p className="text-sm text-foreground">Buy 3, Get 1 Free! Free goods will ship from Safco.</p>
              <p className="text-xs font-bold text-alert mt-1">Offer Ends 10/31/2025</p>
            </div>

            {/* Trust Strip */}
            <div className="bg-primary rounded-lg px-4 py-3 flex items-center justify-around mb-5">
              {TRUST_ITEMS.map((t) => (
                <div key={t.label} className="flex flex-col items-center gap-1 text-center">
                  <span className="text-xl">{t.icon}</span>
                  <span className="text-[10px] text-primary-foreground leading-tight max-w-[60px]">{t.label}</span>
                </div>
              ))}
            </div>

            {/* Qty + Add to Cart */}
            <div className="flex items-center gap-4 mb-3">
              <div className="flex items-center border border-border rounded-lg overflow-hidden">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="px-3 py-2.5 hover:bg-muted transition-colors text-foreground"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4 py-2 text-sm font-semibold text-foreground min-w-[3rem] text-center bg-card">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="px-3 py-2.5 hover:bg-muted transition-colors text-foreground"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <span className="text-sm text-muted-foreground">Total</span>
              <span className="text-2xl font-bold text-foreground">${total.toFixed(2)}</span>
              <Button variant="cart" className="flex-1 h-11 text-sm font-bold">
                Add to cart
              </Button>
            </div>

            {/* Delivery Info */}
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Truck className="h-3.5 w-3.5 text-success" />
                <span className="text-success font-semibold">Free Delivery</span> Qualifying orders over $25
              </span>
              <span className="flex items-center gap-1">
                <Package className="h-3.5 w-3.5" />
                Est. Delivery Time <strong className="text-foreground ml-1">2 – 3 days</strong>
              </span>
            </div>
          </div>
        </div>

        {/* VIP Banner */}
        <div className="bg-card border border-border rounded-lg px-6 py-4 flex items-start gap-4 mb-6">
          <div className="bg-primary rounded-lg p-2 shrink-0">
            <span className="text-primary-foreground font-black text-sm">VIP</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            <strong className="text-foreground">VIP Member!</strong> To see your savings for each product, hover over the VIP logo next to the product price below. Credit values listed will be automatically applied to your account at the end of each quarter. If you participate in a promotion, the credits earned for that purchase may vary.
          </p>
        </div>

        {/* Product Description */}
        <div id="description" className="border border-border rounded-lg mb-4 overflow-hidden">
          <button
            onClick={() => setDescOpen(!descOpen)}
            className="w-full flex items-center justify-between px-6 py-4 bg-card hover:bg-muted transition-colors"
          >
            <span className="font-semibold text-foreground">Product Description</span>
            {descOpen ? <ChevronUp className="h-5 w-5 text-muted-foreground" /> : <ChevronDown className="h-5 w-5 text-muted-foreground" />}
          </button>
          {descOpen && (
            <div className="px-6 py-4 bg-card border-t border-border">
              <p className="text-sm text-muted-foreground mb-3">Powder-free nitrile exam gloves.</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{PRODUCT.description}</p>
            </div>
          )}
        </div>

        {/* Specifications */}
        <div className="border border-border rounded-lg mb-8 overflow-hidden">
          <button
            onClick={() => setSpecOpen(!specOpen)}
            className="w-full flex items-center justify-between px-6 py-4 bg-card hover:bg-muted transition-colors"
          >
            <span className="font-semibold text-foreground">Specifications</span>
            {specOpen ? <ChevronUp className="h-5 w-5 text-muted-foreground" /> : <ChevronDown className="h-5 w-5 text-muted-foreground" />}
          </button>
          {specOpen && (
            <div className="bg-card border-t border-border">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
                {PRODUCT.specs.map((spec, i) => (
                  <div key={i} className="px-6 py-4 border-b border-r border-border last:border-r-0">
                    <p className="text-xs font-semibold text-foreground mb-1">{spec.label}:</p>
                    <p className="text-xs text-muted-foreground">{spec.value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Customer Reviews */}
        <div id="reviews" className="mb-10">
          <h2 className="text-xl font-bold text-foreground mb-6">Customer Reviews</h2>
          <div className="grid md:grid-cols-[auto_1fr] gap-8 mb-6">
            {/* Summary */}
            <div className="text-center">
              <p className="text-6xl font-black text-foreground">5</p>
              <StarRating rating={5} size="lg" />
              <p className="text-xs text-muted-foreground mt-1">Based on 2 reviews</p>
            </div>
            {/* Bars */}
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="flex items-center gap-3">
                  <span className="text-sm text-foreground w-3">{star}</span>
                  <Star className="h-3.5 w-3.5 fill-alert text-alert" />
                  <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-alert h-full rounded-full"
                      style={{ width: star === 5 ? "100%" : "0%" }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground w-4">{star === 5 ? 2 : 0}</span>
                </div>
              ))}
            </div>
            <div className="md:col-start-2 flex justify-end">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                Write A Review
              </Button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3 mb-6 border-b border-border pb-4">
            <div className="relative flex items-center border border-border rounded px-3 py-2 bg-card gap-2">
              <input
                placeholder="Search reviews"
                value={reviewSearch}
                onChange={(e) => setReviewSearch(e.target.value)}
                className="text-sm bg-transparent outline-none text-foreground placeholder:text-muted-foreground w-32"
              />
            </div>
            <div className="flex items-center border border-border rounded px-3 py-2 bg-card gap-2">
              <span className="text-sm text-muted-foreground">Rating</span>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex items-center border border-border rounded px-3 py-2 bg-card gap-2">
              <span className="text-sm text-muted-foreground">with image</span>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="ml-auto flex items-center gap-2 text-xs text-muted-foreground">
              Sort by: <span className="font-semibold text-foreground">Most relevant</span>
              <ChevronDown className="h-3 w-3" />
            </div>
          </div>

          {/* Review Cards */}
          {REVIEWS.map((r, i) => (
            <div key={i} className="border-b border-border py-5">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                  {r.name[0]}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{r.name}</p>
                      {r.verified && (
                        <p className="text-xs text-success flex items-center gap-1">
                          <ShieldCheck className="h-3 w-3" /> Verified Buyer
                        </p>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">{r.date}</span>
                  </div>
                  <StarRating rating={r.rating} />
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{r.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <SafcoFooter />
    </div>
  );
};

export default ProductDetail;
