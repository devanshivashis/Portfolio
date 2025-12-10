import { motion } from "framer-motion";
import { Code, Cpu, Database, Cloud } from "lucide-react";

const skills = [
  { 
    category: "Languages (I Speak)", 
    icon: Code,
    items: ["Python (Native)", "SQL (Fluent)", "C++ (Conversational)"] 
  },
  { 
    category: "Brain Power (DL)", 
    icon: Cpu,
    items: ["TensorFlow", "Keras", "PyTorch", "CNNs", "OpenCV (I see you)"] 
  },
  { 
    category: "Data Sorcery", 
    icon: Database,
    items: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "Scikit-learn"] 
  },
  { 
    category: "The Cloud & Tools", 
    icon: Cloud,
    items: ["AWS (My second home)", "Docker (Containers > VMs)", "Git", "Postman", "Tableau"] 
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 bg-secondary/20 relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      
      <div className="container px-6 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">My Arsenal</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-mono text-sm">
            // Tools I use to bend data to my will
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((group, index) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-card/50 backdrop-blur-sm border border-primary/10 rounded-xl p-6 hover:border-primary/50 transition-all hover:shadow-[0_0_20px_rgba(236,72,153,0.1)] hover:-translate-y-1"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-md bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <group.icon size={20} />
                </div>
                <h3 className="text-lg font-bold text-foreground">{group.category}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-background rounded-none border border-white/10 text-xs font-mono text-muted-foreground group-hover:border-primary/30 group-hover:text-primary transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
