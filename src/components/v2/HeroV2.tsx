import { Search, ArrowRight, ShieldCheck, Truck, Package, Zap, Sparkles } from "lucide-react";
import { useState } from "react";

const SUGGESTIONS = [
  "Nitrile Gloves",
  "Septocaine Anesthetic",
  "Diamond Burs",
  "Prophy Paste",
  "Composite Resin",
  "Surgical Masks",
];

const TRUST_BADGES = [
  { icon: Package, label: "30,000+ Products" },
  { icon: Truck, label: "Same-Day Shipping" },
  { icon: ShieldCheck, label: "Trusted Since 1941" },
  { icon: Zap, label: "88% in 2 Days" },
];

const HeroV2 = () => {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const filtered = query.length > 0
    ? SUGGESTIONS.filter((s) => s.toLowerCase().includes(query.toLowerCase()))
    : SUGGESTIONS;

  return (
    <section className="relative overflow-hidden bg-v2-hero-bg py-16 md:py-24">
      {/* Background gradient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-v2-blob-a opacity-30 blur-3xl" />
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-v2-blob-b opacity-20 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-40 rounded-full bg-v2-blob-c opacity-15 blur-3xl" />
      </div>

      <div className="container relative z-10">
        {/* Badge */}
        <div className="flex justify-center mb-5">
          <span className="inline-flex items-center gap-1.5 bg-v2-badge-bg border border-v2-badge-border text-v2-badge-text text-xs font-semibold rounded-full px-4 py-1.5">
            <Sparkles className="h-3 w-3" />
            Redesigned for Dental Professionals
          </span>
        </div>

        {/* Headline */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-v2-headline leading-[1.08] tracking-tight">
            Everything Your Practice
            <span className="block text-v2-headline-accent"> Needs — Delivered Fast</span>
          </h1>
          <p className="mt-4 text-base md:text-lg text-v2-subheadline max-w-xl mx-auto">
            Your control center for dental procurement. 30,000+ products. Same-day shipping. Built for busy dentists.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto relative mb-10">
          <div
            className={`flex items-center rounded-2xl bg-v2-search-bg border-2 transition-all duration-200 shadow-v2-search ${focused ? "border-v2-search-focus-border shadow-v2-search-focus" : "border-v2-search-border"}`}
          >
            <Search className="ml-4 h-5 w-5 text-v2-search-icon shrink-0" />
            <input
              type="text"
              placeholder="Search by product, brand, or item number…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setTimeout(() => setFocused(false), 150)}
              className="flex-1 h-14 px-4 bg-transparent text-v2-search-text text-base focus:outline-none placeholder:text-v2-search-placeholder"
            />
            <button className="m-1.5 px-5 h-11 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors flex items-center gap-1.5 shrink-0">
              Search <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Autocomplete Dropdown */}
          {focused && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-v2-dropdown-bg border border-v2-dropdown-border rounded-2xl shadow-v2-dropdown z-40 overflow-hidden">
              <div className="p-2">
                <p className="text-[11px] font-semibold text-v2-dropdown-label uppercase tracking-wider px-3 py-1.5">
                  {query ? "Suggestions" : "Popular Searches"}
                </p>
                {filtered.map((s) => (
                  <button
                    key={s}
                    onMouseDown={() => setQuery(s)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-v2-dropdown-item hover:bg-v2-dropdown-item-hover transition-colors text-left"
                  >
                    <Search className="h-3.5 w-3.5 text-v2-dropdown-icon shrink-0" />
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Quick CTAs */}
        <div className="flex items-center justify-center gap-3 flex-wrap mb-12">
          <a href="#" className="inline-flex items-center gap-1.5 text-sm font-medium text-v2-cta-secondary border border-v2-cta-secondary-border rounded-full px-4 py-2 hover:bg-v2-cta-secondary-hover transition-colors">
            Reorder in Seconds
          </a>
          <a href="#" className="inline-flex items-center gap-1.5 text-sm font-medium text-v2-cta-secondary border border-v2-cta-secondary-border rounded-full px-4 py-2 hover:bg-v2-cta-secondary-hover transition-colors">
            Shop Supplies
          </a>
          <a href="#" className="inline-flex items-center gap-1.5 text-sm font-medium text-v2-cta-secondary border border-v2-cta-secondary-border rounded-full px-4 py-2 hover:bg-v2-cta-secondary-hover transition-colors">
            View Deals
          </a>
        </div>

        {/* Trust Badges */}
        <div className="flex items-center justify-center gap-6 flex-wrap">
          {TRUST_BADGES.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-v2-badge-icon-bg flex items-center justify-center">
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm font-medium text-v2-trust-label">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroV2;
