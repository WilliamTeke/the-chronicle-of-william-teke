import { motion, useScroll, useSpring } from "framer-motion";
import { lazy, useEffect, useState } from "react";
import Deferred from "./components/Deferred";
import LiveClock from "./components/LiveClock";
const Globe = lazy(() => import("./components/Globe"));
import RootsExplorer from "./components/RootsExplorer";
import StarField from "./components/StarField";
import ProfileHighlights from "./components/ProfileHighlights";
import ParkingDiagram from "./components/ParkingDiagram";
import PredictionCabinet from "./components/PredictionCabinet";
import productSpaceLogo from "./assets/product-space-logo.png";
import neptuneBeachPhoto from "./assets/neptune-beach.jpg";
import elonTweetExample from "./assets/elon-tweet-example.png";

// ── Types ───────────────────────────────────────────────────────────────────
interface TlItem {
  date: string;
  role: string;
  company: string;
  bullets: string[];
}

interface Project {
  tag: string;
  title: string;
  body: string[];
  meta: string;
  findings?: { value: string; label: string }[];
  exampleImage?: string;
  logo?: string;
  href?: string;
}

interface Prediction {
  n: string;
  title: string;
  body: string;
  bullets: string[];
}

// ── Data ────────────────────────────────────────────────────────────────────
const timeline: TlItem[] = [
  { date: "Jul 2026 · Present", role: "Senior Associate Product Manager", company: "PwC · Boca Raton, FL", bullets: ["Building an AI-powered client intelligence tool"] },
  { date: "Sep 2024 · Jul 2026", role: "Associate Product Manager", company: "PwC · Miami, FL", bullets: ["Supporting enterprise AI adoption and ChatGPT Enterprise’s then-largest contract"] },
  { date: "Jan 2023 · Dec 2023", role: "Founding Director", company: "Product Space @ UF", bullets: ["Helped establish the first Product Space chapter at the University of Florida."] },
  { date: "Jun 2023 · Aug 2023", role: "Product Management Intern", company: "PwC · Hallandale Beach, FL", bullets: ["Worked in Low Code Services, building internal automations with Microsoft Power Platform."] },
  { date: "Aug 2022 · Jan 2023", role: "Consulting Analyst", company: "City of Neptune Beach · Neptune Beach, FL", bullets: ["Developed parking and pricing strategy through a pro bono consulting engagement with UF AIS."] },
  { date: "Jun 2022 · Aug 2022", role: "Product Development Intern", company: "Merge · Startup · Unpaid internship", bullets: ["Outreach and app design for a credit card rewards product"] },
  { date: "2021 · 2022", role: "Recreation Associate", company: "Holiday Park · Fort Lauderdale, FL", bullets: ["Coached and refereed sports leagues and ran summer camp programming."] },
  { date: "2019 · 2021", role: "Kitchen Team", company: "Maya Papaya · Fort Lauderdale, FL", bullets: ["Worked the kitchen, made a lot of acai bowls, and learned that pace and consistency matter."] },
];

const projects: Project[] = [
  {
    tag: "Personal Project · 2023",
    title: "Elon Sentiment Tracker",
    exampleImage: elonTweetExample,
    body: [
      "Elon's Twitter feed was a literal market-moving force. Single tweets swinging stock prices before most people saw the notification. Since I was invested in his companies, I wanted to stay ahead of the volatility rather than just reacting to it.",
      "Built a Python program using tweepy to monitor his feed 24/7. Each tweet was automatically passed through OpenAI GPT-3.5 to determine if the news was potentially good or bad for Tesla or SpaceX.",
    ],
    meta: "Stack: Python · Tweepy · OpenAI API  |  Status: Discontinued (API costs)",
  },
  {
    tag: "Pro Bono Consulting · UF",
    title: "Neptune Beach Parking Strategy",
    body: [
      "Pro bono consulting through the Association for Information Systems at UF, studying parking demand around the 160 available spaces at Beaches Town Center. My contribution focused on proposed parking-management solutions.",
      "Using Replica mobility data and the team’s Flowbird parking analysis, recommended demand-based parking rates and designated curbside spaces for delivery and rideshare. These were proposals to improve turnover and safety; implementation outcomes were not measured.",
    ],
    meta: "Sources: 2022 Replica & Flowbird data · Team deliverables: Excel citation dashboard, R Shiny visitor dashboard, research white paper",
    findings: [
      { value: "160", label: "Available spaces at Beaches Town Center" },
      { value: "90%", label: "Car-centric trips across Neptune Beach" },
    ],
  },
  {
    tag: "Community · University of Florida",
    title: "Product Space @ UF",
    logo: productSpaceLogo,
    href: "https://www.instagram.com/ufproductspace/",
    body: [
      "Served as a founding director of Product Space at UF, the university’s first product management club. At the time, PM wasn't even a known career path for students locally.",
      "Built curriculum from scratch, created a community, and watched it grow into one of the most competitive organizations on campus to get into.",
    ],
    meta: "Impact: First PM club at UF · Now highly competitive to join",
  },
];

