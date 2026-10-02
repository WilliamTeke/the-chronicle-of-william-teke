import { useEffect } from 'react';
import ParkingSimulation from './ParkingSimulation';
import './neptune.css';

export default function NeptuneCaseStudy() {
  useEffect(()=>{const id=window.location.hash.slice(1); if(id.startsWith('neptune-') && id!=='neptune-beach'){const frame=requestAnimationFrame(()=>document.getElementById(id)?.scrollIntoView({behavior:'instant'}));return()=>cancelAnimationFrame(frame);}},[]);
  return <div className="neptune-case" id="neptune-case-content">
    <nav className="neptune-jump-links" aria-label="Neptune Beach case study"><a href="#neptune-approach">Approach</a><a href="#neptune-decisions">Decisions</a><a href="#neptune-simulation">Try the simulation</a><a href="#neptune-evidence">Evidence</a></nav>
    <div className="neptune-role-strip"><div><span>My role</span><strong>Consulting Analyst · UF AIS</strong></div><div><span>My focus</span><strong>Parking-management recommendations</strong></div><div><span>Engagement</span><strong>Aug 2022 to Jan 2023 · Pro bono</strong></div></div>
    <section id="neptune-approach" className="neptune-story-section">
      <div><span className="neptune-eyebrow">01 / The problem</span><h4>Make limited curb space work harder.</h4></div>
      <div><p>Beaches Town Center brings restaurants, shops, residents, and visitors into a constrained parking area. The team’s research described competition for 160 spaces and a citywide travel pattern dominated by cars. The question was how to manage that demand more effectively.</p><p>My contribution focused on proposed parking-management solutions. The fall presentation credits me with that section; the citation dashboard and Flowbird visitor analytics were presented by teammates. I used the team’s evidence to help frame recommendations and their tradeoffs.</p></div>
    </section>
    <section className="neptune-evidence-flow" aria-label="How the team assembled the evidence">
      <div><span>01</span><h5>Understand travel</h5><p>Replica mobility data put car use and trip purpose in context across Neptune Beach.</p><small>Citywide context, not BTC occupancy</small></div>
      <div><span>02</span><h5>Read parking behavior</h5><p>Flowbird payments and paid durations informed estimates of visitor presence over time.</p><small>Payment records, not live sensors</small></div>
      <div><span>03</span><h5>Examine friction</h5><p>Citation dashboards organized violations by time, location, type, and payment status.</p><small>Enforcement patterns, not demand counts</small></div>
    </section>
    <section id="neptune-decisions" className="neptune-story-section">
      <div><span className="neptune-eyebrow">02 / The recommendations</span><h4>Two practical levers. Real tradeoffs.</h4></div>
      <p>The white paper prioritized dynamic pricing and designated curbside space over more infrastructure-intensive alternatives. Neither recommendation was presented as a proven outcome.</p>
    </section>
    <div className="neptune-decisions">
      <article><span className="neptune-decision-tag">Demand-based pricing</span><h5>Use price to encourage turnover.</h5><p>Charge more during high-demand periods and consider reduced or free parking during quieter hours.</p><dl><div><dt>Intended benefit</dt><dd>Encourage availability and give visitors a reason to shift to less busy times.</dd></div><div><dt>Tradeoff</dt><dd>Higher rates could discourage visits. More parking turnover does not guarantee more business revenue.</dd></div><div><dt>Implementation needs</dt><dd>City input on rates, Flowbird configuration, and clear signage. The team deliberately did not propose a dollar amount.</dd></div></dl></article>
      <article><span className="neptune-decision-tag">Flexible curbside space</span><h5>Give short stops a place to happen.</h5><p>Reserve a small number of spaces near restaurants and bars for deliveries or rideshare during busy periods.</p><dl><div><dt>Intended benefit</dt><dd>Reduce the incentive for drivers to stop at an undesignated curb when parking is scarce.</dd></div><div><dt>Tradeoff</dt><dd>Every reserved bay removes a general parking space. Timing and placement matter.</dd></div><div><dt>Scope in the documents</dt><dd>The presentation suggests one or two bays; the white paper discusses two or three. A small pilot would test the right allocation.</dd></div></dl></article>
    </div>
    <details className="neptune-alternatives"><summary>What about sensors, cameras, or a parking network?</summary><p>The white paper also explored camera-based availability detection and a local vehicle network that could broadcast parking information. These could improve visibility into open spaces, but they introduce equipment, integration, and operational needs. The team’s stated priority was the lower-cost pricing and curbside options; there was no quantified cost comparison.</p></details>
    <div id="neptune-simulation"><ParkingSimulation /></div>
    <section className="neptune-story-section">
      <div><span className="neptune-eyebrow">03 / What the data could tell us</span><h4>A transaction is not the whole visit.</h4></div>
      <div><p>The earlier spring analysis counted multiple same-day payments from a plate as one visit to account for reloads. That avoids treating every payment as a new visitor, but it can also combine separate same-day visits.</p><p>The same analysis reported roughly 140 minutes of paid parking across visit-frequency groups. It explicitly cautioned that this could reflect intended parking time rather than actual time stayed. That distinction matters before turning a dashboard into a pricing decision.</p><p>March’s analysis excluded earlier months because of geotagging issues. Later fall materials used other periods, so I keep their findings separate rather than treating everything as one consistent dataset.</p></div>
    </section>
    <section className="neptune-next-step">
      <span className="neptune-eyebrow">04 / Deliverables &amp; next test</span><h4>A recommendation, with a path to validation.</h4>
      <p>The team delivered an Excel citation dashboard, an R Shiny visitor dashboard, a research white paper, and a presentation. The provided files do not establish whether the recommendations were implemented or what effect they had.</p>
      <div className="neptune-pilot"><div><h5>Establish the baseline</h5><p>Match arrivals, actual occupancy, and dwell times to the same locations and dates.</p></div><div><h5>Run a limited pilot</h5><p>Test a clearly signed rate window and a small number of loading bays, with city approval.</p></div><div><h5>Measure the tradeoff</h5><p>Track availability, turnover, curbside conflicts, visits, and business feedback against comparable periods.</p></div></div>
      <p className="neptune-small">The pilot above is how I would validate the proposal now. It is not a claim that this work was carried out.</p>
    </section>
    <section id="neptune-evidence" className="neptune-sources">
      <span className="neptune-eyebrow">Source notes</span><h4>What this case study is based on</h4>
      <details><summary>Research white paper · 2022</summary><p><strong>Proposed Parking Management Methods Applicable to Beaches Town Center</strong>, pages 1–3. Source for 160 spaces, citywide car-centric travel, the recommendations, rate-setting limitations, and other management options. The presence chart estimates paid parking across its included records; it is not used as a measured occupancy series for the 160-space simulation.</p></details>
      <details><summary>Fall presentation · 2022</summary><p><strong>Parking at the Beaches Town Center</strong>, slides 2, 7, 9, and 13. Names William Teke as presenter of proposed parking-management solutions; defines presence using paid duration; describes the team’s dashboard; outlines pricing and curbside tradeoffs.</p></details>
      <details><summary>Earlier team analysis · Spring 2022</summary><p><strong>R Analysis Summary</strong>, pages 1–3. Source for reload handling, the March-only analysis limitation, and approximately 140-minute paid durations. This predates my listed engagement. Conflicting one-time visitor counts in the narrative are not used here.</p></details>
      <details><summary>Citation dashboard build notes · 2022</summary><p><strong>Citation Data Build</strong> describes splitting dates and times and constructing filtered pivot-table views by weekday, hour, month, location, and violation. Citation counts describe enforcement activity and are not treated as parking occupancy.</p></details>
      <p className="neptune-small">Based on supplied team deliverables. No raw transaction records or identifying vehicle data are published here. Simulation assumptions are shown separately from research findings.</p>
    </section>
  </div>;
}
