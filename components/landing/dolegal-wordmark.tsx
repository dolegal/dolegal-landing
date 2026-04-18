export function DoLegalWordmark({
  className,
  variant = "light",
}: {
  className?: string;
  /** light: purple "do" on white/light; dark: footer on #1d1d1f */
  variant?: "light" | "dark";
}) {
  const doClass = variant === "light" ? "text-purple-900" : "text-purple-400";
  return (
    <span className={className}>
      <span className={doClass}>do</span>
      <span className={variant === "dark" ? "text-white" : "text-inherit"}>Legal</span>
    </span>
  );
}
