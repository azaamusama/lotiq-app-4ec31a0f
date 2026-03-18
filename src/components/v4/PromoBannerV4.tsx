import productGloves from "@/assets/product-gloves.jpg";
import productCement from "@/assets/product-cement.jpg";
import productProphy from "@/assets/product-prophy.jpg";
import productComposite from "@/assets/product-composite.jpg";

const PromoBannerV4 = () => (
  <section className="w-full bg-[hsl(153_40%_95%)] border-y border-[hsl(153_30%_88%)] overflow-hidden relative">
    <div className="container relative">
      <div className="flex items-center justify-between min-h-[180px] py-6 gap-4">

        {/* ── Left products ── */}
        <div className="hidden md:flex items-end gap-3 shrink-0 relative h-44">
          <img
            src={productGloves}
            alt="Nitrile Gloves"
            className="w-28 h-28 object-contain drop-shadow-lg -rotate-6 translate-y-2"
          />
          <img
            src={productCement}
            alt="Dental Cement"
            className="w-24 h-24 object-contain drop-shadow-lg rotate-3"
          />
        </div>

        {/* ── Center copy ── */}
        <div className="flex-1 text-center px-4">
          <h2 className="text-4xl lg:text-5xl font-black text-[hsl(153_50%_28%)] leading-tight tracking-tight mb-1">
            Summer Stock-Up Sale!
          </h2>
          <p className="text-base text-[hsl(153_30%_38%)] font-medium mb-4">
            Fresh Deals on Trusted Dental Brands
          </p>
          <div className="inline-flex items-center gap-2 bg-[hsl(153_50%_28%)] text-white font-black text-lg px-6 py-3 rounded-full shadow-lg">
            Buy 3, Get 1&nbsp;
            <span className="text-[hsl(153_80%_75%)]">FREE!</span>
            <span className="text-sm font-semibold text-white/80 ml-1">on Select Products</span>
          </div>
        </div>

        {/* ── Right products ── */}
        <div className="hidden md:flex items-end gap-3 shrink-0 relative h-44">
          <img
            src={productProphy}
            alt="Prophy Paste"
            className="w-24 h-24 object-contain drop-shadow-lg -rotate-3 translate-y-1"
          />
          <img
            src={productComposite}
            alt="Composite Resin"
            className="w-28 h-28 object-contain drop-shadow-lg rotate-6 translate-y-2"
          />
        </div>

      </div>
    </div>
  </section>
);

export default PromoBannerV4;
