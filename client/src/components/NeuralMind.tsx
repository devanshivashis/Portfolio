import { useEffect, useRef } from "react";

/**
 * An animated "machine mind": a brain-shaped network of nodes inside a slowly
 * turning HUD ring. Signals travel along the connections and light up the
 * nodes they reach. Follows the pointer slightly. Original artwork, drawn on a
 * canvas; static frame under prefers-reduced-motion, paused when off screen.
 */

type Node = { x: number; y: number; z: number; glow: number };
type Edge = [number, number];
type Pulse = { e: number; t: number; dir: 1 | -1; speed: number };

// Rough brain silhouette in a unit box (-1..1): two lobes, a cerebellum bump.
function insideBrain(x: number, y: number) {
  const lobe = (cx: number, cy: number, rx: number, ry: number) =>
    ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 <= 1;
  return (
    lobe(-0.22, -0.08, 0.62, 0.52) ||
    lobe(0.24, -0.1, 0.6, 0.5) ||
    lobe(0.0, 0.18, 0.78, 0.42) ||
    lobe(0.45, 0.4, 0.28, 0.2)
  );
}

function makeNetwork(count: number) {
  // Seeded RNG so the network is the same on every visit.
  let seed = 7;
  const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  const nodes: Node[] = [];
  let guard = 0;
  while (nodes.length < count && guard++ < 20000) {
    const x = rand() * 2 - 1;
    const y = rand() * 2 - 1;
    if (!insideBrain(x, y)) continue;
    if (nodes.some((n) => (n.x - x) ** 2 + (n.y - y) ** 2 < 0.012)) continue;
    nodes.push({ x, y, z: rand(), glow: 0 });
  }
  const edges: Edge[] = [];
  const seen = new Set<string>();
  nodes.forEach((a, i) => {
    const nearest = nodes
      .map((b, j) => ({ j, d: (a.x - b.x) ** 2 + (a.y - b.y) ** 2 }))
      .filter((o) => o.j !== i)
      .sort((p, q) => p.d - q.d)
      .slice(0, 3);
    for (const { j } of nearest) {
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (!seen.has(key)) {
        seen.add(key);
        edges.push([i, j]);
      }
    }
  });
  return { nodes, edges };
}

export default function NeuralMind({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const { nodes, edges } = makeNetwork(70);
    const pulses: Pulse[] = [];
    const pink = "hsl(326 100% 60%)";
    const violet = "hsl(270 90% 66%)";

    let size = 0;
    let dpr = 1;
    const resize = () => {
      dpr = window.devicePixelRatio || 1;
      size = Math.min(canvas.clientWidth, canvas.clientHeight);
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
    };
    resize();

    let tiltX = 0, tiltY = 0, targetX = 0, targetY = 0;
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      targetX = ((e.clientX - (r.left + r.width / 2)) / r.width) * 0.6;
      targetY = ((e.clientY - (r.top + r.height / 2)) / r.height) * 0.6;
    };
    window.addEventListener("pointermove", onMove);

    const draw = (time: number) => {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2, cy = h / 2;
      const scale = size * 0.36;
      tiltX += (targetX - tiltX) * 0.05;
      tiltY += (targetY - tiltY) * 0.05;
      const breathe = 1 + Math.sin(time / 1800) * 0.015;

      const project = (n: Node) => {
        const depth = (n.z - 0.5) * 0.35;
        return {
          x: cx + (n.x + tiltX * depth) * scale * breathe,
          y: cy + (n.y + tiltY * depth) * scale * breathe,
        };
      };

      // HUD rings
      const rot = time / 9000;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.strokeStyle = "rgba(255,255,255,0.08)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(0, 0, scale * 1.32, 0, Math.PI * 2);
      ctx.stroke();
      ctx.rotate(rot);
      ctx.strokeStyle = pink;
      ctx.globalAlpha = 0.35;
      ctx.lineWidth = 2;
      for (let i = 0; i < 3; i++) {
        const start = (i * Math.PI * 2) / 3;
        ctx.beginPath();
        ctx.arc(0, 0, scale * 1.42, start, start + 0.7);
        ctx.stroke();
      }
      ctx.rotate(-rot * 2);
      ctx.strokeStyle = violet;
      ctx.globalAlpha = 0.3;
      for (let i = 0; i < 60; i++) {
        const a = (i / 60) * Math.PI * 2;
        const r1 = scale * 1.22, r2 = scale * (i % 5 === 0 ? 1.27 : 1.245);
        ctx.beginPath();
        ctx.moveTo(Math.cos(a) * r1, Math.sin(a) * r1);
        ctx.lineTo(Math.cos(a) * r2, Math.sin(a) * r2);
        ctx.stroke();
      }
      ctx.restore();
      ctx.globalAlpha = 1;

      // Connections
      const pts = nodes.map(project);
      ctx.lineWidth = 1;
      for (const [a, b] of edges) {
        ctx.strokeStyle = "rgba(200,170,255,0.16)";
        ctx.beginPath();
        ctx.moveTo(pts[a].x, pts[a].y);
        ctx.lineTo(pts[b].x, pts[b].y);
        ctx.stroke();
      }

      // Signals
      if (!reduced && pulses.length < 18 && Math.random() < 0.12) {
        pulses.push({ e: Math.floor(Math.random() * edges.length), t: 0, dir: Math.random() < 0.5 ? 1 : -1, speed: 0.012 + Math.random() * 0.015 });
      }
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.t += p.speed;
        const [a0, b0] = edges[p.e];
        const [a, b] = p.dir === 1 ? [a0, b0] : [b0, a0];
        const x = pts[a].x + (pts[b].x - pts[a].x) * p.t;
        const y = pts[a].y + (pts[b].y - pts[a].y) * p.t;
        ctx.fillStyle = pink;
        ctx.shadowColor = pink;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(x, y, 2.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        if (p.t >= 1) {
          nodes[b].glow = 1;
          // keep the signal travelling onward sometimes
          const next = edges.findIndex(([u, v], k) => k !== p.e && (u === b || v === b));
          if (next >= 0 && Math.random() < 0.6) {
            p.e = next;
            p.dir = edges[next][0] === b ? 1 : -1;
            p.t = 0;
          } else {
            pulses.splice(i, 1);
          }
        }
      }

      // Nodes
      nodes.forEach((n, i) => {
        const { x, y } = pts[i];
        const r = 1.6 + n.z * 1.6 + n.glow * 2.5;
        ctx.fillStyle = n.glow > 0.05 ? pink : violet;
        ctx.globalAlpha = 0.45 + n.z * 0.4 + n.glow * 0.4;
        if (n.glow > 0.05) {
          ctx.shadowColor = pink;
          ctx.shadowBlur = 14 * n.glow;
        }
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        n.glow *= 0.94;
      });
      ctx.globalAlpha = 1;
    };

    if (reduced) {
      draw(0);
      return () => window.removeEventListener("pointermove", onMove);
    }

    let raf = 0;
    let visible = true;
    const loop = (t: number) => {
      if (visible) draw(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className={className} />;
}
