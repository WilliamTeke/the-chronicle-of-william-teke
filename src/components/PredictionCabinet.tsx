import EnergyChart from './EnergyChart';
import { useState } from 'react';

interface Prediction { n: string; title: string; body: string; bullets: string[] }

function WorkflowDiagram() {
  return <figure className="prediction-visual">
    <figcaption>From handoffs to ownership <span>Conceptual workflow</span></figcaption>
    <div className="handoff-label">Sequential handoffs</div>
    <div className="handoff-chain">{['Idea', 'PM', 'Design', 'Build', 'QA', 'Deploy'].map(item => <span key={item}>{item}</span>)}</div>
    <div className="ownership-loop"><span>Concept</span><span aria-label="back and forth">⇄</span><span>Execution</span></div>
    <p>One owner, a shorter feedback loop.</p>
  </figure>;
}

const notes = [
  { watch: 'Whether smaller teams can take a product from idea to launch with fewer handoffs.', question: 'Where do specialist expertise and independent review remain essential?' },
  { watch: 'Whether defining the right problem becomes more valuable as generating options gets easier.', question: 'How do we distinguish clear judgment from a convincing AI-generated answer?' },
  { watch: 'Whether power availability and grid connections start shaping where AI infrastructure gets built.', question: 'Could efficiency gains reduce demand enough to ease the constraint?' },
  { watch: 'Whether teams form around specific problems and people move more easily between roles.', question: 'How do temporary teams preserve trust, continuity, and institutional knowledge?' },
  { watch: 'Whether more AI products move from digital output into robotics, tools, and real-world services.', question: 'How much will safety, hardware costs, and deployment complexity slow that shift?' },
];

function ClarityDiagram() {
  return <figure className="prediction-visual"><figcaption>More options. A sharper filter.<span>Conceptual decision process</span></figcaption>
    <div className="clarity-options" aria-label="Many generated options">{['Ideas', 'Code', 'Content', 'Analysis', 'Designs', 'Plans'].map(label => <span key={label}>{label}</span>)}</div>
    <div className="diagram-connector" aria-hidden="true">↓</div><div className="clarity-filter">Define the problem<br/><small>Context · Constraints · Judgment</small></div>
    <div className="diagram-connector" aria-hidden="true">↓</div><div className="diagram-result">One deliberate direction</div><p>My bet: the filter matters more as output gets cheaper.</p></figure>;
}
function WorkforceDiagram() {
  return <figure className="prediction-visual"><figcaption>Careers as connected skills<span>Conceptual model · not a career forecast</span></figcaption>
    <svg viewBox="0 0 360 230" role="img" aria-label="Product, design, data, and engineering connect through learning and adapting.">
    <path d="M80 40L180 112 280 40M80 190L180 112 280 190M80 40L80 190M280 40L280 190" fill="none" stroke="#7c9bab" strokeDasharray="4 5" />
    {[[80,40,'Product'],[280,40,'Design'],[80,190,'Data'],[280,190,'Engineering']].map(([x,y,label]) => <g key={label}><rect x={Number(x)-55} y={Number(y)-20} width="110" height="40" rx="8" fill="#233743" stroke="#7898aa"/><text x={x} y={Number(y)+5} textAnchor="middle" fill="#d9e7ec" fontSize="14">{label}</text></g>)}
    <circle cx="180" cy="112" r="43" fill="#314c58" stroke="#afcfd9"/><text x="180" y="108" textAnchor="middle" fill="#e5f3f6" fontSize="13">Learn</text><text x="180" y="126" textAnchor="middle" fill="#e5f3f6" fontSize="13">& adapt</text></svg><p>My bet: adaptability connects opportunities across roles.</p></figure>;
}
function PhysicalDiagram() {
  return <figure className="prediction-visual"><figcaption>When intelligence meets the world<span>Conceptual feedback loop</span></figcaption><div className="physical-cycle">
    <div><span>01 / DIGITAL</span><strong>Model & simulate</strong><small>Plan a possible solution</small></div><span aria-hidden="true">↓</span>
    <div><span>02 / PHYSICAL</span><strong>Build & deploy</strong><small>Work within real constraints</small></div><span aria-hidden="true">↓</span>
    <div><span>03 / FEEDBACK</span><strong>Observe & improve</strong><small>Bring results back into the model ↩</small></div></div><p>My bet: value grows where software meets execution.</p></figure>;
}

export default function PredictionCabinet({ predictions }: { predictions: Prediction[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return <div className="prediction-cabinet" onKeyDown={event => {
    if (event.key === 'Escape') {
      const index = open;
      setOpen(null);
      if (index !== null) document.getElementById(`prediction-tab-${index}`)?.focus();
    }
  }}>
    <div className="cabinet-top"><span><i aria-hidden="true" />My field notes / Possible futures</span><span>Click a folder to explore</span></div>
    <div className="cabinet-files">
      {predictions.map((prediction, index) => <article className={`prediction-folder ${open === index ? 'is-open' : ''}`} key={prediction.n}>
        <h3><button type="button" className="folder-tab" id={`prediction-tab-${index}`} aria-controls={`prediction-panel-${index}`} aria-expanded={open === index} onClick={() => { setOpen(current => current === index ? null : index); }}>
          <span className="folder-number">{String(index + 1).padStart(2, '0')}</span><span className="folder-name">{prediction.title}</span><span className="folder-handle" aria-hidden="true" /><span className="folder-toggle" aria-hidden="true">{open === index ? '−' : '+'}</span>
        </button></h3>
        <div id={`prediction-panel-${index}`} role="region" aria-labelledby={`prediction-tab-${index}`} hidden={open !== index}>
          <div className={`folder-paper with-visual ${index === 2 ? "energy-folder" : ""}`}>
            <div className="folder-writing"><p>{prediction.body}</p><ul>{prediction.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}</ul><div className="prediction-watch"><span>What I’d watch</span><p>{notes[index].watch}</p><span>The open question</span><p>{notes[index].question}</p></div></div>
            <div className="folder-visual-column"><span className="prediction-status">Personal hypothesis · Open to revision</span>{index === 0 && <WorkflowDiagram />}{index === 1 && <ClarityDiagram />}{index === 2 && <EnergyChart />}{index === 3 && <WorkforceDiagram />}{index === 4 && <PhysicalDiagram />}</div>
          </div>
        </div>
      </article>)}
    </div>
    <div className="cabinet-bottom"><span>PERSONAL PREDICTIONS</span><span>{String(predictions.length).padStart(2, '0')} files</span></div>
  </div>;
}
