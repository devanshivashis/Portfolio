import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Calendar } from "lucide-react";
import { experience, education } from "@/data/profile";

export default function About() {
  return (
    <section id="about" className="py-24 bg-background relative overflow-hidden">
      <div className="container px-6 mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Experience & Education</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-primary to-purple-500 mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3 mb-8">
              <Briefcase className="text-primary h-6 w-6" />
              <h3 className="text-2xl font-display font-bold">Experience</h3>
            </div>
            <div className="space-y-10 border-l border-primary/20 pl-8">
              {experience.map((item, index) => (
                <motion.div key={item.company + item.role} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }} className="relative">
                  <span className="absolute -left-[37px] top-1.5 h-4 w-4 border border-primary bg-background rotate-45" />
                  <h4 className="text-xl font-bold text-foreground">{item.role}</h4>
                  <div className="text-primary font-mono text-sm">{item.company} · {item.location}</div>
                  <div className="flex items-center text-xs text-muted-foreground mb-3 font-mono">
                    <Calendar className="h-3 w-3 mr-1" />
                    {item.period}
                  </div>
                  <ul className="space-y-2 text-muted-foreground text-sm leading-relaxed list-disc pl-4">
                    {item.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <GraduationCap className="text-primary h-6 w-6" />
              <h3 className="text-2xl font-display font-bold">Education</h3>
            </div>
            <div className="space-y-10 border-l border-primary/20 pl-8">
              {education.map((item, index) => (
                <motion.div key={item.degree} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }} className="relative">
                  <span className="absolute -left-[37px] top-1.5 h-4 w-4 rounded-full border border-purple-500 bg-background" />
                  <h4 className="text-xl font-bold">{item.degree}</h4>
                  <div className="text-purple-400 font-mono text-sm">{item.school}</div>
                  <div className="flex items-center text-xs text-muted-foreground mb-3 font-mono">
                    <Calendar className="h-3 w-3 mr-1" />
                    {item.period}
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.note}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
