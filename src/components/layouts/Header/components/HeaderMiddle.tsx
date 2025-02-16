import { Images, Lightbulb, PhoneCall, Warehouse } from "lucide-react";

const HeaderMiddle = () => {
  return (
    <div className="order-1 sm:order-0 sm:ml-auto">
      <nav className="hidden lg:flex gap-6">
        <a
          href="#heroSection"
          className="relative text-primary font-medium sm:hidden flex flex-col items-center text-sm"
        >
          <Warehouse className="text-lg sm:hidden" />
          Home
        </a>
        <a
          href="#worksSection"
          className="relative text-primary font-medium flex flex-col sm:flex-row items-center gap-1 sm:gap-0 text-sm"
        >
          <Images className="text-lg sm:hidden" />
          Our Work
        </a>
        <a
          href="#skillsSection"
          className="relative text-primary font-medium flex flex-col sm:flex-row items-center gap-1 sm:gap-0 text-sm"
        >
          <Lightbulb className="text-lg sm:hidden" />
          Skills
        </a>
        <a
          href="#contactSection"
          className="relative text-primary font-medium flex flex-col sm:flex-row items-center gap-1 sm:gap-0 text-sm"
        >
          <PhoneCall className="text-lg sm:hidden" />
          Contact Me
        </a>
      </nav>
    </div>
  );
};

export default HeaderMiddle;
