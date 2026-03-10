import { BookOpen, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const GUIDES = [
  {
    title: "Choosing the Right Nitrile Gloves",
    category: "Infection Control",
    readTime: "4 min read",
  },
  {
    title: "Burs & Diamonds: A Buyer's Guide",
    category: "Restorative",
    readTime: "6 min read",
  },
  {
    title: "Composite Selection for Modern Practices",
    category: "Materials",
    readTime: "5 min read",
  },
];

const BuyingGuides = () => {
  return (
    <section className="py-6 lg:py-8 bg-bg-green-light">
      <div className="container">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Buying Guides</h2>
          </div>
          <a href="#" className="text-sm text-primary font-medium hover:underline">All Guides →</a>
        </div>
        <div className="grid sm:grid-cols-3 gap-3">
          {GUIDES.map((guide) => (
            <a key={guide.title} href="#" className="bg-card rounded p-4 hover:shadow-md transition-shadow group">
              <span className="text-[10px] font-medium text-primary uppercase tracking-wide">{guide.category}</span>
              <h3 className="text-sm font-semibold text-foreground mt-1 mb-2 group-hover:text-primary transition-colors">{guide.title}</h3>
              <span className="text-[10px] text-muted-foreground">{guide.readTime}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BuyingGuides;
