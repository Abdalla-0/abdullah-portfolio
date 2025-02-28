import { buttonVariants } from "@/components/ui/button";
import { ArrowRightCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
const BtnNewItem = ({ title, link }: { title: string; link: string }) => {
  const t = useTranslations("Dashboard");
  return (
    <Link
      href={link}
      className={`${buttonVariants({
        variant: "outline",
      })} !mx-auto !flex !w-80 !h-10 mb-8`}
    >
      {t(title)}
      <ArrowRightCircle className={`!w-5 !h-5 rtl:rotate-180`} />
    </Link>
  );
};

export default BtnNewItem;
