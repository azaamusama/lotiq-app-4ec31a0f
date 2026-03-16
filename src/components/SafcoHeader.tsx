import { Search, Phone, Truck, ShoppingCart, User, Menu, X, Heart, MapPin, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";
import safcoLogo from "@/assets/safco-logo.png";

const NAV_ITEMS = [
  { label: "Shop", highlight: true, slug: "all-products" },
  { label: "Supplies", slug: "supplies" },
  { label: "Restorative", slug: "restorative" },
  { label: "Equipment", slug: "equipment" },
  { label: "Infection Control", slug: "infection-control" },
  { label: "Laboratory", slug: "laboratory" },
  { label: "Endodontics", slug: "endodontics" },
  { label: "Deals", highlight: true, slug: "deals" },
];

const SafcoHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  return (
    <header className="sticky top-0 z-50">
      {/* Top Utility Bar */}
      <div className="bg-primary">
        <div className="container flex items-center justify-between py-1.5 text-xs text-primary-foreground">
          <div className="flex items-center gap-4">
            <a href="tel:8006212178" className="flex items-center gap-1 hover:underline">
              <Phone className="h-3 w-3" />
              <span>(800) 621-2178</span>
            </a>
            <a href="#" className="hidden sm:flex items-center gap-1 hover:underline">
              <MapPin className="h-3 w-3" />
              <span>Find a Rep</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Truck className="h-3 w-3" />
              <span>Free Shipping $99+</span>
            </div>
            <a href="#" className="hidden sm:inline hover:underline">Order Tracking</a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-card border-b border-border">
        <div className="container flex items-center gap-4 py-3">
          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          {/* Logo */}
          <Link to="/" className="shrink-0">
            <img src={safcoLogo} alt="Safco Dental Supply" className="h-10 w-auto" />
          </Link>

          {/* Search Bar */}
          <div className="hidden sm:flex flex-1 max-w-2xl mx-auto">
            <div className="relative flex w-full">
              <input
                type="text"
                placeholder="Search products, SKUs, or brands..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full h-10 pl-4 pr-12 rounded-l border border-input bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="px-4 bg-primary text-primary-foreground rounded-r hover:bg-safco-blue-dark transition-colors">
                <Search className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 ml-auto">
            <Button variant="ghost" size="sm" className="hidden sm:flex flex-col items-center gap-0 h-auto py-1 px-3">
              <User className="h-5 w-5" />
              <span className="text-[10px]">Sign In</span>
            </Button>
            <Button variant="ghost" size="sm" className="hidden sm:flex flex-col items-center gap-0 h-auto py-1 px-3">
              <Heart className="h-5 w-5" />
              <span className="text-[10px]">Lists</span>
            </Button>
            <Button variant="ghost" size="sm" className="relative flex flex-col items-center gap-0 h-auto py-1 px-3">
              <ShoppingCart className="h-5 w-5" />
              <span className="text-[10px]">Cart</span>
              <span className="absolute top-0 right-1 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">0</span>
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="sm:hidden px-4 pb-3">
          <div className="relative flex">
            <input
              type="text"
              placeholder="Search products or SKU..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="flex-1 h-10 pl-4 pr-4 rounded-l border border-input bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button className="px-4 bg-primary text-primary-foreground rounded-r">
              <Search className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <nav className="hidden lg:block bg-card border-b border-border">
        <div className="container flex items-center">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              to={`/category/${item.slug}`}
              className={`px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted ${
                item.highlight ? "text-primary font-bold" : "text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link to="/category/all-products" className="ml-auto px-4 py-2.5 text-sm font-medium text-primary hover:bg-muted">
            Quick Order
          </Link>
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
                className={`px-4 py-3 text-sm font-medium border-b border-border hover:bg-muted ${item.highlight ? "text-primary font-bold" : "text-foreground"}`}
              >
                {item.label}
              </Link>
            ))}
            <Link to="/category/all-products" onClick={() => setMobileMenuOpen(false)} className="px-4 py-3 text-sm font-medium text-primary border-b border-border hover:bg-muted">Quick Order</Link>
            <a href="#" className="px-4 py-3 text-sm font-medium text-foreground border-b border-border hover:bg-muted flex items-center gap-2">
              <User className="h-4 w-4" /> Sign In
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default SafcoHeader;
