import { Phone, Mail, MapPin } from "lucide-react";
import safcoLogo from "@/assets/safco-logo.png";

const SafcoFooter = () => {
  return (
    <footer className="bg-foreground text-card py-10">
      <div className="container">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <img src={safcoLogo} alt="Safco Dental Supply" className="h-8 w-auto brightness-0 invert mb-4" />
            <p className="text-xs text-card/60 leading-relaxed">
              Your trusted partner for dental supplies since 1941. 30,000+ professional products, same-day shipping, and dedicated support.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3">Shop</h4>
            <ul className="space-y-2 text-xs text-card/60">
              <li><a href="#" className="hover:text-card transition-colors">All Products</a></li>
              <li><a href="#" className="hover:text-card transition-colors">Burs & Diamonds</a></li>
              <li><a href="#" className="hover:text-card transition-colors">Restorative</a></li>
              <li><a href="#" className="hover:text-card transition-colors">Infection Control</a></li>
              <li><a href="#" className="hover:text-card transition-colors">Equipment & Services</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3">Account</h4>
            <ul className="space-y-2 text-xs text-card/60">
              <li><a href="#" className="hover:text-card transition-colors">Sign In</a></li>
              <li><a href="#" className="hover:text-card transition-colors">Order History</a></li>
              <li><a href="#" className="hover:text-card transition-colors">Quick Order</a></li>
              <li><a href="#" className="hover:text-card transition-colors">VIP Program</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3">Contact</h4>
            <ul className="space-y-2 text-xs text-card/60">
              <li className="flex items-center gap-2"><Phone className="h-3 w-3" /> (800) 621-2178</li>
              <li className="flex items-center gap-2"><Mail className="h-3 w-3" /> support@safcodental.com</li>
              <li className="flex items-center gap-2"><MapPin className="h-3 w-3" /> Buffalo Grove, IL</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-card/10 pt-6 text-center text-[10px] text-card/40">
          © 2025 Safco Dental Supply. All rights reserved. | Privacy Policy | Terms of Service
        </div>
      </div>
    </footer>
  );
};

export default SafcoFooter;
