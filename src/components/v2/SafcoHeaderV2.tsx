import {
  Search, Phone, Truck, ShoppingCart, ChevronDown, Menu, X,
  LogIn, RotateCcw, Clock, User, HelpCircle, FileText, Heart,
  ChevronRight, Plus, Gem, FlaskConical, Shield, Wrench, Microscope,
  Syringe, Stethoscope, Package, Star, Zap
} from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import safcoLogo from "@/assets/safco-logo.png";
import productGloves from "@/assets/product-gloves.jpg";
import productBurs from "@/assets/product-burs.jpg";
import productComposite from "@/assets/product-composite.jpg";
import productCement from "@/assets/product-cement.jpg";
import productAnesthetic from "@/assets/product-anesthetic.jpg";
import productMasks from "@/assets/product-masks.jpg";
import productProphy from "@/assets/product-prophy.jpg";

/* ───────────── Data ───────────── */

const SEARCH_PRODUCTS = [
  { name: "Nitrile Exam Gloves — Medium", brand: "Microflex", sku: "MF-300-M", price: "$15.99", img: productGloves },
  { name: "Diamond Bur Kit FG", brand: "Dentsply Sirona", sku: "DS-BUR-KIT", price: "$42.50", img: productBurs },
  { name: "Filtek Z350 XT Composite", brand: "3M", sku: "3M-Z350-A2", price: "$89.00", img: productComposite },
  { name: "RelyX Luting Cement", brand: "3M", sku: "3M-RELYX-LUT", price: "$34.75", img: productCement },
  { name: "Septocaine® 4% w/Epi", brand: "Septodont", sku: "SEPT-4-EPI", price: "$61.99", img: productAnesthetic },
  { name: "Level 3 Procedure Masks", brand: "Crosstex", sku: "CTX-L3-MASK", price: "$6.99", img: productMasks },
];

const REORDER_ITEMS = [
  { name: "Nitrile Exam Gloves", brand: "Microflex", price: "$15.99", img: productGloves, lastOrdered: "3 days ago" },
  { name: "Diamond Bur Kit FG", brand: "Dentsply Sirona", price: "$42.50", img: productBurs, lastOrdered: "1 week ago" },
  { name: "Filtek Z350 XT", brand: "3M", price: "$89.00", img: productComposite, lastOrdered: "2 weeks ago" },
  { name: "Prophy Paste", brand: "Young Dental", price: "$8.49", img: productProphy, lastOrdered: "3 weeks ago" },
];

const CART_ITEMS = [
  { name: "Nitrile Exam Gloves — M", qty: 2, price: "$31.98", img: productGloves },
  { name: "Diamond Bur Kit FG", qty: 1, price: "$42.50", img: productBurs },
  { name: "Septocaine® 4%", qty: 2, price: "$123.98", img: productAnesthetic },
];

const NAV_CATEGORIES = [
  {
    label: "All Products",
    slug: "all-products",
    icon: Package,
    isVersionPicker: true,
  },
  {
    label: "Restorative",
    slug: "restorative",
    icon: FlaskConical,
    featured: [
      { name: "Filtek Z350 XT", img: productComposite, price: "$89.00" },
      { name: "RelyX Cement", img: productCement, price: "$34.75" },
    ],
    subcategories: ["Composites", "Cements", "Bonding Agents", "Impressions", "Temporary Materials"],
  },
  {
    label: "Infection Control",
    slug: "infection-control",
    icon: Shield,
    featured: [
      { name: "Nitrile Gloves", img: productGloves, price: "$15.99" },
      { name: "Procedure Masks", img: productMasks, price: "$6.99" },
    ],
    subcategories: ["Gloves", "Masks", "Surface Disinfectants", "Sterilization", "Barriers"],
  },
  {
    label: "Equipment",
    slug: "equipment",
    icon: Wrench,
    featured: [
      { name: "Prophy Paste", img: productProphy, price: "$8.49" },
    ],
    subcategories: ["Handpieces", "Curing Lights", "Scalers", "Compressors", "Chairs"],
  },
  {
    label: "Anesthetics",
    slug: "anesthetics",
    icon: Syringe,
    featured: [
      { name: "Septocaine® 4%", img: productAnesthetic, price: "$61.99" },
    ],
    subcategories: ["Articaine", "Lidocaine", "Mepivacaine", "Needles", "Syringes"],
  },
  {
    label: "Preventive",
    slug: "preventive",
    icon: Stethoscope,
    featured: [
      { name: "Prophy Paste", img: productProphy, price: "$8.49" },
    ],
    subcategories: ["Prophy Paste", "Fluoride", "Sealants", "Whitening", "Toothbrushes"],
  },
  {
    label: "Laboratory",
    slug: "laboratory",
    icon: Microscope,
    subcategories: ["Acrylics", "Alloys", "Investments", "Waxes", "Lab Equipment"],
  },
  {
    label: "Burs & Diamonds",
    slug: "burs-diamonds",
    icon: Gem,
    featured: [
      { name: "Diamond Bur Kit", img: productBurs, price: "$42.50" },
    ],
    subcategories: ["Diamond Burs", "Carbide Burs", "Finishing Burs", "Mandrels", "Discs"],
  },
];

