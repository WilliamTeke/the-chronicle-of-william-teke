import { lazy, Suspense, useEffect, useState } from 'react';
import FeatureBoundary from './FeatureBoundary';
import neptuneBeachPhoto from '../assets/neptune-beach.jpg';
import './neptune.css';
const NeptuneCaseStudy=lazy(()=>import('./NeptuneCaseStudy'));
export default function NeptuneProject() {
  const [open,setOpen]=useState(()=>window.location.hash.startsWith('#neptune-'));
  useEffect(()=>{let frame=0;const reveal=()=>{if(window.location.hash.startsWith('#neptune-')){setOpen(true);frame=requestAnimationFrame(()=>(document.getElementById(window.location.hash.slice(1)) ?? document.getElementById('neptune-beach'))?.scrollIntoView({behavior:'instant'}));}};reveal();window.addEventListener('hashchange',reveal);return()=>{cancelAnimationFrame(frame);window.removeEventListener('hashchange',reveal);};},[]);
  return <article className="glass-card project-surface neptune-project" id="neptune-beach">
    <div className="neptune-preview"><div><p className="neptune-eyebrow">Case study / Pro bono consulting · UF AIS</p><h3>Neptune Beach<br/>Parking Strategy</h3><p>How could 160 parking spaces better serve a busy town center? A pro bono consulting project translating parking research into pricing and curbside recommendations.</p></div><figure><img src={neptuneBeachPhoto} alt="Palm-lined street and shops in Neptune Beach" width="480" height="318" loading="lazy" decoding="async"/><figcaption>Beaches Town Center · Neptune Beach, FL</figcaption></figure></div>
    <div className="neptune-preview-bottom"><div className="neptune-preview-metrics"><div><strong>160</strong><span>Available spaces at BTC</span></div><div><strong>90%</strong><span>Car-centric trips citywide</span></div></div><button className="neptune-open" aria-expanded={open} aria-controls="neptune-case-content" onClick={()=>{setOpen(!open);if(!open)window.history.replaceState(null,'','#neptune-beach');}}>{open?'Close case study':'Explore the case study'} <span aria-hidden="true">{open?'−':'↗'}</span></button></div>
    {open&&<FeatureBoundary name="The case study"><Suspense fallback={<p role="status">Loading the case study…</p>}><NeptuneCaseStudy/></Suspense></FeatureBoundary>}
  </article>;
}
