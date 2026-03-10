import SafcoHeader from "@/components/SafcoHeader";
import HeroPromoGrid from "@/components/HeroPromoGrid";
import CategoryGrid from "@/components/CategoryGrid";
import BrandStrip from "@/components/BrandStrip";
import DealProductRow from "@/components/DealProductRow";
import PromoBanners from "@/components/PromoBanners";
import BuyingGuides from "@/components/BuyingGuides";
import TrustSignals from "@/components/TrustSignals";
import SKUPadInjector from "@/components/SKUPadInjector";
import SafcoFooter from "@/components/SafcoFooter";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SafcoHeader />
      <main>
        <HeroPromoGrid />
        <DealProductRow title="Deals just for you" subtitle="Competitive pricing on your most-ordered consumables" />
        <BrandStrip />
        <PromoBanners />
        <DealProductRow title="Top favorites" subtitle="Popular products from trusted brands" />
        <CategoryGrid />
        <BuyingGuides />
        <TrustSignals />
      </main>
      <SafcoFooter />
      <SKUPadInjector />
    </div>
  );
};

export default Index;
