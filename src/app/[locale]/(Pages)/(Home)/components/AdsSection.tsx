import { useTranslations } from "next-intl";

const AdsSection = () => {
  const t = useTranslations("HomePage.AdsSection");

  return (
    <section className="relative py-20 flex items-center h-[500px] bg-[url('/ads.jpg')] bg-cover bg-no-repeat bg-fixed z-[1] before:content-[''] before:absolute before:top-0 before:start-0 before:w-full before:h-full before:bg-black/70 before:z-[-1]">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-y-4 gap-x-10 lg:gap-x-20 col-1gap-10 text-white text-center md:text-start">
        <div className="flex-1">
          <h2 className="text-[50px] ar:lg:text-[60px] font-bold leading-tight mb-4">
            {t("title")}
          </h2>
          <p className="text-xl">{t("description")}</p>
        </div>
        <a
          href="#contactSection"
          className="btn btn-primary text-lg h-[50px] px-6 w-fit"
        >
          {t("cta")}
        </a>
      </div>
    </section>
  );
};

export default AdsSection;
