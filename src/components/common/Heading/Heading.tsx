import { memo } from "react";
import { useTranslations } from "next-intl";

interface HeadingProps {
  textKey: string;
  classExtra?: string;
}

const Heading = memo(({ textKey, classExtra }: HeadingProps) => {
  const t = useTranslations("Common.Heading");
  return (
    <h2
      className={`pb-10 text-4xl font-bold text-primary text-center md:text-6xl ${
        classExtra || ""
      }`}
    >
      {t(textKey)}
    </h2>
  );
});

export default Heading;

Heading.displayName = "Heading";
