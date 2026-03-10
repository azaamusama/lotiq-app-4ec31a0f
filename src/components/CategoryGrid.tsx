import { Gem, FlaskConical, Shield, Wrench, Microscope, Syringe } from "lucide-react";

const CATEGORIES = [
  { name: "Burs & Diamonds", icon: Gem, count: "2,400+" },
  { name: "Restorative", icon: FlaskConical, count: "3,100+" },
  { name: "Infection Control", icon: Shield, count: "1,800+" },
  { name: "Handpieces & Equipment", icon: Wrench, count: "950+" },
  { name: "Laboratory", icon: Microscope, count: "2,200+" },
  { name: "Anesthetics", icon: Syringe, count: "600+" },
];

const CategoryGrid = () => {
  return (
    <section className="py-6 lg:py-8">
      <div className="container">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Shop by Category</h2>
          <a href="#" className="text-sm text-primary font-medium hover:underline">View All →</a>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {CATEGORIES.map(({ name, icon: Icon, count }) => (
            <a
              key={name}
              href="#"
              className="flex flex-col items-center gap-2 p-4 bg-card rounded hover:shadow-md transition-shadow border border-transparent hover:border-primary/20 group"
            >
              <div className="w-12 h-12 rounded-full bg-bg-green flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <span className="text-xs font-medium text-foreground text-center leading-tight">{name}</span>
              <span className="text-[10px] text-muted-foreground font-mono">{count} items</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
