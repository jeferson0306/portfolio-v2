type FlagProps = { country: "br" | "pt"; className?: string };

/**
 * Inline SVG flags rather than emoji: `🇧🇷` renders as the letters "BR" on
 * Windows, and emoji sizing drifts between platforms. These are deliberately
 * simplified — recognisable at 20px, without the star fields and heraldry that
 * turn to mush at this scale.
 */
export function Flag({ country, className }: FlagProps) {
  const label = country === "br" ? "Brasil" : "Portugal";

  return (
    <span
      role="img"
      aria-label={label}
      className={`inline-block h-[14px] w-[20px] shrink-0 overflow-hidden rounded-[3px] ring-1 ring-[var(--border-strong)] ${className ?? ""}`}
    >
      {country === "br" ? (
        <svg viewBox="0 0 20 14" className="h-full w-full" aria-hidden focusable="false">
          <rect width="20" height="14" fill="#009B3A" />
          <path d="M10 2 18 7 10 12 2 7Z" fill="#FEDF00" />
          <circle cx="10" cy="7" r="3" fill="#002776" />
          <path d="M7.2 6.2c1.9-.7 3.9-.6 5.7.2" stroke="#fff" strokeWidth="0.9" fill="none" />
        </svg>
      ) : (
        <svg viewBox="0 0 20 14" className="h-full w-full" aria-hidden focusable="false">
          <rect width="20" height="14" fill="#DA291C" />
          <rect width="8" height="14" fill="#046A38" />
          <circle cx="8" cy="7" r="3.4" fill="none" stroke="#FFE900" strokeWidth="1" />
          <rect
            x="6.6"
            y="5.4"
            width="2.8"
            height="3.2"
            rx="0.6"
            fill="#fff"
            stroke="#DA291C"
            strokeWidth="0.7"
          />
        </svg>
      )}
    </span>
  );
}
