import { Routes } from "@/utils/constants";
import { Images, Lightbulb, PhoneCall, Warehouse } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

const Links = [
  { href: Routes.ROOT, label: "home", icon: Warehouse },
  { href: "#projectsSection", label: "projects", icon: Images },
  { href: "#skillsSection", label: "skills", icon: Lightbulb },
  { href: "#contactSection", label: "contactMe", icon: PhoneCall },
];

const HeaderMiddle = () => {
  const t = useTranslations("Header");

  return (
    <div className=" sm:order-none sm:ms-auto fixed bottom-0 left-0 w-full bg-primaryTint90 shadow-[-4px_0_20px_0_rgba(0,0,0,0.2)] z-10 sm:relative sm:bg-transparent sm:shadow-none inset">
      <nav className="flex justify-around p-2 sm:justify-end sm:gap-6 sm:p-4">
        {Links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="relative text-primary title-font flex flex-col items-center text-sm sm:flex-row sm:gap-1 sm:hover:before:w-full sm:hover:before:[inset-inline-start:0] sm:before:absolute sm:before:-bottom-1 sm:before:duration-300 sm:before:[inset-inline-end:0] sm:before:w-0 sm:before:h-0.5 sm:before:bg-primary sm:before:transition-all"
          >
            <link.icon className="text-lg sm:hidden" />
            {t(link.label)}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default HeaderMiddle;
