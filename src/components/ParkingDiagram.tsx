export default function ParkingDiagram() {
  return <figure className="pricing-diagram" aria-labelledby="pricing-title">
    <div className="pricing-heading"><h4 id="pricing-title">How the pricing proposal works</h4><span>Proposed approach</span></div>
    <ol className="pricing-flow">
      <li><span className="pricing-step">01 · Prepare</span><h5>Clean the transactions</h5><p>Use Flowbird payment records. Count same-day reloads as one visit when measuring visit frequency.</p></li>
      <li><span className="pricing-step">02 · Understand</span><h5>Estimate parking demand</h5><p>Analyze visits and paid parking duration by day and hour to identify periods of higher demand.</p></li>
      <li><span className="pricing-step">03 · Adjust</span><h5>Match rates to demand</h5><div className="pricing-branches"><p><span>Higher demand</span>Higher rates to encourage turnover</p><p><span>Lower demand</span>Reduced or free parking to encourage off-peak visits</p></div></li>
    </ol>
    <div className="pricing-feedback"><span aria-hidden="true">↩</span><p><strong>Monitor &amp; refine</strong> Use the team’s dashboard to review parking patterns and inform future rate decisions.</p></div>
    <figcaption>Rate amounts would require city input. Paid duration estimates parking presence; it does not confirm actual time stayed. Turnover improvements were proposed, not measured.</figcaption>
  </figure>;
}
