import { motion } from "framer-motion";
import { Code, Cpu, LineChart, Eye, Cloud } from "lucide-react";
import { skills } from "@/data/profile";

const icons = [Code, Cpu, LineChart, Eye, Cloud];

export default function Skills() {
  return (
    <section id="skills" className="py-24 bg-secondary/20 relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />
      <div className="container px-6 mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Skills</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm">What I reach for, grouped by the job it does.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
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
