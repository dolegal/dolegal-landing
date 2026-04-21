"use client";

import {Link} from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";

type PlanId = "free" | "basic" | "pro" | "rocket";
type Period = "monthly" | "annual";

interface Plan {
  id: PlanId;
  num: string;
  kicker: string;
  name: string;
  desc: string;
  base: number;
  priceNote: string;
  ctaLabel: string;
  features: Array<{ text: React.ReactNode; off?: boolean }>;
}

const PLANS: Plan[] = [
  {
    id: "free",
    num: "I.",
    kicker: "Trial",
    name: "Free",
    desc: "Try the research interface with a registered account. For kicking the tyres, not for production work.",
    base: 0,
    priceNote: "Planned launch tier",
    ctaLabel: "Join waitlist",
    features: [
      { text: "8 trial queries (guest)" },
      {
        text: (
          <>
            <b>1,400</b> tokens/month (registered)
          </>
        ),
      },
      { text: "1 saved conversation" },
      { text: "File upload", off: true },
      { text: "Document drafting", off: true },
      { text: "Pinned chats", off: true },
    ],
  },
  {
    id: "basic",
    num: "II.",
    kicker: "Solo · individual",
    name: "Basic",
    desc: "For an independent lawyer or accountant handling 10–20 active matters who needs drafting plus research in one place.",
    base: 8000,
    priceNote: "per month, per seat",
    ctaLabel: "Join waitlist",
    features: [
      {
        text: (
          <>
            <b>40,000</b> tokens/month
          </>
        ),
      },
      {
        text: (
          <>
            File upload up to <b>5 MB</b>
          </>
        ),
      },
      { text: "Document drafting" },
      { text: "3 pinned conversations" },
      { text: "DOCX export" },
      { text: "Document comparison", off: true },
    ],
  },
  {
    id: "pro",
    num: "III.",
    kicker: "Busy practice",
    name: "Pro",
    desc: "For working professionals who draft and research daily, compare documents, and need faster model responses with full history.",
    base: 15000,
    priceNote: "per month, per seat",
    ctaLabel: "Join waitlist",
    features: [
      {
        text: (
          <>
            <b>250,000</b> tokens/month
          </>
        ),
      },
      {
        text: (
          <>
            File upload up to <b>10 MB</b>
          </>
        ),
      },
      { text: "Document comparison" },
      { text: "5 pinned conversations" },
      { text: "Priority AI response" },
      { text: "Full chat history" },
    ],
  },
  {
    id: "rocket",
    num: "IV.",
    kicker: "Firm & team",
    name: "Rocket",
    desc: "For 2–10 person practices that share one knowledge chamber — shared tokens, unlimited pinned chats, dedicated support.",
    base: 25000,
    priceNote: "per month, per team",
    ctaLabel: "Join waitlist",
    features: [
      {
        text: (
          <>
            <b>1,000,000</b> tokens/month
          </>
        ),
      },
      {
        text: (
          <>
            File upload up to <b>25 MB</b>
          </>
        ),
      },
      { text: "Everything in Pro" },
      { text: "Unlimited pinned chats" },
      { text: "Dedicated support" },
      { text: "Team usage (shared tokens)" },
    ],
  },
];

const FEATURED: PlanId = "pro";

export function PlansAndBilling() {
  const [period, setPeriod] = useState<Period>("monthly");
  const tP = useTranslations("landing.pricingParity");
  const tPricing = useTranslations("landing.pricing");
  const rawPlans = [0, 1, 2, 3].map(i => tPricing.raw(`plans.${i}`));


  const amounts = useMemo(() => {
    return PLANS.map((p) => {
      if (!p.base) return "0";
      const v =
        period === "annual"
          ? Math.round((p.base * 0.85) / 100) * 100
          : p.base;
      return v.toLocaleString("en-US");
    });
  }, [period]);

  return (
    <>
      <div
        className="billing-switch"
        role="tablist"
        aria-label="Billing period"
      >
        <button
          type="button"
          className={period === "monthly" ? "on" : ""}
          onClick={() => setPeriod("monthly")}
        >
          {tP("monthly")}
        </button>
        <button
          type="button"
          className={period === "annual" ? "on" : ""}
          onClick={() => setPeriod("annual")}
        >
          Annual · −15%
        </button>
      </div>
      <span className="billing-note">
        {period === "annual"
          ? "Billed annually — two months free"
          : "Annual billing saves two months"}
      </span>

      <div className="plans">
        {PLANS.map((p, i) => {
          const isFeat = p.id === FEATURED;
          return (
            <article
              key={p.id}
              className={`plan${isFeat ? " feat" : ""}`}
            >
              {isFeat && <span className="plan-ribbon">Most chosen</span>}
              <div className="plan-kicker">
                <span className="num">{p.num}</span>
                <span>{p.kicker}</span>
              </div>
              <h3>{p.name}</h3>
              <p className="desc">{p.desc}</p>
              <div className="price">
                <span className="cur">AMD</span>
                <span className="amt">{amounts[i]}</span>
                <span className="unit">
                  {period === "annual" ? "/mo · billed yearly" : "/mo"}
                </span>
              </div>
              <p className="price-note">{p.priceNote}</p>
              <Link
                className={`plan-cta${isFeat ? "" : " ghost"}`}
                href="/#waitlist"
              >
                {p.ctaLabel}
              </Link>
              <hr className="divider" />
              <ul className="feat-list">
                {p.features.map((f, idx) => (
                  <li key={idx} className={f.off ? "off" : undefined}>
                    <span>{f.text}</span>
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </>
  );
}
