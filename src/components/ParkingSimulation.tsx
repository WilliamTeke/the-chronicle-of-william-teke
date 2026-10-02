import { useEffect, useMemo, useRef, useState } from 'react';
import { simulateParking, PARKING_CAPACITY, SCENARIO_MINUTES, type ParkingSnapshot } from '../data/parkingModel';

function ParkingLot({ snapshot, proposed, bays }: { snapshot: ParkingSnapshot; proposed?: boolean; bays: number }) {
  return <div className={`parking-lot ${proposed ? 'parking-lot-proposed' : ''}`}>
    <div className="parking-lot-header"><span>{proposed ? 'Proposed scenario' : 'Baseline scenario'}</span><strong>{snapshot.parked}<small> / {PARKING_CAPACITY-bays} occupied</small></strong></div>
    <div className="parking-street" aria-hidden="true"><span>BEACHES TOWN CENTER</span><i /><span>CONCEPTUAL LAYOUT</span></div>
    <div className="parking-spaces" role="img" aria-label={`${snapshot.parked} occupied general spaces, ${160-bays-snapshot.parked} available, ${bays} reserved loading bays. Schematic, not an actual map.`}>
      {Array.from({length:160},(_,i)=><span key={i} className={`parking-space ${i>=160-bays ? 'is-loading' : snapshot.slots[i] ? 'is-occupied' : ''}`} />)}
    </div>
    <div className="parking-lot-metrics"><div><strong>{snapshot.admitted}</strong><span>Visits accommodated</span></div><div><strong>{snapshot.unserved}</strong><span>Arrivals without a space</span></div></div>
  </div>;
}
export default function ParkingSimulation() {
  const [demand,setDemand]=useState(90);
  const [stay,setStay]=useState(140);
  const [bays,setBays]=useState(0);
  const [minute,setMinute]=useState(180);
  const [playing,setPlaying]=useState(false);
  const section=useRef<HTMLElement>(null);
  const baseline=useMemo(()=>simulateParking(demand,140),[demand]);
  const proposal=useMemo(()=>simulateParking(demand,stay,bays),[demand,stay,bays]);
  useEffect(()=>{
    if(!playing) return;
    const timer=window.setInterval(()=>setMinute(current=>Math.min(current+4,SCENARIO_MINUTES)),250);
    const stop=()=>{if(document.hidden)setPlaying(false);};
    document.addEventListener('visibilitychange',stop);
    const observer=new IntersectionObserver(([entry])=>{if(!entry.isIntersecting)setPlaying(false);});
    if(section.current)observer.observe(section.current);
    return()=>{clearInterval(timer);document.removeEventListener('visibilitychange',stop);observer.disconnect();};
  },[playing]);
  useEffect(()=>{if(minute===SCENARIO_MINUTES)setPlaying(false);},[minute]);
  const pause=()=>setPlaying(false);
  return <section className="parking-simulation" ref={section} aria-labelledby="parking-simulation-title">
    <div className="neptune-eyebrow">Interactive scenario / 160 spaces</div>
    <h4 id="parking-simulation-title">Same spaces. Different possibilities.</h4>
    <p>What would have to change for more people to find a space? Start with equal conditions, then change the assumed stay or reserve a few loading bays.</p>
    <div className="simulation-disclosure">Illustrative before/after. These are simulated visits, not measured project results.</div>
    <div className="parking-controls">
      <label>Arrivals per hour <strong>{demand}</strong><input aria-label="Arrivals per hour" type="range" min="30" max="120" step="10" value={demand} onChange={e=>{pause();setDemand(+e.target.value);}}/><small>Same hypothetical demand in both scenarios</small></label>
      <label>Proposed average stay <strong>{stay} min</strong><input aria-label="Proposed average stay" type="range" min="60" max="180" step="10" value={stay} onChange={e=>{pause();setStay(+e.target.value);}}/><small>Baseline holds at 140 minutes</small></label>
      <label>Reserved loading bays <strong>{bays}</strong><input aria-label="Reserved loading bays" type="range" min="0" max="3" step="1" value={bays} onChange={e=>{pause();setBays(+e.target.value);}}/><small>Removes these spaces from general parking</small></label>
    </div>
    <div className="parking-presets"><button onClick={()=>{pause();setStay(110);setBays(2);}}>Try shorter stays + 2 loading bays</button><button onClick={()=>{pause();setDemand(90);setStay(140);setBays(0);setMinute(180);}}>Reset to equal conditions</button></div>
    <div className="parking-comparison"><ParkingLot snapshot={baseline[minute]} bays={0}/><ParkingLot snapshot={proposal[minute]} bays={bays} proposed/></div>
    <div className="parking-legend"><span><i className="legend-before"/>Baseline occupied</span><span><i className="legend-after"/>Proposal occupied</span><span><i/>Available</span><span><i className="legend-loading"/>Loading bay</span></div>
    <div className="parking-playback"><button onClick={()=>{if(!playing && minute===SCENARIO_MINUTES)setMinute(0);setPlaying(!playing);}} aria-label={playing?'Pause parking simulation':'Play parking simulation'}>{playing?'Pause':'Play'} <span aria-hidden="true">{playing?'Ⅱ':'▷'}</span></button><label>Elapsed time <strong>{Math.floor(minute/60)}h {String(minute%60).padStart(2,'0')}m</strong><input aria-label="Simulation elapsed minutes" type="range" min="0" max="240" step="1" value={minute} onChange={e=>{pause();setMinute(+e.target.value);}}/></label></div>
    <p className="simulation-reading" aria-live="polite">{!playing && (stay===140 && bays===0 ? 'Equal assumptions produce equal results. Change an assumption to explore the tradeoff.' : `At this point, the proposed scenario accommodates ${proposal[minute].admitted-baseline[minute].admitted >=0 ? '+' : ''}${proposal[minute].admitted-baseline[minute].admitted} visits compared with the baseline. This is a model result, not a forecast.`)}</p>
    <details className="simulation-method"><summary>How this model works</summary><p>Both lots start empty and receive the same evenly spaced arrivals for four hours. Each admitted vehicle stays for the selected duration; departures free a space before the next arrival. An arrival with no space leaves this model rather than joining a queue. Counts are cumulative visits, not unique people.</p><p>The 160-space constraint comes from the white paper. The 140-minute baseline is inspired by the earlier team’s March 2022 paid-duration analysis; paid time is not observed time on site. Arrival rates, constant stays, and the shorter-stay scenario are assumptions. There is no estimated relationship between parking price and behavior.</p><p>Loading bays reduce general parking capacity here. Delivery use, traffic safety, visitor spending, revenue, searching, and demand shifting are not modeled. The drawings show 160 schematic spaces, not the actual street layout.</p></details>
  </section>;
}
