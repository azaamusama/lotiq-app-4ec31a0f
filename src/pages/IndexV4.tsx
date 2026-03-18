import { useState } from "react";
import SafcoHeaderV3 from "@/components/v3/SafcoHeaderV3";
import HeroBannerV4 from "@/components/v4/HeroBannerV4";

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

const IndexV4 = () => {
  const [showModal, setShowModal] = useState(true);

  const handleOnboardingComplete = () => {
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <SafcoHeaderV3 />

      {/* Onboarding Modal Overlay */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-foreground/50 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          />
          {/* Modal Panel */}
          <div className="relative z-10 w-full max-w-3xl mx-4 rounded-2xl shadow-2xl overflow-hidden border border-border">
            <WelcomeHeroV3 onComplete={handleOnboardingComplete} />
          </div>
        </div>
      )}

      <main>
        <HeroBannerV4 />
        
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

export default IndexV4;
