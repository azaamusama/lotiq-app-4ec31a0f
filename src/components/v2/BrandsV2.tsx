const BRANDS = [
  { name: "3M", tagline: "Restorative Leader" },
  { name: "Kerr", tagline: "Endodontics" },
  { name: "Dentsply Sirona", tagline: "Full Portfolio" },
  { name: "Ivoclar", tagline: "Ceramics & Bonds" },
  { name: "Septodont", tagline: "Anesthetics" },
  { name: "Hu-Friedy", tagline: "Instruments" },
  { name: "GC America", tagline: "Preventive" },
  { name: "Ultradent", tagline: "Whitening & More" },
];

const BrandsV2 = () => {
  return (
    <section className="py-12 bg-v2-section">
      <div className="container">
        <div className="text-center mb-8">
          <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">Authorized Distributor</p>
          <h2 className="text-2xl font-bold text-v2-section-title">Trusted Brands</h2>
          <p className="text-sm text-v2-section-sub mt-1">100% authorized products — no grey market</p>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
          {BRANDS.map((brand) => (
            <a
              key={brand.name}
              href="#"
              className="group flex flex-col items-center gap-1.5 p-3 sm:p-4 bg-v2-card rounded-2xl border border-v2-card-border hover:shadow-v2-card-hover hover:border-v2-card-hover-border hover:-translate-y-0.5 transition-all duration-200 text-center"
            >
              <span className="text-sm sm:text-base font-black text-v2-brand-name group-hover:text-primary transition-colors">{brand.name}</span>
              <span className="text-[10px] text-v2-section-sub hidden sm:block">{brand.tagline}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandsV2;
