/**
 * Compact file glyphs — fixed viewBox, no embedded text (avoids distortion).
 * Pair with visible filenames in the UI when a label is needed.
 */

export function PdfFileIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 40"
      width="32"
      height="40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      preserveAspectRatio="xMidYMid meet"
    >
      <path
        d="M6 2h12l10 10v24a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2z"
        fill="#E5252A"
      />
      <path d="M18 2v8h10" fill="#B71C1C" fillOpacity="0.45" />
      <path d="M18 2l10 10h-6a4 4 0 01-4-4V2z" fill="#FFAB91" fillOpacity="0.55" />
      <rect x="8" y="22" width="16" height="2" rx="1" fill="white" fillOpacity="0.95" />
      <rect x="8" y="27" width="12" height="2" rx="1" fill="white" fillOpacity="0.65" />
    </svg>
  );
}

export function DocxFileIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 40"
      width="32"
      height="40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      preserveAspectRatio="xMidYMid meet"
    >
      <path
        d="M6 2h12l10 10v24a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2z"
        fill="#2B579A"
      />
      <path d="M18 2v8h10" fill="#103050" fillOpacity="0.4" />
      <path d="M18 2l10 10h-6a4 4 0 01-4-4V2z" fill="#7FABE8" fillOpacity="0.5" />
      <rect x="8" y="22" width="16" height="2" rx="1" fill="white" fillOpacity="0.95" />
      <rect x="8" y="27" width="12" height="2" rx="1" fill="white" fillOpacity="0.65" />
    </svg>
  );
}
