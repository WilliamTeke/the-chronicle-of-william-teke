import { BuilderLab } from './PredictionLabs';
import { useRef, useState, type CSSProperties } from 'react';

interface Prediction { n: string; title: string; body: string; bullets: string[] }

const notes: Record<string, { watch: string; question: string }> = {
  builders: { watch: 'Roles hired around outcomes rather than a single discipline, with fewer handoffs and fewer levels.', question: 'Which products still need separate specialists and independent review?' },
  expertise: { watch: 'Domain experts moving between focused engagements, while companies compete for their next commitment.', question: 'What makes people stay when the project ends?' },
  physical: { watch: 'Changes in pay, career aspirations, and respect for skilled trades as desk work becomes easier to automate.', question: 'How quickly can robotics become dependable outside controlled environments?' },
};

export default function PredictionCabinet({ predictions }: { predictions: Prediction[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const reader = useRef<HTMLDialogElement>(null);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const selected = open === null ? null : predictions[open];
  return <div className="hanging-cabinet">
    <div className="drawer-caption"><span>FIELD NOTES / {String(predictions.length).padStart(2,'0')} FILES</span><span>Select a title to read</span></div>
    <div className="drawer-scene">
      <div className="drawer-back" aria-hidden="true" />
      <div className="drawer-rail rail-left" aria-hidden="true"/><div className="drawer-rail rail-right" aria-hidden="true"/>
      <div className="hanging-files">
        {predictions.map((prediction,index) => <div key={prediction.n}
          className={`hanging-file ${open === index ? 'file-pulled' : ''}`} style={{'--file-color':'#d6bd8e', '--file-index':index} as CSSProperties}>
          <button className="hanging-tab" ref={element => { buttons.current[index] = element; }}
            aria-haspopup="dialog" aria-label={`Read prediction ${index+1}: ${prediction.title}`}
            onClick={() => { setOpen(index); reader.current?.showModal(); }}>
            {prediction.title}
          </button>
          <span className="hanging-sheet" aria-hidden="true" />
        </div>)}
      </div>
      <div className="drawer-front" aria-hidden="true"><span className="drawer-handle"/></div>
    </div>
    <dialog ref={reader} className="prediction-reader" aria-labelledby="prediction-reader-title" onClose={() => { if (open !== null) buttons.current[open]?.focus(); setOpen(null); }}>
      {selected && <article>
        <header className="reader-toolbar"><span>FILE {String(open!+1).padStart(2,'0')} / PERSONAL PREDICTION</span><button autoFocus onClick={() => reader.current?.close()}>Return file ×</button></header>
        <h3 id="prediction-reader-title">{selected.title}</h3>
        <div className={`reader-content ${selected.n === 'builders' ? 'reader-with-visual' : ''}`}>
          <div><p>{selected.body}</p><ul>{selected.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}</ul>
          <div className="reader-notes"><h4>What I’d watch</h4><p>{notes[selected.n].watch}</p><h4>The open question</h4><p>{notes[selected.n].question}</p></div></div>
          {selected.n === 'builders' && <BuilderLab />}
        </div>
      </article>}
    </dialog>
  </div>;
}
