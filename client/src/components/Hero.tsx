import { motion } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin } from "lucide-react";
import heroBg from "@assets/generated_images/abstract_neural_network_data_visualization_for_background.png";
import { links } from "@/data/profile";
import EcgTrace from "@/components/EcgTrace";
import CountUp from "@/components/CountUp";

const stats = [
  { value: <CountUp to={2} suffix="+ yrs" />, label: "industry ML experience" },
  { value: <CountUp to={99} suffix="%" />, label: "accuracy, CV system in production" },
  { value: <CountUp to={45152} />, label: "ECGs analysed in my MSc dissertation" },
  { value: "IEEE", label: "published, ICIIP 2023" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-44 md:pb-52">
      <div className="absolute inset-0 z-0 bg-cover bg-center opacity-10" style={{ backgroundImage: `url(${heroBg})` }} />
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-background/0 via-background/80 to-background" />
      <EcgTrace className="absolute left-0 right-0 bottom-4 z-0 h-32 md:h-44 w-full opacity-60 pointer-events-none" />

      <div className="container relative z-10 px-6 mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 text-primary text-sm font-mono mb-6 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative h-2 w-2 rounded-full bg-primary" />
            </span>
            Open to Data Scientist & ML Engineer roles · UK
          </div>

          <h1 className="text-5xl md:text-7xl font-display font-bold mb-4">
            Devanshi{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">Vashistha</span>
          </h1>

          <p className="text-2xl md:text-3xl font-display text-foreground/90 mb-6">
            I build machine learning that holds up after the demo.
          </p>

          <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-2xl">
            Data Scientist and ML Engineer. I shipped a real-time computer vision system to production at Agsure,
            led a small team of interns, and spent my MSc at Leicester proving which parts of a cardiac model
            actually work, and for whom.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <a href="#projects" className="px-7 py-3 bg-primary text-white font-bold hover:brightness-110 transition inline-flex items-center justify-center gap-2">
              See my work <ArrowRight size={18} />
            </a>
            <a href={links.cv} download className="px-7 py-3 border border-white/30 hover:bg-white/10 transition inline-flex items-center justify-center gap-2">
              <Download size={18} /> Download CV
            </a>
            <div className="flex gap-3 justify-center sm:justify-start">
              <a href={links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="p-3 border border-white/20 hover:border-primary hover:text-primary transition">
                <Github size={20} />
              </a>
              <a href={links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="p-3 border border-white/20 hover:border-primary hover:text-primary transition">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <dl className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="border-l-2 border-primary/50 pl-4">
                <dt className="sr-only">{s.label}</dt>
                <dd className="text-2xl font-display font-bold text-foreground">{s.value}</dd>
                <dd className="text-xs text-muted-foreground font-mono leading-snug">{s.label}</dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  );
}
