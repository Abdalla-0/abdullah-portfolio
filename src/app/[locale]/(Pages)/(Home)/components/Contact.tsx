"use client";
import { Routes } from "@/utils/constants";
import { Github, Linkedin, PhoneCall } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

const Contact = () => {
  const t = useTranslations("HomePage.Contact");
  return (
    <section id="contactSection" className="py-20">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12">
          {/* Contact Info */}
          <div className="flex flex-col gap-8 text-lg">
            <h2 className="text-start text-5xl md:text-5xl font-bold text-primary">
              {t("title")}
            </h2>

            <div className="flex items-center gap-4 text-2xl">
              <PhoneCall className="w-10 h-10 p-2 rounded-md bg-primary text-text" />
              <span className="text-primary">+20 1118125994</span>
            </div>

            <a
              href={Routes.LINKEDIN}
              target="_blank"
              className="flex items-center gap-4 text-2xl"
            >
              <Linkedin className="w-10 h-10 p-2 element-center rounded-md bg-primary text-text" />
              <span className="text-primary">LinkedIn</span>
            </a>

            <a
              href={Routes.GITHUB}
              target="_blank"
              className="flex items-center gap-4 text-2xl"
            >
              <Github className="w-10 h-10 p-2 rounded-md bg-primary text-text" />
              <span className="text-primary">GitHub</span>
            </a>
          </div>

          {/* Contact Image */}
          <div className="flex justify-center rounded-xl p-8 bg-primaryTint90 shadow-[-20px_20px_10px_10px_rgba(0,0,0,0.2)] order-first md:order-none">
            <Image
              src="/contact.png"
              className="w-full h-auto object-contain"
              alt="Contact Image"
              width={0}
              height={0}
              sizes="100vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
