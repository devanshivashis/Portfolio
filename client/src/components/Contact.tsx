import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Linkedin, Send } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-secondary/30 border-t border-primary/10 relative overflow-hidden">
      <div className="container px-6 mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Initiate Handshake Protocol</h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Got a project? A question? Or just want to debate whether AI will take over the world? (Spoiler: We're trying our best.)
            </p>
            
            <div className="space-y-6 font-mono text-sm">
              <a href="mailto:devanshivashistha05@gmail.com" className="flex items-center gap-4 text-foreground hover:text-primary transition-colors group">
                <div className="h-12 w-12 rounded-lg bg-card border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <Mail size={20} />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">email.send()</div>
                  <div className="font-bold">devanshivashistha05@gmail.com</div>
                </div>
              </a>
              
              <div className="flex items-center gap-4 group">
                <div className="h-12 w-12 rounded-lg bg-card border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <Phone size={20} />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">phone.call()</div>
                  <div className="font-bold">+44 07887148353</div>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="h-12 w-12 rounded-lg bg-card border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <MapPin size={20} />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">location.get()</div>
                  <div className="font-bold">Leicester, United Kingdom</div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-12">
              <a 
                href="https://linkedin.com/in/Devanshi-Vashistha"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-none bg-[#0077b5] text-white font-medium hover:brightness-110 transition-colors flex items-center gap-2 border border-transparent hover:border-white/20"
              >
                <Linkedin size={18} />
                Connect on LinkedIn
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-card/80 backdrop-blur-md border border-primary/20 rounded-xl p-8 shadow-2xl relative"
          >
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary"></div>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-mono text-primary uppercase">User.Name</label>
                  <input type="text" className="w-full bg-background border border-primary/20 rounded-none px-4 py-2 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="Jane Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono text-primary uppercase">User.Email</label>
                  <input type="email" className="w-full bg-background border border-primary/20 rounded-none px-4 py-2 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="jane@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono text-primary uppercase">Data.Subject</label>
                <input type="text" className="w-full bg-background border border-primary/20 rounded-none px-4 py-2 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="Collaboration Request" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono text-primary uppercase">Data.Payload</label>
                <textarea className="w-full bg-background border border-primary/20 rounded-none px-4 py-2 min-h-[150px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="Hello World..."></textarea>
              </div>
              <button className="w-full bg-primary text-white font-bold py-3 rounded-none hover:bg-primary/90 transition-all flex items-center justify-center gap-2 group">
                <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                TRANSMIT MESSAGE
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
