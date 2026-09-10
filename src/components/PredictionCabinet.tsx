import EnergyChart from './EnergyChart';
import { useState } from 'react';

interface Prediction { n: string; title: string; body: string; bullets: string[] }

function WorkflowDiagram() {
  return <figure className="prediction-visual"><figcaption>Three disciplines. One accountable builder.<span>My proposed model, not an industry forecast</span></figcaption>
    <div className="handoff-chain">{['Product', 'Design', 'Engineering'].map(item => <span key={item}>{item}</span>)}</div>
    <div className="diagram-connector" aria-hidden="true">↓</div><div className="diagram-result">Builder</div>
    <div className="builder-levels">{['Entry', 'Mid', 'Senior'].map(level => <span key={level}>{level}</span>)}</div>
    <div className="physical-cycle"><div><strong>Find → Align → Build → Deliver</strong><small>One owner across the whole product loop</small></div></div>
    <p>Progression through ownership and scope.</p></figure>;
}

const notes: Record<string, { watch: string; question: string }> = {
  builders: { watch: 'Roles hired around outcomes rather than a single discipline, with fewer handoffs and fewer levels.', question: 'Which products still need separate specialists and independent review?' },
  energy: { watch: 'Power access influencing where AI infrastructure is built and which projects can move first.', question: 'Could efficiency improvements or slower adoption outpace growth in usage?' },
  expertise: { watch: 'Domain experts moving between focused engagements, while companies compete for their next commitment.', question: 'What makes people stay when the project ends?' },
  physical: { watch: 'Changes in pay, career aspirations, and respect for skilled trades as desk work becomes easier to automate.', question: 'How quickly can robotics become dependable outside controlled environments?' },
};

function WorkforceDiagram() {
  return <figure className="prediction-visual"><figcaption>The expertise travels with you<span>A possible career structure</span></figcaption>
    <div className="expertise-core"><strong>Deep domain expertise</strong><span>Judgment · Context · Communication</span></div>
    <div className="diagram-connector" aria-hidden="true">↓</div><div className="project-engagements">{['Project A', 'Project B', 'Project C'].map(item => <div key={item}><strong>{item}</strong><span>Assemble<br/>Deliver<br/>Re-form</span></div>)}</div>
    <p>The tools are shared. Your understanding is the reason you’re hired.</p></figure>;
}
function PhysicalDiagram() {
  return <figure className="prediction-visual"><figcaption>Two different automation clocks<span>Conceptual comparison, not measured timelines</span></figcaption>
    <div className="physical-cycle"><div><span>DIGITAL WORK</span><strong>One person, several engagements</strong><small>AI compresses repeatable desk workflows</small></div><span aria-hidden="true">⇅</span><div><span>SKILLED PHYSICAL WORK</span><strong>One place, hands-on expertise</strong><small>Real environments require reliable physical execution</small></div></div>
    <p>My bet: prestige follows the capability that stays scarce.</p></figure>;
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
          <div className={`folder-paper with-visual ${prediction.n === "energy" ? "energy-folder" : ""}`}>
            <div className="folder-writing"><p>{prediction.body}</p><ul>{prediction.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}</ul><div className="prediction-watch"><span>What I’d watch</span><p>{notes[prediction.n].watch}</p><span>The open question</span><p>{notes[prediction.n].question}</p></div></div>
            <div className="folder-visual-column"><span className="prediction-status">Personal hypothesis · Open to revision</span>{prediction.n === 'builders' && <WorkflowDiagram />}{prediction.n === 'energy' && <EnergyChart />}{prediction.n === 'expertise' && <WorkforceDiagram />}{prediction.n === 'physical' && <PhysicalDiagram />}</div>
          </div>
        </div>
      </article>)}
    </div>
    <div className="cabinet-bottom"><span>PERSONAL PREDICTIONS</span><span>{String(predictions.length).padStart(2, '0')} files</span></div>
  </div>;
}
