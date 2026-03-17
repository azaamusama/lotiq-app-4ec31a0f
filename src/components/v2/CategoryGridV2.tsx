import { Gem, FlaskConical, Shield, Wrench, Microscope, Syringe, Stethoscope, Package, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const CATEGORIES = [
  { name: "Burs & Diamonds", icon: Gem, count: "2,400+", color: "bg-v2-cat-blue text-v2-cat-blue-icon", slug: "burs-diamonds" },
  { name: "Restorative", icon: FlaskConical, count: "3,100+", color: "bg-v2-cat-teal text-v2-cat-teal-icon", slug: "restorative" },
  { name: "Infection Control", icon: Shield, count: "1,800+", color: "bg-v2-cat-green text-v2-cat-green-icon", slug: "infection-control" },
  { name: "Equipment", icon: Wrench, count: "950+", color: "bg-v2-cat-purple text-v2-cat-purple-icon", slug: "equipment" },
  { name: "Laboratory", icon: Microscope, count: "2,200+", color: "bg-v2-cat-orange text-v2-cat-orange-icon", slug: "laboratory" },
  { name: "Anesthetics", icon: Syringe, count: "600+", color: "bg-v2-cat-red text-v2-cat-red-icon", slug: "anesthetics" },
  { name: "Preventive", icon: Stethoscope, count: "1,200+", color: "bg-v2-cat-indigo text-v2-cat-indigo-icon", slug: "preventive" },
  { name: "All Products", icon: Package, count: "30,000+", color: "bg-primary/10 text-primary", slug: "all-products" },
];

const CategoryGridV2 = () => {
  return (
    <section className="py-12 bg-v2-section">
      <div className="container">
        <div className="flex items-end justify-between mb-7">
          <div>
            <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">Browse</p>
            <h2 className="text-2xl font-bold text-v2-section-title">Shop by Category</h2>
          </div>
          <Link to="/category/all-products" className="flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
            View all <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {CATEGORIES.map(({ name, icon: Icon, count, color, slug }) => (
            <Link
              key={name}
              to={`/category/${slug}`}
              className="group flex flex-col items-center gap-2.5 p-4 bg-v2-card rounded-2xl border border-v2-card-border hover:shadow-v2-card-hover hover:border-v2-card-hover-border hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center transition-transform duration-200 group-hover:scale-110`}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="text-center">
                <p className="text-xs font-semibold text-v2-product-name leading-tight">{name}</p>
                <p className="text-[10px] text-v2-section-sub mt-0.5">{count} items</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGridV2;
