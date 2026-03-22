import { motion, useScroll, useSpring } from "motion/react";
import { 
  ScrollText, 
  Compass, 
  Hammer, 
  Sparkles, 
  Eye, 
  Coffee, 
  Mail,
  Map as MapIcon,
  ChevronDown
} from "lucide-react";
import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  id: string;
}

const Section = ({ children, id }: SectionProps) => {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="mb-24 relative"
    >
      {children}
    </motion.section>
  );
};

const Divider = () => <div className="scroll-divider" />;

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen relative overflow-x-hidden burnt-edges">
      {/* Texture Overlays */}
      <div className="parchment-overlay" />
      <div className="fixed inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/10 pointer-events-none z-40" />
      
      {/* Progress Bar (Ink Line) */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-[#4a2c1d] origin-left z-50"
        style={{ scaleX }}
      />

      <main className="scroll-container relative z-10">
        {/* 1. Opening Title */}
        <Section id="hero">
          <div className="text-center py-20">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5 }}
            >
              <ScrollText className="w-16 h-16 mx-auto mb-6 text-[#9b6b43] opacity-80" />
              <h1 className="text-6xl md:text-8xl font-bold mb-4 tracking-tight text-[#4a2c1d]">
                The Chronicle of <br />
                <span className="italic font-light">William Teke</span>
              </h1>
              <p className="text-xl md:text-2xl italic text-[#7a5230] max-w-2xl mx-auto leading-relaxed">
                "A digital cartographer of the modern age, weaving code and craft into artifacts of the future."
              </p>
            </motion.div>
            
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="mt-20 text-[#9b6b43]"
            >
              <ChevronDown className="mx-auto w-8 h-8" />
            </motion.div>
          </div>
        </Section>

        <Divider />

        {/* 2. Origins */}
        <Section id="origins">
          <div className="flex items-center gap-4 mb-8">
            <Compass className="w-8 h-8 text-[#9b6b43]" />
            <h2 className="text-4xl font-bold text-[#4a2c1d]">Origins</h2>
          </div>
          <div className="prose prose-lg text-[#2c1810] leading-relaxed">
            <p className="mb-6 first-letter:text-6xl first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:text-[#9b6b43]">
              Born in the era of rapid digital expansion, William found his calling not in the physical world, but in the ethereal realms of logic and design. His journey began with a simple curiosity: how do we build things that last?
            </p>
            <p className="mb-6">
              With a heritage rooted in storytelling and a mind tuned to technical precision, he bridges the gap between the ancient art of narrative and the modern science of software engineering. Every line of code is a stroke of ink on a vast, ever-expanding map.
            </p>
          </div>
        </Section>

        <Divider />

        {/* 3. Craft */}
        <Section id="craft">
          <div className="flex items-center gap-4 mb-8">
            <Hammer className="w-8 h-8 text-[#9b6b43]" />
            <h2 className="text-4xl font-bold text-[#4a2c1d]">The Craft</h2>
          </div>
          <div className="space-y-12">
            {[
              {
                period: "2022 — Present",
                title: "Master Architect of Interfaces",
                company: "The Digital Guild",
                desc: "Leading the creation of immersive web experiences using React, TypeScript, and the dark arts of CSS."
              },
              {
                period: "2020 — 2022",
                title: "Apprentice of Logic",
                company: "Silicon Valley Outpost",
                desc: "Forging robust backend systems and learning the foundational principles of scalable architecture."
              }
            ].map((job, i) => (
              <div key={i} className="border-l-2 border-[#9b6b43]/30 pl-8 relative">
                <div className="absolute w-4 h-4 rounded-full bg-[#9b6b43] -left-[9px] top-1 shadow-sm" />
                <span className="text-sm font-bold uppercase tracking-widest text-[#9b6b43]">{job.period}</span>
                <h3 className="text-2xl font-bold mt-1 text-[#4a2c1d]">{job.title}</h3>
                <p className="italic text-[#7a5230] mb-3">{job.company}</p>
                <p className="text-[#2c1810] opacity-90">{job.desc}</p>
              </div>
            ))}
          </div>
        </Section>

        <Divider />

        {/* 4. Creations */}
        <Section id="creations">
          <div className="flex items-center gap-4 mb-8">
            <Sparkles className="w-8 h-8 text-[#9b6b43]" />
            <h2 className="text-4xl font-bold text-[#4a2c1d]">Creations</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                title: "The Aether Engine",
                type: "Open Source Tool",
                desc: "A high-performance rendering engine for complex data visualizations.",
                image: "https://picsum.photos/seed/aether/600/400"
              },
              {
                title: "Chronos Ledger",
                type: "Web Application",
                desc: "A decentralized time-tracking system for nomadic digital workers.",
                image: "https://picsum.photos/seed/chronos/600/400"
              }
            ].map((project, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-sm border border-[#9b6b43]/20 shadow-lg mb-4">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-64 object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2c1810]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <h3 className="text-2xl font-bold text-[#4a2c1d]">{project.title}</h3>
                <p className="text-sm uppercase tracking-widest text-[#9b6b43] mb-2">{project.type}</p>
                <p className="text-[#2c1810] opacity-80">{project.desc}</p>
              </motion.div>
            ))}
          </div>
        </Section>

        <Divider />

        {/* 5. Prophecies */}
        <Section id="prophecies">
          <div className="flex items-center gap-4 mb-8">
            <Eye className="w-8 h-8 text-[#9b6b43]" />
            <h2 className="text-4xl font-bold text-[#4a2c1d]">Prophecies</h2>
          </div>
          <div className="bg-[#4a2c1d]/5 p-8 border-y border-[#9b6b43]/20 italic text-center">
            <p className="text-2xl text-[#4a2c1d] leading-relaxed">
              "The future of the web is not in more data, but in more meaning. We shall return to interfaces that feel like physical artifacts—tangible, soulful, and deeply human."
            </p>
          </div>
        </Section>

        <Divider />

        {/* 6. Leisure */}
        <Section id="leisure">
          <div className="flex items-center gap-4 mb-8">
            <Coffee className="w-8 h-8 text-[#9b6b43]" />
            <h2 className="text-4xl font-bold text-[#4a2c1d]">Leisure</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: MapIcon, label: "Cartography" },
              { icon: Coffee, label: "Rare Brews" },
              { icon: ScrollText, label: "Philosophy" },
              { icon: Compass, label: "Wayfaring" }
            ].map((item, i) => (
              <div key={i} className="p-4 border border-[#9b6b43]/10 rounded-sm">
                <item.icon className="w-8 h-8 mx-auto mb-2 text-[#9b6b43] opacity-60" />
                <span className="text-sm font-medium text-[#7a5230]">{item.label}</span>
              </div>
            ))}
          </div>
        </Section>

        <Divider />

        {/* 7. Contact */}
        <Section id="contact">
          <div className="text-center py-20">
            <Mail className="w-12 h-12 mx-auto mb-6 text-[#9b6b43]" />
            <h2 className="text-5xl font-bold mb-6 text-[#4a2c1d]">Send a Messenger</h2>
            <p className="text-xl mb-10 text-[#7a5230]">
              Should you wish to collaborate on a new artifact or simply share a story.
            </p>
            <a 
              href="mailto:willtekeschool@gmail.com"
              className="inline-block px-10 py-4 bg-[#4a2c1d] text-[#f4e4bc] font-bold text-lg rounded-sm hover:bg-[#2c1810] transition-colors shadow-xl"
            >
              willtekeschool@gmail.com
            </a>
          </div>
        </Section>

        <footer className="text-center py-10 border-t border-[#9b6b43]/20 opacity-60 text-sm italic">
          <p>© MMXXVI — The Digital Archive of William Teke</p>
          <p className="mt-2">Rendered in the year of our code 2026</p>
        </footer>
      </main>
    </div>
  );
}
