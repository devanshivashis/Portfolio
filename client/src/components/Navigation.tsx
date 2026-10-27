import { useState, useEffect } from "react";
import { Menu, X, Linkedin, Mail, Github } from "lucide-react";
import { links as profileLinks } from "@/data/profile";
import { motion, AnimatePresence } from "framer-motion";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Experience", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Work", href: "#projects" },
    { name: "Contact", href: "#contact" }
  ];

  const linkedinURL = "https://www.linkedin.com/in/devanshi-vashistha-409542205/";

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <a href="#" className="text-2xl font-display font-bold text-primary tracking-tighter">DV.</a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a key={link.name} href={link.href} className="text-sm text-muted-foreground hover:text-primary">
              {link.name}
            </a>
          ))}

          {/* FIXED LINKEDIN URL */}
          <a
            href={linkedinURL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary"
          >
            <Linkedin size={20} />
          </a>
          <a href={profileLinks.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-muted-foreground hover:text-primary">
            <Github size={20} />
          </a>
          <a href={profileLinks.cv} download className="text-sm px-4 py-2 border border-primary text-primary hover:bg-primary hover:text-white transition">
            CV
          </a>
        </div>

        {/* Mobile Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border"
          >
            <div className="flex flex-col p-6 gap-4">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg hover:text-primary"
                >
                  {link.name}
                </a>
              ))}

              <div className="flex gap-4 mt-4">
                <a
                  href={linkedinURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary"
                >
                  <Linkedin size={24} />
                </a>

                <a href={profileLinks.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                  <Github size={24} />
                </a>
                <a
                  href="mailto:devanshivashistha05@gmail.com"
                  className="text-muted-foreground hover:text-primary"
                >
                  <Mail size={24} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
