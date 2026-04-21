"use client";

import {useState} from "react";
import {useTranslations} from "next-intl";
import {Link} from "@/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";

type NavItem = { href: string; label: string; active?: boolean };

interface MastheadProps {
  nav: NavItem[];
  ctaHref?: string;
}

export function Masthead({ nav, ctaHref = "/#waitlist" }: MastheadProps) {
  const t = useTranslations("nav");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="masthead">
      <div className="wrap masthead-inner">
        <Link href="/" className="brand" aria-label="DoLegal">
          <img className="brand-logo" src="/doLegal-logo.svg" alt="DoLegal" />
        </Link>
        <button
          type="button"
          className={`menu-toggle ${menuOpen ? "open" : ""}`}
          aria-expanded={menuOpen}
          aria-controls="site-nav"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
        <nav id="site-nav" className={`topnav ${menuOpen ? "open" : ""}`}>
          {nav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={item.active ? "active" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <LanguageSwitcher />
          <Link className="btn-primary" href={ctaHref} onClick={() => setMenuOpen(false)}>
            {t("earlyAccess")}
          </Link>
        </nav>
      </div>
    </header>
  );
}
