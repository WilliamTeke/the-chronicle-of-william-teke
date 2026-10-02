import './neptune.css';

export default function NeptuneCaseStudy() {
  return <div className="neptune-case" id="neptune-case-content">
    <div className="neptune-role-strip"><div><span>My role</span><strong>Consulting Analyst · UF AIS</strong></div><div><span>My focus</span><strong>Parking-management recommendations</strong></div><div><span>Engagement</span><strong>Aug 2022 to Jan 2023 · Pro bono</strong></div></div>
    <section className="neptune-story-section">
      <div><span className="neptune-eyebrow">The challenge</span><h4>160 spaces. Competing uses.</h4></div>
      <p>Beaches Town Center had 160 parking spaces serving shops, restaurants, residents, and visitors. The team examined January–October 2022 citation trends and May–September parking arrivals to inform management recommendations.</p>
    </section>
    <section className="neptune-story-section">
      <div><span className="neptune-eyebrow">My contribution</span><h4>Pricing and curbside recommendations.</h4></div>
      <p>I presented the proposed parking-management solutions: variable rates and designated delivery spaces. We prioritized these over cameras and parking-information networks, considering implementation needs and the loss of general parking.</p>
    </section>
    <div className="neptune-decisions">
      <article><span className="neptune-decision-tag">01 / Demand-based pricing</span><h5>Encourage turnover at busy times.</h5><p>Proposed higher rates during busy periods and reduced or free rates at quieter times. Higher prices could deter visits; we left dollar amounts to city officials rather than claiming an untested optimum.</p></article>
      <article><span className="neptune-decision-tag">02 / Flexible curbside space</span><h5>Reserve 1–2 delivery spaces.</h5><p>The fall presentation proposed 1–2 spaces near bars and restaurants for deliveries. That reallocates about 0.6–1.3% of the 160-space supply, leaving 158–159 general spaces while designated. The aim was to reduce undesignated curb stops.</p></article>
    </div>
    <section className="neptune-story-section">
      <div><span className="neptune-eyebrow">What we delivered</span><h4>A parking strategy for the city.</h4></div>
      <div><p>Presented my recommendations alongside teammates’ Excel citation and R Shiny visitor dashboards. The team also delivered a research white paper.</p><p className="neptune-small">This was a research and recommendation engagement. Implementation and measured impact have not been verified.</p></div>
    </section>
  </div>;
}
