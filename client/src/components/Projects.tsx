import { motion } from "framer-motion";
import { ExternalLink, Github, BarChart, Activity, Eye, FileText, Zap, Terminal } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const projects = [
  {
    title: "Applicant Tracking System",
    icon: FileText,
    description: "Recruiters are busy. I built a bot that reads resumes better than they do. Used NLP to analyze candidates and boost quality by 85%. You're welcome, HR.",
    tags: ["NLP", "Python", "Automation"],
    link: "#"
  },
  {
    title: "Brain Tumor Detection",
    icon: Activity,
    description: "Trained a CNN to spot tumors in MRI scans with 95% accuracy. Because computers don't get tired eyes.",
    tags: ["Deep Learning", "CNN", "Medical AI"],
    link: "#"
  },
  {
    title: "Driver Drowsiness Detector",
    icon: Eye,
    description: "A system that watches you while you drive (in a non-creepy way). Uses OpenCV to yell at you if you fall asleep. 91% accuracy in saving lives.",
    tags: ["Computer Vision", "Real-time", "OpenCV"],
    link: "#"
  },
  {
    title: "Fashion MNIST Classifier",
    icon: BarChart,
    description: "Classified 70,000 images of clothes. Now my computer knows the difference between a sneaker and a sandal better than my dad does.",
    tags: ["TensorFlow", "Classification", "AI"],
    link: "#"
  },
  {
    title: "Overspeed Car Detector",
    icon: Zap,
    description: "IoT system with Arduino sensors to catch speedsters. If you go too fast, the buzzer knows. Snitch-bot v1.0.",
    tags: ["IoT", "Hardware", "Arduino"],
    link: "#"
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 bg-background">
      <div className="container px-6 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-accent border border-accent/20 text-xs font-mono mb-4">
            <Terminal size={12} />
            <span>ls ./projects</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Stuff I Built</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Code that actually runs. Most of the time.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full bg-card border-white/5 hover:border-primary transition-all hover:shadow-[0_0_30px_rgba(236,72,153,0.15)] group relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                
                <CardHeader>
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-secondary rounded-lg text-primary group-hover:text-white group-hover:bg-primary transition-colors">
                      <project.icon size={24} />
                    </div>
                    <Terminal className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <CardTitle className="text-xl font-bold font-display">{project.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="bg-secondary text-primary/80 border border-primary/10 text-xs font-mono">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
