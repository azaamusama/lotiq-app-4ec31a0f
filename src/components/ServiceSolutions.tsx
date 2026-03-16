import { ArrowUpRight } from "lucide-react";

const SERVICES = [
  {
    name: "Uptime Services",
    tagline: "Equipment Repair & Maintenance",
    logoText: "uptime",
    logoSub: "services",
    logoColor: "text-blue-600",
    accentColor: "bg-blue-600",
    description:
      "We specialize in providing comprehensive dental equipment services to ensure your practice operates efficiently and effectively.",
    links: [
      { label: "Click to learn more", text: " and get the equipment you need to support your practice!" },
      { label: "Click to learn more", text: " and keep your practice running smoothly with our expert dental equipment repair and maintenance." },
    ],
  },
  {
    name: "Group Financial Services",
    tagline: "Practice Financing Solutions",
    logoText: "Group",
    logoSub: "financial SERVICES",
    logoColor: "text-orange-600",
    accentColor: "bg-orange-600",
    description:
      "In partnership with Group Financial Services, we offer customized financing solutions to support your practice's growth, including equipment and supplies.",
    links: [
      { label: "Click to learn more", text: " and discover how they can help your practice thrive!" },
    ],
  },
  {
    name: "Klas Solutions",
    tagline: "Technology & Patient Care Tools",
    logoText: "KLAS",
    logoSub: "Solutions",
    logoColor: "text-green-700",
    accentColor: "bg-green-700",
    description:
      "In partnership with Klas Solutions, we provide top-tier support for dental professionals, offering cutting-edge tools and technologies to enhance patient care and elevate your practice.",
    links: [
      { label: "Click to learn more", text: " and discover how they can help your practice thrive!" },
    ],
  },
];

const ServiceSolutions = () => {
  return (
    <section className="py-10 bg-background border-t border-border">
      <div className="container">
        <h2 className="text-xl font-bold text-foreground text-center mb-8">
          Professional Service Solutions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-border">
          {SERVICES.map((service) => (
            <div key={service.name} className="pt-6 md:pt-0 md:px-8 first:pl-0 last:pr-0 flex flex-col gap-4">
              {/* Logo block */}
              <div className="flex items-center gap-2 h-16">
                <div className="flex items-baseline gap-0.5">
                  <span className={`text-3xl font-extrabold ${service.logoColor} tracking-tight`}>
                    {service.logoText}
                  </span>
                  <span className="text-xl text-muted-foreground font-light tracking-wide">
                    {service.logoSub}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                {service.description}
              </p>

              {/* Links */}
              <div className="flex flex-col gap-1.5 mt-auto">
                {service.links.map((link, i) => (
                  <p key={i} className="text-sm text-foreground leading-relaxed">
                    <a
                      href="#"
                      className="text-primary hover:underline font-medium inline-flex items-center gap-0.5"
                    >
                      {link.label}
                      <ArrowUpRight className="h-3 w-3" />
                    </a>
                    {link.text}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceSolutions;
