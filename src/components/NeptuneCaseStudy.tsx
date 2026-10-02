import './neptune.css';

export default function NeptuneCaseStudy() {
  return <div className="neptune-case" id="neptune-case-content">
    <div className="neptune-role-strip"><div><span>My role</span><strong>Consulting Analyst · UF AIS</strong></div><div><span>My focus</span><strong>Parking-management recommendations</strong></div><div><span>Engagement</span><strong>Aug 2022 to Jan 2023 · Pro bono</strong></div></div>
    <section className="neptune-story-section">
      <div><span className="neptune-eyebrow">The challenge</span><h4>Better access without more parking.</h4></div>
      <p>Restaurants, shops, residents, and visitors competed for limited space at Beaches Town Center. I used the team’s mobility research, parking-payment analysis, and citation dashboards to develop practical recommendations for managing demand.</p>
    </section>
    <section className="neptune-story-section">
      <div><span className="neptune-eyebrow">My contribution</span><h4>Turn analysis into a decision.</h4></div>
      <p>I focused on parking-management solutions, weighing visitor access, business activity, and implementation needs. Our recommendation prioritized pricing and curbside changes over equipment-heavy alternatives such as cameras and sensors.</p>
    </section>
    <div className="neptune-decisions">
      <article><span className="neptune-decision-tag">01 / Demand-based pricing</span><h5>Encourage turnover at busy times.</h5><p>Adjust rates with demand, with lower or free rates during quieter periods. The tradeoff: higher prices could discourage visits, so rates would need city input and testing.</p></article>
      <article><span className="neptune-decision-tag">02 / Flexible curbside space</span><h5>Make room for short stops.</h5><p>Reserve a few spaces for deliveries and rideshare during busy periods. The tradeoff: each loading bay reduces general parking capacity, making timing and placement essential.</p></article>
    </div>
    <section className="neptune-story-section">
      <div><span className="neptune-eyebrow">What we delivered</span><h4>A parking strategy for the city.</h4></div>
      <div><p>My recommendations formed part of the team’s research white paper and presentation, supported by Excel and R Shiny dashboards built by teammates.</p><p className="neptune-small">This was a research and recommendation engagement. Implementation and measured impact have not been verified.</p></div>
    </section>
  </div>;
}
