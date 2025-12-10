import { motion } from "framer-motion";
import { ArrowRight, Terminal, Cpu, Database } from "lucide-react";
import heroBg from "@assets/generated_images/abstract_neural_network_data_visualization_for_background.png";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      {/* Grid Overlay for Tech Feel */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-background/0 via-background/80 to-background" />

      <div className="container relative z-10 px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-mono mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              System Status: ONLINE
            </div>
            
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-6">
              Devanshi <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500 glitch-text" data-text="Vashistha">
                Vashistha
              </span>
            </h1>
            
            <div className="mb-8">
              <p className="text-2xl md:text-3xl font-display font-medium italic text-foreground mb-2">
                "I like to make machines work!"
              </p>
              <p className="text-xl text-muted-foreground">
                That’s why they were created in the first place, right?
              </p>
            </div>

            <p className="text-lg text-muted-foreground mb-8 max-w-lg leading-relaxed font-mono border-l-2 border-primary/50 pl-4">
              &gt; Initializing Data Scientist Protocol...<br/>
              &gt; Loading ML Models...<br/>
              &gt; Ready to deploy intelligence.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#projects"
                className="inline-flex items-center justify-center px-8 py-3 rounded-none border border-primary bg-primary/10 text-primary font-bold hover:bg-primary hover:text-background transition-all group"
              >
                <Terminal className="mr-2 h-4 w-4 group-hover:animate-pulse" />
                Execute Projects
              </a>
              <a 
                href="/resume.pdf" 
                className="inline-flex items-center justify-center px-8 py-3 rounded-none border border-white/20 bg-transparent hover:bg-white/5 hover:border-white/50 transition-all font-mono"
              >
                [Download_CV.pdf]
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block relative"
          >
            {/* Abstract Code/Data Card */}
            <div className="relative z-10 bg-black/80 backdrop-blur-xl border border-primary/30 rounded-lg p-8 shadow-[0_0_30px_rgba(236,72,153,0.15)] font-mono text-sm">
              <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                </div>
                <span className="text-xs text-muted-foreground">~/brain/cortex/training.py</span>
              </div>
              
              <div className="space-y-2 text-green-400/90">
                <div className="flex">
                  <span className="w-8 text-gray-600 select-none">1</span>
                  <span className="text-purple-400">def</span> <span className="text-yellow-400">make_machines_work</span>(coffee_level):
                </div>
                <div className="flex">
                  <span className="w-8 text-gray-600 select-none">2</span>
                  <span className="pl-4"><span className="text-purple-400">if</span> coffee_level &lt; 10:</span>
                </div>
                <div className="flex">
                  <span className="w-8 text-gray-600 select-none">3</span>
                  <span className="pl-8"><span className="text-purple-400">return</span> <span className="text-red-400">"System Error: Caffeine Low"</span></span>
                </div>
                <div className="flex">
                  <span className="w-8 text-gray-600 select-none">4</span>
                  <span className="pl-4">neural_net = <span className="text-blue-400">Brain</span>.load(<span className="text-green-300">"devanshi_v1.0"</span>)</span>
                </div>
                <div className="flex">
                  <span className="w-8 text-gray-600 select-none">5</span>
                  <span className="pl-4">neural_net.optimize(<span className="text-purple-400">mode</span>=<span className="text-green-300">"beast"</span>)</span>
                </div>
                <div className="flex">
                  <span className="w-8 text-gray-600 select-none">6</span>
                  <span className="pl-4"><span className="text-purple-400">return</span> neural_net.predict(<span className="text-green-300">"future"</span>)</span>
                </div>
                <div className="flex">
                  <span className="w-8 text-gray-600 select-none">7</span>
                </div>
                <div className="flex animate-pulse">
                  <span className="w-8 text-gray-600 select-none">8</span>
                  <span className="text-primary">&gt; Output: "Success. World Domination Pending..."_</span>
                </div>
              </div>

              {/* Decorative Tech Elements */}
              <div className="absolute -right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2">
                <Cpu className="text-primary/40 h-6 w-6" />
                <Database className="text-primary/40 h-6 w-6" />
              </div>
            </div>
            
            {/* Decor elements */}
            <div className="absolute -top-20 -right-20 h-72 w-72 bg-primary/20 rounded-full blur-[100px] -z-10" />
            <div className="absolute -bottom-20 -left-20 h-72 w-72 bg-purple-600/20 rounded-full blur-[100px] -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
