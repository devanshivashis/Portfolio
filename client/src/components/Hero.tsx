import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, MessageCircle } from "lucide-react";
import { links, roles } from "@/data/profile";
import EcgTrace from "@/components/EcgTrace";
import CountUp from "@/components/CountUp";
import NeuralMind from "@/components/NeuralMind";

const stats = [
  { value: <CountUp to={2} suffix="+ yrs" />, label: "industry ML experience" },
  { value: <CountUp to={99} suffix="%" />, label: "accuracy, CV system in production" },
  { value: <CountUp to={45152} />, label: "ECGs analysed in my MSc dissertation" },
  { value: "IEEE", label: "peer-reviewed publication, 2023" },
];

function RotatingRole() {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((v) => (v + 1) % roles.length), 2400);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="relative inline-block min-w-[9ch] align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={roles[i]}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35 }}
          className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500"
        >
          {roles[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-44 md:pb-52">
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-background/0 via-background/70 to-background" />
      <EcgTrace className="absolute left-0 right-0 bottom-4 z-0 h-32 md:h-44 w-full opacity-60 pointer-events-none" />

      <div className="container relative z-10 px-6 mx-auto grid lg:grid-cols-[1.15fr_1fr] gap-10 items-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <a href="#contact" className="group inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 text-primary text-sm font-mono mb-6 rounded-full hover:bg-primary/20 transition">
            <MessageCircle size={14} />
            Got a messy data problem? Let's talk it through
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </a>

          <h1 className="text-5xl md:text-7xl font-display font-bold mb-3">Devanshi Vashistha</h1>
          <p className="text-2xl md:text-4xl font-display font-semibold mb-6 text-foreground/90">
            <RotatingRole />
          </p>

          <p className="text-xl md:text-2xl font-display text-foreground/90 mb-5">
            I build machine learning that holds up after the demo, then go looking for where it breaks.
          </p>

          <p className="text-base md:text-lg text-muted-foreground mb-8 leading-relaxed max-w-2xl">
            I shipped a real-time computer vision system to production at Agsure and led its interns, published
            peer-reviewed research on CNNs, and now review frontier AI outputs for model training. Below are the
            problems I've worked on, written up as case studies.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <a href="#projects" className="px-7 py-3 bg-primary text-white font-bold hover:brightness-110 transition inline-flex items-center justify-center gap-2">
              Read the case studies <ArrowRight size={18} />
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

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative order-first lg:order-none h-56 sm:h-72 lg:h-[520px]"
        >
          <div className="absolute inset-[15%] rounded-full bg-primary/10 blur-3xl" />
          <NeuralMind className="relative h-full w-full" />
        </motion.div>
      </div>
    </section>
  );
}
