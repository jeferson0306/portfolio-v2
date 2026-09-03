"use client";

import { techIcons } from "@/lib/tech-icons";

type TechIconProps = { name: string; active: boolean; className?: string };

/**
 * Monochrome at rest, brand colour on hover. Painting fifteen full-colour logos
 * at once would fight the near-monochrome page; letting the colour arrive only
 * under the pointer keeps the grid calm and makes the hover feel like a reward.
 */
export function TechIcon({ name, active, className }: TechIconProps) {
  const icon = techIcons[name];
  if (!icon) return null;

  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      focusable="false"
      className={`h-7 w-7 transition-colors duration-300 lg:h-8 lg:w-8 ${className ?? ""}`}
      style={{ color: active ? icon.hex : undefined }}
      {...(icon.stroke
        ? {
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 1.4,
            strokeLinecap: "round" as const,
            strokeLinejoin: "round" as const,
          }
        : { fill: "currentColor" })}
      dangerouslySetInnerHTML={{ __html: icon.body }}
    />
  );
}
