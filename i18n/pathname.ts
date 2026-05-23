import {routing, type AppLocale} from "./routing";

/** Pathname without a leading locale segment (e.g. `/ru/pricing` → `/pricing`). */
export function stripLocalePrefix(pathname: string): string {
  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const segments = normalized.split("/").filter(Boolean);
  const first = segments[0];

  if (first && routing.locales.includes(first as AppLocale)) {
    const rest = segments.slice(1);
    return rest.length > 0 ? `/${rest.join("/")}` : "/";
  }

  return normalized || "/";
}
