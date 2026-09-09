import { useEffect, useRef, useState } from 'react';

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

function EnergyDiagram() {
  return <figure className="prediction-visual">
    <figcaption>When demand meets a constraint <span>Illustrative curves · no measured data</span></figcaption>
    <svg viewBox="0 0 480 210" role="img" aria-labelledby="energy-title energy-description">
      <title id="energy-title">Conceptual energy constraint</title><desc id="energy-description">An accelerating demand curve crosses a more slowly growing power capacity curve. This illustrates the prediction, not measured values or a forecast.</desc>
      <path d="M35 15V177H452" fill="none" stroke="#778c9c" />
      <path d="M35 60H450M35 115H450" fill="none" stroke="#ffffff10" strokeDasharray="3 6" />
      <path d="M38 151C170 147 270 143 445 125" fill="none" stroke="#90aaae" strokeWidth="3" />
      <path d="M38 164C205 157 310 104 445 24" fill="none" stroke="#e3b581" strokeWidth="3" />
      <text x="294" y="53" fill="#e3b581" fontSize="15">AI energy demand</text>
      <text x="292" y="153" fill="#b2c4c8" fontSize="15">Power capacity</text>
      <text x="35" y="202" fill="#92a7b5" fontSize="12">Today</text><text x="393" y="202" fill="#92a7b5" fontSize="12">Over time</text>
    </svg>
  </figure>;
}

export default function PredictionCabinet({ predictions }: { predictions: Prediction[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cancelHover = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = null;
  };
  useEffect(() => () => { if (hoverTimer.current) clearTimeout(hoverTimer.current); }, []);
  return <div className="prediction-cabinet" onKeyDown={event => {
    if (event.key === 'Escape') {
      cancelHover();
      const index = open;
      setOpen(null);
      if (index !== null) document.getElementById(`prediction-tab-${index}`)?.focus();
    }
  }}>
    <div className="cabinet-top"><span><i aria-hidden="true" />Field notes / Future of work</span><span>Hover to open · click to toggle</span></div>
    <div className="cabinet-files">
      {predictions.map((prediction, index) => <article className={`prediction-folder ${open === index ? 'is-open' : ''}`} key={prediction.n} onPointerEnter={event => { if (event.pointerType === 'mouse') { cancelHover(); hoverTimer.current = setTimeout(() => setOpen(index), 180); } }} onPointerLeave={cancelHover}>
        <h3><button type="button" className="folder-tab" id={`prediction-tab-${index}`} aria-controls={`prediction-panel-${index}`} aria-expanded={open === index} onClick={() => { cancelHover(); setOpen(open === index ? null : index); }}>
          <span className="folder-number">{String(index + 1).padStart(2, '0')}</span><span className="folder-name">{prediction.title}</span><span className="folder-handle" aria-hidden="true" /><span className="folder-toggle" aria-hidden="true">{open === index ? '−' : '+'}</span>
        </button></h3>
        <div id={`prediction-panel-${index}`} role="region" aria-labelledby={`prediction-tab-${index}`} hidden={open !== index}>
          <div className={`folder-paper ${index === 0 || index === 2 ? 'with-visual' : ''}`}>
            <div className="folder-writing"><p>{prediction.body}</p><ul>{prediction.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}</ul></div>
            {index === 0 && <WorkflowDiagram />}{index === 2 && <EnergyDiagram />}
          </div>
        </div>
      </article>)}
    </div>
    <div className="cabinet-bottom"><span>PERSONAL PREDICTIONS</span><span>{String(predictions.length).padStart(2, '0')} files</span></div>
  </div>;
}
