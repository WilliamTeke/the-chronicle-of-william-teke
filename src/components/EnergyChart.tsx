import { useState } from 'react';

const source = 'https://www.iea.org/reports/key-questions-on-energy-and-ai/executive-summary';
export default function EnergyChart() {
  const [view, setView] = useState<'demand' | 'growth'>('demand');
  const demand = view === 'demand';
  const max = demand ? 1000 : 300;
  const ticks = demand ? [0, 250, 500, 750, 1000] : [0, 100, 200, 300];
  const y = (value: number) => 290 - value / max * 220;
  const total = demand ? [485, 950] : [100, 950 / 485 * 100];
  return <figure className="energy-research">
    <figcaption><div><span className="energy-kicker">THE EVIDENCE / IEA 2026</span><h4>The baseline grows. Power becomes strategic.</h4></div><label className="energy-select">Chart view<select value={view} onChange={event => setView(event.target.value as 'demand' | 'growth')}><option value="demand">Electricity demand</option><option value="growth">Relative growth</option></select></label></figcaption>
    <div className="energy-metrics"><div><strong>485 → 950 <small>TWh</small></strong><span>2025 estimate → 2030 projection</span></div><div><strong>~3×</strong><span>AI-focused consumption by 2030</span></div><div><strong>+465 <small>TWh</small></strong><span>Additional annual demand by 2030, about 96% above 2025</span></div></div>
    <div className="energy-legend"><span><i />All data centres</span>{!demand && <span><i className="ai-key" />AI-focused data centres (subset)</span>}<span>Dashed lines: projected change</span></div>
    <svg viewBox="0 0 700 355" role="img" aria-label={demand ? 'Global data centre electricity demand: 485 TWh estimated in 2025 and 950 TWh projected in 2030.' : 'Indexed to 100 in 2025: all data centres reach approximately 196 and AI-focused data centres approximately 300 in 2030.'}>
      <text x="65" y="25" fill="#b3c4ce" fontSize="13">{demand ? 'Annual electricity consumption (TWh)' : 'Consumption index (2025 = 100)'}</text>
      {ticks.map(tick => <g key={tick}><path d={`M65 ${y(tick)}H640`} stroke="#ffffff18" strokeDasharray="3 5"/><text x="52" y={y(tick)+5} textAnchor="end" fill="#a8bbc7" fontSize="13">{tick.toLocaleString()}</text></g>)}
      <path d="M65 60V290H640" fill="none" stroke="#8b9ea9"/>
      <path d={`M170 ${y(total[0])}L535 ${y(total[1])}`} fill="none" stroke="#74b9ff" strokeWidth="3" strokeDasharray="7 6"/>
      {demand && <>{total.map((value,index) => <rect key={index} x={index ? 501 : 136} y={y(value)} width="68" height={290-y(value)} fill="#74b9ff" opacity={index ? .12 : .3}/>)}</>}
      {total.map((value,index) => <g key={index}><circle cx={index ? 535 : 170} cy={y(value)} r="6" fill={index ? '#101b23' : '#74b9ff'} stroke="#74b9ff" strokeWidth="3"/><text x={index ? 550 : 185} y={y(value)+(demand ? -12 : 20)} fill="#99cdff" fontSize="17">{Math.round(value)}</text></g>)}
      {!demand && <><path d={`M170 ${y(100)}L535 ${y(300)}`} stroke="#e5b788" strokeWidth="3" strokeDasharray="7 6"/><path d={`M535 ${y(300)-7}l7 7-7 7-7-7Z`} fill="#e5b788"/><text x="550" y={y(300)-10} fill="#e5b788" fontSize="17">~300</text></>}
      <text x="170" y="317" textAnchor="middle" fill="#e0e9ee" fontSize="15">2025</text><text x="170" y="339" textAnchor="middle" fill="#a8bbc7" fontSize="12">Estimated baseline</text>
      <text x="535" y="317" textAnchor="middle" fill="#e0e9ee" fontSize="15">2030</text><text x="535" y="339" textAnchor="middle" fill="#a8bbc7" fontSize="12">IEA projection</text>
    </svg>
    <p className="energy-method">{demand ? 'Includes AI and non-AI workloads. TWh measures annual energy use, not peak power capacity.' : 'Each series starts at 100. AI-focused consumption is a subset, not an additional total. The AI endpoint reflects the IEA’s approximate tripling.'} Only published endpoints are shown; connecting lines do not represent annual estimates.</p>
    <div className="energy-context"><div><span>THE CONSTRAINT</span><p>Grid connections and equipment supply can limit how quickly new demand is served.</p></div><div><span>THE COUNTERWEIGHT</span><p>Efficiency is improving, while adoption and more intensive tasks can push consumption upward.</p></div><div><span>MY TAKE</span><p>My bet: the next AI opportunity is making reliable power abundant and fast to connect.</p></div></div>
    <details className="energy-data"><summary>Data & sources</summary><table><caption>Global electricity consumption, IEA April 2026 outlook</caption><thead><tr><th scope="col">Series</th><th scope="col">2025</th><th scope="col">2030</th></tr></thead><tbody><tr><th scope="row">All data centres</th><td>485 TWh</td><td>~950 TWh</td></tr><tr><th scope="row">All data centres, indexed</th><td>100</td><td>~196</td></tr><tr><th scope="row">AI-focused, indexed</th><td>100</td><td>~300</td></tr></tbody></table><p>Indexed total calculated as 950 ÷ 485 × 100. Projections are uncertain.</p></details>
    <p className="energy-source">Source: <a href={source} target="_blank" rel="noreferrer">IEA, Key Questions on Energy and AI (2026) ↗</a> · CC BY 4.0. Chart adapted from reported figures. <a href="https://www.iea.org/reports/electricity-2026/grids" target="_blank" rel="noreferrer">Grid context ↗</a></p>
  </figure>;
}
