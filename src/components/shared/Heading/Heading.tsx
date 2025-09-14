import { memo } from "react";
import { useTranslations } from "next-intl";

interface HeadingProps {
  title: string;
  className?: string;
}

const Heading = memo(({ title, className }: HeadingProps) => {
  const t = useTranslations("Common.Heading");
  return (
    <h2
      className={`pb-10 text-4xl font-bold text-primary text-center md:text-6xl ${
        className || ""
      }`}
    >
      {t(title)}
    </h2>
  );
});

export default Heading;

Heading.displayName = "Heading";
