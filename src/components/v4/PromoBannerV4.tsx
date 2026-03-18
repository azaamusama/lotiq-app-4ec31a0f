import bannerSafcoBrand from "@/assets/banner-safco-brand-april.jpg";

const PromoBannerV4 = () => (
  <section className="w-full py-3">
    <div className="container">
      <img
        src={bannerSafcoBrand}
        alt="Safco Dental Supply Brand Products"
        className="w-full object-cover object-center block rounded-xl"
        style={{ maxHeight: "160px" }}
      />
    </div>
  </section>
);

export default PromoBannerV4;

