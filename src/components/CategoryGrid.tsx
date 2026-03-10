import { Gem, FlaskConical, Shield, Wrench, Microscope, Syringe, Stethoscope, Package } from "lucide-react";

const CATEGORIES = [
  { name: "Burs & Diamonds", icon: Gem, count: "2,400+" },
  { name: "Restorative", icon: FlaskConical, count: "3,100+" },
  { name: "Infection Control", icon: Shield, count: "1,800+" },
  { name: "Equipment", icon: Wrench, count: "950+" },
  { name: "Laboratory", icon: Microscope, count: "2,200+" },
  { name: "Anesthetics", icon: Syringe, count: "600+" },
  { name: "Preventive", icon: Stethoscope, count: "1,200+" },
  { name: "All Products", icon: Package, count: "30,000+" },
];

const CategoryGrid = () => {
  return (
    <section className="py-4">
      <div className="container">
        <h2 className="text-base font-bold text-foreground mb-3">Shop by Category</h2>
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
          {CATEGORIES.map(({ name, icon: Icon, count }) => (
            <a
              key={name}
              href="#"
              className="flex flex-col items-center gap-1.5 p-3 bg-card rounded-lg border border-border hover:border-primary/30 hover:shadow-sm transition-all group"
            >
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <span className="text-[10px] font-medium text-foreground text-center leading-tight">{name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
