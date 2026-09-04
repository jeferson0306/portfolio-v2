"use client";

import { useEffect, useState } from "react";
import Matter from "matter-js";

/** If no frame has run by then, the browser is not animating this section. */
const GIVE_UP_AFTER_MS = 1200;

/**
 * Physics over real DOM elements.
 *
 * Matter runs the simulation and nothing else: no canvas, no renderer. Each
 * brand is an ordinary element whose transform is written from its body every
 * frame, so the type stays real type — selectable, styled by the same tokens as
 * the rest of the page, crisp at any zoom — while behaving like an object.
 *
 * This is the one section on the page the reader can *push*. No amount of
 * shader work produces that, because the difference is interaction rather than
 * appearance.
 *
 * The layout switch (in flow → absolute) is written here, straight to the DOM,
 * in the same synchronous pass as the first placement. Doing it through React
 * state would take a render to arrive, and the brands would spend that frame
 * stacked in the corner.
 */
export function BrandPhysics({
  containerRef,
  onRunning,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
  /** Fired once the loop is confirmed alive, for cosmetics only — never layout. */
  onRunning: () => void;
}) {
  // A resize invalidates the walls. Rebuilding the scene is simpler and less
  // surprising than trying to move bodies to fit a new frame, and bumping this
  // re-runs the effect, cleanup included.
  const [generation, setGeneration] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const pills = Array.from(container.querySelectorAll<HTMLElement>("[data-brand-pill]"));
    if (pills.length === 0) return;

    const { Engine, Runner, Bodies, Composite, Mouse, MouseConstraint } = Matter;

    // Measured while the elements are still in normal flow — after they are
    // lifted out of it they have no width of their own.
    const sizes = pills.map((pill) => {
      const { width: w, height: h } = pill.getBoundingClientRect();
      return { w, h };
    });

    const width = container.clientWidth;
    const height = container.clientHeight;
    const wall = 200;

    const engine = Engine.create({ gravity: { x: 0, y: 1, scale: 0.0012 } });

    // Walls sit outside the frame so a body resting against one is not clipped.
    Composite.add(engine.world, [
      Bodies.rectangle(width / 2, height + wall / 2, width * 3, wall, { isStatic: true }),
      Bodies.rectangle(-wall / 2, height / 2, wall, height * 3, { isStatic: true }),
      Bodies.rectangle(width + wall / 2, height / 2, wall, height * 3, { isStatic: true }),
    ]);

    const bodies = pills.map((pill, index) => {
      const { w, h } = sizes[index];
      const body = Bodies.rectangle(
        // Spread across the width and dropped from just above the frame, so
        // they arrive as a fall rather than appearing already stacked.
        (width / (pills.length + 1)) * (index + 1),
        -60 - index * 70,
        w,
        h,
        { restitution: 0.45, friction: 0.35, frictionAir: 0.02, chamfer: { radius: h / 2 } },
      );
      Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.12);
      return body;
    });

    Composite.add(engine.world, bodies);

    const mouse = Mouse.create(container);
    const dragger = MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.2, render: { visible: false } },
    });
    Composite.add(engine.world, dragger);

    // Matter binds wheel handlers to drive its own mouse state. Left attached,
    // the page stops scrolling the moment the pointer is over this section —
    // a physics toy is not worth trapping the reader for. The handler is not in
    // the published types, hence the cast.
    const wheelBound = mouse as unknown as { mousewheel: (event: Event) => void };
    mouse.element.removeEventListener("wheel", wheelBound.mousewheel);
    mouse.element.removeEventListener("DOMMouseScroll", wheelBound.mousewheel);

    const runner = Runner.create();
    Runner.run(runner, engine);

    const lift = () => {
      container.dataset.physics = "on";
      pills.forEach((pill) => {
        pill.style.position = "absolute";
        pill.style.left = "0";
        pill.style.top = "0";
        pill.style.willChange = "transform";
      });
    };

    const drop = () => {
      delete container.dataset.physics;
      pills.forEach((pill) => {
        pill.style.position = "";
        pill.style.left = "";
        pill.style.top = "";
        pill.style.willChange = "";
        pill.style.transform = "";
      });
    };

    const place = () => {
      bodies.forEach((body, index) => {
        const { w, h } = sizes[index];
        pills[index].style.transform =
          `translate(${body.position.x - w / 2}px, ${body.position.y - h / 2}px) rotate(${body.angle}rad)`;
      });
    };

    // Lifted and placed in one synchronous pass: the brands are never absolute
    // without a transform, so there is no frame where they pile in the corner.
    lift();
    place();

    let painted = 0;
    let frame = requestAnimationFrame(function paint() {
      place();
      // Two frames is enough to know the loop is alive.
      if (++painted === 2) onRunning();
      frame = requestAnimationFrame(paint);
    });

    // A frame loop that never runs — a throttled background tab, a browser that
    // has stopped animating this page — would otherwise leave the reader an
    // empty box where a list of brands should be. Put the list back instead.
    const watchdog = window.setTimeout(() => {
      if (painted === 0) {
        cancelAnimationFrame(frame);
        Runner.stop(runner);
        drop();
      }
    }, GIVE_UP_AFTER_MS);

    const resize = () => setGeneration((value) => value + 1);
    window.addEventListener("resize", resize);

    return () => {
      window.clearTimeout(watchdog);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frame);
      Runner.stop(runner);
      Composite.clear(engine.world, false);
      Engine.clear(engine);
      drop();
    };
  }, [containerRef, onRunning, generation]);

  return null;
}
