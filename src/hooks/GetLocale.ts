"use client";
import { usePathname } from "next/navigation";

const GetLocale = () => {
    const pathname = usePathname();
    const locale = pathname.split("/")[1] || "en";
    return locale;
};

export default GetLocale;