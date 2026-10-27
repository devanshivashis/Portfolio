import { useEffect, useRef, useState } from "react";

// Charts draw at the real container width so text stays a readable size on phones.
function useWidth(fallback = 640) {
  const ref = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(fallback);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setW(Math.max(280, Math.round(e.contentRect.width))));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, w] as const;
}

// Results from the finalised model, held-out test set (8,957 ECGs).
const ageBands = [
  { band: "<30", n: 35, recall: 0.286, missed: 25 },
  { band: "30-39", n: 32, recall: 0.625, missed: 12 },
  { band: "40-49", n: 115, recall: 0.722, missed: 32 },
  { band: "50-59", n: 257, recall: 0.735, missed: 68 },
  { band: "60-69", n: 553, recall: 0.872, missed: 71 },
  { band: "70-79", n: 702, recall: 0.946, missed: 38 },
  { band: "80+", n: 618, recall: 0.979, missed: 13 },
];

const finalists = [
  { model: "LightGBM (DART)", recall: 0.8879, lo: 0.876, hi: 0.901, missed: 260, chosen: true },
  { model: "Random Forest", recall: 0.8849, lo: 0.872, hi: 0.898, missed: 267 },
  { model: "XGBoost", recall: 0.8831, lo: 0.87, hi: 0.897, missed: 271 },
];

const outcome = { caught: 2059, missed: 260, falseAlarms: 843 };

const pct = (v: number, d = 1) => `${(v * 100).toFixed(d)}%`;
const PINK = "hsl(var(--primary))";
const GRID = "hsl(var(--border))";
const MUTED_MARK = "hsl(240 5% 34%)";

type Tip = { x: number; y: number; title: string; lines: string[] } | null;

function Tooltip({ tip }: { tip: Tip }) {
  if (!tip) return null;
  return (
    <div
      role="status"
      className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-full rounded-md border border-white/10 bg-background/95 px-3 py-2 text-xs shadow-xl"
      style={{ left: tip.x, top: tip.y - 8 }}
    >
      <div className="text-sm font-semibold text-foreground">{tip.lines[0]}</div>
      <div className="text-muted-foreground">{tip.title}</div>
      {tip.lines.slice(1).map((l) => (
        <div key={l} className="text-muted-foreground">{l}</div>
      ))}
    </div>
  );
}

