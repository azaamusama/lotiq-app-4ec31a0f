import SafcoHeaderV2 from "@/components/v2/SafcoHeaderV2";
import HeroV2 from "@/components/v2/HeroV2";
import SmartReorderV2 from "@/components/v2/SmartReorderV2";
import CategoryGridV2 from "@/components/v2/CategoryGridV2";
import PromosV2 from "@/components/v2/PromosV2";
import BrandsV2 from "@/components/v2/BrandsV2";
import TrustV2 from "@/components/v2/TrustV2";
import ContentHubV2 from "@/components/v2/ContentHubV2";
import SafcoFooter from "@/components/SafcoFooter";
import SKUPadInjector from "@/components/SKUPadInjector";

const IndexV2 = () => {
  return (
    <div className="min-h-screen bg-v2-section">
      <SafcoHeaderV2 />
      <main>
        <HeroV2 />
        <SmartReorderV2 />
        <CategoryGridV2 />
        <PromosV2 />
        <BrandsV2 />
        <TrustV2 />
        <ContentHubV2 />
      </main>
      <SafcoFooter />
      <SKUPadInjector />
    </div>
  );
};

export default IndexV2;
