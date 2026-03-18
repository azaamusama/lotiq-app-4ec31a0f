import { useState } from "react";
import {
  ChevronRight, ChevronDown, ChevronUp, Search, SlidersHorizontal,
  ShoppingCart, RotateCcw, X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import SafcoHeader from "@/components/SafcoHeader";
import SafcoFooter from "@/components/SafcoFooter";

import productProphy from "@/assets/product-prophy.jpg";
import productGloves from "@/assets/product-gloves.jpg";
import productComposite from "@/assets/product-composite.jpg";
import productCement from "@/assets/product-cement.jpg";
import productBurs from "@/assets/product-burs.jpg";
import productMasks from "@/assets/product-masks.jpg";
import productAnesthetic from "@/assets/product-anesthetic.jpg";

/* ─── Data ──────────────────────────────────────────────────────────────── */

const SUB_CATEGORIES = [
  { label: "All Products", image: productProphy, active: true },
  { label: "Prophylaxis Supplies", image: productProphy },
  { label: "Fluoride & Desensitizers", image: productGloves },
  { label: "Sealants", image: productComposite },
  { label: "Toothbrushes", image: productCement },
  { label: "Toothpaste", image: productBurs },
  { label: "Dental Floss", image: productMasks },
  { label: "Mouthwashes", image: productAnesthetic },
];

const COLORS = [
  { label: "Red",    hex: "#ef4444" },
  { label: "Yellow", hex: "#eab308" },
  { label: "Blue",   hex: "#3b82f6" },
  { label: "Pink",   hex: "#ec4899" },
  { label: "Green",  hex: "#22c55e" },
  { label: "Cyan",   hex: "#06b6d4" },
  { label: "Black",  hex: "#171717" },
  { label: "Teal",   hex: "#14b8a6" },
  { label: "White",  hex: "#f5f5f5", border: true },
  { label: "Indigo", hex: "#6366f1" },
];

const SIZES = ["xSmall", "Small", "Medium", "Large", "xLarge", "xxLarge"];

const FLAVOURS = ["Apple", "Strawberry", "Cherry", "Orange", "BlueBerry", "Lemon"];

const CATEGORIES_LIST = [
  { label: "Prophylaxis Supplies", count: 384 },
  { label: "Fluoride & Desensitizers", count: 34 },
  { label: "Sealants", count: 2 },
  { label: "Toothbrushes", count: 44 },
  { label: "Toothpaste", count: 12 },
  { label: "Dental Floss & Interdental Cleaners", count: 55 },
  { label: "Mouthwashes & Oral Rinses", count: 15 },
  { label: "Hygiene Bundles & Kits", count: 7 },
  { label: "Miscellaneous Preventives", count: 23 },
];

const MANUFACTURERS = [
  { label: "Cranberry", count: 84 },
  { label: "Ansell", count: 76 },
  { label: "Dash", count: 49 },
  { label: "Supermax", count: 36 },
  { label: "Safco", count: 34 },
  { label: "Innovative Healthcare", count: 32 },
  { label: "EcoBee", count: 27 },
  { label: "Halyard", count: 15 },
  { label: "SW Safety", count: 9 },
  { label: "Quantum", count: 6 },
];

const SORT_OPTIONS = ["Relevance", "Price: Low to High", "Price: High to Low", "Best Sellers", "Newest"];

const PRODUCTS = [
  { id: 1, brand: "Safco", name: "Toothbrushes", price: "$6.99", badges: ["Promo", "Price Drop"], image: productProphy, lastPurchased: "Nov 7, 2025" },
  { id: 2, brand: "Safco", name: "Sealants", price: "$6.99", badges: ["Promo", "Price Drop"], image: productComposite, lastPurchased: "Nov 7, 2025" },
  { id: 3, brand: "Safco", name: "Prophylaxis Supplies", price: "$6.99", badges: ["Promo", "Price Drop"], image: productCement, lastPurchased: "Nov 7, 2025" },
  { id: 4, brand: "Safco", name: "Prophylaxis Supplies", price: "$6.99", badges: ["Promo", "Price Drop"], image: productBurs, lastPurchased: "Nov 7, 2025" },
  { id: 5, brand: "Safco", name: "Sealants", price: "$6.99", badges: ["Promo", "Price Drop"], image: productAnesthetic, lastPurchased: "Nov 7, 2025" },
  { id: 6, brand: "Safco", name: "Toothbrushes", price: "$6.99", badges: ["Promo", "Price Drop"], image: productMasks, lastPurchased: "Nov 7, 2025" },
  { id: 7, brand: "Safco", name: "Sealants", price: "$6.99", badges: ["Promo", "Price Drop"], image: productGloves, lastPurchased: "Nov 7, 2025" },
  { id: 8, brand: "Safco", name: "Toothbrushes", price: "$6.99", badges: ["Promo", "Price Drop"], image: productProphy, lastPurchased: "Nov 7, 2025" },
  { id: 9, brand: "Safco", name: "Prophylaxis Supplies", price: "$6.99", badges: ["Promo", "Price Drop"], image: productComposite, lastPurchased: "Nov 7, 2025" },
  { id: 10, brand: "Safco", name: "Toothbrushes", price: "$6.99", badges: ["Promo", "Price Drop"], image: productCement, lastPurchased: "Nov 7, 2025" },
  { id: 11, brand: "Safco", name: "Sealants", price: "$6.99", badges: ["Promo", "Price Drop"], image: productBurs, lastPurchased: "Nov 7, 2025" },
  { id: 12, brand: "Safco", name: "Prophylaxis Supplies", price: "$6.99", badges: ["Promo", "Price Drop"], image: productAnesthetic, lastPurchased: "Nov 7, 2025" },
];

/* ─── Sub-components ─────────────────────────────────────────────────────── */

const FilterSection = ({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-border pb-4 mb-4 last:border-0 last:mb-0 last:pb-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full mb-3"
      >
        <span className="text-sm font-bold text-foreground">{title}</span>
        {open ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
      </button>
      {open && <div>{children}</div>}
    </div>
  );
};

const PLPProductCard = ({
  brand, name, price, badges, image, lastPurchased,
}: (typeof PRODUCTS)[number]) => (
  <div className="bg-card border border-border rounded-lg overflow-hidden flex flex-col group hover:shadow-md transition-shadow">
    {/* Image */}
    <div className="relative bg-white">
      <div className="aspect-[4/3] overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300" loading="lazy" />
      </div>
      {lastPurchased && (
        <div className="absolute top-2 left-2 bg-card/90 border border-border text-[10px] text-muted-foreground px-2 py-1 rounded font-medium backdrop-blur-sm">
          Last Purchased {lastPurchased}
        </div>
      )}
    </div>

    {/* Content */}
    <div className="p-3 flex flex-col flex-1">
      <p className="text-xs font-semibold text-primary mb-0.5">{brand}</p>
      <p className="text-sm font-medium text-foreground leading-snug mb-2 line-clamp-2">{name}</p>

      <div className="flex items-baseline gap-1 mb-2">
        <span className="text-xs text-muted-foreground">As low as</span>
        <span className="text-lg font-bold text-foreground">{price}</span>
      </div>

      {badges && badges.length > 0 && (
        <div className="flex gap-1.5 mb-3">
          {badges.map((b) => (
            <span
              key={b}
              className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                b === "Promo"
                  ? "bg-success/15 text-success"
                  : b === "Price Drop"
                  ? "bg-alert/15 text-alert"
                  : "bg-primary/10 text-primary"
              }`}
            >
              {b}
            </span>
          ))}
        </div>
      )}

      <Link to="/product/1028073" className="mt-auto">
        <Button variant="cart" className="w-full flex items-center justify-center gap-2 text-sm rounded-lg py-2.5">
          <ShoppingCart className="h-4 w-4" />
          Shop Now
        </Button>
      </Link>
    </div>
  </div>
);

/* ─── Page ───────────────────────────────────────────────────────────────── */

const ProductListing = () => {
  const [inStock, setInStock] = useState(false);
  const [newItems, setNewItems] = useState(false);
  const [deals, setDeals] = useState(true);
  const [priceMin] = useState(6);
  const [priceMax] = useState(60);
  const [sliderVal, setSliderVal] = useState(60);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedFlavours, setSelectedFlavours] = useState<string[]>([]);
  const [selectedManufacturers, setSelectedManufacturers] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("Relevance");
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [descExpanded, setDescExpanded] = useState(false);
  const [mfrSearch, setMfrSearch] = useState("");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const toggleArr = (arr: string[], setArr: (v: string[]) => void, val: string) =>
    setArr(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);

  const filteredMfr = MANUFACTURERS.filter((m) =>
    m.label.toLowerCase().includes(mfrSearch.toLowerCase())
  );

  const description =
    "Explore our Preventatives category, offering a wide range of oral care products including manual and electric toothbrushes, floss, fluoride treatments, prophy angles and paste, mouthwashes, seal...";

  return (
    <div className="min-h-screen bg-background">
      <SafcoHeader />

      <main className="container py-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-xs text-muted-foreground mb-4 border border-dashed border-border/60 px-3 py-2 rounded">
          {["Home", "Dental Supplies", "Preventives"].map((crumb, i, arr) => (
            <span key={crumb} className="flex items-center gap-1">
              {i < arr.length - 1 ? (
                <>
                  <a href="#" className="hover:text-primary hover:underline">{crumb}</a>
                  <ChevronRight className="h-3 w-3" />
                </>
              ) : (
                <span className="text-primary font-semibold">{crumb}</span>
              )}
            </span>
          ))}
        </nav>

        {/* Category Header */}
        <div className="border border-dashed border-border/60 rounded-lg px-5 py-4 mb-5 bg-card">
          <h1 className="text-2xl font-black text-foreground mb-1">Preventives</h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {descExpanded ? description.replace("...", ".") : description}
            {!descExpanded && (
              <button
                onClick={() => setDescExpanded(true)}
                className="text-primary font-semibold ml-1 hover:underline"
              >
                Show More
              </button>
            )}
          </p>
        </div>

        {/* Sub-category Icons */}
        <div className="border border-dashed border-border/60 rounded-lg bg-card px-4 py-4 mb-6 overflow-x-auto">
          <div className="flex gap-4 min-w-max">
            {SUB_CATEGORIES.map((cat) => (
              <button
                key={cat.label}
                className="flex flex-col items-center gap-2 group"
              >
                <div
                  className={`h-16 w-16 rounded-full border-2 overflow-hidden flex items-center justify-center bg-background transition-colors ${
                    cat.active ? "border-primary" : "border-border group-hover:border-primary/60"
                  }`}
                >
                  <img src={cat.image} alt={cat.label} className="w-4/5 h-4/5 object-contain" />
                </div>
                <span
                  className={`text-[11px] text-center leading-tight max-w-[80px] font-medium ${
                    cat.active ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                  }`}
                >
                  {cat.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-6">
          {/* ── Sidebar ─────────────────────────────────────────── */}
          <aside className="hidden lg:block w-52 shrink-0">
            <div className="bg-card border border-border rounded-lg p-4">
              <FilterSection title="Filter by">
                {[
                  { label: "Items in Stock", val: inStock, set: setInStock },
                  { label: "New Items", val: newItems, set: setNewItems },
                  { label: "Deals", val: deals, set: setDeals },
                ].map(({ label, val, set }) => (
                  <label key={label} className="flex items-center gap-2 mb-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={val}
                      onChange={() => set(!val)}
                      className="h-4 w-4 rounded border-border accent-primary cursor-pointer"
                    />
                    <span className="text-xs text-foreground group-hover:text-primary transition-colors">{label}</span>
                  </label>
                ))}
              </FilterSection>

              {/* Price */}
              <FilterSection title="Price">
                <div className="flex justify-between text-xs text-muted-foreground mb-2">
                  <span>${priceMin.toFixed(2)}</span>
                  <span>${sliderVal.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min={priceMin}
                  max={120}
                  value={sliderVal}
                  onChange={(e) => setSliderVal(Number(e.target.value))}
                  className="w-full accent-primary"
                />
              </FilterSection>

              {/* Color */}
              <FilterSection title="Color">
                <div className="flex flex-wrap gap-2 mb-2">
                  {COLORS.map((c) => (
                    <button
                      key={c.label}
                      title={c.label}
                      onClick={() => toggleArr(selectedColors, setSelectedColors, c.label)}
                      className={`h-6 w-6 rounded-full border-2 transition-all ${
                        selectedColors.includes(c.label)
                          ? "border-primary scale-110 shadow"
                          : c.border
                          ? "border-border"
                          : "border-transparent hover:scale-105"
                      }`}
                      style={{ backgroundColor: c.hex }}
                    />
                  ))}
                </div>
                <button className="text-xs text-primary hover:underline font-medium">See more</button>
              </FilterSection>

              {/* Size */}
              <FilterSection title="Size">
                <div className="flex flex-wrap gap-1.5">
                  {SIZES.map((s) => (
                    <button
                      key={s}
                      onClick={() => toggleArr(selectedSizes, setSelectedSizes, s)}
                      className={`px-2.5 py-1 text-xs rounded border font-medium transition-colors ${
                        selectedSizes.includes(s)
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-card text-foreground border-border hover:border-primary"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </FilterSection>

              {/* Flavour */}
              <FilterSection title="Flavour">
                {FLAVOURS.map((f) => (
                  <label key={f} className="flex items-center gap-2 mb-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedFlavours.includes(f)}
                      onChange={() => toggleArr(selectedFlavours, setSelectedFlavours, f)}
                      className="h-4 w-4 rounded border-border accent-primary cursor-pointer"
                    />
                    <span className="text-xs text-foreground group-hover:text-primary transition-colors">{f}</span>
                  </label>
                ))}
              </FilterSection>

              {/* Categories */}
              <FilterSection title="Categories">
                <ul className="space-y-1.5">
                  {CATEGORIES_LIST.map((c) => (
                    <li key={c.label}>
                      <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                        {c.label} <span className="text-muted-foreground/60">({c.count})</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </FilterSection>

              {/* Manufacturer */}
              <FilterSection title="Manufacturer" defaultOpen={true}>
                <div className="relative mb-3">
                  <input
                    type="text"
                    placeholder="Search"
                    value={mfrSearch}
                    onChange={(e) => setMfrSearch(e.target.value)}
                    className="w-full h-8 pl-3 pr-8 text-xs rounded border border-input bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <Search className="absolute right-2 top-2 h-4 w-4 text-muted-foreground" />
                </div>
                <ul className="space-y-1.5">
                  {filteredMfr.map((m) => (
                    <li key={m.label}>
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={selectedManufacturers.includes(m.label)}
                          onChange={() => toggleArr(selectedManufacturers, setSelectedManufacturers, m.label)}
                          className="h-3.5 w-3.5 rounded border-border accent-primary cursor-pointer"
                        />
                        <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors">
                          {m.label} <span className="text-muted-foreground/60">({m.count})</span>
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
              </FilterSection>
            </div>
          </aside>

          {/* ── Product Grid ─────────────────────────────────────── */}
          <div className="flex-1 min-w-0">
            {/* Controls Bar */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-muted-foreground">
                Items <span className="font-semibold text-foreground">1-12</span> of <span className="font-semibold text-foreground">92</span>
              </span>

              <div className="flex items-center gap-3">
                {/* Mobile filter toggle */}
                <Button
                  variant="outline"
                  size="sm"
                  className="lg:hidden gap-2 text-xs"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                </Button>

                {/* Sort */}
                <div className="relative">
                  <button
                    onClick={() => setShowSortDropdown(!showSortDropdown)}
                    className="flex items-center gap-2 text-sm border border-border rounded-lg px-3 py-1.5 bg-card hover:bg-muted transition-colors"
                  >
                    <span className="text-muted-foreground">Sort By:</span>
                    <span className="font-medium text-foreground">{sortBy}</span>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </button>
                  {showSortDropdown && (
                    <div className="absolute right-0 top-full mt-1 bg-card border border-border rounded-lg shadow-lg z-20 w-48 py-1">
                      {SORT_OPTIONS.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => { setSortBy(opt); setShowSortDropdown(false); }}
                          className={`w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors ${
                            sortBy === opt ? "text-primary font-semibold" : "text-foreground"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {PRODUCTS.map((p) => (
                <PLPProductCard key={p.id} {...p} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 mt-8">
              {[1, 2, 3, 4, 5].map((pg) => (
                <button
                  key={pg}
                  className={`h-8 w-8 rounded text-sm font-medium transition-colors ${
                    pg === 1
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border border-border text-foreground hover:border-primary hover:text-primary"
                  }`}
                >
                  {pg}
                </button>
              ))}
              <span className="text-muted-foreground text-sm">...</span>
              <button className="h-8 w-8 rounded text-sm font-medium bg-card border border-border text-foreground hover:border-primary hover:text-primary">8</button>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Filters Drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={() => setMobileFiltersOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-card overflow-y-auto p-4 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <span className="font-bold text-foreground">Filters</span>
              <button onClick={() => setMobileFiltersOpen(false)}>
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>
            <p className="text-xs text-muted-foreground">Use desktop view for full filter panel.</p>
          </div>
        </div>
      )}

      <SafcoFooter />
    </div>
  );
};

export default ProductListing;
