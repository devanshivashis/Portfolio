import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { Mail, Phone, MapPin, Linkedin, Send } from "lucide-react";

export default function Contact() {
  const linkedinURL = "https://www.linkedin.com/in/devanshi-vashistha-409542205/";

  const [formData, setFormData] = useState({
    from_name: "",
    from_email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = async (e: any) => {
    e.preventDefault();
    setStatus("Sending...");

    emailjs
      .send(
        "service_iuhq29k",       // ← Replace
        "template_lm3da86",      // ← Replace
        formData,
        "U1meCqDPcAmHm1Jry"        // ← Replace
      )
      .then(
        () => {
          setStatus("Message Sent Successfully!");
          setFormData({
            from_name: "",
            from_email: "",
            subject: "",
            message: "",
          });
        },
        () => setStatus("Failed to send message. Try again!")
      );
  };

  return (
    <section id="contact" className="py-24 bg-secondary/30 border-t border-primary/10 relative overflow-hidden">
      <div className="container px-6 mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT SIDE */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Initiate Handshake Protocol</h2>

            <div className="space-y-6 font-mono text-sm">
              <a href="mailto:devanshivashistha05@gmail.com" className="flex items-center gap-4 hover:text-primary">
                <div className="h-12 w-12 flex items-center justify-center border border-primary/20 bg-card rounded-lg text-primary">
                  <Mail size={20} />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">email.send()</div>
                  <div className="font-bold">devanshivashistha05@gmail.com</div>
                </div>
              </a>

              <div className="flex items-center gap-4">
                <div className="h-12 w-12 flex items-center justify-center border border-primary/20 bg-card rounded-lg text-primary">
                  <Phone size={20} />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">phone.call()</div>
                  <div className="font-bold">+44 07887148353</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="h-12 w-12 flex items-center justify-center border border-primary/20 bg-card rounded-lg text-primary">
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
                href={linkedinURL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-[#0077b5] text-white flex items-center gap-2 hover:brightness-110"
              >
                <Linkedin size={18} /> Connect on LinkedIn
              </a>
            </div>
          </motion.div>

          {/* RIGHT SIDE — EMAIL FORM USING EMAILJS */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="bg-card/80 backdrop-blur-md border border-primary/20 rounded-xl p-8 shadow-2xl"
          >
            <form className="space-y-6" onSubmit={sendEmail}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-mono text-primary uppercase">User.Name</label>
                  <input
                    name="from_name"
                    value={formData.from_name}
                    onChange={handleChange}
                    type="text"
                    required
                    className="w-full bg-background border border-primary/20 px-4 py-2"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-primary uppercase">User.Email</label>
                  <input
                    name="from_email"
                    value={formData.from_email}
                    onChange={handleChange}
                    type="email"
                    required
                    className="w-full bg-background border border-primary/20 px-4 py-2"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-primary uppercase">Data.Subject</label>
                <input
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  type="text"
                  required
                  className="w-full bg-background border border-primary/20 px-4 py-2"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-primary uppercase">Data.Payload</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full bg-background border border-primary/20 px-4 py-2 min-h-[150px]"
                />
              </div>

              <button className="w-full bg-primary text-white py-3 font-bold flex items-center justify-center gap-2">
                <Send size={16} /> TRANSMIT MESSAGE
              </button>

              <p className="text-sm text-primary mt-4 text-center">{status}</p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
