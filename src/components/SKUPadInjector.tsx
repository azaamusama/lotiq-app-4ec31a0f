import { useState, useRef, useEffect } from "react";
import { Terminal, X, ChevronUp, ShoppingCart, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CartItem {
  sku: string;
  qty: number;
}

const SKUPadInjector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [skuInput, setSkuInput] = useState("");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [lastAdded, setLastAdded] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleAdd = () => {
    const sku = skuInput.trim().toUpperCase();
    if (!sku) return;

    setCartItems((prev) => {
      const existing = prev.find((item) => item.sku === sku);
      if (existing) {
        return prev.map((item) => (item.sku === sku ? { ...item, qty: item.qty + 1 } : item));
      }
      return [...prev, { sku, qty: 1 }];
    });

    setLastAdded(sku);
    setSkuInput("");
    setTimeout(() => setLastAdded(null), 1500);

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Desktop: floating right rail
  // Mobile: bottom sheet
  return (
    <>
      {/* Desktop Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden lg:flex items-center gap-2 bg-primary text-primary-foreground px-3 py-3 rounded-l-lg shadow-lg hover:bg-safco-blue-dark transition-colors writing-mode-vertical"
        style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
        aria-label="Open SKU Pad"
      >
        <Terminal className="h-4 w-4 rotate-90" />
        <span className="text-xs font-semibold tracking-wide">SKU PAD</span>
      </button>

      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-40 lg:hidden flex items-center justify-center w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-xl hover:bg-safco-blue-dark transition-colors"
        aria-label="Open SKU Pad"
      >
        <Terminal className="h-5 w-5" />
      </button>

      {/* Panel */}
      {isOpen && (
        <>
          {/* Backdrop on mobile */}
          <div className="fixed inset-0 bg-foreground/20 z-40 lg:hidden" onClick={() => setIsOpen(false)} />

          {/* Desktop: Right rail */}
          <div className="fixed right-0 top-0 h-full w-80 bg-card shadow-2xl z-50 hidden lg:flex flex-col animate-slide-in-right border-l border-border">
            <div className="flex items-center justify-between p-4 border-b border-border bg-primary text-primary-foreground">
              <div className="flex items-center gap-2">
                <Terminal className="h-4 w-4" />
                <span className="font-semibold text-sm">SKU Pad Injector</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-primary-foreground/10 rounded" aria-label="Close">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-4">
              <p className="text-xs text-muted-foreground mb-3">
                Type a SKU and press Enter. Items drop straight into your cart.
              </p>
              <div className="flex gap-2 mb-4">
                <input
                  ref={inputRef}
                  type="text"
                  value={skuInput}
                  onChange={(e) => setSkuInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAdd()}
                  placeholder="Enter SKU..."
                  className="flex-1 h-10 px-3 rounded border border-input bg-background text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                  autoComplete="off"
                />
                <Button variant="action" onClick={handleAdd} size="sm">
                  Add
                </Button>
              </div>

              {lastAdded && (
                <div className="flex items-center gap-2 bg-bg-green p-2 rounded mb-3 animate-snap-in">
                  <Check className="h-3 w-3 text-accent" />
                  <span className="text-xs font-mono font-medium">{lastAdded} added!</span>
                </div>
              )}
            </div>

            <div className="flex-1 overflow-auto px-4">
              {cartItems.length === 0 ? (
                <p className="text-xs text-muted-foreground text-center py-8">No items yet. Start typing SKUs above.</p>
              ) : (
                <div className="space-y-2">
                  {cartItems.map((item) => (
                    <div key={item.sku} className="flex items-center justify-between p-2 bg-background rounded text-sm">
                      <span className="font-mono text-xs font-medium">{item.sku}</span>
                      <span className="text-xs text-muted-foreground">×{item.qty}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-4 border-t border-border">
                <Button variant="action" className="w-full flex items-center justify-center gap-2">
                  <ShoppingCart className="h-4 w-4" />
                  Add All to Cart ({cartItems.reduce((a, b) => a + b.qty, 0)} items)
                </Button>
              </div>
            )}
          </div>

          {/* Mobile: Bottom sheet */}
          <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-card rounded-t-2xl shadow-2xl border-t border-border max-h-[70vh] flex flex-col">
            <div className="flex items-center justify-center py-2">
              <div className="w-10 h-1 bg-muted rounded-full" />
            </div>
            <div className="flex items-center justify-between px-4 pb-3">
              <div className="flex items-center gap-2">
                <Terminal className="h-4 w-4 text-primary" />
                <span className="font-semibold text-sm text-foreground">SKU Pad</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-1" aria-label="Close">
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>

            <div className="px-4 pb-4">
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={skuInput}
                  onChange={(e) => setSkuInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAdd()}
                  placeholder="Enter SKU..."
                  className="flex-1 h-10 px-3 rounded border border-input bg-background text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                  autoComplete="off"
                />
                <Button variant="action" onClick={handleAdd}>Add</Button>
              </div>

              {lastAdded && (
                <div className="flex items-center gap-2 bg-bg-green p-2 rounded mb-3 animate-snap-in">
                  <Check className="h-3 w-3 text-accent" />
                  <span className="text-xs font-mono font-medium">{lastAdded} added!</span>
                </div>
              )}

              <div className="max-h-40 overflow-auto space-y-2">
                {cartItems.map((item) => (
                  <div key={item.sku} className="flex items-center justify-between p-2 bg-background rounded text-sm">
                    <span className="font-mono text-xs font-medium">{item.sku}</span>
                    <span className="text-xs text-muted-foreground">×{item.qty}</span>
                  </div>
                ))}
              </div>

              {cartItems.length > 0 && (
                <Button variant="action" className="w-full mt-3 flex items-center justify-center gap-2">
                  <ShoppingCart className="h-4 w-4" />
                  Add All ({cartItems.reduce((a, b) => a + b.qty, 0)} items)
                </Button>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SKUPadInjector;
