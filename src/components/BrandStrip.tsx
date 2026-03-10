const BRANDS = [
  "3M",
  "Kerr",
  "Dentsply Sirona",
  "Ivoclar",
  "Septodont",
  "Hu-Friedy",
  "GC America",
  "Ultradent",
];

const BrandStrip = () => {
  return (
    <section className="py-6 border-y border-border bg-card">
      <div className="container">
        <h2 className="text-sm font-bold text-foreground text-center mb-4">Focus on all the essentials</h2>
        <div className="flex items-center justify-center gap-8 flex-wrap">
          {BRANDS.map((brand) => (
            <a
              key={brand}
              href="#"
              className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors uppercase tracking-wide"
            >
              {brand}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandStrip;
