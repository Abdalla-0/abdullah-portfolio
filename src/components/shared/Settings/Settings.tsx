"use client";
import { Languages, Routes } from "@/utils/constants";
import { SettingsIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const colorThemes = {
  purple: "#783cb4",
  green: "#339966",
  yellow: "#ffbf00",
  blue: "#306ee8",
};

const Settings = () => {
  const [theme, setTheme] = useState({
    bgColor: "#783cb4",
    textColor: "#ffffff",
  });

  const [isMenu, setIsMenu] = useState(false);

  // const switchColorHandler = (bgColor: string, textColor: string) => {
  //   document.documentElement.style.setProperty("--color-primary", bgColor);
  //   document.documentElement.style.setProperty("--color-text", textColor);
  //   localStorage.setItem("theme", JSON.stringify({ bgColor, textColor }));
  //   setTheme({ bgColor, textColor });
  // };

  const pathname = usePathname();
  const locale = pathname.split("/")[1] || Languages.ENGLISH;

  useEffect(() => {
    const savedTheme = localStorage.getItem("app_user_theme");

    if (savedTheme) {
      try {
        const parsedTheme = JSON.parse(savedTheme);
        if (parsedTheme.bgColor) {
          setTheme(parsedTheme);
          document.documentElement.style.setProperty(
            "--color-primary",
            parsedTheme.bgColor,
          );
          document.documentElement.style.setProperty(
            "--color-text",
            parsedTheme.textColor,
          );
          return;
        }
      } catch (error) {
        console.error("Error parsing saved theme:", error);
        localStorage.removeItem("app_user_theme");
      }
    }
    document.documentElement.style.setProperty("--color-primary", "#783cb4");
    document.documentElement.style.setProperty("--color-text", "#ffffff");
  }, []);

  const switchColorHandler = (bgColor: string, textColor: string) => {
    document.documentElement.style.setProperty("--color-primary", bgColor);
    document.documentElement.style.setProperty("--color-text", textColor);
    localStorage.setItem(
      "app_user_theme",
      JSON.stringify({ bgColor, textColor }),
    );
    setTheme({ bgColor, textColor });
  };

  return (
    <div
      className={`fixed top-1/2 -translate-y-1/2 w-[55px] bg-gray-200 py-8 px-4 rounded-l-full transition-all z-20 ${
        isMenu ? "right-0" : "-right-[55px]"
      }`}
    >
      <span
        onClick={() => setIsMenu(!isMenu)}
        className="absolute top-1/2 -translate-y-1/2 right-[100%] w-7 h-7 flex items-center justify-center rounded-full bg-primary cursor-pointer transition-all"
      >
        <SettingsIcon className="w-5 h-5 text-text" />
      </span>

      <div className="flex flex-col gap-1.5">
        {Object.entries(colorThemes).map(([name, value]) => (
          <span
            key={name}
            className={`w-7 h-7 rounded-full cursor-pointer transition-opacity ${
              theme.bgColor === value ? "opacity-100" : "opacity-50"
            }`}
            style={{
              backgroundColor: `${value}`,
            }}
            onClick={() =>
              switchColorHandler(
                value,
                name === "yellow" ? "#2b3035" : "#ffffff",
              )
            }
          ></span>
        ))}
        <Link
          href={`/${locale}/${Routes.DASHBOARD}/${Routes.PROJECTS}`}
          className="element-center w-7 h-7 rounded-full cursor-pointer bg-primary font-bold text-text"
        >
          D
        </Link>
      </div>
    </div>
  );
};

export default Settings;
