import { motion } from "framer-motion";
import { Terminal } from "lucide-react";
import heroBg from "@assets/generated_images/abstract_neural_network_data_visualization_for_background.png";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 z-0 bg-cover bg-center opacity-10" style={{ backgroundImage: `url(${heroBg})` }} />
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-background/0 via-background/80 to-background" />

      <div className="container relative z-10 px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 text-primary text-sm font-mono mb-6 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative h-2 w-2 rounded-full bg-primary"></span>
              </span>
              System Status: ONLINE
            </div>

            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
              Devanshi <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500 glitch-text">
                Vashistha
              </span>
            </h1>

            <p className="text-lg text-muted-foreground mb-8 border-l-2 border-primary/50 pl-4 font-mono leading-relaxed">
              &gt; Initializing Data Scientist Protocol... <br />
              &gt; ML Models Loaded... <br />
              &gt; Ready to deploy intelligence.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#projects" className="px-8 py-3 border border-primary bg-primary/10 text-primary font-bold hover:bg-primary hover:text-white transition group inline-flex items-center">
                <Terminal className="mr-2 h-4 w-4 group-hover:animate-pulse" />
                Execute Projects
              </a>

              {/* FIXED DOWNLOAD BUTTON */}
              <a
                href="/Devanshi_Vashis.pdf"
                download="Devanshi_Vashistha_CV.pdf"
                className="px-8 py-3 border border-white/30 bg-transparent hover:bg-white/10 transition-all font-mono"
              >
                [Download_CV.pdf]
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
