import {defineRouting} from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ru", "am"],
  defaultLocale: "en",
  localePrefix: "never",
  localeDetection: true,
});

export type AppLocale = (typeof routing.locales)[number];