const predictions: Prediction[] = [
  {
    n: "I",
    title: "End-to-End Doers",
    body: "The traditional corporate assembly line is breaking. The cost of execution has dropped so significantly that time spent syncing between departments is now more expensive than the work itself.",
    bullets: [
      "Traditional: Idea → PM → Designer → Engineer → QA → Deploy",
      "Future: Concept ↔ Execution (the End-to-End Doer)",
      "Success belongs to those who own the entire road",
    ],
  },
  {
    n: "II",
    title: "Clarity of Thought",
    body: "In a world where AI generates infinite content and code, the 'how' is becoming a commodity. We are shifting from an economy of labor to an economy of intent.",
    bullets: [
      "Precision as a filter: inability to define a problem = high-speed garbage",
      "The Editor Mindset: future professionals look more like high-stakes editors",
      "Your most valuable asset is your ability to think, not to work",
    ],
  },
  {
    n: "III",
    title: "The Energy Bottleneck",
    body: "While everyone is fixated on AGI, we are quietly hitting a physical wall. Every generative model requires staggering power. Energy is no longer a background utility; it is the primary constraint.",
    bullets: [
      "Shifting from a compute-first to an energy-first era",
      "Sustainable energy becoming the highest-stakes tech sector",
    ],
  },
  {
    n: "IV",
    title: "A Dynamic Workforce",
    body: "The career ladder is being replaced by a jungle gym. Stability is no longer found in a job title. It is found in your pivot speed.",
    bullets: [
      "Pivot Speed: your value = how fast you can unlearn and relearn",
      "Modular Skillsets: generalist during disruption, specialist during boom",
      "Flash Organizations: teams assemble, execute, dissolve",
    ],
  },
  {
    n: "V",
    title: "Resurgence of the Physical",
    body: "We used machines to automate physical labor so we could focus on thinking jobs. Now AI is automating thinking jobs, driving value back into the physical world.",
    bullets: [
      "There is a ceiling to what can be solved behind a screen",
      "The person who can build the machine becomes the most important person in the room",
    ],
  },
];

// ── Animation variants ───────────────────────────────────────────────────────
const easeApple = [0.25, 0.4, 0.25, 1] as const;

const fadeUp = {
  hidden:  { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: easeApple } },
};

const fadeIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: easeApple } },
};

const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const staggerFast = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.07 } },
};

function linkAcademicOrganizations(text: string) {
  return text.split(/(Association for Information Systems at UF|UF AIS)/g).map((part, index) =>
    part === "UF AIS" || part === "Association for Information Systems at UF"
      ? <a key={index} className="academic-link" href="https://www.ufais.org/" target="_blank" rel="noreferrer">{part}</a>
      : part
  );
}

