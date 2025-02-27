import LocaleSwitcher from "@/components/common/LocaleSwitcher/LocaleSwitcher";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

const HeaderEnd = () => {
  const t = useTranslations("Header");
  return (
    <div className="flex items-center gap-2 sm:gap-4 max-sm:ms-auto">
      <a href="#contactSection">
        <Button className="btn-primary">{t("callToAction")}</Button>
      </a>
      <LocaleSwitcher />
    </div>
  );
};

export default HeaderEnd;
