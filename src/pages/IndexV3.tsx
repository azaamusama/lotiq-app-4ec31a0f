import SafcoHeaderV3 from "@/components/v3/SafcoHeaderV3";
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

const IndexV3 = () => {
  return (
    <div className="min-h-screen bg-background">
      <SafcoHeaderV3 />
      <main>
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

export default IndexV3;
