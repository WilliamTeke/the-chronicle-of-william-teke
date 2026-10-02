import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useDragControls, useReducedMotion } from 'framer-motion';
const HeritageAtlas = lazy(() => import('./HeritageAtlas'));

export default function RootsExplorer() {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const dragControls = useDragControls();
  const close = () => setOpen(false);
  useEffect(() => { if (open) closeButton.current?.focus({ preventScroll: true }); }, [open]);

  return <>
    <motion.button className="roots-trigger" ref={trigger}
      whileHover={reduceMotion ? undefined : { y: -2 }} whileTap={reduceMotion ? undefined : { scale: 0.98 }}
      onClick={() => { dialog.current?.showModal(); setOpen(true); }} aria-haspopup="dialog">
      Explore my roots <span aria-hidden="true">↗</span>
    </motion.button>
    <dialog className="roots-dialog roots-drawer" ref={dialog} aria-label="Different places. One story."
      onCancel={event => { event.preventDefault(); close(); }}
      onClose={() => { setOpen(false); trigger.current?.focus(); }}
      onClick={event => { if (event.target === dialog.current) close(); }}>
      <AnimatePresence onExitComplete={() => dialog.current?.close()}>
        {open && <motion.div className="roots-drawer-panel" key="atlas"
          initial={{ y: reduceMotion ? 0 : '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }} exit={{ y: reduceMotion ? 0 : '100%', opacity: 0 }}
          transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 320, damping: 36 }}
          drag={reduceMotion ? false : 'y'} dragControls={dragControls} dragListener={false}
          dragConstraints={{ top: 0, bottom: 0 }} dragElastic={{ top: 0, bottom: 0.3 }}
          onDragEnd={(_, info) => { if (info.offset.y > 100 || info.velocity.y > 650) close(); }}>
          <div className="roots-drag-handle" aria-hidden="true" onPointerDown={event => dragControls.start(event)}><span /></div>
          <div className="roots-toolbar"><span>FAMILY / PLACES</span><button ref={closeButton} onClick={close} aria-label="Close family atlas">Close ×</button></div>
          <div className="roots-drawer-content">
            <Suspense fallback={<p role="status" className="atlas-loading">Loading the atlas…</p>}><HeritageAtlas /></Suspense>
          </div>
        </motion.div>}
      </AnimatePresence>
    </dialog>
  </>;
}
