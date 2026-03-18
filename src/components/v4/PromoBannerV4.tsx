import bannerSafcoBrand2 from "@/assets/banner-safco-brand-april-2.jpg";

const PromoBannerV4 = () => (
  <section className="w-full py-3">
    <div className="container">
      <img
        src={bannerSafcoBrand2}
        alt="Safco Dental Supply Brand Products"
        className="w-full object-cover object-center block rounded-xl"
        style={{ maxHeight: "160px" }}
      />
    </div>
  </section>
);

export default PromoBannerV4;

