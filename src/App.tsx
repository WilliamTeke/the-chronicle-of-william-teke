import { motion, useScroll, useSpring, AnimatePresence } from "motion/react";
import { 
  ScrollText, 
  Compass, 
  Hammer, 
  Sparkles, 
  Mail,
  ChevronDown,
  Activity,
  Castle,
  Music,
  Swords,
  ArrowRight,
  ArrowDown,
  Lightbulb,
  Trophy,
  MapPin
} from "lucide-react";
import { ReactNode, useState, useEffect } from "react";
import elonImg from './public/images/elon.jpg';
import neptuneImg from './public/images/neptune.png';

interface SectionProps {
  children: ReactNode;
  id: string;
  className?: string;
}

const Section = ({ children, id, className = "" }: SectionProps) => {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: "easeOut" }}
      className={`mb-24 relative ${className}`}
    >
      {children}
    </motion.section>
  );
};

const Divider = () => <div className="scroll-divider" />;

const mapLocations = [
  { 
    id: 'fl', 
    name: 'Fort Lauderdale, Florida, USA', 
    label: 'Fort Lauderdale',
    x: 27.7, y: 35.5, pos: '-translate-y-full -translate-x-1/2 -mt-2',
    connection: 'I was born and raised here',
    population: '~182,000',
    languages: 'English, Spanish',
    tooltipPos: 'bottom-full mb-3 left-1/2 -translate-x-1/2'
  },
  { 
    id: 'santander', 
    name: 'Santander, Colombia', 
    label: 'Santander',
    x: 29.7, y: 46.6, pos: '-translate-y-1/2 -translate-x-full -ml-2',
    connection: 'My mom and grandmother are from here',
    population: '~580,000',
    languages: 'Spanish',
    tooltipPos: 'bottom-full mb-3 left-1/2 -translate-x-1/2'
  },
  { 
    id: 'bogota', 
    name: 'Bogotá, Colombia', 
    label: 'Bogotá',
    x: 29.4, y: 47.7, pos: 'translate-y-2 -translate-x-1/2',
    connection: 'My grandfather is from here',
    population: '~7.7 million',
    languages: 'Spanish',
    tooltipPos: 'top-full mt-3 left-1/2 -translate-x-1/2'
  },
  { 
    id: 'bursa', 
    name: 'Bursa, Turkey', 
    label: 'Bursa',
    x: 58.0, y: 28.5, pos: 'translate-y-2 -translate-x-1/2',
    connection: 'My dad is from here',
    population: '~3.1 million',
    languages: 'Turkish',
    tooltipPos: 'top-full mt-3 left-1/2 -translate-x-1/2'
  },
  { 
    id: 'yalova', 
    name: 'Yalova, Turkey', 
    label: 'Yalova',
    x: 58.0, y: 26.5, pos: '-translate-y-full -translate-x-1/2 -mt-2',
    connection: 'My grandmother is from here',
    population: '~262,000',
    languages: 'Turkish',
    tooltipPos: 'bottom-full mb-3 left-1/2 -translate-x-1/2'
  },
  { 
    id: 'uchkulan', 
    name: 'Uchkulan, Russia', 
    label: 'Uchkulan',
    x: 61.6, y: 26.1, pos: '-translate-y-1/2 translate-x-2',
    connection: 'My grandfather is from here',
    population: '~5,000 (approximate)',
    languages: 'Russian, Karachay-balkar, Chechen',
    tooltipPos: 'bottom-full mb-3 left-1/2 -translate-x-1/2'
  },
];

const craftNodes = [
  {
    role: "Kitchen Team", company: "Maya Papaya",
    desc: "Cleaned kitchen. Prepared acai bowls."
  },
  {
    role: "Recreation Associate", company: "Holiday Park",
    desc: "Managed summer camps. Park activities."
  },
  {
    role: "Product Dev Intern", company: "Fintech Startup",
    desc: "User outreach. Product development."
  },
  {
    role: "PM Intern", company: "PwC",
    desc: "Workflow automation. Client engagement."
  },
  {
    role: "Associate PM", company: "PwC",
    desc: "Internal AI. Knowledge management."
  },
  {
    role: "Future Target", company: "Unknown",
    desc: "Next elevation."
  }
];

