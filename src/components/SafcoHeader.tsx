import { Search, Phone, Truck, ShoppingCart, User, Menu, X, Barcode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import safcoLogo from "@/assets/safco-logo.png";

const NAV_ITEMS = [
  "All Products",
  "Restorative & Preventives",
  "Services & Equipment",
  "Laboratory",
  "Endodontics",
];

const SafcoHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  return (
    <header className="sticky top-0 z-50 bg-card shadow-sm">
      {/* Utility Bar */}
      <div className="bg-primary">
        <div className="container flex items-center justify-between py-1.5 text-xs text-primary-foreground">
          <div className="flex items-center gap-4">
            <a href="tel:8006212178" className="flex items-center gap-1.5 hover:underline">
              <Phone className="h-3 w-3" />
              <span>(800) 621-2178</span>
            </a>
          </div>
          <div className="flex items-center gap-1.5">
            <Truck className="h-3 w-3" />
            <span>Free Shipping on orders over $99</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
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
        <a href="/" className="shrink-0">
          <img src={safcoLogo} alt="Safco Dental Supply" className="h-10 w-auto" />
        </a>

        {/* Search Bar - 50% of header per brief */}
        <div className="hidden sm:flex flex-1 max-w-2xl mx-auto">
          <div className="relative flex w-full">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by product name, item number, or SKU"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full h-10 pl-10 pr-12 rounded-full border border-input bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-primary" aria-label="Scan barcode">
                <Barcode className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 ml-auto">
          <Button variant="ghost" size="sm" className="hidden sm:flex items-center gap-1.5 text-sm">
            <User className="h-4 w-4" />
            <span>Sign In</span>
          </Button>
          <Button variant="ghost" size="sm" className="relative flex items-center gap-1.5 text-sm">
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden sm:inline">Cart</span>
            <span className="absolute -top-1 -right-1 bg-alert text-alert-foreground text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">0</span>
          </Button>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="sm:hidden px-4 pb-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search products or SKU..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full h-10 pl-10 pr-4 rounded-full border border-input bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="hidden lg:block border-t border-border">
        <div className="container flex items-center gap-0">
          {NAV_ITEMS.map((item) => (
            <a
              key={item}
              href="#"
              className="px-4 py-2.5 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
            >
              {item}
            </a>
          ))}
          <a href="#" className="px-4 py-2.5 text-sm font-medium text-primary hover:bg-secondary transition-colors">
            Quick Order
          </a>
          <a href="#" className="px-4 py-2.5 text-sm font-medium text-primary hover:bg-secondary transition-colors">
            Order History
          </a>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-card">
          <div className="flex flex-col">
            {NAV_ITEMS.map((item) => (
              <a key={item} href="#" className="px-4 py-3 text-sm font-medium text-foreground border-b border-border hover:bg-secondary">
                {item}
              </a>
            ))}
            <a href="#" className="px-4 py-3 text-sm font-medium text-primary border-b border-border hover:bg-secondary">
              Quick Order
            </a>
            <a href="#" className="px-4 py-3 text-sm font-medium text-primary border-b border-border hover:bg-secondary">
              Order History
            </a>
            <a href="#" className="px-4 py-3 text-sm font-medium text-foreground border-b border-border hover:bg-secondary flex items-center gap-2">
              <User className="h-4 w-4" /> Sign In
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default SafcoHeader;
