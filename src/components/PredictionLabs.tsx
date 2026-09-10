import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Route, Layers, Wrench, Brain, MapPin, ShieldCheck } from 'lucide-react';

export function BuilderLab() {
  const [delay, setDelay] = useState(2);
  const reduced = useReducedMotion();
  const build = 10, handoffs = 4;
  const total = build + handoffs * delay;
  return <figure className="prediction-lab builder-lab"><figcaption><Route size={22}/><div>The hidden cost of handoffs<span>Interactive thought experiment</span></div></figcaption>
    <label className="lab-control">Waiting per handoff <strong>{delay} days</strong><input type="range" min="0" max="5" step="0.5" value={delay} onChange={e => setDelay(Number(e.target.value))}/></label>
    <div className="lab-legend"><span>🟣 Active work</span><span>🟠 Waiting</span></div>
    {[{name:'Five sequential owners',wait:handoffs*delay},{name:'One end-to-end owner',wait:0}].map(row => <div className="delivery-row" key={row.name}><div>{row.name}<strong>{build+row.wait} days</strong></div><div className="delivery-track"><motion.div animate={{width:`${build/30*100}%`}} transition={{duration:reduced ? 0 : .25}} className="delivery-work">10d</motion.div><motion.div animate={{width:`${row.wait/30*100}%`}} transition={{duration:reduced ? 0 : .25}} className="delivery-wait">{row.wait > 0 ? `${row.wait}d` : ''}</motion.div></div></div>)}
    <div className="lab-result"><strong>{Math.round((total-build)/total*100)}%</strong><span>less elapsed time in this scenario</span></div>
    <p className="lab-insight">When building gets faster, waiting between people can become the bigger opportunity.</p><details><summary>Assumptions & limits</summary><p>Both paths have 10 days of active work. The first adds four sequential waits; the second assumes none. This isolates coordination cost. Real teams can work in parallel, and a single owner may take longer or still need reviews. No measured productivity claim.</p></details></figure>;
}

const projects = [
  {name:'Hospital scheduling', domain:'Clinical workflows', risks:'Patient safety, staffing constraints, and escalation paths.', question:'Which staffing rule must never be violated, even if the schedule looks efficient?', icon:ShieldCheck},
  {name:'Insurance claims', domain:'Policy interpretation', risks:'Coverage exclusions, evidence requirements, and appeals.', question:'What evidence changes a denial into a valid claim?', icon:Layers},
  {name:'Factory maintenance', domain:'Equipment reliability', risks:'Failure modes, downtime, and safe intervention.', question:'When is stopping the line cheaper than keeping it running?', icon:Wrench},
];
export function ExpertiseLab() {
  const [selected,setSelected] = useState(0); const project = projects[selected]; const Icon = project.icon;
  return <figure className="prediction-lab expertise-lab"><figcaption><Brain size={22}/><div>Same tools. Different judgment.<span>Explore three illustrative engagements</span></div></figcaption>
    <div className="project-selector" aria-label="Example engagement">{projects.map((p,i) => <button key={p.name} aria-pressed={selected===i} onClick={() => setSelected(i)}>{p.name}</button>)}</div>
    <div className="expertise-stage"><Icon size={30} aria-hidden="true"/><span>EXPERTISE TO BRING</span><h4>{project.domain}</h4><p>{project.risks}</p><blockquote>{project.question}</blockquote></div>
    <div className="shared-tools"><span>SHARED BUILD LAYER</span><p>AI coding · Prototyping · Automation</p></div>
    <p className="lab-insight">The hiring question shifts from “Can you build it?” to “Do you know what must be true?”</p><p className="lab-note">These examples illustrate domain judgment, not professional advice or hiring-market data.</p></figure>;
}
const tasks = [
 {name:'Draft a report',place:1,ambiguity:1,why:'The input and output can stay digital. Review still matters, but no physical presence is required.'},
 {name:'Negotiate a deal',place:1,ambiguity:3,why:'Digital work can still demand trust, judgment, and responsibility. White-collar does not automatically mean easy to automate.'},
 {name:'Sort standard parts',place:3,ambiguity:1,why:'A predictable physical setting can be easier to automate than an unpredictable conversation.'},
 {name:'Repair a leak in an old house',place:3,ambiguity:3,why:'Access, diagnosis, and physical conditions vary from job to job. Reliability matters beyond a successful demonstration.'},
];
export function PhysicalLab() {
 const [selected,setSelected] = useState(3);
 return <figure className="prediction-lab physical-lab"><figcaption><MapPin size={22}/><div>What makes work hard to automate?<span>Qualitative map of example tasks</span></div></figcaption>
 <div className="task-matrix" aria-label="Tasks compared by physical presence and unpredictability">{tasks.map((task,i) => <button key={task.name} style={{gridColumn:task.place===1?1:2,gridRow:task.ambiguity===3?1:2}} aria-pressed={selected===i} onClick={()=>setSelected(i)}><span>{task.ambiguity===3?'Variable context':'Repeatable context'}</span>{task.name}</button>)}</div>
 <div className="matrix-axis"><span>Digital / remote</span><span>Physical / on site →</span></div>
 <p className="task-reading" aria-live="polite">{tasks[selected].why}</p><p className="lab-insight">The dividing line may be predictable versus unpredictable work, as much as blue versus white collar.</p><p className="lab-note">Positions reflect a thought experiment, not measured automation scores or timelines.</p></figure>;
}