// Define a type for project data
interface ProjectData {
  title: string;
  type: string;
  content: ReactNode;
  image: string;
}

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [time, setTime] = useState<string>("");
  const [hoveredPrediction, setHoveredPrediction] = useState<number | null>(null);
  const [expandedLeisure, setExpandedLeisure] = useState<number | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const etTime = new Date().toLocaleTimeString('en-US', {
        timeZone: 'America/New_York',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      setTime(`Site live as of: ${etTime} ET`);
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const projects: ProjectData[] = [
    {
      title: "Elon Sentiment Tracker",
      type: "Real Time Market Intelligence",
      content: (
        <div className="text-[#2c1810] opacity-90 space-y-4 leading-relaxed">
          <p>
            <strong>The "Why".</strong> I built this in college because Elon's Twitter feed was a literal market moving force. He was tweeting at random hours and a single post could swing a stock price before most people even saw the notification. Since I was invested in his companies, I wanted to stay ahead of the volatility rather than just reacting to it.
          </p>
          <p>
            <strong>The Build.</strong> I developed a Python program using the tweepy library to monitor his feed 24/7.
          </p>
          <p>
            <strong>The Logic.</strong> Each tweet was automatically passed through OpenAI GPT-3.5 to determine if the news was potentially good or bad for Tesla or SpaceX.
          </p>
          <p>
            <strong>The Status.</strong> While I eventually discontinued it due to rising API costs, the logic proved that you can turn social media noise into actionable data.
          </p>
        </div>
      ),
      image: elonImg
    },
    {
      title: "Neptune Beach Parking Strategy",
      type: "Pro Bono Data Consulting",
      content: (
        <div className="text-[#2c1810] opacity-90 space-y-4 leading-relaxed">
          <p>
            <strong>The Context.</strong> This was a pro bono engagement I led through the Association of Information Systems, a grad school club at UF. We worked with the City of Neptune Beach to solve a massive congestion problem involving a tiny footprint of 160 parking spaces and thousands of seasonal visitors.
          </p>
          <p>
            <strong>The Analysis.</strong> We used Replica mobility data to find that 90% of trips for shopping and eating were car centric.
          </p>
          <p>
            <strong>My Contribution.</strong> While a teammate built the RShiny dashboard to visualize parking presence, I focused on the strategic modeling side.
          </p>
          <p>
            <strong>The Strategy.</strong> I developed the dynamic pricing model to increase turnover during peak lunch and dinner spikes. I also designed the curbside delegation plan to convert specific spots into dedicated zones for UberEats and DoorDash drivers to improve traffic safety.
          </p>
        </div>
      ),
      image: neptuneImg
    }
  ];

  return (
    <div className="min-h-screen relative overflow-x-hidden burnt-edges">
      {/* Texture Overlays */}
      <div className="parchment-overlay" />
      <div className="fixed inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/10 pointer-events-none z-40" />
      
      {/* Spotlight Global Overlay */}
      <div 
        className={`fixed inset-0 bg-[#1a0f0a]/50 transition-opacity duration-500 pointer-events-none ${hoveredPrediction !== null ? 'opacity-100 z-[60]' : 'opacity-0 -z-10'}`}
      />

      {/* Progress Bar (Ink Line) */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-[#4a2c1d] origin-left z-50"
        style={{ scaleX }}
      />

      <main className="scroll-container relative z-auto">
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
              {time && (
                <p className="text-sm font-bold tracking-widest text-[#9b6b43] uppercase mb-6 opacity-80">
                  {time}
                </p>
              )}
              <p className="text-xl md:text-2xl italic text-[#7a5230] max-w-3xl mx-auto leading-relaxed">
                "An unfiltered chronicle of the logic and heritage behind the work, offering a look under the microscope at the person the resume can't capture."
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
            <h2 className="text-4xl font-bold text-[#4a2c1d]">A Chronicle of Origins</h2>
          </div>
          <div className="prose prose-lg text-[#2c1810] leading-relaxed mb-12">
            <p className="mb-6 first-letter:text-6xl first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:text-[#9b6b43]">
              I was born and raised in Fort Lauderdale, Florida, but my story starts long before that. My dad is Turkish and my mom is Colombian, so I grew up surrounded by different languages, religions, and ways of seeing the world. That mix wasn’t something I studied, it was just everyday life. Growing up in America with this perspective made me realize early on that there isn’t just one way to solve a problem or approach a situation.
            </p>
            <p className="mb-6">
              In high school, I was convinced I’d be a doctor. My sister was on that path, my cousins were doctors, and it felt like the correct template to follow. I went to the University of Florida wanting to be a pre-med student, but one semester in, I realized I was just following someone else's script. Life has a funny way of proving that point. My sister actually finished the whole journey, graduated pre-med, did everything right, and now she works at a bank in New York.
            </p>
            <p className="mb-6">
              I decided to make the pivot early. I switched to Information Systems and sprinted through my undergrad, staying at UF for grad school. During that time, a friend introduced me to Product Management. At the time, PM wasn't even a known career path for students locally. I fell in love with the idea that you could have such a massive impact so early in a product's life.
            </p>
            <p className="mb-6">
              That spark led me to co-start Product Space, the first PM club at the University of Florida. It is wild to see it now because it has become one of the most competitive orgs on campus to get into. Seeing that growth from a simple idea to a high-bar community confirmed everything for me. The rest is history.
            </p>
          </div>

          <div className="mt-16 w-full max-w-5xl mx-auto relative pt-10 border-t border-[#9b6b43]/20">
            <div className="relative w-full aspect-[2/1] max-w-4xl mx-auto">
              {/* Horizontal Map Background Mask */}
              <div 
                className="absolute inset-0 bg-[#9b6b43] opacity-[0.15]"
                style={{ 
                  WebkitMaskImage: "url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')", 
                  WebkitMaskSize: "100% 100%",
                  WebkitMaskRepeat: "no-repeat",
                  WebkitMaskPosition: "center",
                  maskImage: "url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')",
                  maskSize: "100% 100%",
                  maskRepeat: "no-repeat",
                  maskPosition: "center"
                }} 
              />

              {/* Static Location Markers */}
              <div className="absolute inset-0 pointer-events-none">
                {mapLocations.map((loc) => (
                  <div 
                    key={loc.id} 
                    className="absolute group z-10 hover:z-50"
                    style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
                  >
                    <div className="relative w-2 h-2 bg-[#9b6b43] rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-sm transition-all duration-300 group-hover:scale-150 group-hover:bg-[#4a2c1d] pointer-events-none" />
                    <span className={`absolute ${loc.pos} text-[10px] md:text-xs font-bold tracking-wider text-[#7a5230] whitespace-nowrap bg-[#f4e4bc]/50 px-1 rounded-sm backdrop-blur-sm transition-opacity duration-300 pointer-events-auto cursor-pointer`}>
                      {loc.label}
                    </span>
                    
                    {/* Tooltip */}
                    <div className={`absolute ${loc.tooltipPos} opacity-0 group-hover:opacity-100 transition-all duration-300 bg-[#f4e4bc] border border-[#9b6b43]/30 px-4 py-3 rounded-sm shadow-xl pointer-events-none w-max max-w-[220px] md:max-w-none text-left`}>
                      <p className="text-sm font-bold text-[#4a2c1d] mb-2 border-b border-[#9b6b43]/20 pb-1">{loc.name}</p>
                      <div className="text-xs text-[#7a5230] space-y-1.5 whitespace-normal md:whitespace-nowrap">
                        <p><span className="font-bold text-[#9b6b43] uppercase tracking-wider text-[10px] mr-1">Connection:</span> {loc.connection}</p>
                        <p><span className="font-bold text-[#9b6b43] uppercase tracking-wider text-[10px] mr-1">Population:</span> {loc.population}</p>
                        <p><span className="font-bold text-[#9b6b43] uppercase tracking-wider text-[10px] mr-1">Languages:</span> {loc.languages}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        <Divider />

        {/* 3. Craft */}
        <Section id="craft">
          <div className="flex items-center justify-center gap-4 mb-8">
            <Activity className="w-8 h-8 text-[#9b6b43]" />
            <h2 className="text-4xl font-bold text-[#4a2c1d]">The Craft</h2>
          </div>
          
          <div className="w-full max-w-6xl mx-auto py-12 px-4">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-2 lg:gap-4 relative">
              {craftNodes.map((step, i) => (
                <div key={i} className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-2 lg:gap-4 flex-1 w-full md:w-auto">
                  {/* Glassmorphism Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="group w-full md:w-auto flex-1 min-w-[120px] p-4 bg-[#f4e4bc]/30 backdrop-blur-md border border-[#9b6b43]/20 rounded-sm shadow-sm hover:shadow-xl hover:bg-[#f4e4bc]/60 transition-all duration-500 cursor-pointer flex flex-col items-center text-center relative z-10"
                  >
                    <h3 className="text-sm md:text-xs lg:text-sm font-bold text-[#4a2c1d] leading-tight mb-1">{step.role}</h3>
                    <p className="text-xs md:text-[10px] lg:text-xs italic text-[#7a5230]">{step.company}</p>
                    
                    <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-in-out w-full">
                      <div className="overflow-hidden">
                        <div className="mt-3 pt-3 border-t border-[#9b6b43]/20">
                          <p className="text-xs md:text-[10px] lg:text-xs font-medium text-[#2c1810] opacity-90 leading-snug">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Directional Connector */}
                  {i < craftNodes.length - 1 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + 0.3, duration: 0.5 }}
                      className="flex items-center justify-center shrink-0"
                    >
                      <ArrowRight className="hidden md:block w-4 h-4 lg:w-5 lg:h-5 text-[#9b6b43] opacity-40" />
                      <ArrowDown className="block md:hidden w-5 h-5 text-[#9b6b43] opacity-40 my-1" />
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
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
            {projects.map((project, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-t-sm border-b border-[#9b6b43]/20 shadow-lg mb-4 bg-[#4a2c1d]/5">
                  <img
                    src={project.image}
                    alt={`Preview image for the ${project.title} project`}
                    className="w-full h-48 md:h-56 object-contain p-2 md:p-4 transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-2xl font-bold text-[#4a2c1d]">{project.title}</h3>
                <p className="text-sm uppercase tracking-widest text-[#9b6b43] mb-4">{project.type}</p>
                {project.content}
              </motion.div>
            ))}
          </div>
        </Section>

        <Divider />

        {/* 5. Predictions */}
        <Section id="predictions" className={hoveredPrediction !== null ? "z-[70]" : "relative z-10"}>
          <div className={`flex items-center gap-4 mb-8 transition-opacity duration-500 ${hoveredPrediction !== null ? 'opacity-50' : 'opacity-100'}`}>
            <Lightbulb className="w-8 h-8 text-[#9b6b43]" />
            <h2 className="text-4xl font-bold text-[#4a2c1d]">Predictions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "End-to-End Doers",
                content: (
                  <>
                    <p>The traditional corporate assembly line is breaking. For a long time, the path from an idea to a finished product was a relay race where your title was your boundary. If you were a Front-end Engineer, you didn't touch the database. If you were a Product Manager, you didn't touch the code. If you were a Scrum Master, you just managed the friction between the two. These labels are starting to feel like caps on our potential rather than definitions of our skills.</p>
                    <p>We are moving toward an era of the End-to-End Doer. The cost of execution has dropped so significantly that the time spent in a meeting "syncing" between departments is now more expensive than the work itself.</p>
                    <p className="pl-4 border-l-2 border-[#9b6b43]/30 italic">Traditional Flow: Idea → Product Manager (Specs) → Designer (UI) → Engineer (Code) → QA (Test) → Deployment</p>
                    <p className="pl-4 border-l-2 border-[#9b6b43] font-medium">Future Flow: Concept ↔ Execution (The End-to-End Doer)</p>
                    <p>In this new landscape, the roles are blurring. Engineers are drafting product roadmaps and mastering user experience, while Product Managers are using AI to prototype and ship functional code without waiting for a sprint cycle. Success no longer belongs to those who stay in their lane, but to those who can own the entire road. If you narrowly define yourself by a legacy title, you are essentially limiting your ability to solve the whole problem.</p>
                  </>
                )
              },
              {
                title: "Clarity of Thought",
                content: (
                  <>
                    <p>In a world where AI can generate infinite content and code, the "how" is becoming a commodity while the "what" and "why" are the only real differentiators. We are shifting from an economy of labor to an economy of intent. When execution is nearly instantaneous, the bottleneck is no longer technical skill, it is the clarity of the instruction.</p>
                    <p><strong>Precision as a Filter:</strong> If you cannot define a problem with total accuracy, you will just produce high-speed garbage.</p>
                    <p><strong>The Editor Mindset:</strong> The professional of the future looks less like a traditional worker and more like a high-stakes editor.</p>
                    <p><strong>Signal over Noise:</strong> You have to navigate a sea of generated noise to find the one signal that actually moves the needle.</p>
                    <p>You must be able to defend your logic with the rigor of a strategist and the pragmatism of a builder. The most valuable asset you have isn't your ability to work, it is your ability to think.</p>
                  </>
                )
              },
              {
                title: "The Energy Bottleneck",
                content: (
                  <>
                    <p>While everyone is fixated on the race for AGI or the mystery of quantum computing, we are quietly hitting a physical wall. We have spent a decade optimizing bits, but the next decade will be defined by atoms. Every generative model and every cloud cluster requires a staggering amount of power and water to stay functional.</p>
                    <p>Energy is no longer a background utility. It is the primary constraint on human progress. We are shifting from a compute-first era to an energy-first era. The most influential players won't just be the ones with the best algorithms, but the ones who solve the fundamental crisis of sustainable infrastructure. The real innovators will be those who can decouple massive technological growth from environmental exhaustion, turning sustainable energy and water preservation into the most high-stakes tech sectors on the planet.</p>
                  </>
                )
              },
              {
                title: "A Dynamic Workforce",
                content: (
                  <>
                    <p>The concept of a career ladder is being replaced by something more like a jungle gym. We are entering a period of high-frequency volatility where the half-life of a specific technical skill is shrinking every year. This does not mean work is disappearing, but it does mean that stability is no longer found in a job title. It is found in your pivot speed.</p>
                    <p><strong>Pivot Speed:</strong> Your value is defined by how fast you can unlearn and relearn.</p>
                    <p><strong>Modular Skillsets:</strong> Being a generalist during a disruption and a specialist during a boom.</p>
                    <p><strong>Flash Organizations:</strong> Teams that assemble for a project, execute at light speed, and then dissolve.</p>
                    <p>The winners will be those who treat uncertainty as a tool for repositioning rather than a threat to their identity. Resilience in this environment isn't about hunkering down, it is about staying fluid.</p>
                  </>
                )
              },
              {
                title: "Resurgence of the Physical",
                content: (
                  <>
                    <p>We are witnessing a strange reversal of the Industrial Revolution. Back then, we used machines to automate physical labor so we could focus on "thinking" jobs. Now, we are using AI to automate the "thinking" jobs, which is driving value back into the physical world. It is a bit of a paradox: as digital intelligence becomes infinite and free, tangible reality becomes the ultimate premium.</p>
                    <p>There is a ceiling to what can be solved behind a screen. We are seeing a massive shift in value back toward physical execution, hardware, and the messy problems of the real world that do not have a clean training data set. Whether it is the logistics of a supply chain or the craftsmanship of a physical product, the ability to bridge the gap between a digital strategy and a functional physical result is becoming a rare superpower. When everyone can generate a perfect digital image, the person who can actually build the machine becomes the most important person in the room.</p>
                  </>
                )
              }
            ].map((block, i) => (
              <div 
                key={i} 
                onMouseEnter={() => setHoveredPrediction(i)}
                onMouseLeave={() => setHoveredPrediction(null)}
                onClick={() => setHoveredPrediction(hoveredPrediction === i ? null : i)}
                className={`p-8 border border-[#9b6b43]/20 rounded-sm transition-all duration-500 hover:-translate-y-2 relative ${
                  hoveredPrediction !== null && hoveredPrediction !== i 
                    ? 'opacity-50 scale-[0.98] bg-[#4a2c1d]/5 z-10 shadow-none' 
                    : hoveredPrediction === i 
                      ? 'z-[70] bg-[#f4e4bc] shadow-2xl scale-100' 
                      : 'bg-[#4a2c1d]/5 z-10 shadow-sm scale-100 hover:shadow-lg hover:bg-[#4a2c1d]/10'
                } ${i === 4 ? 'md:col-span-2' : ''}`}
              >
                <h3 className="text-xl font-bold text-[#4a2c1d] mb-4 border-b border-[#9b6b43]/20 pb-2">
                  {block.title}
                </h3>
                <div className="text-[#2c1810] leading-relaxed space-y-4">
                  {block.content}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Divider />

        {/* 6. Leisure */}
        <Section id="leisure">
          <div className="flex items-center gap-4 mb-8">
            <Activity className="w-8 h-8 text-[#9b6b43]" />
            <h2 className="text-4xl font-bold text-[#4a2c1d]">Leisure</h2>
          </div>
          <div className="space-y-4 max-w-4xl mx-auto">
            {[
              { 
                icon: Activity, 
                label: "Biohacking", 
                bullets: [
                  "Focus on whole foods and staying hydrated with a gallon of water a day",
                  "Morning sunlight and daily workouts to stay active",
                  "LED bulbs in my house change colors and I dim lights at night to mimic sunset"
                ] 
              },
              { 
                icon: Castle, 
                label: "Chess", 
                bullets: [
                  "Peak rating of 1200 on Chess.com, lower now since I don’t play as much",
                  "I enjoy chess in bursts, usually when playing friends or following pro tournaments",
                  "There’s something satisfying about a game that’s entirely skill-based, no luck or bluffing"
                ] 
              },
              { 
                icon: Music, 
                label: "Music", 
                bullets: [
                  "Played Spanish guitar for 3-4 years and recently started electric guitar",
                  "Goal for 2026 is to get into music production and DJing on weekends as a side project",
                  "Need to learn piano at some point in my life as well"
                ] 
              },
              { 
                icon: Trophy, 
                label: "Sports", 
                subsections: [
                  {
                    title: "Soccer",
                    bullets: [
                      "First love and probably still my favorite",
                      "Started playing around 5 or 6 and loved all the FIFA video games growing up",
                      "Only played competitively in senior year of high school, but had fun dreaming of going pro"
                    ]
                  },
                  {
                    title: "Tennis",
                    bullets: [
                      "Started playing around 7 or 8 and played varsity all four years of high school",
                      "Team captain all four years",
                      "Surprisingly better at tennis than soccer even though I loved soccer more"
                    ]
                  },
                  {
                    title: "Jiu-Jitsu",
                    bullets: [
                      "Started at the end of high school and continued in college",
                      "Began as a novice and gradually improved to teaching classes by senior year",
                      "Probably my most eye-opening sport. Through all the injuries, repaired shoulder labrum, dislocations, and setbacks, it has been the most gratifying sport I have done"
                    ]
                  }
                ]
              }
            ].map((item, i) => {
              const isExpanded = expandedLeisure === i;
              return (
                <div key={i} className="border border-[#9b6b43]/20 rounded-sm bg-[#4a2c1d]/5 overflow-hidden transition-all duration-300">
                  <button 
                    onClick={() => setExpandedLeisure(isExpanded ? null : i)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-[#4a2c1d]/10 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <item.icon className="w-8 h-8 text-[#9b6b43] opacity-80" />
                      <h3 className="text-2xl font-bold text-[#4a2c1d]">{item.label}</h3>
                    </div>
                    <ChevronDown className={`w-6 h-6 text-[#9b6b43] transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="p-6 pt-0 border-t border-[#9b6b43]/10 mt-2">
                          {(item as any).bullets && (
                            <ul className="list-disc pl-6 space-y-3 text-[#2c1810] opacity-90 marker:text-[#9b6b43]">
                              {(item as any).bullets.map((bullet: string, idx: number) => (
                                <li key={idx} className="leading-relaxed text-lg">{bullet}</li>
                              ))}
                            </ul>
                          )}
                          {(item as any).subsections && (
                            <div className="space-y-6 text-[#2c1810] opacity-90 mt-2">
                              {(item as any).subsections.map((sub: any, idx: number) => (
                                <div key={idx}>
                                  <h4 className="text-xl font-bold text-[#4a2c1d] mb-2">{sub.title}</h4>
                                  <ul className="list-disc pl-6 space-y-3 marker:text-[#9b6b43]">
                                    {sub.bullets.map((bullet: string, bIdx: number) => (
                                      <li key={bIdx} className="leading-relaxed text-lg">{bullet}</li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Section>

        <Divider />

        {/* 7. Contact */}
        <Section id="contact">
          <div className="text-center py-20">
            <Mail className="w-12 h-12 mx-auto mb-6 text-[#9b6b43]" />
            <h2 className="text-5xl font-bold mb-6 text-[#4a2c1d]">Get in Touch</h2>
            <p className="text-xl mb-10 text-[#7a5230]">
              Whether you want to collaborate on a new project or just have a conversation about tech and product.
            </p>
            <a 
              href="https://www.linkedin.com/in/williamteke"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-10 py-4 bg-[#4a2c1d] text-[#f4e4bc] font-bold text-lg rounded-sm hover:bg-[#2c1810] transition-colors shadow-xl"
            >
              Connect on LinkedIn
            </a>
          </div>
        </Section>
      </main>
    </div>
  );
}