/* ───────────── Component ───────────── */

const SafcoHeaderV2 = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [reorderOpen, setReorderOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [versionDropdownOpen, setVersionDropdownOpen] = useState(false);

  const reorderRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const megaMenuTimeout = useRef<ReturnType<typeof setTimeout>>();
  const versionRef = useRef<HTMLDivElement>(null);

  // Scroll handler for shrink
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Outside click closers
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (reorderRef.current && !reorderRef.current.contains(e.target as Node)) setReorderOpen(false);
      if (cartRef.current && !cartRef.current.contains(e.target as Node)) setCartOpen(false);
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setSearchFocused(false);
      if (versionRef.current && !versionRef.current.contains(e.target as Node)) setVersionDropdownOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleNavEnter = useCallback((label: string) => {
    clearTimeout(megaMenuTimeout.current);
    setHoveredNav(label);
  }, []);

  const handleNavLeave = useCallback(() => {
    megaMenuTimeout.current = setTimeout(() => setHoveredNav(null), 200);
  }, []);

  const filteredSearch = searchValue.length > 0
    ? SEARCH_PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchValue.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchValue.toLowerCase())
      )
    : SEARCH_PRODUCTS;

  const cartTotal = "$198.46";
  const cartCount = CART_ITEMS.reduce((a, b) => a + b.qty, 0);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "shadow-v2-search" : ""}`}>
      {/* ────── Top Utility Bar ────── */}
      <div className={`bg-v2-section-title text-primary-foreground transition-all duration-300 ${scrolled ? "h-0 overflow-hidden opacity-0" : "h-auto opacity-100"}`}>
        <div className="container flex items-center justify-between py-1.5 text-[11px]">
          <div className="flex items-center gap-5">
            <a href="tel:8006212178" className="flex items-center gap-1.5 text-primary-foreground/80 hover:text-primary-foreground transition-colors">
              <Phone className="h-3 w-3" />
              (800) 621-2178
            </a>
            <span className="flex items-center gap-1.5 text-primary-foreground/70">
              <Truck className="h-3 w-3" />
              98% Orders Ship Same Day
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4">
            <Link to="#" className="flex items-center gap-1 text-primary-foreground/70 hover:text-primary-foreground transition-colors">
              <FileText className="h-3 w-3" /> Order History
            </Link>
            <Link to="#" className="flex items-center gap-1 text-primary-foreground/70 hover:text-primary-foreground transition-colors">
              <Heart className="h-3 w-3" /> Saved Lists
            </Link>
            <Link to="#" className="flex items-center gap-1 text-primary-foreground/70 hover:text-primary-foreground transition-colors">
              <HelpCircle className="h-3 w-3" /> Help
            </Link>
          </div>
        </div>
      </div>

      {/* ────── Main Header ────── */}
      <div className={`bg-v2-card border-b border-v2-card-border transition-all duration-300 ${scrolled ? "py-2" : "py-3"}`}>
        <div className="container flex items-center gap-5">
          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-1.5 text-v2-section-title"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          {/* Logo */}
          <Link to="/v2" className="shrink-0">
            <img src={safcoLogo} alt="Safco Dental Supply" className={`transition-all duration-300 ${scrolled ? "h-8" : "h-10"} w-auto`} />
          </Link>

          {/* ── Smart Search Bar ── */}
          <div ref={searchRef} className="flex-1 relative max-w-2xl mx-auto">
            <div className={`flex items-center rounded-2xl bg-v2-search-bg border-2 transition-all duration-200 ${searchFocused ? "border-v2-search-focus-border shadow-v2-search-focus" : "border-v2-search-border shadow-v2-search"}`}>
              <Search className="ml-4 h-4.5 w-4.5 text-v2-search-icon shrink-0" />
              <input
                type="text"
                placeholder="Search products, SKU, or brand…"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                className={`flex-1 px-3 bg-transparent text-v2-search-text text-sm focus:outline-none placeholder:text-v2-search-placeholder transition-all duration-300 ${scrolled ? "h-10" : "h-12"}`}
              />
              <button className={`m-1 px-4 bg-primary text-primary-foreground rounded-xl font-semibold text-xs hover:bg-primary/90 transition-all duration-300 shrink-0 ${scrolled ? "h-8" : "h-10"}`}>
                Search
              </button>
            </div>

            {/* Search Dropdown */}
            {searchFocused && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-v2-dropdown-bg border border-v2-dropdown-border rounded-2xl shadow-v2-dropdown z-50 overflow-hidden">
                <div className="p-2">
                  <p className="text-[10px] font-bold text-v2-dropdown-label uppercase tracking-wider px-3 py-1.5">
                    {searchValue ? "Results" : "Popular Products"}
                  </p>
                  {filteredSearch.slice(0, 5).map((p) => (
                    <button
                      key={p.sku}
                      onMouseDown={() => setSearchValue(p.name)}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-v2-dropdown-item-hover transition-colors text-left group"
                    >
                      <img src={p.img} alt={p.name} className="w-10 h-10 rounded-lg bg-v2-img-bg object-contain p-1 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-v2-dropdown-item truncate">{p.name}</p>
                        <p className="text-[10px] text-v2-dropdown-label">{p.brand} · {p.sku}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm font-bold text-v2-price">{p.price}</p>
                        <button
                          onMouseDown={(e) => e.stopPropagation()}
                          className="text-[10px] font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          + Add
                        </button>
                      </div>
                    </button>
                  ))}
                  {searchValue && (
                    <button className="w-full text-center text-xs font-semibold text-primary py-2 mt-1 rounded-xl hover:bg-v2-dropdown-item-hover transition-colors">
                      View all results for "{searchValue}" →
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* ── Right Actions ── */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Reorder / Buy Again */}
            <div ref={reorderRef} className="relative hidden lg:block">
              <button
                onClick={() => { setReorderOpen(!reorderOpen); setCartOpen(false); }}
                className={`flex items-center gap-1.5 text-xs font-semibold rounded-xl transition-all duration-200 ${reorderOpen ? "bg-primary text-primary-foreground" : "text-v2-section-title hover:bg-v2-dropdown-item-hover"} ${scrolled ? "px-2.5 py-1.5" : "px-3 py-2"}`}
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span className="hidden xl:inline">Buy Again</span>
                <ChevronDown className={`h-3 w-3 transition-transform ${reorderOpen ? "rotate-180" : ""}`} />
              </button>

              {reorderOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-v2-dropdown-bg border border-v2-dropdown-border rounded-2xl shadow-v2-dropdown z-50 overflow-hidden">
                  <div className="p-3 border-b border-v2-card-border">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <RotateCcw className="h-4 w-4 text-primary" />
                        <span className="text-sm font-bold text-v2-section-title">Quick Reorder</span>
                      </div>
                      <Link to="#" className="text-[10px] font-semibold text-primary hover:underline">View all</Link>
                    </div>
                  </div>
                  <div className="p-2 max-h-72 overflow-y-auto">
                    {REORDER_ITEMS.map((item) => (
                      <div key={item.name} className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-v2-dropdown-item-hover transition-colors group">
                        <img src={item.img} alt={item.name} className="w-10 h-10 rounded-lg bg-v2-img-bg object-contain p-1 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-v2-dropdown-item truncate">{item.name}</p>
                          <div className="flex items-center gap-1">
                            <Clock className="h-2.5 w-2.5 text-v2-timestamp-icon" />
                            <span className="text-[10px] text-v2-timestamp">{item.lastOrdered}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-xs font-bold text-v2-price">{item.price}</span>
                          <button className="w-7 h-7 rounded-lg bg-primary text-primary-foreground flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity hover:bg-primary/90">
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 border-t border-v2-card-border">
                    <button className="w-full py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition-colors">
                      Reorder All (4 items)
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Account / Sign In */}
            <button className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-v2-cta-secondary border border-v2-cta-secondary-border rounded-xl px-3 py-2 hover:bg-v2-cta-secondary-hover transition-colors">
              <LogIn className="h-3.5 w-3.5" />
              <span className="hidden xl:inline">Sign In</span>
            </button>

            {/* Cart */}
            <div ref={cartRef} className="relative">
              <button
                onClick={() => { setCartOpen(!cartOpen); setReorderOpen(false); }}
                className={`relative flex items-center gap-1.5 text-xs font-semibold rounded-xl transition-all duration-200 ${cartOpen ? "bg-primary text-primary-foreground" : "text-v2-section-title hover:bg-v2-dropdown-item-hover"} ${scrolled ? "px-2.5 py-1.5" : "px-3 py-2"}`}
              >
                <div className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="absolute -top-1.5 -right-2 bg-alert text-alert-foreground text-[9px] font-bold rounded-full h-4 min-w-[16px] flex items-center justify-center leading-none px-1">
                    {cartCount}
                  </span>
                </div>
                <span className="hidden xl:inline ml-1">Cart</span>
              </button>

              {cartOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-v2-dropdown-bg border border-v2-dropdown-border rounded-2xl shadow-v2-dropdown z-50 overflow-hidden">
                  <div className="p-3 border-b border-v2-card-border">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-v2-section-title">Cart ({cartCount})</span>
                      <span className="text-sm font-bold text-v2-price">{cartTotal}</span>
                    </div>
                  </div>
                  <div className="p-2 max-h-60 overflow-y-auto">
                    {CART_ITEMS.map((item) => (
                      <div key={item.name} className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-v2-dropdown-item-hover transition-colors">
                        <img src={item.img} alt={item.name} className="w-10 h-10 rounded-lg bg-v2-img-bg object-contain p-1 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-v2-dropdown-item truncate">{item.name}</p>
                          <p className="text-[10px] text-v2-dropdown-label">Qty: {item.qty}</p>
                        </div>
                        <span className="text-xs font-bold text-v2-price shrink-0">{item.price}</span>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 border-t border-v2-card-border space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-v2-section-sub">Free shipping on orders $99+</span>
                      <span className="font-bold text-success">✓ Eligible</span>
                    </div>
                    <button className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/90 transition-colors">
                      Checkout — {cartTotal}
                    </button>
                    <button className="w-full py-2 rounded-xl border border-v2-card-border text-xs font-medium text-v2-section-title hover:bg-v2-dropdown-item-hover transition-colors">
                      View Cart
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ────── Navigation Bar ────── */}
      <nav className={`hidden lg:block bg-v2-card border-b border-v2-card-border transition-all duration-300 ${scrolled ? "py-0" : "py-0"}`}>
        <div className="container flex items-center">
          {NAV_CATEGORIES.map((cat) => (
            cat.isVersionPicker ? (
              <div
                key={cat.label}
                ref={versionRef}
                className="relative"
              >
                <button
                  onClick={() => setVersionDropdownOpen((v) => !v)}
                  className="flex items-center gap-1.5 px-3 py-2.5 text-xs font-semibold text-v2-section-title hover:text-primary hover:bg-v2-dropdown-item-hover rounded-lg transition-colors"
                >
                  <cat.icon className="h-3.5 w-3.5 text-v2-section-sub" />
                  {cat.label}
                  <ChevronDown className={`h-3 w-3 text-v2-section-sub transition-transform ${versionDropdownOpen ? "rotate-180" : ""}`} />
                </button>
                {versionDropdownOpen && (
                  <div className="absolute left-0 top-full mt-1 w-44 bg-v2-dropdown-bg border border-v2-dropdown-border rounded-xl shadow-v2-dropdown overflow-hidden z-50">
                    <Link
                      to="/"
                      onClick={() => setVersionDropdownOpen(false)}
                      className="flex items-center justify-between px-4 py-2.5 text-xs text-v2-dropdown-item hover:bg-v2-dropdown-item-hover transition-colors"
                    >
                      Homepage V1
                      <span className="text-[9px] font-bold bg-v2-img-bg text-v2-section-sub rounded px-1.5 py-0.5">V1</span>
                    </Link>
                    <Link
                      to="/v2"
                      onClick={() => setVersionDropdownOpen(false)}
                      className="flex items-center justify-between px-4 py-2.5 text-xs text-v2-dropdown-item hover:bg-v2-dropdown-item-hover transition-colors"
                    >
                      Homepage V2
                      <span className="text-[9px] font-bold bg-primary/10 text-primary rounded px-1.5 py-0.5">V2</span>
                    </Link>
                    <Link
                      to="/v3"
                      onClick={() => setVersionDropdownOpen(false)}
                      className="flex items-center justify-between px-4 py-2.5 text-xs text-v2-dropdown-item hover:bg-v2-dropdown-item-hover transition-colors"
                    >
                      Homepage V3
                      <span className="text-[9px] font-bold bg-success/20 text-success rounded px-1.5 py-0.5">V3</span>
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <div
                key={cat.label}
                className="relative"
                onMouseEnter={() => handleNavEnter(cat.label)}
                onMouseLeave={handleNavLeave}
              >
                <Link
                  to={`/category/${cat.slug}`}
                  className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium transition-colors rounded-lg ${hoveredNav === cat.label ? "text-primary bg-v2-dropdown-item-hover" : "text-v2-section-title hover:text-primary hover:bg-v2-dropdown-item-hover"}`}
                >
                  <cat.icon className="h-3.5 w-3.5 text-v2-section-sub" />
                  {cat.label}
                  {cat.subcategories && <ChevronDown className="h-3 w-3 text-v2-section-sub" />}
                </Link>

                {/* Mega Menu */}
                {hoveredNav === cat.label && cat.subcategories && (
                  <div
                    className="absolute left-0 top-full mt-0 bg-v2-dropdown-bg border border-v2-dropdown-border rounded-2xl shadow-v2-dropdown z-50 overflow-hidden"
                    style={{ minWidth: cat.featured ? "420px" : "220px" }}
                    onMouseEnter={() => handleNavEnter(cat.label)}
                    onMouseLeave={handleNavLeave}
                  >
                    <div className={`p-4 ${cat.featured ? "grid grid-cols-2 gap-4" : ""}`}>
                      {/* Subcategories */}
                      <div>
                        <p className="text-[10px] font-bold text-v2-dropdown-label uppercase tracking-wider mb-2">{cat.label}</p>
                        <div className="space-y-0.5">
                          {cat.subcategories.map((sub) => (
                            <Link
                              key={sub}
                              to={`/category/${cat.slug}`}
                              className="flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs text-v2-dropdown-item hover:bg-v2-dropdown-item-hover hover:text-primary transition-colors"
                            >
                              {sub}
                              <ChevronRight className="h-3 w-3 text-v2-dropdown-label opacity-0 group-hover:opacity-100" />
                            </Link>
                          ))}
                        </div>
                        <Link
                          to={`/category/${cat.slug}`}
                          className="flex items-center gap-1 mt-2 px-2.5 text-[10px] font-bold text-primary hover:underline"
                        >
                          Shop all {cat.label} <ChevronRight className="h-3 w-3" />
                        </Link>
                      </div>

                      {/* Featured Products */}
                      {cat.featured && (
                        <div>
                          <p className="text-[10px] font-bold text-v2-dropdown-label uppercase tracking-wider mb-2">Popular</p>
                          <div className="space-y-2">
                            {cat.featured.map((p) => (
                              <a key={p.name} href="#" className="flex items-center gap-3 p-2 rounded-xl hover:bg-v2-dropdown-item-hover transition-colors">
                                <img src={p.img} alt={p.name} className="w-10 h-10 rounded-lg bg-v2-img-bg object-contain p-1 shrink-0" />
                                <div>
                                  <p className="text-xs font-medium text-v2-dropdown-item">{p.name}</p>
                                  <p className="text-xs font-bold text-v2-price">{p.price}</p>
                                </div>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )
          ))}

          {/* Right-side nav links */}
          <div className="flex items-center gap-1 ml-auto">
            <Link to="#" className="flex items-center gap-1 px-3 py-2.5 text-xs font-medium text-v2-section-title hover:text-primary hover:bg-v2-dropdown-item-hover rounded-lg transition-colors">
              <Zap className="h-3.5 w-3.5 text-alert" /> Deals
            </Link>
            <Link to="#" className="flex items-center gap-1 px-3 py-2.5 text-xs font-medium text-primary border border-primary/20 rounded-full hover:bg-primary/5 transition-colors">
              <Star className="h-3.5 w-3.5" /> New Arrivals
            </Link>
          </div>
        </div>
      </nav>

      {/* ────── Mobile Menu ────── */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-v2-card-border bg-v2-card max-h-[70vh] overflow-y-auto">
          <div className="p-3">
            {/* Mobile Search */}
            <div className="flex items-center rounded-xl bg-v2-search-bg border border-v2-search-border mb-3">
              <Search className="ml-3 h-4 w-4 text-v2-search-icon shrink-0" />
              <input
                type="text"
                placeholder="Search products…"
                className="flex-1 h-10 px-3 bg-transparent text-sm text-v2-search-text focus:outline-none placeholder:text-v2-search-placeholder"
              />
            </div>

            {/* Mobile Quick Reorder */}
            <div className="p-3 mb-3 rounded-xl bg-v2-section-alt border border-v2-card-border">
              <p className="text-xs font-bold text-v2-section-title mb-2 flex items-center gap-1.5">
                <RotateCcw className="h-3.5 w-3.5 text-primary" /> Quick Reorder
              </p>
              <div className="grid grid-cols-2 gap-2">
                {REORDER_ITEMS.slice(0, 2).map((item) => (
                  <div key={item.name} className="flex items-center gap-2 p-2 bg-v2-card rounded-lg">
                    <img src={item.img} alt={item.name} className="w-8 h-8 rounded bg-v2-img-bg object-contain p-0.5" />
                    <div className="min-w-0">
                      <p className="text-[10px] font-medium text-v2-dropdown-item truncate">{item.name}</p>
                      <p className="text-[10px] font-bold text-v2-price">{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Nav Links */}
            {NAV_CATEGORIES.filter(c => !c.isVersionPicker).map((cat) => (
              <Link
                key={cat.label}
                to={`/category/${cat.slug}`}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-3 text-sm font-medium text-v2-section-title border-b border-v2-card-border hover:bg-v2-dropdown-item-hover transition-colors"
              >
                <cat.icon className="h-4 w-4 text-v2-section-sub" />
                {cat.label}
                <ChevronRight className="h-3.5 w-3.5 text-v2-section-sub ml-auto" />
              </Link>
            ))}

            {/* Version Switcher Mobile */}
            <div className="mt-3 pt-3 border-t border-v2-card-border space-y-1">
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between px-3 py-2.5 text-sm text-v2-section-title hover:bg-v2-dropdown-item-hover rounded-xl transition-colors">
                Homepage V1
                <span className="text-[9px] font-bold bg-v2-img-bg text-v2-section-sub rounded px-1.5 py-0.5">V1</span>
              </Link>
              <Link to="/v2" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between px-3 py-2.5 text-sm text-v2-section-title hover:bg-v2-dropdown-item-hover rounded-xl transition-colors">
                Homepage V2
                <span className="text-[9px] font-bold bg-primary/10 text-primary rounded px-1.5 py-0.5">V2</span>
              </Link>
              <Link to="/v3" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between px-3 py-2.5 text-sm text-v2-section-title hover:bg-v2-dropdown-item-hover rounded-xl transition-colors">
                Homepage V3
                <span className="text-[9px] font-bold bg-success/20 text-success rounded px-1.5 py-0.5">V3</span>
              </Link>
            </div>

            {/* Mobile utility links */}
            <div className="mt-3 pt-3 border-t border-v2-card-border flex flex-wrap gap-2">
              <a href="#" className="flex items-center gap-1 text-xs text-v2-section-sub"><FileText className="h-3 w-3" /> Order History</a>
              <a href="#" className="flex items-center gap-1 text-xs text-v2-section-sub"><Heart className="h-3 w-3" /> Saved Lists</a>
              <a href="#" className="flex items-center gap-1 text-xs text-v2-section-sub"><HelpCircle className="h-3 w-3" /> Help</a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default SafcoHeaderV2;
