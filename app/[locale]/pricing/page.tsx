import { getTranslations } from "next-intl/server";
import { PricingPage } from "@/components/landing/pricing-page";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "landing" });

  return {
    title: `${t("pricing.sectionLabel")} · DoLegal`,
    description: t("pricing.description"),
  };
}

export default function PricingRoutePage() {
  return <PricingPage />;
}
