import { BuilderLab } from './PredictionLabs';
import { useState } from 'react';

interface Prediction { n: string; title: string; body: string; bullets: string[] }

const notes: Record<string, { watch: string; question: string }> = {
  builders: { watch: 'Roles hired around outcomes rather than a single discipline, with fewer handoffs and fewer levels.', question: 'Which products still need separate specialists and independent review?' },
  expertise: { watch: 'Domain experts moving between focused engagements, while companies compete for their next commitment.', question: 'What makes people stay when the project ends?' },
  physical: { watch: 'Changes in pay, career aspirations, and respect for skilled trades as desk work becomes easier to automate.', question: 'How quickly can robotics become dependable outside controlled environments?' },
};

export default function PredictionCabinet({ predictions }: { predictions: Prediction[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return <div className="prediction-cabinet" onKeyDown={event => {
    if (event.key === 'Escape') {
      const index = open;
      setOpen(null);
      if (index !== null) document.getElementById(`prediction-tab-${index}`)?.focus();
    }
  }}>
    <div className="cabinet-top"><span><i aria-hidden="true" />My field notes / Possible futures</span><span>Select a file to read</span></div>
    <div className="cabinet-files">
      {predictions.map((prediction, index) => <article className={`prediction-folder ${open === index ? 'is-open' : ''}`} key={prediction.n}>
        <h3><button type="button" className="folder-tab" id={`prediction-tab-${index}`} aria-controls={`prediction-panel-${index}`} aria-expanded={open === index} onClick={() => { setOpen(current => current === index ? null : index); }}>
          <span className="folder-number">{String(index + 1).padStart(2, '0')}</span><span className="folder-name">{prediction.title}</span><span className="file-type" aria-hidden="true">FIELD NOTE</span><span className="folder-toggle" aria-hidden="true">{open === index ? '−' : '+'}</span>
        </button></h3>
        <div id={`prediction-panel-${index}`} role="region" aria-labelledby={`prediction-tab-${index}`} hidden={open !== index}>
          <div className={`folder-paper ${prediction.n === "builders" ? "with-visual" : ""}`}>
            <div className="folder-writing"><div className="file-document-header"><span>WILLIAM TEKE / PERSONAL PREDICTIONS</span><span>NOTE {String(index + 1).padStart(2, "0")}</span></div><p>{prediction.body}</p><ul>{prediction.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}</ul><div className="prediction-watch"><span>What I’d watch</span><p>{notes[prediction.n].watch}</p><span>The open question</span><p>{notes[prediction.n].question}</p></div></div>
            {(prediction.n === "builders") && <div className="folder-visual-column"><span className="prediction-status">Personal hypothesis · Open to revision</span>{prediction.n === 'builders' && <BuilderLab />}</div>}
          </div>
        </div>
      </article>)}
    </div>
    <div className="cabinet-bottom"><span>PERSONAL PREDICTIONS</span><span>{String(predictions.length).padStart(2, '0')} files</span></div>
  </div>;
}
