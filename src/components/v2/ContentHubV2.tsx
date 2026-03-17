import { BookOpen, ChevronRight, FileText, PlayCircle, BarChart2 } from "lucide-react";

const GUIDES = [
  {
    type: "Guide",
    typeIcon: BookOpen,
    title: "How to Choose the Right Composite Resin",
    desc: "Compare flowable vs. nano-hybrid composites for anterior and posterior cases.",
    time: "5 min read",
    color: "border-l-primary",
    tagColor: "bg-primary/10 text-primary",
  },
  {
    type: "Video",
    typeIcon: PlayCircle,
    title: "Nitrile vs. Latex Gloves — What's Best for Your Practice?",
    desc: "Expert breakdown on barrier protection, comfort, and allergy considerations.",
    time: "3 min watch",
    color: "border-l-v2-hub-teal",
    tagColor: "bg-v2-hub-teal-bg text-v2-hub-teal-text",
  },
  {
    type: "Comparison",
    typeIcon: BarChart2,
    title: "Local Anesthetic Comparison Guide",
    desc: "Side-by-side comparison of Septocaine, Lidocaine, and Articaine formulations.",
    time: "7 min read",
    color: "border-l-v2-hub-green",
    tagColor: "bg-v2-hub-green-bg text-v2-hub-green-text",
  },
  {
    type: "Article",
    typeIcon: FileText,
    title: "Infection Control Protocols: 2024 Updates",
    desc: "What's changed in ADA and CDC infection control guidelines this year.",
    time: "4 min read",
    color: "border-l-v2-hub-orange",
    tagColor: "bg-v2-hub-orange-bg text-v2-hub-orange-text",
  },
];

const ContentHubV2 = () => {
  return (
    <section className="py-12 bg-v2-section">
      <div className="container">
        <div className="flex items-end justify-between mb-7">
          <div>
            <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">Learn</p>
            <h2 className="text-2xl font-bold text-v2-section-title">Product Education Hub</h2>
            <p className="text-sm text-v2-section-sub mt-0.5">Expert insights to help you buy smarter</p>
          </div>
          <a href="#" className="hidden sm:flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
            View all guides <ChevronRight className="h-4 w-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {GUIDES.map((g) => (
            <a
              key={g.title}
              href="#"
              className={`group block bg-v2-card rounded-2xl border-l-4 border border-v2-card-border ${g.color} p-5 hover:shadow-v2-card-hover hover:-translate-y-0.5 transition-all duration-200`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide rounded-full px-2.5 py-1 ${g.tagColor}`}>
                  <g.typeIcon className="h-3 w-3" />
                  {g.type}
                </span>
                <span className="text-[10px] text-v2-section-sub">{g.time}</span>
              </div>
              <h3 className="text-sm font-bold text-v2-section-title leading-snug mb-1.5 group-hover:text-primary transition-colors">{g.title}</h3>
              <p className="text-xs text-v2-section-sub leading-relaxed line-clamp-2">{g.desc}</p>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                Read more <ChevronRight className="h-3.5 w-3.5" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContentHubV2;
