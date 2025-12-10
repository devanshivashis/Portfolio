import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Calendar, Terminal } from "lucide-react";

const education = [
  {
    school: "University of Leicester",
    degree: "MSc in Data Science",
    period: "2025 - 2026",
    location: "Leicester, UK",
    desc: "Upgrading my neural pathways. Loading advanced data modules..."
  },
  {
    school: "Jaypee University",
    degree: "BTech in Computer Science",
    period: "2020 - 2024",
    location: "Solan, India",
    desc: "Base layer installation. CGPA 8.9 (High performance mode enabled)."
  }
];

const experience = [
  {
    role: "AI/ML Software Developer",
    company: "Agsure Innovations",
    period: "Jun 2024 - Aug 2025",
    description: "Taught computers to look at grains and judge them. 99% accuracy because I don't like mistakes. Deployed to AWS because localhosts are for quitters."
  },
  {
    role: "Sales Dev. Rep (Intern)",
    company: "Recruit CRM",
    period: "Dec 2023 - Jun 2024",
    description: "Cold calling and emailing. Basically, human-to-human API integration. Found business opportunities like a heat-seeking missile."
  },
  {
    role: "AI/ML Trainee",
    company: "JUIT - Industrial Training",
    period: "Jun 2023 - Jul 2023",
    description: "Training montage. Processed large datasets until they confessed their secrets."
  },
  {
    role: "Data Scientist Apprentice",
    company: "IBM",
    period: "Jul 2022 - Oct 2022",
    description: "Explored ML concepts. Wrote prompts before it was cool. Understood that 'predictive modeling' is just fortune telling with math."
  }
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-background relative overflow-hidden">
      <div className="container px-6 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-primary border border-primary/20 text-xs font-mono mb-4">
            <Terminal size={12} />
            <span>cat about_me.txt</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Version History</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-primary to-purple-500 mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Experience Column */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <Briefcase className="text-primary h-6 w-6" />
              <h3 className="text-2xl font-display font-bold">Quest Log (Work)</h3>
            </div>
            <div className="space-y-8 border-l border-primary/20 pl-8 relative">
              {experience.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <span className="absolute -left-[37px] top-1 h-4 w-4 rounded-none border border-primary bg-background rotate-45 group-hover:bg-primary transition-colors" />
                  <h4 className="text-xl font-bold text-foreground">{item.role}</h4>
                  <div className="text-primary font-mono text-sm mb-1">@ {item.company}</div>
                  <div className="flex items-center text-xs text-muted-foreground mb-3 font-mono">
                    <Calendar className="h-3 w-3 mr-1" />
                    {item.period}
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education Column */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <GraduationCap className="text-primary h-6 w-6" />
              <h3 className="text-2xl font-display font-bold">Skill Tree (Education)</h3>
            </div>
            <div className="space-y-8 border-l border-primary/20 pl-8 relative">
              {education.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <span className="absolute -left-[37px] top-1 h-4 w-4 rounded-full border border-purple-500 bg-background" />
                  <h4 className="text-xl font-bold">{item.degree}</h4>
                  <div className="text-purple-400 font-mono text-sm mb-1">{item.school}</div>
                  <div className="flex items-center text-xs text-muted-foreground mb-3 font-mono">
                    <Calendar className="h-3 w-3 mr-1" />
                    {item.period}
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
