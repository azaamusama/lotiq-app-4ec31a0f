import bannerMintyGreen from "@/assets/banner-minty-green.webp";

const PromoBannerV4 = () => (
  <section className="w-full py-3">
    <div className="container">
      <img
        src={bannerMintyGreen}
        alt="Minty Green Savings Week – Buy 3 Get 1 Free on Select Products"
        className="w-full h-auto block rounded-xl"
      />
    </div>
  </section>
);

export default PromoBannerV4;

