import { Routes } from "@/utils/constants";
import Image from "next/image";
import Link from "next/link";

const HeaderStart = () => {
  return (
    <Link
      href={Routes.ROOT}
      className="flex flex-col items-center justify-center"
    >
      <span className="inline-flex">
        <Image
          src="/assets/svg/brand.svg"
          alt="Brand Icon"
          width={80}
          height={80}
          className="w-20 h-20 sm:w-16 sm:h-16"
        />
      </span>
      <h2 className="text-4xl font-bold text-primary sm:text-2xl">
        Abdalla
      </h2>
    </Link>
  );
};

export default HeaderStart;
