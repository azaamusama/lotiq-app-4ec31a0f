import { useState } from "react";
import SafcoHeaderV3 from "@/components/v3/SafcoHeaderV3";
import WelcomeHeroV3 from "@/components/v3/WelcomeHeroV3";
import PersonalizedSectionV3 from "@/components/v3/PersonalizedSectionV3";
import AccountPromptV3 from "@/components/v3/AccountPromptV3";
import EssentialsStarterV3 from "@/components/v3/EssentialsStarterV3";
import TrustBannerV3 from "@/components/v3/TrustBannerV3";
import SafcoFooter from "@/components/SafcoFooter";
import SKUPadInjector from "@/components/SKUPadInjector";

const IndexV3 = () => {
  const [onboarded, setOnboarded] = useState(false);
  const [practice, setPractice] = useState("general");
  const [lookingFor, setLookingFor] = useState("explore");

  const handleOnboardingComplete = (p: string, lf: string) => {
    setPractice(p);
    setLookingFor(lf);
    setOnboarded(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <SafcoHeaderV3 />
      <main>
        {!onboarded && (
          <WelcomeHeroV3 onComplete={handleOnboardingComplete} />
        )}
        {onboarded && (
          <>
            <PersonalizedSectionV3 practice={practice} lookingFor={lookingFor} />
            <AccountPromptV3 />
          </>
        )}
        <EssentialsStarterV3 />
        <TrustBannerV3 />
      </main>
      <SafcoFooter />
      <SKUPadInjector />
    </div>
  );
};

export default IndexV3;
