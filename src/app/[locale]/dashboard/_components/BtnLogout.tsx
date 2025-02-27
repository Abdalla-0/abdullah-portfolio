"use client";
import { Button } from "@/components/ui/button";
import { actionLogout } from "@/server/actions/auth";
import { Languages, Routes } from "@/utils/constants";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

const BtnLogout = () => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || Languages.ENGLISH;
  const t = useTranslations("Common");
  const handleLogout = async () => {
    await actionLogout();
    router.push(`/${locale}/${Routes.LOGIN}`);
    router.refresh();
  };

  return (
    <div>
      <Button
        onClick={handleLogout}
        className="bg-primaryTint90 hover:bg-primaryTint80 px-6 py-2 rounded-lg transition duration-300 ms-10"
      >
        {t("logout")}
      </Button>
    </div>
  );
};

export default BtnLogout;
