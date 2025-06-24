import createMiddleware from "next-intl/middleware";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./utilis/session";
import {
  isAuthorizedRole,
  isProtectedRoute,
  removeLocales,
} from "./utilis/routes";

const locales = ["ar", "en"];

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: "ar",
});

// export default createMiddleware({
//   locales: ["ar", "en"],
//   defaultLocale: "ar",
// });

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const { path, matchedLocale } = removeLocales(pathname, locales);

  const reqCookies = await cookies();
  const tokenCookie = reqCookies?.get("token")?.value;
  const session = await decrypt(tokenCookie);
  const routeProtected = isProtectedRoute(path);
  const isAuthorized = isAuthorizedRole(path, ["ADMIN"]);
  const loggedIn = !!session?.id;
  console.log(routeProtected, loggedIn);
  if (routeProtected && !loggedIn) {
    return NextResponse.redirect(
      new URL(`${matchedLocale}/auth/login`, request.url)
    );
  } else if (!routeProtected && loggedIn) {
    return NextResponse.redirect(
      new URL(`${matchedLocale}/portal`, request.url)
    );
  } else if (routeProtected && loggedIn && !isAuthorized) {
    return NextResponse.redirect(
      new URL(`${matchedLocale}/unauthorized`, request.url)
    );
  }
  // if (!isProtected && session?.id)
  //   return NextResponse.redirect(
  //     new URL(`${matchedLocale}/portal`, request.url)
  //   );
  return intlMiddleware(request);
}

export const config = {
  matcher: ["/", "/(ar|en)/:path*"],
};
