"use client";

import { useEffect, useRef } from "react";

/**
 * InteractiveField
 * A calm, fidget-friendly canvas of small dots laid out in a grid.
 * - Dots near the cursor drift toward it and grow slightly (proximity field).
 * - Clicking drops a soft green ripple that expands and fades.
 * Pure canvas, no libraries. ~60fps. Honors prefers-reduced-motion.
 */
export function InteractiveField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = window.devicePixelRatio || 1;
    const SPACING = 28;
    const DOT_R = 1.6;
    const INFLUENCE = 110;

    const mouse = { x: -9999, y: -9999, active: false };
    const ripples: { x: number; y: number; r: number; life: number }[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };
    const onClick = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      ripples.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        r: 0,
        life: 1,
      });
    };
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    canvas.addEventListener("pointerdown", onClick);

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const cols = Math.ceil(width / SPACING) + 1;
      const rows = Math.ceil(height / SPACING) + 1;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const baseX = c * SPACING;
          const baseY = r * SPACING;
          let x = baseX;
          let y = baseY;
          let radius = DOT_R;
          let alpha = 0.35;

          if (!reduced && mouse.active) {
            const dx = mouse.x - baseX;
            const dy = mouse.y - baseY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < INFLUENCE) {
              const f = 1 - dist / INFLUENCE;
              x += dx * f * 0.25;
              y += dy * f * 0.25;
              radius += f * 1.6;
              alpha = 0.35 + f * 0.55;
            }
          }

          ctx.beginPath();
          ctx.fillStyle = `rgba(46, 98, 115, ${alpha})`;
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rip = ripples[i];
        rip.r += 3.2;
        rip.life -= 0.012;
        if (rip.life <= 0) {
          ripples.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.strokeStyle = `rgba(29, 158, 117, ${rip.life * 0.8})`;
        ctx.lineWidth = 2;
        ctx.arc(rip.x, rip.y, rip.r, 0, Math.PI * 2);
        ctx.stroke();
      }

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("pointerdown", onClick);
    };
  }, []);

  return (
    <div className="relative w-full bg-[#F4F0E8] border border-[#2e6273]/15 rounded-2xl overflow-hidden">
      <canvas
        ref={canvasRef}
        className="block w-full h-[420px] cursor-crosshair touch-none"
      />
      <div className="pointer-events-none absolute top-6 left-6">
        <p className="text-xs uppercase tracking-wider text-[#2e6273] font-mono">
          Move &amp; click anywhere
        </p>
      </div>
      <div className="pointer-events-none absolute bottom-6 right-6 text-right">
        <p className="text-xs text-[#1a1a1a]/50 font-mono max-w-[18ch]">
          A small fidget. Nothing tracked.
        </p>
      </div>
    </div>
  );
}
