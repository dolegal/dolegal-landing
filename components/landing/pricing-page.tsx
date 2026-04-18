"use client";

import { useTranslations } from "next-intl";
import type { LandingContent } from "./content";
import { MarketingShell } from "./marketing-shell";
import { PricingSection } from "./pricing-section";

export function PricingPage() {
  const t = useTranslations();
  const content = t.raw("landing") as LandingContent;

  return (
    <MarketingShell>
      <main className="[font-family:var(--font-outfit)] pt-[104px]">
        <PricingSection pricing={content.pricing} />
      </main>
    </MarketingShell>
  );
}
