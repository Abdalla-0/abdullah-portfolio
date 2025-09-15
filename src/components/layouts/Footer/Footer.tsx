import { useTranslations } from "next-intl";
import HeaderStart from "../Header/components/HeaderStart";

const Footer = () => {
  const t = useTranslations("Footer");
  const year = new Date().getFullYear();
  return (
    <footer className="grid gap-4 text-white mb-[60px] sm:mb-0 p-2 bg-primaryShade20 mt-20">
      <div className="container mx-auto flex flex-col items-center gap-4">
        <HeaderStart color="text-text" width={100} height={100} />

        <div className="flex items-center gap-1 ar:text-lg">
          © {year}
          <span className="text-[#222222] font-bold tracking-[1px]">
            {t("brandName")}
          </span>
          . {t("copyright")}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
