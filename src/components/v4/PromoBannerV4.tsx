import { Link } from "react-router-dom";
import bannerHygienBundle from "@/assets/banner-hygiene-bundle.png";

const PromoBannerV4 = () => (
  <section className="w-full py-3">
    <div className="container">
      <Link to="/category/hygiene-bundle" className="block">
        <img
          src={bannerHygienBundle}
          alt="Save 25% on Safco Brand Hygiene Bundle"
          className="w-full h-auto block rounded-xl transition-opacity hover:opacity-90"
        />
      </Link>
    </div>
  </section>
);

export default PromoBannerV4;

