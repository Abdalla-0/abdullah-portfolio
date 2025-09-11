import { useTranslations } from "next-intl";

const AdsSection = () => {
  const t = useTranslations("HomePage.AdsSection");

  return (
    <section className="relative py-[100px] bg-[url('/ads.jpg')] bg-cover bg-no-repeat bg-fixed z-[1] before:content-[''] before:absolute before:top-0 before:start-0 before:w-full before:h-full before:bg-black/70 before:z-[-1]">
      <div className="container flex flex-col lg:flex-row lg:justify-between items-center gap-10 text-white text-center lg:text-start">
        <div className="lg:w-1/2">
          <h2 className="text-[50px] font-bold leading-[1] mb-4">
            {t("title")}
          </h2>
          <p className="text-lg">{t("description")}</p>
        </div>
        <a
          href="#contactSection"
          className="btn btn-primary text-lg h-[50px] px-6"
        >
          {t("cta")}
        </a>
      </div>
    </section>
  );
};

export default AdsSection;
