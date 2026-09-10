import { lazy, Suspense, useRef, useState } from 'react';
const HeritageAtlas = lazy(() => import('./HeritageAtlas'));

export default function RootsExplorer() {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [loaded, setLoaded] = useState(false);
  return <>
    <button className="roots-trigger" ref={trigger} onClick={() => { setLoaded(true); dialog.current?.showModal(); }} aria-haspopup="dialog">Explore my roots <span aria-hidden="true">↗</span></button>
    <dialog className="roots-dialog" ref={dialog} aria-label="Different places. One story." onClose={() => trigger.current?.focus()} onClick={event => { if (event.target === dialog.current) { const rect = dialog.current!.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.current?.close(); } }}>
      <div className="roots-toolbar"><span>FAMILY / PLACES</span><button autoFocus onClick={() => dialog.current?.close()} aria-label="Close family atlas">Close ×</button></div>
      {loaded && <Suspense fallback={<p role="status">Loading the atlas…</p>}><HeritageAtlas /></Suspense>}
    </dialog>
  </>;
}
