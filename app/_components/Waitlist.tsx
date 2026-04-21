"use client";

import { FormEvent, useState } from "react";
import { useTranslations } from "next-intl";

interface WaitlistProps {
  heading?: React.ReactNode;
  body?: React.ReactNode;
}

export function Waitlist({ heading, body }: WaitlistProps) {
  const t = useTranslations("landing.earlyAccess");
  const [label, setLabel] = useState(t("buttonLabel"));
  const [done, setDone] = useState(false);

  const defaultHeading = (
    <>
      {t("titleMain")}
      <br />
      <em>{t("titleAccent")}</em>
    </>
  );

  const defaultBody = <>{t("description")}</>;

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLabel("✓ " + t("successMessage"));
    setDone(true);
  };

  return (
    <section className="waitlist" id="waitlist">
      <div className="wrap">
        <p className="section-label">{t("sectionLabel")}</p>
        <div className="waitlist-grid">
          <div>
            <h2>{heading || defaultHeading}</h2>
            <p>{body || defaultBody}</p>
          </div>
          <div>
            <form className="waitlist-form" onSubmit={onSubmit}>
              <input
                type="email"
                required
                placeholder={t("emailPlaceholder")}
                disabled={done}
              />
              <button type="submit">{label}</button>
            </form>
            <p className="waitlist-foot">{t("footnote")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
