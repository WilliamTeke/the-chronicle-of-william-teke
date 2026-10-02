import { motion } from "framer-motion";
import { stagger, fadeUp } from "./animation";

export default function SectionHeader({ label, title }: { label: string; title: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={stagger}
      style={{ marginBottom: 40 }}
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

