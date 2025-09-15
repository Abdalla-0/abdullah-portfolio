"use client";
import { Routes } from "@/utils/constants";
import { Download, Github, Linkedin } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  const t = useTranslations("HomePage.HeroSection");

  return (
    <div
      id="heroSection"
      className="-mt-4 relative pt-8 pb-24 md:pt-20 before:absolute before:top-[-124px] before:left-1/2 before:-translate-x-1/2 before:w-full before:h-[700px] before:bg-gradient-to-b before:from-[color-mix(in_srgb,var(--color-primary),white_90%)] before:to-transparent before:z-[-1]
      after:content-['HI'] after:font-russo after:absolute after:opacity-20 after:start-[20%] after:top-[10%] after:-translate-x-1/2 after:text-[200px] after:z-[-1] after:text-transparent after:[-webkit-text-stroke-width:2px] after:[-webkit-text-stroke-color:var(--color-primary)] after:opacity-16 after:animate-scaleBounce ltr:after:start-[20%] rtl:after:end-[80%]
      "
    >
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-4 relative">
          {/* Left Side */}
          <div className="flex flex-col lg:gap-4">
            <h3 className="text-start text-4xl font-semibold">
              {t("greeting")}
            </h3>
            <h1
              className={`font-phobos text-[47px] md:text-[60px] xl:text-[69px] 2xl:text-[80px] font-bold bg-gradient-to-r rtl:bg-gradient-to-l from-[var(--color-primary)] to-[rgba(0,0,0,0.2)] bg-clip-text text-transparent leading-tight`}
            >
              {t("role")}
            </h1>
            <p className="text-gray-600 text-lg ar:mt-3">{t("description")}</p>
            <div className="flex flex-wrap items-center gap-4 mt-4">
              <Link
                href={`${Routes.CV}`}
                target="_blank"
                className="flex items-center gap-2 px-6 py-3 border border-primary text-primary rounded-full hover:bg-primary hover:text-white transition"
              >
                {t("download_cv")} <Download size={20} />
              </Link>
              <div className="flex gap-4">
                <Link
                  href={Routes.LINKEDIN}
                  target="_blank"
                  className="p-3 border border-primary text-primary rounded-full hover:bg-primary hover:text-white transition"
                  aria-label={t("linkedin")}
                >
                  <Linkedin size={20} />
                </Link>
                <Link
                  href={Routes.GITHUB}
                  target="_blank"
                  className="p-3 border border-primary text-primary rounded-full hover:bg-primary hover:text-white transition"
                  aria-label={t("github")}
                >
                  <Github size={20} />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="relative flex justify-center">
            <div className="px-[50px] lg:px-[80px] w-[90%] h-[300px] sm:w-[450px] sm:h-[450px] bg-primary p-6 rounded-3xl transform rotate-3 border-4 border-opacity-20 border-black transition hover:rotate-0 overflow-hidden">
              <Image
                src="/me.png"
                alt="Abdalla"
                width={0}
                height={0}
                sizes="100vw"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
