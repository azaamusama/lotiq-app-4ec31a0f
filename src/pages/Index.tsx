import SafcoHeader from "@/components/SafcoHeader";
import HeroSplitUtility from "@/components/HeroSplitUtility";
import CategoryGrid from "@/components/CategoryGrid";
import EssentialsRow from "@/components/EssentialsRow";
import PromoGrid from "@/components/PromoGrid";
import TrustSignals from "@/components/TrustSignals";
import BuyingGuides from "@/components/BuyingGuides";
import SKUPadInjector from "@/components/SKUPadInjector";
import SafcoFooter from "@/components/SafcoFooter";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SafcoHeader />
      <main>
        <HeroSplitUtility />
        <CategoryGrid />
        <EssentialsRow />
        <PromoGrid />
        <BuyingGuides />
        <TrustSignals />
      </main>
      <SafcoFooter />
      <SKUPadInjector />
    </div>
  );
};

export default Index;
