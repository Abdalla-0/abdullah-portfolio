import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { routing } from "./i18n/routing";
import { Languages, Routes } from "./utils/constants";

export function middleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname;
    const locale = pathname.split("/")[1] || Languages.ENGLISH;
    const token = req.cookies.get("admin-token")?.value;


    const protectedRoutes = [`/${locale}/${Routes.DASHBOARD}`];

    const intlMiddleware = createMiddleware(routing);


    if (protectedRoutes.some((route) => pathname.startsWith(route))) {
        if (!token) {
            const loginUrl = new URL(`/${locale}/${Routes.LOGIN}`, req.url);
            return NextResponse.redirect(loginUrl);
        }
    }


    if (pathname.startsWith(`/${locale}/${Routes.LOGIN}`) && token) {
        const dashboardUrl = new URL(`/${locale}/${Routes.DASHBOARD}/${Routes.PROJECTS}`, req.url);
        return NextResponse.redirect(dashboardUrl);
    }


    return intlMiddleware(req);
}

// تحديد الـ Matcher
export const config = {
    matcher: ["/", "/(en|ar)/:path*", "/dashboard/:path*", "/login"],
};