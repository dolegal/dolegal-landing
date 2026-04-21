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

  return (
    <header className="masthead">
      <div className="wrap masthead-inner">
        <Link href="/" className="brand" aria-label="DoLegal">
          <img className="brand-logo" src="/doLegal-logo.svg" alt="DoLegal" />
        </Link>
        <nav className="topnav">
          {nav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={item.active ? "active" : undefined}
            >
              {item.label}
            </Link>
          ))}
          <LanguageSwitcher />
          <Link className="btn-primary" href={ctaHref}>
            {t("earlyAccess")}
          </Link>
        </nav>
      </div>
    </header>
  );
}
