import { useState, useRef, useEffect } from "react";
import { Check, ChevronRight, Minus, Plus, ShoppingCart, Bookmark, Truck, Award, Users, Star, ChevronLeft, Info, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import SafcoHeader from "@/components/v3/SafcoHeaderV3";
import SafcoFooter from "@/components/SafcoFooter";
import productGloves from "@/assets/product-gloves.jpg";
import productMasks from "@/assets/product-masks.jpg";
import productProphy from "@/assets/product-prophy.jpg";
import productComposite from "@/assets/product-composite.jpg";
import productAnesthetic from "@/assets/product-anesthetic.jpg";
import productCement from "@/assets/product-cement.jpg";
import productBurs from "@/assets/product-burs.jpg";

// ─── DATA ────────────────────────────────────────────────────────────────────

type ProductOption = {
  id: string;
  name: string;
  brand: string;
  sku: string;
  price: number;
  image: string;
  badge?: string;
  rating: number;
  reviewCount: number;
  tag?: string;
};

const BAGS: ProductOption[] = [
  { id: "bag-1", name: "Safco Reusable Patient Kit Bag – Clear", brand: "Safco", sku: "SAF-BAG-CLR", price: 1.20, image: productGloves, badge: "Best Seller", rating: 4.8, reviewCount: 312, tag: "Clear zip-lock, recyclable" },
  { id: "bag-2", name: "Safco Eco Kraft Paper Bag", brand: "Safco", sku: "SAF-BAG-KFT", price: 0.85, image: productMasks, rating: 4.5, reviewCount: 198, tag: "100% recycled paper" },
  { id: "bag-3", name: "Premium Branded Tote Bag", brand: "Safco", sku: "SAF-BAG-TOT", price: 2.50, image: productProphy, badge: "Premium", rating: 4.9, reviewCount: 87, tag: "Reusable canvas tote" },
];

const TOOTHBRUSHES: ProductOption[] = [
  { id: "tb-1", name: "Safco Adult Soft Toothbrush", brand: "Safco", sku: "SAF-TB-AS", price: 0.42, image: productComposite, badge: "Most Popular", rating: 4.7, reviewCount: 1204, tag: "Soft bristles, adult" },
  { id: "tb-2", name: "Safco Adult Medium Toothbrush", brand: "Safco", sku: "SAF-TB-AM", price: 0.42, image: productAnesthetic, rating: 4.6, reviewCount: 876, tag: "Medium bristles, adult" },
  { id: "tb-3", name: "Safco Child Soft Toothbrush", brand: "Safco", sku: "SAF-TB-CS", price: 0.38, image: productCement, rating: 4.8, reviewCount: 543, tag: "Soft bristles, pediatric" },
  { id: "tb-4", name: "Safco Orthodontic Toothbrush", brand: "Safco", sku: "SAF-TB-ORT", price: 0.58, image: productBurs, badge: "Specialty", rating: 4.9, reviewCount: 231, tag: "V-shaped trim, ortho" },
  { id: "tb-5", name: "Safco Sensitive Toothbrush", brand: "Safco", sku: "SAF-TB-SEN", price: 0.48, image: productGloves, rating: 4.7, reviewCount: 412, tag: "Extra-soft, sensitive" },
  { id: "tb-6", name: "Safco Eco Bamboo Toothbrush", brand: "Safco", sku: "SAF-TB-ECO", price: 0.65, image: productMasks, badge: "Eco", rating: 4.6, reviewCount: 189, tag: "Biodegradable handle" },
];

const FLOSS: ProductOption[] = [
  { id: "fl-1", name: "Safco Waxed Dental Floss 12yd", brand: "Safco", sku: "SAF-FL-WX", price: 0.28, image: productProphy, badge: "Best Seller", rating: 4.8, reviewCount: 934, tag: "Waxed, 12 yards" },
  { id: "fl-2", name: "Safco Unwaxed Dental Floss 12yd", brand: "Safco", sku: "SAF-FL-UW", price: 0.26, image: productComposite, rating: 4.5, reviewCount: 612, tag: "Unwaxed, 12 yards" },
  { id: "fl-3", name: "Safco Floss Picks (Pack of 2)", brand: "Safco", sku: "SAF-FL-PCK", price: 0.35, image: productAnesthetic, badge: "Convenient", rating: 4.7, reviewCount: 421, tag: "Pre-threaded picks" },
  { id: "fl-4", name: "Safco Tape Floss 12yd", brand: "Safco", sku: "SAF-FL-TP", price: 0.32, image: productCement, rating: 4.6, reviewCount: 287, tag: "Wide tape, gentle" },
];

const STEPS = [
  { id: 1, label: "Bag", sublabel: "1 item" },
  { id: 2, label: "Toothbrushes", sublabel: "4 items" },
  { id: 3, label: "Floss", sublabel: "2 items" },
  { id: 4, label: "Review", sublabel: "Confirm" },
];

// ─── SUB-COMPONENTS ──────────────────────────────────────────────────────────

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((i) => (
      <Star key={i} className={`h-3 w-3 ${i <= Math.round(rating) ? "fill-[hsl(var(--alert))] text-[hsl(var(--alert))]" : "text-muted-foreground"}`} />
    ))}
  </div>
);