function DataTable({ head, rows }: { head: string[]; rows: (string | number)[][] }) {
  return (
    <details className="mt-4 text-sm">
      <summary className="cursor-pointer text-muted-foreground hover:text-primary">View as table</summary>
      <div className="overflow-x-auto">
        <table className="mt-3 w-full text-left font-mono text-xs">
          <thead>
            <tr className="border-b border-white/10 text-muted-foreground">
              {head.map((h) => <th key={h} className="py-2 pr-4 font-normal">{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={String(r[0])} className="border-b border-white/5">
                {r.map((c, i) => <td key={i} className="py-2 pr-4">{c}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </details>
  );
}

function AgeChart() {
  const [tip, setTip] = useState<Tip>(null);
  const [box, W] = useWidth();
  const H = W < 480 ? 260 : 300, m = { t: 28, r: 8, b: 36, l: 40 };
  const iw = W - m.l - m.r, ih = H - m.t - m.b;
  const band = iw / ageBands.length;
  const bw = Math.min(24, band * 0.5);
  const yv = (v: number) => m.t + ih - v * ih;
  const overall = 0.888;

  return (
    <div>
      <p className="mb-4 text-sm text-muted-foreground">
        Serious-case recall by patient age. The model is excellent for older patients and much weaker for young ones,
        because the dataset is dominated by 60-80 year olds. Hover or tap a column.
      </p>
      <div className="relative" ref={box}>
        <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} className="block" role="img" aria-label="Column chart of serious-case recall by age band, rising from 29% for under-30s to 98% for over-80s">
          {[0, 0.25, 0.5, 0.75, 1].map((t) => (
            <g key={t}>
              <line x1={m.l} x2={W - m.r} y1={yv(t)} y2={yv(t)} stroke={GRID} strokeWidth={1} />
              <text x={m.l - 8} y={yv(t)} dy="0.32em" textAnchor="end" className="fill-muted-foreground" fontSize={11}>{t * 100}%</text>
            </g>
          ))}
          <line x1={m.l} x2={W - m.r} y1={yv(overall)} y2={yv(overall)} stroke="hsl(var(--foreground))" strokeOpacity={0.5} strokeWidth={1} />
          <text x={m.l + 6} y={yv(overall) - 6} textAnchor="start" className="fill-foreground" fontSize={11} opacity={0.8}>overall 88.8%</text>
          {ageBands.map((d, i) => {
            const cx = m.l + band * i + band / 2;
            const top = yv(d.recall);
            const show = (e: React.PointerEvent | React.FocusEvent) => {
              const svg = (e.currentTarget as SVGElement).ownerSVGElement!;
              const r = svg.getBoundingClientRect();
              setTip({
                x: (cx / W) * r.width,
                y: (top / H) * r.height,
                title: `Age ${d.band} · ${d.n} serious ECGs`,
                lines: [pct(d.recall), `${d.missed} missed`],
              });
            };
            return (
              <g key={d.band}>
                <path
                  d={`M${cx - bw / 2},${m.t + ih} V${top + 4} q0,-4 4,-4 h${bw - 8} q4,0 4,4 V${m.t + ih} Z`}
                  fill={PINK}
                  opacity={tip && !tip.title.includes(d.band) ? 0.55 : 1}
                  style={{ transition: "opacity 150ms" }}
                />
                <text x={cx} y={top - 8} textAnchor="middle" className="fill-foreground" fontSize={W < 480 ? 11 : 12} fontWeight={600}>{Math.round(d.recall * 100)}%</text>
                <text x={cx} y={H - m.b + 18} textAnchor="middle" className="fill-muted-foreground" fontSize={W < 480 ? 10 : 11}>{d.band}</text>
                <rect
                  x={cx - band / 2} y={m.t} width={band} height={ih + 4} fill="transparent" tabIndex={0}
                  aria-label={`Age ${d.band}: recall ${pct(d.recall)}, ${d.missed} missed of ${d.n}`}
                  onPointerMove={show} onFocus={show} onPointerLeave={() => setTip(null)} onBlur={() => setTip(null)}
                  className="cursor-pointer outline-none"
                />
              </g>
            );
          })}
        </svg>
        <Tooltip tip={tip} />
      </div>
      <p className="mt-3 text-sm text-foreground/90">
        Under 40, it catches <strong>30 of 67</strong> serious cases. Over 60, it catches <strong>1,751 of 1,873</strong>.
        Sex made no difference (89.0% vs 88.7%), so this is an age effect, not general instability.
      </p>
      <DataTable head={["Age band", "Serious ECGs", "Recall", "Missed"]} rows={ageBands.map((d) => [d.band, d.n, pct(d.recall), d.missed])} />
    </div>
  );
}

function ModelChart() {
  const [tip, setTip] = useState<Tip>(null);
  const [box, W] = useWidth();
  const H = 220, m = { t: 20, r: 16, b: 36, l: W < 480 ? 104 : 150 };
  const iw = W - m.l - m.r;
  const lo = 0.86, hi = 0.91;
  const xv = (v: number) => m.l + ((v - lo) / (hi - lo)) * iw;
  const row = (H - m.t - m.b) / finalists.length;

  return (
    <div>
      <p className="mb-4 text-sm text-muted-foreground">
        Three finalists out of 16 tuned configurations, with 95% confidence intervals. The intervals overlap almost completely:
        a McNemar test found no significant difference, so the model choice was made on calibration and fewest missed cases.
      </p>
      <div className="relative" ref={box}>
        <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} className="block" role="img" aria-label="Dot plot of serious-case recall with confidence intervals for three models, all between 87% and 90%">
          {(W < 480 ? [0.86, 0.88, 0.9] : [0.86, 0.87, 0.88, 0.89, 0.9, 0.91]).map((t) => (
            <g key={t}>
              <line x1={xv(t)} x2={xv(t)} y1={m.t} y2={H - m.b} stroke={GRID} strokeWidth={1} />
              <text x={xv(t)} y={H - m.b + 18} textAnchor="middle" className="fill-muted-foreground" fontSize={11}>{Math.round(t * 100)}%</text>
            </g>
          ))}
          {finalists.map((d, i) => {
            const cy = m.t + row * i + row / 2;
            const show = (e: React.PointerEvent | React.FocusEvent) => {
              const r = (e.currentTarget as SVGElement).ownerSVGElement!.getBoundingClientRect();
              setTip({
                x: (xv(d.recall) / W) * r.width,
                y: ((cy - 10) / H) * r.height,
                title: `${d.model} · 95% CI ${pct(d.lo)} to ${pct(d.hi)}`,
                lines: [pct(d.recall, 2), `${d.missed} serious cases missed`],
              });
            };
            return (
              <g key={d.model}>
                <text x={m.l - 12} y={cy} dy="0.32em" textAnchor="end" className="fill-foreground" fontSize={W < 480 ? 11 : 13} fontWeight={d.chosen ? 600 : 400}>
                  {W < 480 ? d.model.replace(" (DART)", "") : d.model}{d.chosen ? " ✓" : ""}
                </text>
                <line x1={xv(d.lo)} x2={xv(d.hi)} y1={cy} y2={cy} stroke={d.chosen ? PINK : MUTED_MARK} strokeWidth={2} strokeLinecap="round" />
                <circle cx={xv(d.recall)} cy={cy} r={6} fill={d.chosen ? PINK : MUTED_MARK} stroke="hsl(var(--card))" strokeWidth={2} />
                <rect x={m.l} y={cy - row / 2} width={iw} height={row} fill="transparent" tabIndex={0}
                  aria-label={`${d.model}: recall ${pct(d.recall, 2)}, 95% CI ${pct(d.lo)} to ${pct(d.hi)}`}
                  onPointerMove={show} onFocus={show} onPointerLeave={() => setTip(null)} onBlur={() => setTip(null)}
                  className="cursor-pointer outline-none" />
              </g>
            );
          })}
        </svg>
        <Tooltip tip={tip} />
      </div>
      <p className="mt-3 text-sm text-foreground/90">
        Across all 16 configurations, serious-case recall varied by only <strong>2.9 points</strong>. The ceiling is in the data, not the algorithm.
      </p>
      <DataTable head={["Model", "Recall", "95% CI", "Missed"]} rows={finalists.map((d) => [d.model, pct(d.recall, 2), `${pct(d.lo)} to ${pct(d.hi)}`, d.missed])} />
    </div>
  );
}

function OutcomeChart() {
  const total = outcome.caught + outcome.missed;
  const caughtShare = outcome.caught / total;
  const tiles = [
    { label: "Serious cases caught", value: outcome.caught.toLocaleString("en-GB") },
    { label: "Serious cases missed", value: outcome.missed.toLocaleString("en-GB") },
    { label: "False alarms for review", value: outcome.falseAlarms.toLocaleString("en-GB") },
  ];
  return (
    <div>
      <p className="mb-4 text-sm text-muted-foreground">
        What the model would actually do on the 8,957 held-out ECGs it never saw during training or tuning.
      </p>
      <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6">
        {tiles.map((t) => (
          <div key={t.label} className="rounded-lg border border-white/10 bg-background/60 p-4">
            <div className="text-xl sm:text-2xl md:text-3xl font-display font-bold">{t.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{t.label}</div>
          </div>
        ))}
      </div>
      <div className="text-xs text-muted-foreground mb-2">All {total.toLocaleString("en-GB")} serious ECGs in the test set</div>
      <div className="flex h-6 w-full gap-[2px] overflow-hidden rounded" role="img" aria-label={`${pct(caughtShare)} of serious ECGs caught, ${pct(1 - caughtShare)} missed`}>
        <div style={{ width: `${caughtShare * 100}%`, background: PINK }} title={`Caught: ${outcome.caught}`} />
        <div style={{ width: `${(1 - caughtShare) * 100}%`, background: MUTED_MARK }} title={`Missed: ${outcome.missed}`} />
      </div>
      <div className="mt-3 flex flex-wrap gap-5 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded-sm" style={{ background: PINK }} />Caught {pct(caughtShare)}</span>
        <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded-sm" style={{ background: MUTED_MARK }} />Missed {pct(1 - caughtShare)}</span>
      </div>
      <p className="mt-4 text-sm text-foreground/90">
        Roughly <strong>3 extra clinician reviews per additional patient caught</strong> at this threshold. Where to set it is a clinical decision,
        so the report lays the trade-off out rather than picking a number that looks good.
      </p>
    </div>
  );
}

const tabs = [
  { id: "age", label: "Who it misses", el: <AgeChart /> },
  { id: "models", label: "Model shoot-out", el: <ModelChart /> },
  { id: "outcome", label: "On unseen ECGs", el: <OutcomeChart /> },
];

export default function DissertationExplorer() {
  const [active, setActive] = useState("age");
  return (
    <div className="mt-8 rounded-xl border border-white/10 bg-background/40 p-3 sm:p-5 md:p-6">
      <div className="mb-5 flex flex-wrap items-center gap-2" role="tablist" aria-label="Explore the dissertation results">
        <span className="mr-2 text-xs font-mono uppercase tracking-wider text-muted-foreground">Explore the results</span>
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={active === t.id}
            onClick={() => setActive(t.id)}
            className={`rounded-full border px-4 py-1.5 text-sm transition ${
              active === t.id ? "border-primary bg-primary text-white" : "border-white/15 text-muted-foreground hover:border-primary/60 hover:text-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div role="tabpanel">{tabs.find((t) => t.id === active)!.el}</div>
    </div>
  );
}
