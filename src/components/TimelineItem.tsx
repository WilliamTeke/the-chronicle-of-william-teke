import type { TlItem } from "../data/portfolio";
import { linkAcademicOrganizations } from "./AcademicLinks";

export default function TimelineItem({ item, isLast }: { item: TlItem; isLast: boolean }) {
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

