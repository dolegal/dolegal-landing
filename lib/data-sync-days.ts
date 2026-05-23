/** How often the displayed “last synced” age resets back to zero. */
export const DATA_SYNC_CYCLE_DAYS = 10;

/** Stable UTC anchor so the value is identical for all users on the same calendar day. */
const SYNC_ANCHOR_UTC_MS = Date.UTC(2026, 0, 1);

const MS_PER_DAY = 86_400_000;

/** Days since the last sync in the current 10-day cycle (0–9). */
export function getDataSyncDaysAgo(now: Date = new Date()): number {
  const todayUtc = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
  );
  const daysSinceAnchor = Math.floor((todayUtc - SYNC_ANCHOR_UTC_MS) / MS_PER_DAY);
  return (
    ((daysSinceAnchor % DATA_SYNC_CYCLE_DAYS) + DATA_SYNC_CYCLE_DAYS) %
    DATA_SYNC_CYCLE_DAYS
  );
}
