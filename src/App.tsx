import { timeline, projects, predictions } from "./data/portfolio";
import { easeApple, fadeUp, fadeIn, stagger, staggerFast } from "./components/animation";
import { linkAcademicOrganizations } from "./components/AcademicLinks";
import TimelineItem from "./components/TimelineItem";
import SectionHeader from "./components/SectionHeader";
import FeatureBoundary from "./components/FeatureBoundary";
import { motion, MotionConfig, useScroll, useSpring } from "framer-motion";
import { lazy, useEffect, useState } from "react";
import Deferred from "./components/Deferred";
import LiveClock from "./components/LiveClock";
const Globe = lazy(() => import("./components/Globe"));
import RootsExplorer from "./components/RootsExplorer";
import StarField from "./components/StarField";
import ProfileHighlights from "./components/ProfileHighlights";
import NeptuneProject from "./components/NeptuneProject";
import PredictionCabinet from "./components/PredictionCabinet";

// ── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [menuOpen, setMenuOpen]       = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { scrollYProgress }           = useScroll();
  const scaleX                        = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setMenuOpen(false); };
    const desktop = window.matchMedia('(min-width: 768px)');
    const closeOnDesktop = () => { if (desktop.matches) setMenuOpen(false); };
    document.addEventListener('keydown', closeOnEscape);
    desktop.addEventListener('change', closeOnDesktop);
    return () => { document.removeEventListener('keydown', closeOnEscape); desktop.removeEventListener('change', closeOnDesktop); };
  }, []);

  // Active section tracking
  useEffect(() => {
    const sections = ['contact', 'predictions', 'projects', 'experience', 'origins']
      .map(id => ({ id, element: document.getElementById(id), top: 0 }));
    let frame = 0;
    const update = () => {
      frame = 0;
      const position = window.scrollY + 150;
      setActiveSection(sections.find(section => section.element && position >= section.top)?.id ?? '');
    };
    const measure = () => {
      cancelAnimationFrame(frame);
      for (const section of sections) {
        if (section.element) section.top = section.element.getBoundingClientRect().top + window.scrollY;
      }
      update();
    };
    const handler = () => { if (!frame) frame = requestAnimationFrame(update); };
    // Remeasure when lazy content, fonts, or accordion panels change page geometry.
    const observer = new ResizeObserver(measure);
    document.querySelectorAll('main > section').forEach(section => observer.observe(section));
    measure();
    window.addEventListener('scroll', handler, { passive: true });
    window.addEventListener('resize', measure);
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handler);
      window.removeEventListener('resize', measure);
      cancelAnimationFrame(frame);
    };
  }, []);

  const navItems = [
    { href: "#origins",     label: "Origins" },
    { href: "#experience",  label: "Experience" },
    { href: "#projects",    label: "Projects" },
    { href: "#predictions", label: "Predictions" },
    { href: "#contact",     label: "Contact" },
  ];

  return (
    <MotionConfig reducedMotion="user"><div className="chronicle" style={{ background: "#05090c", color: "#f5f5f7", minHeight: "100vh" }}>
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
      <nav className="site-navigation" aria-label="Main navigation"
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
                aria-current={active ? "location" : undefined}
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
        <div className="hero-focus"><span className="hero-status"><i aria-hidden="true" />Product · Technology · Curiosity</span>
        <h1 className="hero-name">William Teke</h1>
        <p className="hero-summary">Building useful products.<br />Always finding something new to learn.</p>
        <div className="hero-actions"><a href="#projects" className="pill primary">Explore my work <span aria-hidden="true">↗</span></a><a href="#contact" className="pill">Say hello <span aria-hidden="true">↗</span></a></div></div>
        <div className="hero-bottom">
          <div><p className="hero-role">Product Manager &amp; Strategist</p>
          <p className="hero-location">Fort Lauderdale, FL <LiveClock /></p></div>
          <a href="#origins" className="explore-link">Meet William <span aria-hidden="true">↓</span></a>
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
      <section id="origins" style={{ padding: "64px 48px", background: "#080d11" }}>
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
              <FeatureBoundary name="The globe"><Deferred className="deferred-globe"><Globe /></Deferred></FeatureBoundary>
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
              <motion.div variants={stagger}>
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
      <section id="experience" style={{ padding: "64px 48px", background: "#05090c" }}>
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
      <section id="projects" style={{ padding: "64px 48px", background: "#080d11" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <SectionHeader label="Creations" title="Things I've built" />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            style={{ display: "flex", flexDirection: "column", gap: 16 }}
          >
            {projects.map((p, i) => p.findings ? <NeptuneProject key={p.title} /> : (
              <motion.div
                key={i}
                variants={fadeUp}
                className="glass-card project-surface"
                style={{ padding: "40px 44px" }}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.25 }}
              >
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
      <section id="predictions" style={{ padding: "64px 48px", background: "#05090c" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <SectionHeader label="Ideas I’m exploring" title="My top three predictions right now" />
          <p className="predictions-intro">My personal guesses about where technology and work could go. These are ideas I’m exploring, not certainties, and I expect them to change as I learn more.</p>

          <PredictionCabinet predictions={predictions} />

        </div>
      </section>

      {/* ── CONTACT ────────────────────────────────────────────────────────── */}
      <section id="contact" style={{ padding: "64px 48px", background: "#080d11" }}>
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
              You made it this far. Let’s chat.
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
              If you’ve made it this far, I’d love to connect. Send me a message on LinkedIn or an email.
              I’m always happy to chat.
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
    </div></MotionConfig>
  );
}
