import { Search, Phone, Truck, ShoppingCart, ChevronDown, Pencil, Menu, X, User } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import safcoLogo from "@/assets/safco-logo-white.png";

const NAV_ITEMS = [
  { label: "All Products", slug: "all-products", hasDropdown: true, isVersionPicker: true },
  { label: "Equipment", slug: "equipment", hasDropdown: true },
  { label: "Laboratory", slug: "laboratory", hasDropdown: true },
  { label: "Endodontics", slug: "endodontics", hasDropdown: true },
  { label: "Preventatives", slug: "preventatives", hasDropdown: true },
];

const SafcoHeaderV3 = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [versionDropdownOpen, setVersionDropdownOpen] = useState(false);
  const versionDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (versionDropdownRef.current && !versionDropdownRef.current.contains(e.target as Node)) {
        setVersionDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 shadow-lg">

      {/* ── Utility Bar ── */}
      <div className="bg-[#3563AE]">
        <div className="container flex items-center justify-center gap-10 py-1.5 text-[12px] text-primary-foreground/80">
          <a href="tel:8006212178" className="flex items-center gap-1.5 hover:text-primary-foreground transition-colors">
            <Phone className="h-3 w-3" />
            (800) 621-2178
          </a>
          <div className="w-px h-3 bg-primary-foreground/20" />
          <div className="flex items-center gap-1.5">
            <Truck className="h-3 w-3" />
            Free Shipping on orders over $250
          </div>
        </div>
      </div>

      {/* ── Main Header ── */}
      <div className="bg-[#20335A]">
        <div className="container flex items-center gap-6 py-3.5">

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-1.5 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          {/* Logo — mix-blend-mode:screen removes the dark background */}
          <Link to="/v3" className="shrink-0">
            <img
              src={safcoLogo}
              alt="Safco Dental Supply"
              className="h-[48px] w-auto"
            />
          </Link>

          {/* ── Search bar ── */}
          <div className="flex-1 flex justify-center px-2">
            <div className="relative w-full max-w-2xl">
              <input
                type="text"
                placeholder="Search by product name or item number"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full h-10 pl-4 pr-11 rounded-lg border border-transparent bg-white text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-white/50 transition-all shadow-sm"
              />
              <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          {/* ── Account + Cart ── */}
          <div className="hidden sm:flex items-center gap-5 shrink-0">
            {/* Account */}
            <button className="flex items-center gap-2.5 text-sm text-primary-foreground hover:text-primary-foreground/80 transition-colors group">
              <div className="w-8 h-8 rounded-full bg-primary-foreground/15 border border-primary-foreground/25 flex items-center justify-center shrink-0 group-hover:bg-primary-foreground/20 transition-colors">
                <span className="text-[11px] font-bold text-primary-foreground leading-none">SD</span>
              </div>
              <div className="text-left hidden md:block">
                <p className="text-[11px] text-primary-foreground/60 leading-none mb-0.5">Account</p>
                <p className="text-sm font-semibold leading-none">Safco Dental</p>
              </div>
              <ChevronDown className="h-3.5 w-3.5 text-primary-foreground/50 hidden md:block" />
            </button>

            {/* Divider */}
            <div className="w-px h-6 bg-primary-foreground/20" />

            {/* Cart */}
            <button className="flex items-center gap-2 text-sm font-semibold text-primary-foreground hover:text-primary-foreground/80 transition-colors group">
              <div className="relative">
                <ShoppingCart className="h-6 w-6" />
                <span className="absolute -top-1.5 -right-1.5 bg-white text-primary text-[10px] font-bold rounded-full h-[18px] w-[18px] flex items-center justify-center leading-none shadow-sm">
                  3
                </span>
              </div>
              <span className="hidden md:inline">Cart</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Navigation Bar ── */}
      <nav className="hidden lg:block bg-[#20396C] border-t border-primary-foreground/10">
        <div className="container flex items-center gap-1 py-0">

          {NAV_ITEMS.map((item) =>
            item.isVersionPicker ? (
              <div key={item.label} className="relative" ref={versionDropdownRef}>
                <button
                  onClick={() => setVersionDropdownOpen((v) => !v)}
                  className="flex items-center gap-1.5 px-4 py-3 text-sm font-semibold text-primary-foreground border-b-2 border-transparent hover:border-primary-foreground/60 hover:bg-primary-foreground/8 transition-all whitespace-nowrap"
                >
                  {item.label}
                  <ChevronDown className={`h-3.5 w-3.5 text-primary-foreground/70 transition-transform duration-200 ${versionDropdownOpen ? "rotate-180" : ""}`} />
                </button>
                {versionDropdownOpen && (
                  <div className="absolute left-0 top-full mt-0 w-48 bg-card border border-border rounded-b-lg shadow-xl overflow-hidden z-50">
                    <Link to="/" onClick={() => setVersionDropdownOpen(false)} className="flex items-center justify-between px-4 py-2.5 text-sm text-foreground hover:bg-muted hover:text-primary transition-colors">
                      Homepage V1
                      <span className="text-[10px] font-bold bg-muted text-muted-foreground rounded px-1.5 py-0.5">V1</span>
                    </Link>
                    <Link to="/v2" onClick={() => setVersionDropdownOpen(false)} className="flex items-center justify-between px-4 py-2.5 text-sm text-foreground hover:bg-muted hover:text-primary transition-colors">
                      Homepage V2
                      <span className="text-[10px] font-bold bg-primary/10 text-primary rounded px-1.5 py-0.5">V2</span>
                    </Link>
                    <Link to="/v3" onClick={() => setVersionDropdownOpen(false)} className="flex items-center justify-between px-4 py-2.5 text-sm text-foreground hover:bg-muted hover:text-primary transition-colors">
                      Homepage V3
                      <span className="text-[10px] font-bold bg-[hsl(153_38%_91%)] text-[hsl(153_38%_30%)] rounded px-1.5 py-0.5">V3</span>
                    </Link>
                    <Link to="/v4" onClick={() => setVersionDropdownOpen(false)} className="flex items-center justify-between px-4 py-2.5 text-sm text-foreground hover:bg-muted hover:text-primary transition-colors">
                      Homepage V4
                      <span className="text-[10px] font-bold bg-orange-100 text-orange-600 rounded px-1.5 py-0.5">V4</span>
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.label}
                to={`/category/${item.slug}`}
                className="flex items-center gap-1 px-4 py-3 text-sm font-medium text-primary-foreground/85 hover:text-primary-foreground border-b-2 border-transparent hover:border-primary-foreground/60 hover:bg-primary-foreground/8 transition-all whitespace-nowrap"
              >
                {item.label}
                {item.hasDropdown && <ChevronDown className="h-3.5 w-3.5 text-primary-foreground/50" />}
              </Link>
            )
          )}

          {/* Spacer */}
          <div className="flex-1" />

          {/* Quick Order */}
          <Link
            to="/category/all-products"
            className="px-4 py-3 text-sm font-medium text-primary-foreground/85 hover:text-primary-foreground border-b-2 border-transparent hover:border-primary-foreground/60 transition-all whitespace-nowrap"
          >
            Quick Order
          </Link>

          {/* Personalized pill */}
          <Link
            to="/category/personalized"
            className="flex items-center gap-1.5 mx-2 my-2 px-3.5 py-1.5 text-sm font-semibold text-primary-foreground border border-primary-foreground/40 rounded-full hover:bg-primary-foreground/10 hover:border-primary-foreground transition-all whitespace-nowrap"
          >
            <Pencil className="h-3.5 w-3.5" />
            Personalized
          </Link>
        </div>
      </nav>

      {/* ── Mobile Menu ── */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-primary-foreground/10 bg-[#20396C]">
          <div className="flex flex-col">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                to={item.isVersionPicker ? "/v3" : `/category/${item.slug}`}
                onClick={() => setMobileMenuOpen(false)}
                className="px-5 py-3.5 text-sm font-medium border-b border-primary-foreground/10 hover:bg-primary-foreground/10 text-primary-foreground flex items-center justify-between"
              >
                {item.label}
                {item.hasDropdown && <ChevronDown className="h-4 w-4 text-primary-foreground/50" />}
              </Link>
            ))}
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="px-5 py-3.5 text-sm font-medium border-b border-primary-foreground/10 hover:bg-primary-foreground/10 text-primary-foreground flex items-center justify-between">
              Homepage V1 <span className="text-[10px] font-bold bg-primary-foreground/20 text-primary-foreground rounded px-1.5 py-0.5">V1</span>
            </Link>
            <Link to="/v2" onClick={() => setMobileMenuOpen(false)} className="px-5 py-3.5 text-sm font-medium border-b border-primary-foreground/10 hover:bg-primary-foreground/10 text-primary-foreground flex items-center justify-between">
              Homepage V2 <span className="text-[10px] font-bold bg-primary-foreground/20 text-primary-foreground rounded px-1.5 py-0.5">V2</span>
            </Link>
            <Link to="/v4" onClick={() => setMobileMenuOpen(false)} className="px-5 py-3.5 text-sm font-medium border-b border-primary-foreground/10 hover:bg-primary-foreground/10 text-primary-foreground flex items-center justify-between">
              Homepage V4 <span className="text-[10px] font-bold bg-primary-foreground/20 text-primary-foreground rounded px-1.5 py-0.5">V4</span>
            </Link>
            <Link to="/category/personalized" onClick={() => setMobileMenuOpen(false)} className="px-5 py-3.5 text-sm font-medium border-b border-primary-foreground/10 hover:bg-primary-foreground/10 text-primary-foreground flex items-center gap-2">
              <Pencil className="h-4 w-4" /> Personalized
            </Link>
            <Link to="/category/all-products" onClick={() => setMobileMenuOpen(false)} className="px-5 py-3.5 text-sm font-medium text-primary-foreground hover:bg-primary-foreground/10">
              Quick Order
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default SafcoHeaderV3;
