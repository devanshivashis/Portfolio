import { motion } from "framer-motion";
import { ExternalLink, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { projects, type Project } from "@/data/profile";

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

function ProjectLink({ project }: { project: Project }) {
  if (!project.link) return null;
  return (
    <a href={project.link.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-primary hover:underline mt-4">
      {project.link.label} <ExternalLink size={14} />
    </a>
  );
}

export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-24 bg-background">
      <div className="container px-6 mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Selected Work</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">What I set out to do, how I did it, and what the numbers said.</p>
        </motion.div>

        {featured.map((p) => (
          <motion.article key={p.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 border border-primary/30 bg-card rounded-xl p-8 md:p-10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-purple-600" />
            <div className="inline-flex items-center gap-2 text-xs font-mono text-primary mb-3">
              <Star size={14} /> Featured · {p.kind}
            </div>
            <h3 className="text-2xl md:text-3xl font-display font-bold mb-6">{p.title}</h3>
            <div className="grid md:grid-cols-2 gap-8 mb-6">
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">What I did</h4>
                <p className="text-foreground/90 leading-relaxed text-sm">{p.summary}</p>
              </div>
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">What came out of it</h4>
                <p className="text-foreground/90 leading-relaxed text-sm">{p.result}</p>
              </div>
            </div>
            <Tags tags={p.tags} />
            <ProjectLink project={p} />
          </motion.article>
        ))}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((p, index) => (
            <motion.article key={p.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }} className="h-full bg-card border border-white/5 hover:border-primary/60 transition-all rounded-xl p-6 flex flex-col">
              <div className="text-xs font-mono text-primary mb-2">{p.kind}</div>
              <h3 className="text-xl font-bold font-display mb-3">{p.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">{p.summary}</p>
              <p className="text-foreground/90 text-sm leading-relaxed mb-5">
                <span className="font-semibold">Result: </span>
                {p.result}
              </p>
              <div className="mt-auto">
                <Tags tags={p.tags} />
                <ProjectLink project={p} />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
