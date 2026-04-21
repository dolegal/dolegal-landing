import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("landing.footer");
  const cols = [0, 1, 2].map((i) => t.raw(`columns.${i}`));

  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <div className="foot-brand">
              <img className="brand-logo" src="/doLegal-logo.svg" alt="DoLegal" />
            </div>
            <p className="foot-tag">{t("description")}</p>
          </div>
          <div className="foot-col">
            <h5>{cols[0].title}</h5>
            <Link href="/#features">{cols[0].links[0]}</Link>
            <Link href="/pricing">{cols[0].links[1]}</Link>
            <Link href="/#how">{cols[0].links[2]}</Link>
            <Link href="#">{cols[0].links[3]}</Link>
          </div>
          <div className="foot-col">
            <h5>{cols[1].title}</h5>
            <Link href="#">{cols[1].links[0]}</Link>
            <Link href="#">{cols[1].links[1]}</Link>
            <Link href="#">{cols[1].links[2]}</Link>
            <Link href="#">{cols[1].links[3]}</Link>
          </div>
          <div className="foot-col">
            <h5>{cols[2].title}</h5>
            <Link href="#">{cols[2].links[0]}</Link>
            <Link href="#">{cols[2].links[1]}</Link>
            <a href="mailto:hello@dolegal.am">{cols[2].links[3]}</a>
          </div>
        </div>
        <div className="foot-bottom">
          <span>{t("copyright")}</span>
        </div>
      </div>
    </footer>
  );
}
