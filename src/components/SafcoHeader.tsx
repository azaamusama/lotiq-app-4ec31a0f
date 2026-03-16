import { Search, Phone, Truck, ShoppingCart, ChevronDown, Pencil, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import safcoLogo from "@/assets/safco-logo.png";

const NAV_ITEMS = [
  { label: "All Products", slug: "all-products", hasDropdown: true },
  { label: "Restorative & Preventives", slug: "restorative", hasDropdown: true },
  { label: "Services & Equipment", slug: "equipment", hasDropdown: true },
  { label: "Laboratory", slug: "laboratory", hasDropdown: true },
  { label: "Endodontics", slug: "endodontics", hasDropdown: true },
];

const RECENT_SEARCHES = ["wipes", "brush", "make"];

const SafcoHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  return (
    <header className="sticky top-0 z-50 bg-card shadow-sm">
      {/* Top Utility Bar */}
      <div className="bg-muted/50 border-b border-border">
        <div className="container flex items-center justify-center gap-10 py-1.5 text-xs text-muted-foreground">
          <a href="tel:8006212178" className="flex items-center gap-1.5 hover:text-foreground transition-colors">
            <Phone className="h-3 w-3" />
            <span>(800) 621-2178</span>
          </a>
          <div className="flex items-center gap-1.5">
            <Truck className="h-3 w-3" />
            <span>Free Shipping on orders over $99</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-card border-b border-border">
        <div className="container flex items-center gap-6 py-3">
          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-1.5 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          {/* Logo */}
          <Link to="/" className="shrink-0 w-44">
            <img src={safcoLogo} alt="Safco Dental Supply" className="h-12 w-auto" />
          </Link>

          {/* Search Bar + Recent — centered */}
          <div className="flex-1 flex flex-col items-center">
            <div className="w-full max-w-2xl">
              <div className="flex w-full rounded-lg border border-input overflow-hidden focus-within:ring-2 focus-within:ring-primary focus-within:border-primary">
                <input
                  type="text"
                  placeholder="Search by product name or item number"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="flex-1 h-10 pl-4 pr-3 bg-card text-sm focus:outline-none text-foreground placeholder:text-muted-foreground"
                />
                <button className="px-4 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center">
                  <Search className="h-4 w-4" />
                </button>
              </div>
              {/* Recent searches */}
              <div className="hidden sm:flex items-center gap-1.5 mt-1.5">
                <span className="sr-only">Recent:</span>
                {RECENT_SEARCHES.map((term) => (
                  <button
                    key={term}
                    className="text-[11px] text-muted-foreground border border-border rounded-full px-2.5 py-0.5 hover:border-primary/40 hover:text-foreground transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* User & Cart */}
          <div className="flex items-center gap-4 shrink-0 w-44 justify-end">
            {/* User Account */}
            <button className="hidden sm:flex items-center gap-1.5 text-sm text-foreground hover:text-primary transition-colors">
              <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground text-[11px] font-bold flex items-center justify-center">
                BP
              </span>
              <span className="font-medium">Ben Park</span>
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
            </button>

            {/* Cart */}
            <button className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors">
              <div className="relative">
                <ShoppingCart className="h-6 w-6" />
                <span className="absolute -top-1.5 -right-1.5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center leading-none">
                  13
                </span>
              </div>
              <span className="hidden sm:inline font-medium">Cart</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="hidden lg:block bg-card border-b border-border">
        <div className="container flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              to={`/category/${item.slug}`}
              className="flex items-center gap-1 px-3 py-2.5 text-sm font-medium text-foreground hover:text-primary hover:bg-muted/60 rounded transition-colors whitespace-nowrap"
            >
              {item.label}
              {item.hasDropdown && <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />}
            </Link>
          ))}

          {/* Personalized pill */}
          <Link
            to="/category/personalized"
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-primary border border-primary/40 rounded-full hover:bg-primary/5 transition-colors ml-1 whitespace-nowrap"
          >
            <Pencil className="h-3.5 w-3.5" />
            Personalized
          </Link>

          <div className="flex items-center gap-1 ml-auto">
            <Link to="/category/all-products" className="px-3 py-2.5 text-sm font-medium text-foreground hover:text-primary hover:bg-muted/60 rounded transition-colors whitespace-nowrap">
              Quick Order
            </Link>
            <Link to="/category/all-products" className="px-3 py-2.5 text-sm font-medium text-foreground hover:text-primary hover:bg-muted/60 rounded transition-colors whitespace-nowrap">
              Order History
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-card">
          <div className="flex flex-col">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                to={`/category/${item.slug}`}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 text-sm font-medium border-b border-border hover:bg-muted text-foreground flex items-center justify-between"
              >
                {item.label}
                {item.hasDropdown && <ChevronDown className="h-4 w-4 text-muted-foreground" />}
              </Link>
            ))}
            <Link to="/category/personalized" onClick={() => setMobileMenuOpen(false)} className="px-4 py-3 text-sm font-medium text-primary border-b border-border hover:bg-muted flex items-center gap-2">
              <Pencil className="h-4 w-4" /> Personalized
            </Link>
            <Link to="/category/all-products" onClick={() => setMobileMenuOpen(false)} className="px-4 py-3 text-sm font-medium text-foreground border-b border-border hover:bg-muted">
              Quick Order
            </Link>
            <Link to="/category/all-products" onClick={() => setMobileMenuOpen(false)} className="px-4 py-3 text-sm font-medium text-foreground border-b border-border hover:bg-muted">
              Order History
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default SafcoHeader;
