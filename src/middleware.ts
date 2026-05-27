import createIntlMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const LOCALES = routing.locales;
const DEFAULT_LOCALE = routing.defaultLocale;
const COOKIE = "NEXT_LOCALE";

function detectLocale(req: NextRequest): string {
  // 1. Manual preference cookie (set when user switches language)
  const cookie = req.cookies.get(COOKIE)?.value;
  if (cookie && LOCALES.includes(cookie as (typeof LOCALES)[number])) {
    return cookie;
  }

  // 2. Accept-Language header
  const al = req.headers.get("accept-language") ?? "";
  if (/zh[-_](?:TW|HK)/i.test(al)) return "zh-TW";
  if (/\bja\b/i.test(al)) return "ja";
  if (/\ben\b/i.test(al)) return "en";

  // 3. Vercel edge IP country header
  const country = req.headers.get("x-vercel-ip-country");
  if (country === "TW" || country === "HK") return "zh-TW";
  if (country === "JP") return "ja";
  if (country) return "en";

  return DEFAULT_LOCALE;
}

const intlMiddleware = createIntlMiddleware(routing);

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Check if path already carries a non-default locale prefix
  const hasLocalePrefix = LOCALES.filter((l) => l !== DEFAULT_LOCALE).some(
    (l) => pathname.startsWith(`/${l}/`) || pathname === `/${l}`
  );

  // Only inject custom detection when path has no locale prefix
  if (!hasLocalePrefix && !req.cookies.has(COOKIE)) {
    const locale = detectLocale(req);
    if (locale !== DEFAULT_LOCALE) {
      const url = req.nextUrl.clone();
      url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
      const res = NextResponse.redirect(url);
      res.cookies.set(COOKIE, locale, {
        maxAge: 60 * 60 * 24 * 365,
        path: "/",
        sameSite: "lax",
      });
      return res;
    }
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
