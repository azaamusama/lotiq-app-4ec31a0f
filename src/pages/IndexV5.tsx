import { useState } from "react";
import SafcoHeaderV5 from "@/components/v5/SafcoHeaderV5";
import PromoBannerV4 from "@/components/v4/PromoBannerV4";
import HeroPromoGrid from "@/components/HeroPromoGrid";
import CategoryGrid from "@/components/CategoryGrid";
import BrandStrip from "@/components/BrandStrip";
import DealProductRow from "@/components/DealProductRow";
import PromoBanners from "@/components/PromoBanners";
import BuyingGuides from "@/components/BuyingGuides";
import TrustSignals from "@/components/TrustSignals";
import SKUPadInjector from "@/components/SKUPadInjector";
import SafcoFooter from "@/components/SafcoFooter";
import ServiceSolutions from "@/components/ServiceSolutions";
import IndustryPartnerships from "@/components/IndustryPartnerships";
import WelcomeHeroV3 from "@/components/v3/WelcomeHeroV3";

const IndexV5 = () => {
  const [showModal, setShowModal] = useState(true);

  return (
    <div className="min-h-screen bg-background theme-v5">
      <SafcoHeaderV5 />

      {/* Onboarding Modal Overlay */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-foreground/50 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          />
          <div className="relative z-10 w-full max-w-3xl mx-4 rounded-2xl shadow-2xl overflow-hidden border border-border">
            <WelcomeHeroV3 onComplete={() => setShowModal(false)} />
          </div>
        </div>
      )}

      <main>
        <PromoBannerV4 />
        <HeroPromoGrid />
        <DealProductRow title="Deals just for you" subtitle="Competitive pricing on your most-ordered consumables" />
        <BrandStrip />
        <PromoBanners />
        <DealProductRow title="Top favorites" subtitle="Popular products from trusted brands" />
        <IndustryPartnerships />
        <ServiceSolutions />
        <CategoryGrid />
        <BuyingGuides />
        <TrustSignals />
      </main>
      <SafcoFooter />
      <SKUPadInjector />
    </div>
  );
};

export default IndexV5;
