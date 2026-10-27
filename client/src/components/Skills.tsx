import { motion } from "framer-motion";
import { Cpu, LineChart, Eye, Cloud } from "lucide-react";
import { languages, skills } from "@/data/profile";

const icons = [Cpu, LineChart, Eye, Cloud];

export default function Skills() {
  return (
    <section id="skills" className="py-24 bg-secondary/20 relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />
      <div className="container px-6 mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Toolkit</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm">Three languages I think in, and what I reach for around them.</p>
        </motion.div>

        <div className="grid grid-cols-3 gap-3 md:gap-6 max-w-3xl mx-auto mb-12">
          {languages.map((l, i) => (
            <motion.div
              key={l.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-white/10 bg-card p-4 md:p-6 text-center"
              style={{ boxShadow: `inset 0 1px 0 hsl(${l.hue} / 0.25)` }}
            >
              <div
                className="mx-auto mb-3 flex h-14 w-14 md:h-20 md:w-20 items-center justify-center rounded-2xl font-mono font-bold text-white text-xl md:text-3xl"
                style={{ background: `linear-gradient(135deg, hsl(${l.hue}), hsl(${l.hue} / 0.55))` }}
                aria-hidden="true"
              >
                {l.mono}
              </div>
              <div className="font-display font-bold text-lg md:text-xl">{l.name}</div>
              <div className="text-xs text-muted-foreground font-mono">{l.note}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((group, index) => {
            const Icon = icons[index % icons.length];
            return (
              <motion.div key={group.category} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }} className="bg-card/50 backdrop-blur-sm border border-primary/10 rounded-xl p-6 hover:border-primary/50 transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-md bg-primary/10 text-primary">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{group.category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-background border border-white/10 text-xs font-mono text-muted-foreground">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
