import { Search, Phone, Truck, ShoppingCart, ChevronDown, Pencil, Menu, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import safcoLogo from "@/assets/safco-logo.png";

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
      if (
        versionDropdownRef.current &&
        !versionDropdownRef.current.contains(e.target as Node)
      ) {
        setVersionDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50">

      {/* ── Top Utility Bar ── */}
      <div className="bg-primary">
        <div className="container flex items-center justify-center gap-12 py-2 text-[13px] text-primary-foreground">
          <a
            href="tel:8006212178"
            className="flex items-center gap-2 hover:text-primary-foreground/80 transition-colors"
          >
            <Phone className="h-3.5 w-3.5" />
            (800) 621-2178
          </a>
          <div className="flex items-center gap-2">
            <Truck className="h-3.5 w-3.5" />
            Free Shipping on orders over $250
          </div>
        </div>
      </div>

      {/* ── Main Header ── */}
      <div className="bg-primary">
        <div className="container flex items-center gap-5 py-3">

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-1.5 text-primary-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          {/* Logo */}
          <Link to="/v3" className="shrink-0">
            <img src={safcoLogo} alt="Safco Dental Supply" className="h-[52px] w-auto brightness-0 invert" />
          </Link>

          {/* ── Search bar (icon inside, right side) ── */}
          <div className="flex-1 flex justify-center px-4">
            <div className="relative w-full max-w-xl">
              <input
                type="text"
                placeholder="Search by product name or item number"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full h-10 pl-4 pr-11 rounded border border-primary-foreground/30 bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary-foreground/40 transition-colors"
              />
              <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          {/* ── Account + Cart ── */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            {/* Account */}
            <button className="flex items-center gap-2 text-sm text-primary-foreground hover:text-primary-foreground/80 transition-colors">
              <span className="w-7 h-7 rounded-full bg-primary-foreground/20 border border-primary-foreground/40 text-primary-foreground text-[11px] font-bold flex items-center justify-center shrink-0 leading-none">
                SD
              </span>
              <span className="font-medium">Safco Dental</span>
              <ChevronDown className="h-3.5 w-3.5 text-primary-foreground/70" />
            </button>

            {/* Cart */}
            <button className="flex items-center gap-1.5 text-sm font-medium text-primary-foreground hover:text-primary-foreground/80 transition-colors">
              <div className="relative">
                <ShoppingCart className="h-6 w-6" />
                <span className="absolute -top-1.5 -right-1.5 bg-primary-foreground text-primary text-[10px] font-bold rounded-full h-[17px] w-[17px] flex items-center justify-center leading-none">
                  3
                </span>
              </div>
              Cart
            </button>
          </div>
        </div>
      </div>

      {/* ── Navigation Bar ── */}
      <nav className="hidden lg:block bg-primary border-b border-primary-foreground/20">
        <div className="container flex items-center gap-0.5 py-1">

          {NAV_ITEMS.map((item) =>
            item.isVersionPicker ? (
              <div key={item.label} className="relative mr-2" ref={versionDropdownRef}>
                <button
                  onClick={() => setVersionDropdownOpen((v) => !v)}
                  className="flex items-center gap-1.5 px-4 py-1.5 text-sm font-semibold text-primary-foreground border border-primary-foreground/40 rounded-md hover:border-primary-foreground hover:bg-primary-foreground/10 transition-colors whitespace-nowrap"
                >
                  {item.label}
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-200 ${versionDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {versionDropdownOpen && (
                  <div className="absolute left-0 top-full mt-1 w-48 bg-card border border-border rounded-md shadow-lg overflow-hidden z-50">
                    <Link
                      to="/"
                      onClick={() => setVersionDropdownOpen(false)}
                      className="flex items-center justify-between px-4 py-2.5 text-sm text-foreground hover:bg-muted hover:text-primary transition-colors"
                    >
                      Homepage V1
                      <span className="text-[10px] font-semibold bg-muted text-muted-foreground rounded px-1.5 py-0.5">V1</span>
                    </Link>
                    <Link
                      to="/v2"
                      onClick={() => setVersionDropdownOpen(false)}
                      className="flex items-center justify-between px-4 py-2.5 text-sm text-foreground hover:bg-muted hover:text-primary transition-colors"
                    >
                      Homepage V2
                      <span className="text-[10px] font-semibold bg-primary/10 text-primary rounded px-1.5 py-0.5">V2</span>
                    </Link>
                    <Link
                      to="/v3"
                      onClick={() => setVersionDropdownOpen(false)}
                      className="flex items-center justify-between px-4 py-2.5 text-sm text-foreground hover:bg-muted hover:text-primary transition-colors"
                    >
                      Homepage V3
                      <span className="text-[10px] font-semibold bg-success/20 text-success rounded px-1.5 py-0.5">V3</span>
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.label}
                to={`/category/${item.slug}`}
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-primary-foreground hover:text-primary-foreground/80 transition-colors whitespace-nowrap"
              >
                {item.label}
                {item.hasDropdown && (
                  <ChevronDown className="h-3.5 w-3.5 text-primary-foreground/70" />
                )}
              </Link>
            )
          )}

          {/* Quick Order */}
          <Link
            to="/category/all-products"
            className="px-3 py-2 text-sm font-medium text-primary-foreground hover:text-primary-foreground/80 transition-colors whitespace-nowrap ml-1"
          >
            Quick Order
          </Link>

          {/* Personalized — outlined pill */}
          <Link
            to="/category/personalized"
            className="flex items-center gap-1.5 ml-2 px-3 py-1.5 text-sm font-medium text-primary-foreground border border-primary-foreground/40 rounded-full hover:border-primary-foreground hover:bg-primary-foreground/10 transition-colors whitespace-nowrap"
          >
            <Pencil className="h-3.5 w-3.5" />
            Personalized
          </Link>
        </div>
      </nav>

      {/* ── Mobile Menu ── */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-primary-foreground/20 bg-primary">
          <div className="flex flex-col">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                to={item.isVersionPicker ? "/v3" : `/category/${item.slug}`}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 text-sm font-medium border-b border-primary-foreground/20 hover:bg-primary-foreground/10 text-primary-foreground flex items-center justify-between"
              >
                {item.label}
                {item.hasDropdown && <ChevronDown className="h-4 w-4 text-primary-foreground/70" />}
              </Link>
            ))}
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="px-4 py-3 text-sm font-medium border-b border-primary-foreground/20 hover:bg-primary-foreground/10 text-primary-foreground flex items-center justify-between">
              Homepage V1 <span className="text-[10px] font-semibold bg-primary-foreground/20 text-primary-foreground rounded px-1.5 py-0.5">V1</span>
            </Link>
            <Link to="/v2" onClick={() => setMobileMenuOpen(false)} className="px-4 py-3 text-sm font-medium border-b border-primary-foreground/20 hover:bg-primary-foreground/10 text-primary-foreground flex items-center justify-between">
              Homepage V2 <span className="text-[10px] font-semibold bg-primary-foreground/20 text-primary-foreground rounded px-1.5 py-0.5">V2</span>
            </Link>
            <Link to="/category/personalized" onClick={() => setMobileMenuOpen(false)} className="px-4 py-3 text-sm font-medium text-primary-foreground border-b border-primary-foreground/20 hover:bg-primary-foreground/10 flex items-center gap-2">
              <Pencil className="h-4 w-4" /> Personalized
            </Link>
            <Link to="/category/all-products" onClick={() => setMobileMenuOpen(false)} className="px-4 py-3 text-sm font-medium text-primary-foreground border-b border-primary-foreground/20 hover:bg-primary-foreground/10">
              Quick Order
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default SafcoHeaderV3;