type SelectionMap = Record<string, number>;

interface ProductTileProps {
  product: ProductOption;
  selected: number;
  onAdd: () => void;
  onRemove: () => void;
  maxReached?: boolean;
  singleSelect?: boolean;
}

const ProductTile = ({ product, selected, onAdd, onRemove, maxReached, singleSelect }: ProductTileProps) => {
  const isSelected = selected > 0;
  return (
    <div
      className={`relative rounded-xl border-2 bg-card transition-all duration-200 cursor-pointer flex flex-col overflow-hidden hover:shadow-md ${
        isSelected ? "border-primary shadow-sm shadow-primary/20" : "border-border hover:border-primary/40"
      }`}
      onClick={() => { if (!isSelected) onAdd(); }}
    >
      {/* Badge */}
      {product.badge && (
        <span className="absolute top-2 left-2 z-10 text-[10px] font-bold bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
          {product.badge}
        </span>
      )}

      {/* Selected checkmark */}
      {isSelected && (
        <div className="absolute top-2 right-2 z-10 h-5 w-5 rounded-full bg-primary flex items-center justify-center">
          <Check className="h-3 w-3 text-primary-foreground" />
        </div>
      )}

      {/* Image */}
      <div className="bg-muted/40 flex items-center justify-center h-32 shrink-0">
        <img src={product.image} alt={product.name} className="h-24 w-24 object-contain" />
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col gap-1 flex-1">
        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">{product.brand}</p>
        <p className="text-sm font-semibold text-foreground leading-tight line-clamp-2">{product.name}</p>
        <p className="text-[11px] text-muted-foreground">{product.tag}</p>
        <div className="flex items-center gap-1.5 mt-0.5">
          <StarRating rating={product.rating} />
          <span className="text-[10px] text-muted-foreground">({product.reviewCount})</span>
        </div>
        <p className="text-sm font-bold text-foreground mt-auto pt-1">${product.price.toFixed(2)} <span className="text-[10px] font-normal text-muted-foreground">/ unit</span></p>
      </div>

      {/* Controls */}
      <div className="px-3 pb-3" onClick={(e) => e.stopPropagation()}>
        {!isSelected ? (
          <button
            onClick={onAdd}
            disabled={maxReached}
            className={`w-full text-xs font-semibold py-2 rounded-lg border transition-colors ${
              maxReached
                ? "border-border text-muted-foreground cursor-not-allowed"
                : "border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            }`}
          >
            {maxReached ? "Limit reached" : singleSelect ? "Select" : "Add to kit"}
          </button>
        ) : (
          <div className="flex items-center justify-between">
            {!singleSelect ? (
              <>
                <button onClick={onRemove} className="h-7 w-7 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-colors">
                  <Minus className="h-3.5 w-3.5 text-foreground" />
                </button>
                <span className="text-sm font-bold text-foreground">{selected}</span>
                <button onClick={onAdd} disabled={maxReached} className={`h-7 w-7 rounded-lg border flex items-center justify-center transition-colors ${maxReached ? "border-border text-muted-foreground cursor-not-allowed" : "border-primary text-primary hover:bg-primary hover:text-primary-foreground"}`}>
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </>
            ) : (
              <button
                onClick={onRemove}
                className="w-full text-xs font-semibold py-2 rounded-lg bg-primary text-primary-foreground flex items-center justify-center gap-1.5"
              >
                <Check className="h-3.5 w-3.5" /> Selected
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

const BundleBuilder = () => {
  const [step, setStep] = useState(1);
  const [bagSelection, setBagSelection] = useState<SelectionMap>({});
  const [toothbrushSelection, setToothbrushSelection] = useState<SelectionMap>({});
  const [flossSelection, setFlossSelection] = useState<SelectionMap>({});
  const [kitQty, setKitQty] = useState(50);
  const [savedTemplate, setSavedTemplate] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  const TOOTHBRUSH_REQUIRED = 4;
  const FLOSS_REQUIRED = 2;
  const BAG_REQUIRED = 1;

  const bagCount = Object.values(bagSelection).reduce((a, b) => a + b, 0);
  const tbCount = Object.values(toothbrushSelection).reduce((a, b) => a + b, 0);
  const flossCount = Object.values(flossSelection).reduce((a, b) => a + b, 0);

  const canProceed = () => {
    if (step === 1) return bagCount === BAG_REQUIRED;
    if (step === 2) return tbCount === TOOTHBRUSH_REQUIRED;
    if (step === 3) return flossCount === FLOSS_REQUIRED;
    return true;
  };

  const goNext = () => {
    if (canProceed() && step < 4) {
      setStep(step + 1);
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const goPrev = () => {
    if (step > 1) {
      setStep(step - 1);
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const adjustQty = (map: SelectionMap, id: string, delta: number, max: number): SelectionMap => {
    const cur = map[id] ?? 0;
    const total = Object.values(map).reduce((a, b) => a + b, 0);
    const next = Math.max(0, cur + delta);
    if (delta > 0 && total >= max) return map;
    if (next === 0) {
      const { [id]: _, ...rest } = map;
      return rest;
    }
    return { ...map, [id]: next };
  };

  // Bundle price per kit
  const selectedBagProduct = BAGS.find((b) => bagSelection[b.id]);
  const bagPrice = selectedBagProduct ? selectedBagProduct.price : 0;
  const tbPrice = TOOTHBRUSHES.reduce((sum, t) => sum + (toothbrushSelection[t.id] ?? 0) * t.price, 0);
  const flossPrice = FLOSS.reduce((sum, f) => sum + (flossSelection[f.id] ?? 0) * f.price, 0);
  const pricePerKit = bagPrice + tbPrice + flossPrice;
  const totalPrice = pricePerKit * kitQty;
  const savingsPercent = 12;
  const originalTotal = totalPrice / (1 - savingsPercent / 100);

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-background" ref={topRef}>
      <SafcoHeader />

      <main className="container py-6 max-w-[1280px]">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-xs text-muted-foreground mb-6">
          {["Home", "Dental Supplies", "Patient Kits"].map((crumb, i, arr) => (
            <span key={crumb} className="flex items-center gap-1">
              {i < arr.length - 1 ? (
                <><a href="#" className="hover:text-primary hover:underline">{crumb}</a><ChevronRight className="h-3 w-3" /></>
              ) : (
                <span className="text-foreground font-medium">{crumb}</span>
              )}
            </span>
          ))}
        </nav>

        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-black text-foreground tracking-tight">Build Your Patient Kit</h1>
              <p className="text-muted-foreground mt-1 text-sm">Customize your bundle: 1 bag + 4 toothbrushes + 2 floss items per kit</p>
            </div>
            <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground bg-card border border-border rounded-lg px-3 py-2">
              <Users className="h-3.5 w-3.5 text-primary" />
              <span>Trusted by <strong className="text-foreground">4,200+</strong> dental offices</span>
            </div>
          </div>
        </div>

        {/* Stepper */}
        <div className="mb-8">
          <div className="flex items-center gap-0">
            {STEPS.map((s, i) => {
              const isCompleted = step > s.id;
              const isActive = step === s.id;
              return (
                <div key={s.id} className="flex items-center flex-1 last:flex-none">
                  <button
                    onClick={() => { if (isCompleted) setStep(s.id); }}
                    className={`flex items-center gap-2.5 group ${isCompleted ? "cursor-pointer" : "cursor-default"}`}
                  >
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold border-2 shrink-0 transition-all ${
                      isCompleted ? "bg-primary border-primary text-primary-foreground" :
                      isActive ? "bg-background border-primary text-primary shadow-sm shadow-primary/30" :
                      "bg-background border-border text-muted-foreground"
                    }`}>
                      {isCompleted ? <Check className="h-3.5 w-3.5" /> : s.id}
                    </div>
                    <div className="hidden sm:block text-left">
                      <p className={`text-xs font-semibold leading-none ${isActive ? "text-foreground" : isCompleted ? "text-primary" : "text-muted-foreground"}`}>{s.label}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{s.sublabel}</p>
                    </div>
                  </button>
                  {i < STEPS.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-3 rounded-full transition-colors ${step > s.id ? "bg-primary" : "bg-border"}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Layout */}
        <div className="grid lg:grid-cols-[1fr_340px] gap-8 items-start">
          {/* ── LEFT: Step Content ─────────────────────────────────────────── */}
          <div>
            {/* STEP 1: Bag */}
            {step === 1 && (
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h2 className="text-xl font-bold text-foreground">Step 1: Choose Your Bag</h2>
                    <p className="text-sm text-muted-foreground mt-0.5">Select the bag type for your patient kits</p>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${bagCount === BAG_REQUIRED ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                    {bagCount} of {BAG_REQUIRED} selected
                  </span>
                </div>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {BAGS.map((bag) => (
                    <ProductTile
                      key={bag.id}
                      product={bag}
                      selected={bagSelection[bag.id] ?? 0}
                      singleSelect
                      maxReached={bagCount >= BAG_REQUIRED && !bagSelection[bag.id]}
                      onAdd={() => setBagSelection({ [bag.id]: 1 })}
                      onRemove={() => setBagSelection({})}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2: Toothbrushes */}
            {step === 2 && (
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h2 className="text-xl font-bold text-foreground">Step 2: Choose Toothbrushes</h2>
                    <p className="text-sm text-muted-foreground mt-0.5">Mix and match — select {TOOTHBRUSH_REQUIRED} total</p>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${tbCount === TOOTHBRUSH_REQUIRED ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                    {tbCount} of {TOOTHBRUSH_REQUIRED} selected
                  </span>
                </div>
                {/* Progress bar */}
                <div className="mb-5">
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-300"
                      style={{ width: `${(tbCount / TOOTHBRUSH_REQUIRED) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {TOOTHBRUSHES.map((tb) => (
                    <ProductTile
                      key={tb.id}
                      product={tb}
                      selected={toothbrushSelection[tb.id] ?? 0}
                      maxReached={tbCount >= TOOTHBRUSH_REQUIRED && !(toothbrushSelection[tb.id] > 0)}
                      onAdd={() => setToothbrushSelection(prev => adjustQty(prev, tb.id, 1, TOOTHBRUSH_REQUIRED))}
                      onRemove={() => setToothbrushSelection(prev => adjustQty(prev, tb.id, -1, TOOTHBRUSH_REQUIRED))}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* STEP 3: Floss */}
            {step === 3 && (
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h2 className="text-xl font-bold text-foreground">Step 3: Choose Floss</h2>
                    <p className="text-sm text-muted-foreground mt-0.5">Select {FLOSS_REQUIRED} floss items per kit</p>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${flossCount === FLOSS_REQUIRED ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                    {flossCount} of {FLOSS_REQUIRED} selected
                  </span>
                </div>
                <div className="mb-5">
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-300"
                      style={{ width: `${(flossCount / FLOSS_REQUIRED) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {FLOSS.map((fl) => (
                    <ProductTile
                      key={fl.id}
                      product={fl}
                      selected={flossSelection[fl.id] ?? 0}
                      maxReached={flossCount >= FLOSS_REQUIRED && !(flossSelection[fl.id] > 0)}
                      onAdd={() => setFlossSelection(prev => adjustQty(prev, fl.id, 1, FLOSS_REQUIRED))}
                      onRemove={() => setFlossSelection(prev => adjustQty(prev, fl.id, -1, FLOSS_REQUIRED))}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* STEP 4: Review */}
            {step === 4 && (
              <div>
                <h2 className="text-xl font-bold text-foreground mb-5">Step 4: Review Your Bundle</h2>

                {/* Review sections */}
                {[
                  { label: "Bag", items: BAGS.filter(b => bagSelection[b.id]), map: bagSelection, editStep: 1 },
                  { label: "Toothbrushes (4 per kit)", items: TOOTHBRUSHES.filter(t => toothbrushSelection[t.id]), map: toothbrushSelection, editStep: 2 },
                  { label: "Floss (2 per kit)", items: FLOSS.filter(f => flossSelection[f.id]), map: flossSelection, editStep: 3 },
                ].map((section) => (
                  <div key={section.label} className="border border-border rounded-xl mb-4 overflow-hidden">
                    <div className="flex items-center justify-between px-5 py-3 bg-card border-b border-border">
                      <p className="text-sm font-semibold text-foreground">{section.label}</p>
                      <button onClick={() => setStep(section.editStep)} className="text-xs text-primary hover:underline font-medium">Edit</button>
                    </div>
                    <div className="divide-y divide-border">
                      {section.items.map((item) => (
                        <div key={item.id} className="flex items-center gap-4 px-5 py-3">
                          <div className="h-12 w-12 bg-muted/40 rounded-lg flex items-center justify-center shrink-0">
                            <img src={item.image} alt={item.name} className="h-9 w-9 object-contain" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
                            <p className="text-xs text-muted-foreground">{item.sku}</p>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-sm font-bold text-foreground">×{section.map[item.id]}</p>
                            <p className="text-xs text-muted-foreground">${(item.price * section.map[item.id]).toFixed(2)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Kit quantity */}
                <div className="border border-border rounded-xl p-5 bg-card flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-foreground">Number of Kits</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Bulk pricing applied at 50+ kits</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button onClick={() => setKitQty(Math.max(1, kitQty - 10))} className="h-8 w-8 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-colors">
                      <Minus className="h-3.5 w-3.5 text-foreground" />
                    </button>
                    <span className="text-lg font-bold text-foreground w-12 text-center">{kitQty}</span>
                    <button onClick={() => setKitQty(kitQty + 10)} className="h-8 w-8 rounded-lg border border-primary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors text-primary">
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {/* Bulk savings note */}
                <div className="mt-4 flex items-start gap-3 bg-primary/5 border border-primary/20 rounded-xl px-4 py-3">
                  <Info className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <p className="text-xs text-foreground leading-relaxed">
                    <strong>Bulk discount active:</strong> Orders of 50+ kits save {savingsPercent}% automatically. Credit values are applied to your VIP account at quarter-end.
                  </p>
                </div>
              </div>
            )}

            {/* Step Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
              <button
                onClick={goPrev}
                className={`flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors ${step === 1 ? "invisible" : ""}`}
              >
                <ChevronLeft className="h-4 w-4" /> Back
              </button>

              {step < 4 ? (
                <Button
                  onClick={goNext}
                  disabled={!canProceed()}
                  className="flex items-center gap-2 h-10 px-6 font-semibold"
                >
                  Continue to {STEPS[step].label}
                  <ChevronRight className="h-4 w-4" />
                </Button>
              ) : (
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSavedTemplate(true)}
                    className="flex items-center gap-2 text-sm font-medium text-primary border border-primary rounded-lg px-4 py-2 hover:bg-primary/5 transition-colors"
                  >
                    <Bookmark className="h-4 w-4" />
                    {savedTemplate ? "Template Saved!" : "Save as Template"}
                  </button>
                  <Button className="flex items-center gap-2 h-10 px-6 font-semibold" variant="cart">
                    <ShoppingCart className="h-4 w-4" />
                    Add Bundle to Cart
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* ── RIGHT: Sticky Bundle Summary ───────────────────────────────── */}
          <div className="hidden lg:block">
            <div className="sticky top-24 bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
              {/* Header */}
              <div className="bg-primary px-5 py-4">
                <p className="text-primary-foreground font-bold text-base">Bundle Summary</p>
                <p className="text-primary-foreground/70 text-xs mt-0.5">Patient Starter Kit</p>
              </div>

              <div className="p-5 space-y-4">
                {/* Bag */}
                <SummarySection
                  label="Bag"
                  count={bagCount}
                  required={BAG_REQUIRED}
                  items={BAGS.filter(b => bagSelection[b.id]).map(b => ({ name: b.name, qty: bagSelection[b.id], image: b.image }))}
                  onEdit={() => setStep(1)}
                  isEmpty={bagCount === 0}
                  emptyText="No bag selected"
                />

                <div className="h-px bg-border" />

                {/* Toothbrushes */}
                <SummarySection
                  label="Toothbrushes"
                  count={tbCount}
                  required={TOOTHBRUSH_REQUIRED}
                  items={TOOTHBRUSHES.filter(t => toothbrushSelection[t.id]).map(t => ({ name: t.name, qty: toothbrushSelection[t.id], image: t.image }))}
                  onEdit={() => setStep(2)}
                  isEmpty={tbCount === 0}
                  emptyText="No toothbrushes selected"
                />

                <div className="h-px bg-border" />

                {/* Floss */}
                <SummarySection
                  label="Floss"
                  count={flossCount}
                  required={FLOSS_REQUIRED}
                  items={FLOSS.filter(f => flossSelection[f.id]).map(f => ({ name: f.name, qty: flossSelection[f.id], image: f.image }))}
                  onEdit={() => setStep(3)}
                  isEmpty={flossCount === 0}
                  emptyText="No floss selected"
                />

                <div className="h-px bg-border" />

                {/* Pricing */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Price per kit</span>
                    <span className="font-semibold text-foreground">${pricePerKit.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Kits ordered</span>
                    <div className="flex items-center gap-1.5">
                      <button onClick={() => setKitQty(Math.max(1, kitQty - 10))} className="h-5 w-5 rounded border border-border flex items-center justify-center hover:bg-muted">
                        <Minus className="h-2.5 w-2.5" />
                      </button>
                      <span className="font-semibold text-foreground w-6 text-center">{kitQty}</span>
                      <button onClick={() => setKitQty(kitQty + 10)} className="h-5 w-5 rounded border border-border flex items-center justify-center hover:bg-muted">
                        <Plus className="h-2.5 w-2.5" />
                      </button>
                    </div>
                  </div>
                  {savingsPercent > 0 && (
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-success font-medium">Bulk savings ({savingsPercent}%)</span>
                      <span className="text-success font-semibold">−${(originalTotal - totalPrice).toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <span className="text-sm font-bold text-foreground">Total</span>
                    <div className="text-right">
                      <p className="text-lg font-black text-foreground">${totalPrice.toFixed(2)}</p>
                      {savingsPercent > 0 && <p className="text-xs text-muted-foreground line-through">${originalTotal.toFixed(2)}</p>}
                    </div>
                  </div>
                </div>

                {/* CTA */}
                {step === 4 ? (
                  <Button
                    variant="cart"
                    className="w-full h-11 font-bold flex items-center gap-2"
                    disabled={!canProceed()}
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Add Bundle to Cart
                  </Button>
                ) : (
                  <Button
                    onClick={goNext}
                    className="w-full h-11 font-bold flex items-center justify-center gap-2"
                    disabled={!canProceed()}
                  >
                    {canProceed() ? (
                      <><Check className="h-4 w-4" /> Continue</>
                    ) : (
                      <>Complete Step {step}</>
                    )}
                  </Button>
                )}

                {/* Trust items */}
                <div className="space-y-2 pt-1">
                  {[
                    { icon: Truck, text: "Free shipping on orders $25+" },
                    { icon: Award, text: "Fully authorized & licensed" },
                    { icon: Users, text: "4,200+ dental offices trust Safco" },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Icon className="h-3.5 w-3.5 text-primary shrink-0" />
                      <span>{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile sticky CTA */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border px-4 py-3 flex items-center gap-3 shadow-lg">
          <div className="flex-1">
            <p className="text-xs text-muted-foreground">Total</p>
            <p className="text-lg font-black text-foreground">${totalPrice.toFixed(2)}</p>
          </div>
          {step < 4 ? (
            <Button onClick={goNext} disabled={!canProceed()} className="flex items-center gap-2 font-semibold px-5">
              Continue <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button variant="cart" className="flex items-center gap-2 font-semibold px-5">
              <ShoppingCart className="h-4 w-4" /> Add to Cart
            </Button>
          )}
        </div>
      </main>

      <SafcoFooter />
    </div>
  );
};

// ─── SUMMARY SECTION ─────────────────────────────────────────────────────────

interface SummarySectionProps {
  label: string;
  count: number;
  required: number;
  items: { name: string; qty: number; image: string }[];
  onEdit: () => void;
  isEmpty: boolean;
  emptyText: string;
}

const SummarySection = ({ label, count, required, items, onEdit, isEmpty, emptyText }: SummarySectionProps) => (
  <div>
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold text-foreground">{label}</span>
        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${count === required ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
          {count}/{required}
        </span>
      </div>
      {!isEmpty && (
        <button onClick={onEdit} className="text-[10px] text-primary hover:underline font-medium">Edit</button>
      )}
    </div>
    {isEmpty ? (
      <p className="text-xs text-muted-foreground italic">{emptyText}</p>
    ) : (
      <div className="space-y-1.5">
        {items.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <div className="h-7 w-7 bg-muted/50 rounded-md flex items-center justify-center shrink-0">
              <img src={item.image} alt="" className="h-5 w-5 object-contain" />
            </div>
            <p className="text-xs text-foreground flex-1 leading-tight line-clamp-1">{item.name}</p>
            <span className="text-[10px] font-bold text-muted-foreground shrink-0">×{item.qty}</span>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default BundleBuilder;