// ── TimelineItem ─────────────────────────────────────────────────────────────
function TimelineItem({ item, isLast }: { item: TlItem; isLast: boolean }) {
  return (
    <div className="relative pl-8 pb-12">
      {!isLast && <div className="timeline-line" />}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 6,
          width: 14,
          height: 14,
          borderRadius: "50%",
          border: "2px solid rgba(255,255,255,0.2)",
          background: "#05090c",
        }}
      />
      <p className="section-label mb-2">{item.date}</p>
      <p style={{ fontSize: "1.2rem", fontWeight: 600, color: "#f5f5f7", marginBottom: 2 }}>
        {item.role}
      </p>
      <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)", marginBottom: 12 }}>
        {item.company}
      </p>
      {item.bullets.length > 0 && (
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {item.bullets.map((b, j) => (
            <li
              key={j}
              style={{
                display: "flex",
                gap: 10,
                fontSize: "1rem",
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.75,
                marginBottom: 6,
              }}
            >
              <span style={{ color: "rgba(255,255,255,0.5)", flexShrink: 0, marginTop: 4, fontSize: 6 }}>●</span>
              <span>{linkAcademicOrganizations(b)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ── SectionHeader ────────────────────────────────────────────────────────────
function SectionHeader({ label, title }: { label: string; title: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={stagger}
      style={{ marginBottom: 64 }}
    >
      <motion.p variants={fadeUp} className="section-label" style={{ marginBottom: 14 }}>
        {label}
      </motion.p>
      <motion.h2
        variants={fadeUp}
        style={{
          fontSize: "clamp(2.4rem, 5vw, 4rem)",
          fontWeight: 400,
          letterSpacing: "-0.03em",
          color: "#f5f5f7",
          lineHeight: 1.05,
        }}
      >
        {title}
      </motion.h2>
    </motion.div>
  );
}

// ── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [menuOpen, setMenuOpen]       = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { scrollYProgress }           = useScroll();
  const scaleX                        = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Active section tracking
  useEffect(() => {
    const sections = ["contact", "predictions", "projects", "experience", "origins"];
    let frame = 0;
    const update = () => {
      frame = 0;
      for (const s of sections) {
        const el = document.getElementById(s);
        if (el && window.scrollY >= el.offsetTop - 150) {
          setActiveSection(s);
          return;
        }
      }
      setActiveSection("");
    };
    const handler = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", handler, { passive: true });
    return () => { window.removeEventListener("scroll", handler); cancelAnimationFrame(frame); };
  }, []);

  const navItems = [
    { href: "#origins",     label: "Origins" },
    { href: "#experience",  label: "Experience" },
    { href: "#projects",    label: "Projects" },
    { href: "#predictions", label: "Predictions" },
    { href: "#contact",     label: "Contact" },
  ];

  return (
    <div className="chronicle" style={{ background: "#05090c", color: "#f5f5f7", minHeight: "100vh" }}>
      <a className="skip-link" href="#origins">Skip to content</a>
      {/* Scroll progress bar */}
      <motion.div
        style={{
          scaleX,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: "rgba(255,255,255,0.55)",
          transformOrigin: "0%",
          zIndex: 101,
        }}
      />

      {/* ── NAV ────────────────────────────────────────────────────────────── */}
      <nav aria-label="Main navigation"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 48px",
          height: 72,
          background: "rgba(5,9,12,0.82)",
          backdropFilter: "blur(20px) saturate(1.8)",
          WebkitBackdropFilter: "blur(20px) saturate(1.8)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <a
          href="#"
          style={{
            fontSize: 15,
            fontWeight: 600,
            color: "#f5f5f7",
            letterSpacing: "-0.02em",
          }}
        >
          William Teke
        </a>

        {/* Desktop nav */}
        <div
          style={{
            display: "flex",
            gap: 32,
            alignItems: "center",
          }}
          className="desktop-nav"
        >
          {navItems.map(({ href, label }) => {
            const active = activeSection === href.slice(1);
            return (
              <a
                key={href}
                href={href}
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: active ? "#f5f5f7" : "rgba(255,255,255,0.5)",
                  letterSpacing: "0.01em",
                  transition: "color 0.2s",
                }}
              >
                {label}
              </a>
            );
          })}
        </div>

        {/* Mobile burger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: "none",
            border: "none",
            color: "rgba(255,255,255,0.7)",
            fontSize: 20,
            cursor: "pointer",
            padding: "4px 8px",
          }}
          className="mobile-toggle"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div id="mobile-navigation"
          style={{
            position: "fixed",
            top: 72,
            left: 0,
            right: 0,
            zIndex: 99,
            padding: "24px 24px",
            display: "flex",
            flexDirection: "column",
            gap: 20,
            background: "rgba(0,0,0,0.95)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {navItems.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              style={{ fontSize: 15, fontWeight: 500, color: "rgba(255,255,255,0.7)" }}
            >
              {label}
            </a>
          ))}
        </div>
      )}

      <main>
      <section id="home" className="astra-hero">
        <StarField />
        <h1 className="hero-name"><span>William</span><span>Teke</span></h1>
        <div className="hero-bottom">
          <div><p className="hero-role">Product Manager &amp; Strategist</p>
          <p className="hero-location">Fort Lauderdale, FL <LiveClock /></p></div>
          <a href="#origins" className="explore-link">Explore the chronicle <span aria-hidden="true">↓</span></a>
        </div>
      </section>
      <section className="introduction" aria-label="Introduction">
        <p className="section-label">People. Products. Possibilities.</p>
        <h2>A story still unfolding.</h2>
        <p>Senior Associate Product Manager at PwC, building enterprise AI products for client intelligence and research.
        Turkish, Colombian, and American. University of Florida graduate.</p>
        <div className="intro-actions"><a className="pill primary" href="#projects">See my work <span aria-hidden="true">↗</span></a><a className="pill" href="#contact">Get in touch <span aria-hidden="true">↗</span></a></div>
      </section>

      <ProfileHighlights />

      {/* ── ORIGINS ────────────────────────────────────────────────────────── */}
      <section id="origins" style={{ padding: "120px 48px", background: "#080d11" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <SectionHeader label="A Chronicle of Origins" title="The Roots" />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 80,
              alignItems: "start",
            }}
            className="origins-grid"
          >
            {/* Globe */}
            <motion.div
              initial={{ opacity: 0, scale: 0.88 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.3, ease: easeApple }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
            >
              <Deferred className="deferred-globe"><Globe /></Deferred>
              <p
                style={{
                  marginTop: 16,
                  fontSize: 12,
                  color: "rgba(255,255,255,0.25)",
                  letterSpacing: "0.06em",
                  textAlign: "center",
                }}
              >
                Rotating globe · heritage regions highlighted
              </p>
              <RootsExplorer />
            </motion.div>

            {/* Story + Heritage cards */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
            >
              <motion.div variants={stagger} style={{ marginBottom: 40 }}>
                {[
                  "I grew up in Fort Lauderdale, Florida, with a Turkish dad and a Colombian mom. I followed my sister to the University of Florida, where she was studying medicine. A dorm mate introduced me to Information Systems, and the blend of business and technology felt hard to go wrong with. I finished my bachelor's on an accelerated path, then stayed to complete my master's.",
                  "Product management wasn't a career people at UF really talked about. A friend happened to discover it, and our conversations got me curious enough to learn more. That led me to become a founding director of Product Space at UF alongside a group of friends. These days, product management is the career I'm pursuing.",
                ].map((text, i) => (
                  <motion.p
                    key={i}
                    variants={fadeUp}
                    style={{
                      fontSize: "1rem",
                      color: "rgba(255,255,255,0.6)",
                      lineHeight: 1.82,
                      marginBottom: 18,
                    }}
                  >
                    {text}
                  </motion.p>
                ))}
              </motion.div>


            </motion.div>
          </div>

        </div>
      </section>

      {/* ── EXPERIENCE ─────────────────────────────────────────────────────── */}
      <section id="experience" style={{ padding: "120px 48px", background: "#05090c" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <SectionHeader label="The Craft" title="How I got here" />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            {timeline.map((item, i) => (
              <motion.div key={i} variants={fadeUp}>
                <TimelineItem item={item} isLast={i === timeline.length - 1} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PROJECTS ───────────────────────────────────────────────────────── */}
      <section id="projects" style={{ padding: "120px 48px", background: "#080d11" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <SectionHeader label="Creations" title="Things I've built" />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            style={{ display: "flex", flexDirection: "column", gap: 16 }}
          >
            {projects.map((p, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="glass-card"
                style={{ padding: "40px 44px" }}
                whileHover={{ scale: 1.005 }}
                transition={{ duration: 0.25 }}
              >
                {p.findings && <figure className="project-corner-photo"><img src={neptuneBeachPhoto} alt="Palm-lined street and shops in Neptune Beach" width="480" height="318" loading="lazy" decoding="async" /><figcaption>Neptune Beach, FL</figcaption></figure>}
                <p
                  style={{
                    fontSize: 12,
                    fontWeight: 500,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.58)",
                    marginBottom: 14,
                  }}
                >
                  {p.tag}
                </p>
                <h3
                  style={{
                    fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                    fontWeight: 400,
                    color: "#f5f5f7",
                    letterSpacing: "-0.03em",
                    marginBottom: 20,
                    lineHeight: 1.1,
                  }}
                >
                  {p.href ? <a className="project-brand" href={p.href} target="_blank" rel="noreferrer">{p.logo && <img src={p.logo} alt="" width="56" height="56" loading="lazy" />}<span>{p.title}</span><span className="project-brand-arrow" aria-hidden="true">↗</span></a> : p.title}
                </h3>
                {p.exampleImage && <figure className="tweet-example"><img src={p.exampleImage} alt="Screenshot of Elon Musk’s tweets considering taking Tesla private at $420, stating funding secured, and discussing shareholder participation." width="1200" height="630" loading="lazy" /><figcaption>An example of the kind of tweet that motivated this project. This is not an output from the tracker.</figcaption></figure>}
                {p.findings && <ParkingDiagram />}
                {p.findings && <div className="project-findings" aria-label="Findings from the 2022 parking study">{p.findings.map(finding => <div key={finding.value}><span>{finding.value}</span><p>{finding.label}</p></div>)}</div>}
                <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
                  {p.body.map((para, j) => (
                    <p
                      key={j}
                      style={{
                        fontSize: "1rem",
                        color: "rgba(255,255,255,0.55)",
                        lineHeight: 1.78,
                      }}
                    >
                      {linkAcademicOrganizations(para)}
                    </p>
                  ))}
                </div>
                <p
                  style={{
                    fontSize: 12,
                    fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace",
                    color: "rgba(255,255,255,0.58)",
                    paddingTop: 18,
                    borderTop: "1px solid rgba(255,255,255,0.08)",
                    letterSpacing: "0.02em",
                  }}
                >
                  {p.meta}
                </p>
                {p.href && <a className="project-social-link" href={p.href} target="_blank" rel="noreferrer">Explore @ufproductspace on Instagram <span aria-hidden="true">↗</span></a>}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PREDICTIONS ────────────────────────────────────────────────────── */}
      <section id="predictions" style={{ padding: "120px 48px", background: "#05090c" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <SectionHeader label="Ideas I’m exploring" title="My predictions" />
          <p className="predictions-intro">My personal guesses about where technology and work could go. These are ideas I’m exploring, not certainties, and I expect them to change as I learn more. Most visuals illustrate my thinking. The energy chart includes sourced estimates and projections.</p>

          <PredictionCabinet predictions={predictions} />

        </div>
      </section>

      {/* ── CONTACT ────────────────────────────────────────────────────────── */}
      <section id="contact" style={{ padding: "120px 48px", background: "#080d11" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.p variants={fadeUp} className="section-label" style={{ marginBottom: 14 }}>
              Get in Touch
            </motion.p>
            <motion.h2
              variants={fadeUp}
              style={{
                fontSize: "clamp(2.2rem, 5vw, 3.6rem)",
                fontWeight: 400,
                letterSpacing: "-0.03em",
                color: "#f5f5f7",
                lineHeight: 1.08,
                marginBottom: 24,
              }}
            >
              Let's build something worth building
            </motion.h2>
            <motion.p
              variants={fadeUp}
              style={{
                fontSize: "1rem",
                color: "rgba(255,255,255,0.48)",
                lineHeight: 1.82,
                marginBottom: 48,
              }}
            >
              Always happy to connect with people building in enterprise AI. Whether you want to collaborate, talk
              product, or share something you’re learning, I’m here for it.
            </motion.p>

            <motion.div
              variants={stagger}
              style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 440, margin: "0 auto" }}
            >
              {[
                { label: "Connect on LinkedIn", sub: "linkedin.com/in/williamteke", href: "https://linkedin.com/in/williamteke" },
                { label: "Send an Email",       sub: "willteke@yahoo.com",             href: "mailto:willteke@yahoo.com" },
              ].map((link) => (
                <motion.a
                  key={link.label}
                  variants={fadeUp}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="glass-card"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "16px 22px",
                    borderRadius: 18,
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#f5f5f7" }}>{link.label}</span>
                  <span
                    style={{
                      fontSize: 12,
                      fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace",
                      color: "rgba(255,255,255,0.32)",
                    }}
                  >
                    ↗ {link.sub}
                  </span>
                </motion.a>
              ))}
            </motion.div>


          </motion.div>
        </div>
      </section>

      </main>
      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer
        style={{
          padding: "28px 48px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {[
          { text: "© 2026 William Teke", href: undefined },
          { text: "Fort Lauderdale, FL", href: undefined },
          { text: "↑ Back to top",       href: "#home" },
        ].map(({ text, href }) =>
          href ? (
            <a
              key={text}
              href={href}
              style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", letterSpacing: "0.03em" }}
            >
              {text}
            </a>
          ) : (
            <span key={text} style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", letterSpacing: "0.03em" }}>
              {text}
            </span>
          )
        )}
      </footer>

      {/* ── Global keyframes ────────────────────────────────────────────────── */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(0.85); }
        }

        @media (max-width: 768px) {
          .origins-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          section {
            padding-left: 24px !important;
            padding-right: 24px !important;
          }
          nav {
            padding-left: 20px !important;
            padding-right: 20px !important;
          }
          footer {
            padding-left: 24px !important;
            padding-right: 24px !important;
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
}
