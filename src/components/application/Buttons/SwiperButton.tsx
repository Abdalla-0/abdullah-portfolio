import { ChevronLeft } from "lucide-react";

type Props = {
  color?: string;
  width?: number;
  height?: number;
  direction?: "start" | "end";
  className?: string;
};
const SwiperButton = ({ direction = "start", className }: Props) => {
  return (
    <button
      className={`relative flex justify-center items-center w-[34px] h-[34px] md:w-11 md:h-11 rounded-full bg-primary ar:rotate-180 ${className} transition-all duration-300 hover:bg-primary-shade-40 hover:scale-105 active:scale-95`}
    >
      <ChevronLeft
        className={`w-6 h-6 md:w-8 md:h-8 text-white ${
          direction === "end" ? "rotate-180" : ""
        }`}
      />
    </button>
  );
};

export default SwiperButton;
