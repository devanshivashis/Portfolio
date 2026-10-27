import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { caseStudies, type CaseStudy } from "@/data/profile";
import DissertationExplorer from "@/components/DissertationExplorer";

function Tags({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Badge key={tag} variant="secondary" className="bg-secondary text-primary/80 border border-primary/10 text-xs font-mono">
          {tag}
        </Badge>
      ))}
    </div>
  );
}

function CaseLink({ c }: { c: CaseStudy }) {
  if (!c.link) return null;
  return (
    <a href={c.link.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-primary hover:underline mt-4">
      {c.link.label} <ExternalLink size={14} />
    </a>
  );
}

const steps: { key: "problem" | "approach" | "outcome"; label: string }[] = [
  { key: "problem", label: "The problem" },
  { key: "approach", label: "What I did" },
  { key: "outcome", label: "What came out of it" },
];

export default function Projects() {
  const featured = caseStudies.filter((c) => c.featured);
  const rest = caseStudies.filter((c) => !c.featured);

  return (
    <section id="projects" className="py-24 bg-background">
      <div className="container px-6 mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <div className="text-xs font-mono uppercase tracking-[0.2em] text-primary mb-3">Case studies</div>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Problems I've worked on</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Each one: the question, what I did about it, and what the evidence said.</p>
        </motion.div>

        {featured.map((c) => (
          <motion.article key={c.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 border border-primary/30 bg-card rounded-xl p-5 md:p-10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-purple-600" />
            <div className="flex items-baseline gap-4 mb-3">
              <span className="font-display text-4xl md:text-5xl font-bold text-primary/30">{c.id}</span>
              <span className="text-xs font-mono text-primary">{c.kind}</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-display font-bold mb-8">{c.title}</h3>
            <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-6">
              {steps.map((s, i) => (
                <div key={s.key} className="relative">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
                    <span className="text-primary">{String(i + 1).padStart(2, "0")}</span> {s.label}
                  </h4>
                  <p className="text-foreground/90 leading-relaxed text-sm">{c[s.key]}</p>
                </div>
              ))}
            </div>
            <Tags tags={c.tags} />
            <CaseLink c={c} />
            <DissertationExplorer />
          </motion.article>
        ))}

        <div className="grid md:grid-cols-2 gap-6">
          {rest.map((c, index) => (
            <motion.article key={c.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }} className="group h-full bg-card border border-white/5 hover:border-primary/60 transition-all rounded-xl p-6 md:p-8 flex flex-col">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="font-display text-3xl font-bold text-primary/30 group-hover:text-primary/60 transition-colors">{c.id}</span>
                <span className="text-xs font-mono text-primary">{c.kind}</span>
              </div>
              <h3 className="text-xl font-bold font-display mb-5">{c.title}</h3>
              <dl className="space-y-3 mb-6 text-sm">
                {steps.map((s) => (
                  <div key={s.key} className="grid grid-cols-[7.5rem_1fr] gap-3">
                    <dt className="text-xs font-mono uppercase tracking-wider text-muted-foreground pt-0.5">{s.label}</dt>
                    <dd className={s.key === "outcome" ? "text-foreground" : "text-foreground/80"}>{c[s.key]}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-auto">
                <Tags tags={c.tags} />
                <CaseLink c={c} />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
