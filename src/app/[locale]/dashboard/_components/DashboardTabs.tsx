"use client";

import { Routes } from "@/utils/constants";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BtnLogout from "./BtnLogout";

function DashboardTabs({ locale }: { locale: string }) {
  const tabs = [
    {
      id: crypto.randomUUID(),
      title: "projects",
      href: Routes.PROJECTS,
    },
    {
      id: crypto.randomUUID(),
      title: "skills",
      href: Routes.SKILLS,
    },
  ];

  const t = useTranslations("Dashboard.Routes");
  const pathname = usePathname();
  const matchedTab = tabs.find((tab) => pathname.includes(tab.href));
  const currentTab = matchedTab ? matchedTab.href : "";
  return (
    <nav className="mt-20 mb-20">
      <ul className="element-center flex-wrap gap-4">
        {tabs.map((tab) => (
          <li key={tab.id}>
            <Link
              href={`/${locale}/${Routes.DASHBOARD}/${tab.href}`}
              className={`px-6 py-2 rounded-lg transition duration-300 ${
                currentTab === tab.href
                  ? "btn btn-primary !rounded-lg"
                  : "bg-primaryTint90 hover:bg-primaryTint80"
              }`}
            >
              {t(tab.title)}
            </Link>
          </li>
        ))}
        <li>
          <BtnLogout />
        </li>
      </ul>
    </nav>
  );
}

export default DashboardTabs;
