"use client";

import { useEffect, useRef, useState } from "react";

/**
 * InteractiveField — Architectural Calibration Grid
 * Design system: Cream #CAAF98 / Terracotta #AD2010 / Charcoal #22180F
 * - Grid lines drawn at exact pixel positions
 * - Cursor proximity highlights nearest cell with a terracotta fill
 * - Live X:Y coordinate tracker fixed to nearest grid intersection
 * - Column/row labels along edges (monospaced, engineering style)
 * - No rounded corners. No blur. No bounce.
 */
export function InteractiveField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [coords, setCoords] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const GRID = 40; // cell size in px
    const CHARCOAL = "#22180F";
    const CREAM = "#CAAF98";
    const TERRACOTTA = "#AD2010";

    let width = 0;
    let height = 0;
    let dpr = window.devicePixelRatio || 1;
    const mouse = { x: -9999, y: -9999 };

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
      setCoords({ x: Math.round(mouse.x), y: Math.round(mouse.y) });
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
      setCoords(null);
    };

    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Background
      ctx.fillStyle = CREAM;
      ctx.fillRect(0, 0, width, height);

      const cols = Math.floor(width / GRID);
      const rows = Math.floor(height / GRID);

      // Nearest grid intersection to cursor
      const nearCol = Math.round(mouse.x / GRID);
      const nearRow = Math.round(mouse.y / GRID);

      if (!reduced && mouse.x > 0) {
        // Highlight the active cell (flat terracotta fill, no rounding)
        const cellX = (nearCol - 1) * GRID;
        const cellY = (nearRow - 1) * GRID;
        ctx.fillStyle = `${TERRACOTTA}18`;
        ctx.fillRect(cellX, cellY, GRID, GRID);

        // Crosshair lines through cursor
        ctx.strokeStyle = `${TERRACOTTA}40`;
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 5]);
        ctx.beginPath();
        ctx.moveTo(mouse.x, 0);
        ctx.lineTo(mouse.x, height);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, mouse.y);
        ctx.lineTo(width, mouse.y);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Grid lines — vertical
      ctx.strokeStyle = `${CHARCOAL}18`;
      ctx.lineWidth = 1;
      for (let c = 0; c <= cols; c++) {
        const x = c * GRID;
        // Brighten lines adjacent to cursor column
        if (!reduced && Math.abs(c - nearCol) <= 1 && mouse.x > 0) {
          ctx.strokeStyle = `${CHARCOAL}40`;
        } else {
          ctx.strokeStyle = `${CHARCOAL}18`;
        }
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Grid lines — horizontal
      for (let r = 0; r <= rows; r++) {
        const y = r * GRID;
        if (!reduced && Math.abs(r - nearRow) <= 1 && mouse.x > 0) {
          ctx.strokeStyle = `${CHARCOAL}40`;
        } else {
          ctx.strokeStyle = `${CHARCOAL}18`;
        }
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Intersection dots
      ctx.font = `8px "DM Mono", monospace`;
      for (let r = 0; r <= rows; r++) {
        for (let c = 0; c <= cols; c++) {
          const x = c * GRID;
          const y = r * GRID;
          const isNear = !reduced && mouse.x > 0 && Math.abs(c - nearCol) <= 1 && Math.abs(r - nearRow) <= 1;
          ctx.fillStyle = isNear ? TERRACOTTA : `${CHARCOAL}30`;
          ctx.fillRect(x - 1.5, y - 1.5, 3, 3);
        }
      }

      // Column labels along top edge (every 2nd col)
      ctx.font = `7px "DM Mono", monospace`;
      ctx.fillStyle = `${CHARCOAL}40`;
      ctx.textAlign = "center";
      for (let c = 1; c <= cols; c += 2) {
        ctx.fillText(`C${String(c).padStart(2, "0")}`, c * GRID, 10);
      }
      // Row labels along left edge (every 2nd row)
      ctx.textAlign = "left";
      for (let r = 1; r <= rows; r += 2) {
        ctx.fillText(`R${String(r).padStart(2, "0")}`, 3, r * GRID - 4);
      }

      // Active intersection marker — terracotta square at snapped point
      if (!reduced && mouse.x > 0) {
        const snapX = nearCol * GRID;
        const snapY = nearRow * GRID;
        ctx.strokeStyle = TERRACOTTA;
        ctx.lineWidth = 1.5;
        ctx.strokeRect(snapX - 4, snapY - 4, 8, 8);
        ctx.fillStyle = TERRACOTTA;
        ctx.fillRect(snapX - 1.5, snapY - 1.5, 3, 3);
      }

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ border: "1px solid #22180F", background: "#CAAF98" }}
    >
      <canvas
        ref={canvasRef}
        className="block w-full h-[420px] cursor-crosshair touch-none"
      />

      {/* Top-left label */}
      <div className="pointer-events-none absolute top-0 left-0 px-3 py-2 border-b border-r" style={{ borderColor: "#22180F22" }}>
        <p className="text-[9px] uppercase tracking-[0.18em] font-mono" style={{ color: "#22180F80" }}>
          CALIBRATION_GRID_v1 · PRECISION_MODE
        </p>
      </div>

      {/* Live coordinate tracker — snaps to nearest grid intersection */}
      <div
        className="pointer-events-none absolute top-0 right-0 px-3 py-2 border-b border-l"
        style={{ borderColor: "#22180F22" }}
      >
        {coords ? (
          <p className="text-[9px] font-mono tabular-nums" style={{ color: "#AD2010" }}>
            X:{String(coords.x).padStart(4, "0")} Y:{String(coords.y).padStart(4, "0")}
          </p>
        ) : (
          <p className="text-[9px] font-mono" style={{ color: "#22180F40" }}>
            X:---- Y:----
          </p>
        )}
      </div>

      {/* Bottom-left note */}
      <div className="pointer-events-none absolute bottom-0 left-0 px-3 py-2 border-t border-r" style={{ borderColor: "#22180F22" }}>
        <p className="text-[9px] uppercase tracking-[0.18em] font-mono" style={{ color: "#22180F40" }}>
          CURSOR_POSITION · LIVE · NOT_STORED
        </p>
      </div>

      {/* Bottom-right axis label */}
      <div className="pointer-events-none absolute bottom-0 right-0 px-3 py-2 border-t border-l" style={{ borderColor: "#22180F22" }}>
        <p className="text-[9px] font-mono" style={{ color: "#22180F40" }}>
          40px GRID
        </p>
      </div>
    </div>
  );
}
