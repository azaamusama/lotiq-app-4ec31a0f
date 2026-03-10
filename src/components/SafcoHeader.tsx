import { Search, Phone, Truck, ShoppingCart, Menu, X, ChevronDown, Pencil } from "lucide-react";
import { useState } from "react";
import safcoLogo from "@/assets/safco-logo.png";

const NAV_ITEMS = [
  { label: "Equipment" },
  { label: "Laboratory" },
  { label: "Endodontics" },
  { label: "Preventatives" },
];

const SafcoHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  return (
    <header className="sticky top-0 z-50">
      {/* Top Utility Bar - lighter blue */}
      <div className="bg-safco-blue-light">
        <div className="container flex items-center justify-center gap-8 py-1.5 text-xs text-primary-foreground">
          <a href="tel:8006212178" className="flex items-center gap-1.5 hover:underline">
            <Phone className="h-3.5 w-3.5" />
            <span>(800) 621-2178</span>
          </a>
          <div className="flex items-center gap-1.5">
            <Truck className="h-3.5 w-3.5" />
            <span>Free Shipping on orders over $250</span>
          </div>
        </div>
      </div>

      {/* Main Header - dark blue */}
      <div className="bg-primary">
        <div className="container flex items-center gap-6 py-4">
          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 text-primary-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          {/* Logo */}
          <a href="/" className="shrink-0">
            <img src={safcoLogo} alt="Safco Dental Supply" className="h-12 w-auto brightness-0 invert" />
          </a>

          {/* Search Bar - large white rounded */}
          <div className="hidden sm:flex flex-1 max-w-2xl mx-auto">
            <div className="relative flex w-full">
              <input
                type="text"
                placeholder="Search by product name or item number"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full h-12 pl-5 pr-12 rounded-lg bg-white text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-white/50 border-0"
              />
              <button className="absolute right-0 top-0 h-12 px-4 text-muted-foreground hover:text-foreground transition-colors">
                <Search className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Actions - right side */}
          <div className="flex items-center gap-4 ml-auto text-primary-foreground">
            <button className="hidden sm:flex items-center gap-2 hover:opacity-80 transition-opacity">
              <span className="h-8 w-8 rounded-full border-2 border-primary-foreground/50 flex items-center justify-center text-xs font-bold">SD</span>
              <span className="text-sm font-medium">Safco Dental</span>
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
            <button className="relative flex items-center gap-2 hover:opacity-80 transition-opacity">
              <ShoppingCart className="h-5 w-5" />
              <span className="text-sm font-medium hidden sm:inline">Cart</span>
              <span className="absolute -top-1.5 left-3 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">3</span>
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="sm:hidden px-4 pb-3">
          <div className="relative flex">
            <input
              type="text"
              placeholder="Search by product name or item number"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="flex-1 h-10 pl-4 pr-10 rounded-lg bg-white text-foreground text-sm focus:outline-none border-0"
            />
            <button className="absolute right-0 top-0 h-10 px-3 text-muted-foreground">
              <Search className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Bar - dark blue, slightly lighter than main */}
      <nav className="hidden lg:block bg-safco-blue-dark">
        <div className="container flex items-center">
          {/* All Products pill */}
          <a
            href="#"
            className="flex items-center gap-1.5 px-5 py-2.5 my-1 text-sm font-medium text-primary-foreground border border-primary-foreground/40 rounded-full hover:bg-white/10 transition-colors"
          >
            All Products
            <ChevronDown className="h-3.5 w-3.5" />
          </a>

          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href="#"
              className="flex items-center gap-1 px-5 py-3 text-sm font-medium text-primary-foreground/90 hover:text-primary-foreground hover:bg-white/10 transition-colors"
            >
              {item.label}
              <ChevronDown className="h-3.5 w-3.5" />
            </a>
          ))}

          <a href="#" className="px-5 py-3 text-sm font-medium text-primary-foreground/90 hover:text-primary-foreground hover:bg-white/10 transition-colors">
            Quick Order
          </a>

          {/* Personalized button - right aligned */}
          <a
            href="#"
            className="ml-auto flex items-center gap-1.5 px-5 py-2 my-1 text-sm font-medium text-primary-foreground border border-primary-foreground/40 rounded-full hover:bg-white/10 transition-colors"
          >
            <Pencil className="h-3.5 w-3.5" />
            Personalized
          </a>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-primary border-t border-white/10">
          <div className="flex flex-col">
            <a href="#" className="px-4 py-3 text-sm font-medium text-primary-foreground border-b border-white/10 hover:bg-white/10">
              All Products
            </a>
            {NAV_ITEMS.map((item) => (
              <a key={item.label} href="#" className="px-4 py-3 text-sm font-medium text-primary-foreground border-b border-white/10 hover:bg-white/10">
                {item.label}
              </a>
            ))}
            <a href="#" className="px-4 py-3 text-sm font-medium text-primary-foreground border-b border-white/10 hover:bg-white/10">Quick Order</a>
            <a href="#" className="px-4 py-3 text-sm font-medium text-primary-foreground border-b border-white/10 hover:bg-white/10 flex items-center gap-2">
              <Pencil className="h-4 w-4" /> Personalized
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default SafcoHeader;
