import { useEffect, useRef } from "react";

// A synthetic Lead II beat built from Gaussian bumps (P, Q, R, S, T).
// phase runs 0..1 across one beat.
function beat(phase: number) {
  const g = (mu: number, sigma: number, amp: number) =>
    amp * Math.exp(-((phase - mu) ** 2) / (2 * sigma * sigma));
  return (
    g(0.18, 0.025, 0.12) + // P wave
    g(0.285, 0.008, -0.12) + // Q
    g(0.3, 0.01, 1.0) + // R
    g(0.318, 0.009, -0.25) + // S
    g(0.52, 0.045, 0.28) // T wave
  );
}

/**
 * A heart-monitor style sweep. The trace is drawn left to right, erasing ahead
 * of itself like a real monitor. Respects prefers-reduced-motion (draws once,
 * static) and pauses while off screen.
 */
export default function EcgTrace({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const color = getComputedStyle(document.documentElement).getPropertyValue("--primary").trim();
    const stroke = color ? `hsl(${color})` : "#ff33a8";

    let width = 0;
    let height = 0;
    const beatPx = 220; // pixels per heartbeat
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.lineWidth = 2;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.strokeStyle = stroke;
      ctx.shadowColor = stroke;
      ctx.shadowBlur = 8;
      ctx.clearRect(0, 0, width, height);
    };
    const y = (x: number) => {
      const baseline = height * 0.62;
      const amp = height * 0.5;
      return baseline - beat((x % beatPx) / beatPx) * amp;
    };

    resize();

    if (reduced) {
      ctx.beginPath();
      for (let x = 0; x <= width; x += 1) (x === 0 ? ctx.moveTo : ctx.lineTo).call(ctx, x, y(x));
      ctx.stroke();
      return;
    }

    let x = 0;
    let raf = 0;
    let visible = true;
    const speed = 2.2; // px per frame, roughly 72 bpm at 60fps
    const gap = 36; // erased band ahead of the pen

    const step = () => {
      if (visible) {
        ctx.clearRect(x, 0, gap, height);
        ctx.beginPath();
        ctx.moveTo(x, y(x));
        for (let i = 1; i <= speed; i += 0.5) ctx.lineTo(x + i, y(x + i));
        ctx.stroke();
        x += speed;
        if (x > width) {
          x = 0;
        }
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    io.observe(canvas);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
