export function removeLocales(path: string, locales: string[]) {
  let finalPath = path;
  let matchedLocale = "";
  locales.forEach((locale) => {
    if (path.startsWith(`/${locale}`)) {
      matchedLocale = `/${locale}`;
      finalPath = finalPath.replace(`/${locale}`, "");
    }
  });
  return { path: finalPath, matchedLocale };
}

const routeConfig: RouteConfig[] = [
  {
    path: /\/auth.*/,
    isProtected: false,
  },
  {
    path: "/unauthorized",
    isProtected: true,
    roles: [],
  },
  {
    path: "/portal",
    isProtected: true,
    roles: [],
  },
  {
    path: "/portal/medicines",
    isProtected: true,
    roles: [],
  },
  {
    path: "/portal/medicines/:medicineId",
    isProtected: true,
    roles: ["ADMIN"],
  },
  {
    path: "/portal/employees",
    isProtected: true,
    roles: [],
  },
  {
    path: "/portal/employees/:employeeId",
    isProtected: true,
    roles: [],
  },
  {
    path: "/portal/chat",
    isProtected: true,
    roles: ["ADMIN"],
  },
];

type RouteConfig = {
  path: RegExp | string;
} & (
  | {
      isProtected: true;
      roles: string[];
    }
  | {
      isProtected: false;
      roles?: never;
    }
);

export function isProtectedRoute(path: string) {
  const route = routeConfig.find((routeConfiguration) => {
    if (
      typeof routeConfiguration.path === "string" &&
      !routeConfiguration.path.includes(":")
    ) {
      return routeConfiguration.path === path;
    } else if (
      typeof routeConfiguration.path === "string" &&
      routeConfiguration.path.includes(":")
    ) {
      const regex = new RegExp(
        routeConfiguration.path.replace(/:[^\s/]+/g, "[^/]+")
      );
      return regex.test(path);
    }
    return (routeConfiguration.path as RegExp).test(path);
  });
  return route?.isProtected || false;
}

export function isAuthorizedRole(path: string, roles: string[]) {
  const route = routeConfig.find((routeConfiguration) => {
    if (
      typeof routeConfiguration.path === "string" &&
      !routeConfiguration.path.includes(":")
    ) {
      return routeConfiguration.path === path;
    } else if (
      typeof routeConfiguration.path === "string" &&
      routeConfiguration.path.includes(":")
    ) {
      const regex = new RegExp(
        routeConfiguration.path.replace(/:[^\s/]+/g, "[^/]+")
      );
      return regex.test(path);
    }
    return (routeConfiguration.path as RegExp).test(path);
  });
  if (!route) return true;
  if (!route.isProtected) return true;
  if (route?.roles?.length === 0) return true;
  return roles.some((role) => route?.roles?.includes(role));
}
