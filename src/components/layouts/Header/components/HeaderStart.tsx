import { Routes } from "@/utils/constants";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

const HeaderStart = ({
  color = "text-primary",
  width = 70,
  height = 70,
}: {
  color?: string;
  width?: number;
  height?: number;
}) => {
  const t = useTranslations("Header");
  return (
    <Link
      href={Routes.ROOT}
      className="flex flex-col items-center justify-center"
    >
      <Image
        src="/assets/svg/brand.svg"
        alt="Brand Icon"
        width={width}
        height={height}
      />
      <h2 className={`text-xl sm:text-3xl font-bold ${color} -mt-2`}>
        {t("brandName")}
      </h2>
    </Link>
  );
};

export default HeaderStart;
