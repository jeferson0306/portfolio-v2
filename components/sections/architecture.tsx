"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { useGSAP } from "@gsap/react";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { diagramEdges, diagramNodes } from "@/lib/content";
import { useI18n } from "@/lib/i18n/provider";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, useGSAP);

const NODE_WIDTH = 132;
const NODE_HEIGHT = 46;

const nodeById = new Map(diagramNodes.map((node) => [node.id, node]));

/** Horizontal cubic between two node edges — reads as a wire, not a diagonal. */
function edgePath(fromId: string, toId: string): string {
  const from = nodeById.get(fromId);
  const to = nodeById.get(toId);
  if (!from || !to) return "";

  const x1 = from.x + NODE_WIDTH / 2;
  const x2 = to.x - NODE_WIDTH / 2;
  const midpoint = (x1 + x2) / 2;

  return `M ${x1} ${from.y} C ${midpoint} ${from.y}, ${midpoint} ${to.y}, ${x2} ${to.y}`;
}

/**
 * The request-flow diagram draws itself as the section is scrolled through:
 * each wire is traced, and the service it reaches lights up as it lands.
 *
 * For a backend portfolio the diagram is the content, not decoration — so it
 * is real SVG with real labels rather than an image, and it stays readable
 * when the animation is switched off.
 */
export function Architecture() {
  const { t } = useI18n();
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const nodes = "[data-diagram-node]";
      const edges = "[data-diagram-edge]";

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(edges, { drawSVG: "100%" });
        gsap.set(nodes, { opacity: 1 });
        return;
      }

      gsap.set(edges, { drawSVG: "0%" });
      gsap.set(nodes, { opacity: 0.18 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 70%",
          end: "bottom 70%",
          scrub: 0.7,
        },
      });

      // Origin first, then every wire in flow order, each pulling its
      // destination into focus behind it.
      timeline.to('[data-diagram-node="client"]', { opacity: 1, duration: 0.4 });

      diagramEdges.forEach(([, to], index) => {
        timeline
          .to(`[data-diagram-edge="${index}"]`, { drawSVG: "100%", duration: 1, ease: "none" })
          .to(`[data-diagram-node="${to}"]`, { opacity: 1, duration: 0.4 }, "<0.4");
      });
    },
    { scope: rootRef, dependencies: [t], revertOnUpdate: true },
  );

  return (
    <section
      id="architecture"
      ref={rootRef}
      className="relative z-10 border-t border-[var(--border)]"
    >
      <div className="mx-auto max-w-[1400px] px-6 py-32 lg:px-12 lg:py-48">
        <div className="max-w-3xl">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-[var(--text-muted)]">
              {t.architecture.eyebrow}
            </p>
          </Reveal>
          <SplitHeading
            text={t.architecture.title}
            className="text-display mt-5 text-4xl font-semibold sm:text-5xl lg:text-6xl"
          />
          <SplitHeading
            as="p"
            text={t.architecture.lead}
            delay={0.15}
            className="mt-6 text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg"
          />
        </div>

        {/* Wide diagram scrolls inside its own box rather than the page. */}
        <div className="mt-16 overflow-x-auto lg:mt-24">
          <svg
            viewBox="0 0 900 420"
            className="h-auto w-full min-w-[760px]"
            role="img"
            aria-label={`${t.architecture.title} ${t.architecture.caption}`}
          >
            <g fill="none" stroke="rgba(255,255,255,0.34)" strokeWidth="1.25">
              {diagramEdges.map(([from, to], index) => (
                <path key={`${from}-${to}`} data-diagram-edge={index} d={edgePath(from, to)} />
              ))}
            </g>

            {diagramNodes.map((node) => (
              <g key={node.id} data-diagram-node={node.id}>
                <rect
                  x={node.x - NODE_WIDTH / 2}
                  y={node.y - NODE_HEIGHT / 2}
                  width={NODE_WIDTH}
                  height={NODE_HEIGHT}
                  rx="10"
                  fill="rgba(255,255,255,0.035)"
                  stroke="rgba(255,255,255,0.16)"
                  strokeWidth="1"
                />
                <text
                  x={node.x}
                  y={node.y + 4}
                  textAnchor="middle"
                  className="fill-[var(--text-primary)] text-[13px]"
                  style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
                >
                  {t.architecture.nodes[node.id]}
                </text>
              </g>
            ))}
          </svg>
        </div>

        <p className="mt-8 max-w-xl text-sm text-[var(--text-muted)]">{t.architecture.caption}</p>
      </div>
    </section>
  );
}
