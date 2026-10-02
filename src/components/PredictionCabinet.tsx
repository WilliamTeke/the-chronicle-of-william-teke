import type { Prediction } from '../data/portfolio';
import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export default function PredictionCabinet({ predictions }: { predictions: Prediction[] }) {
  const reduceMotion = useReducedMotion();
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
        <motion.div id={`prediction-panel-${index}`} role="region" aria-labelledby={`prediction-tab-${index}`}
          inert={open !== index} aria-hidden={open !== index} initial={false}
          animate={{ height: open === index ? 'auto' : 0, opacity: open === index ? 1 : 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
          style={{ overflow: 'hidden' }}>
          <div className="folder-paper">
            <div className="folder-writing">
              <div className="file-document-header"><span>WILLIAM TEKE / PERSONAL PREDICTIONS</span><span>REVIEWED OCT 2026</span></div>
              <p>{prediction.body}</p>
              <div className="prediction-watch">
                <span>The supporting signal</span><p>{prediction.evidence}</p>
                <span>Where the evidence stops</span><p>{prediction.caveat}</p>
                <span>What I’d watch</span><p>{prediction.watch}</p>
              </div>
              <div className="prediction-references" aria-label="Research links">{prediction.sources.map(source => <a key={source.href} href={source.href} target="_blank" rel="noopener noreferrer">{source.label} ↗</a>)}</div>
            </div>
          </div>
        </motion.div>
      </article>)}
    </div>
    <div className="cabinet-bottom"><span>PERSONAL PREDICTIONS</span><span>{String(predictions.length).padStart(2, '0')} files</span></div>
  </div>;
}
