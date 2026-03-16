import { Phone, MessageSquare, Printer, Mail, Facebook, Linkedin, Instagram, Youtube } from "lucide-react";
import safcoLogo from "@/assets/safco-logo.png";

const SafcoFooter = () => {
  return (
    <footer className="bg-background border-t border-border">
      {/* Top utility bar */}
      <div className="container flex items-center justify-between py-4 border-b border-border">
        <a href="#" className="text-sm text-foreground border border-border rounded px-4 py-2 hover:bg-muted transition-colors">
          Request a Catalog
        </a>
        <a href="#" className="text-sm text-foreground border border-border rounded px-4 py-2 hover:bg-muted transition-colors">
          ODA March Sales Flyer
        </a>
      </div>

      {/* Main footer grid */}
      <div className="container py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand column */}
          <div className="lg:col-span-1 flex flex-col gap-5">
            <img src={safcoLogo} alt="Safco Dental Supply" className="h-10 w-auto object-contain" />
            <p className="text-sm text-muted-foreground leading-snug">More Products. More Savings.<br />Delivered.</p>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {[
                { Icon: Facebook, label: "Facebook" },
                { Icon: Linkedin, label: "LinkedIn" },
                { Icon: Instagram, label: "Instagram" },
                { Icon: Youtube, label: "YouTube" },
              ].map(({ Icon, label }) => (
                <a key={label} href="#" aria-label={label} className="text-muted-foreground hover:text-foreground transition-colors">
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>

            {/* Contact info */}
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0" />
                800-621-2178
              </li>
              <li className="flex items-center gap-2.5">
                <MessageSquare className="h-4 w-4 shrink-0" />
                847-495-7494
              </li>
              <li className="flex items-center gap-2.5">
                <Printer className="h-4 w-4 shrink-0" />
                800-899-9954
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0" />
                customerservice@safcodental.com
              </li>
            </ul>
          </div>

          {/* About Us */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-foreground mb-5">About Us</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {["About Safco", "Safco History", "Careers", "Contact Us", "Women in Dentistry"].map((item) => (
                <li key={item}><a href="#" className="hover:text-foreground transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          {/* My Account */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-foreground mb-5">My Account</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {["Make a Payment", "Manage Payment Options", "My Balance", "Shopping Lists", "Order History", "Start a Return", "Track Orders"].map((item) => (
                <li key={item}><a href="#" className="hover:text-foreground transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-foreground mb-5">Customer Service</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {["Manufacturer Partners", "Meet Customer Service", "FAQs", "Shipping Policy", "Return Policy"].map((item) => (
                <li key={item}><a href="#" className="hover:text-foreground transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          {/* Services & Resources */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-foreground mb-5">Services &amp; Resources</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {["Dental Repair Services", "Equipment Solutions", "Financial Services", "Klas Solutions", "Blog", "Popular Dental Products", "Webinars", "Sitemap"].map((item) => (
                <li key={item}><a href="#" className="hover:text-foreground transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

        </div>

        {/* Payment icons */}
        <div className="flex justify-end items-center gap-3 mt-10 pt-6 border-t border-border">
          {/* Visa */}
          <div className="flex items-center justify-center bg-white border border-border rounded px-3 py-1.5 h-9">
            <span className="text-[#1A1F71] font-extrabold text-sm tracking-tight">VISA</span>
          </div>
          {/* Mastercard */}
          <div className="flex items-center justify-center bg-white border border-border rounded px-2 py-1.5 h-9 gap-0.5">
            <div className="h-5 w-5 rounded-full bg-[#EB001B] opacity-90" />
            <div className="h-5 w-5 rounded-full bg-[#F79E1B] opacity-90 -ml-2" />
          </div>
          {/* Amex */}
          <div className="flex items-center justify-center bg-[#2557D6] border border-[#2557D6] rounded px-3 py-1.5 h-9">
            <span className="text-white font-extrabold text-xs tracking-widest">AMEX</span>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-3 py-4 text-xs text-muted-foreground">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            {["Privacy Policy", "Do Not Sell My Personal Information", "Terms of Sale", "Email Preferences"].map((item, i, arr) => (
              <span key={item} className="flex items-center gap-3">
                <a href="#" className="hover:text-foreground transition-colors">{item}</a>
                {i < arr.length - 1 && <span className="text-border">|</span>}
              </span>
            ))}
          </div>
          <span>© 2026 Safco Dental Supply LLC. All Rights Reserved.</span>
        </div>
      </div>
    </footer>
  );
};

export default SafcoFooter;
