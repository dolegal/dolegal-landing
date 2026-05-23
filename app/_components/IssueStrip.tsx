import {useTranslations} from "next-intl";
import {getDataSyncDaysAgo} from "@/lib/data-sync-days";

export function IssueStrip() {
  const t = useTranslations("landing.parity");
  const days = getDataSyncDaysAgo();

  return (
    <div className="issue-strip">
      <div className="wrap">
        <span className="pulse">
          <span className="pulse-dot" />
          {t("issueLastSynced", {days})}
        </span>
        <span>{t("issueStats")}</span>
      </div>
    </div>
  );
}
