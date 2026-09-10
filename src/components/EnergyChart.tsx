import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { useState } from 'react';

const source = 'https://www.iea.org/reports/key-questions-on-energy-and-ai/executive-summary';
export default function EnergyChart() {
  const [view, setView] = useState<'demand' | 'growth'>('demand');
  const demand = view === 'demand';
  const max = demand ? 1000 : 300;
  const ticks = demand ? [0, 250, 500, 750, 1000] : [0, 100, 200, 300];

  const total = demand ? [485, 950] : [100, 950 / 485 * 100];
  return <figure className="energy-research">
    <figcaption><div><span className="energy-kicker">THE EVIDENCE / IEA 2026</span><h4>The baseline grows. Power becomes strategic.</h4></div><label className="energy-select">Chart view<select value={view} onChange={event => setView(event.target.value as 'demand' | 'growth')}><option value="demand">Electricity demand</option><option value="growth">Relative growth</option></select></label></figcaption>
    <div className="energy-metrics"><div><strong>485 → 950 <small>TWh</small></strong><span>2025 estimate → 2030 projection</span></div><div><strong>~3×</strong><span>AI-focused consumption by 2030</span></div><div><strong>+465 <small>TWh</small></strong><span>Additional annual demand by 2030, about 96% above 2025</span></div></div>
    <div className="energy-legend"><span><i />All data centres</span>{!demand && <span><i className="ai-key" />AI-focused data centres (subset)</span>}<span>Dashed lines: projected change</span></div>
    <div className="energy-chart-canvas" aria-label={demand ? 'Annual electricity consumption in TWh' : 'Consumption index, 2025 equals 100'}>
      <p className="energy-axis-label">{demand ? 'Annual electricity consumption · TWh' : 'Consumption index · 2025 = 100'}</p>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={[{year:'2025 estimate',total:total[0],ai:100},{year:'2030 projection',total:total[1],ai:300}]} margin={{top:20,right:30,bottom:10,left:5}} accessibilityLayer>
          <CartesianGrid stroke="#ffffff18" strokeDasharray="3 6" vertical={false}/>
          <XAxis dataKey="year" stroke="#b8cbd3" tick={{fontSize:12}} padding={{left:30,right:30}}/>
          <YAxis domain={[0,max]} ticks={ticks} stroke="#b8cbd3" tick={{fontSize:12}} width={45}/>
          <Tooltip contentStyle={{background:'#102429',border:'1px solid #4ccfb9',borderRadius:10,color:'#f0faf7'}} formatter={(value,name)=>[`${Math.round(Number(value))}${demand?' TWh':' index'}`,name]}/>
          <Line dataKey="total" name="All data centres" stroke="#4ee5b4" strokeWidth={3} strokeDasharray="7 6" dot={{r:6,fill:'#4ee5b4'}} activeDot={{r:9}} isAnimationActive={false}/>
          {!demand && <Line dataKey="ai" name="AI-focused (subset)" stroke="#ffd36e" strokeWidth={3} strokeDasharray="7 6" dot={{r:6,fill:'#ffd36e'}} activeDot={{r:9}} isAnimationActive={false}/>}
        </LineChart>
      </ResponsiveContainer>
    </div>
    <p className="energy-method">{demand ? 'Includes AI and non-AI workloads. TWh measures annual energy use, not peak power capacity.' : 'Each series starts at 100. AI-focused consumption is a subset, not an additional total. The AI endpoint reflects the IEA’s approximate tripling.'} Only published endpoints are shown; connecting lines do not represent annual estimates.</p>
    <div className="energy-context"><div><span>THE CONSTRAINT</span><p>Grid connections and equipment supply can limit how quickly new demand is served.</p></div><div><span>THE COUNTERWEIGHT</span><p>Efficiency is improving, while adoption and more intensive tasks can push consumption upward.</p></div><div><span>MY TAKE</span><p>My bet: the next AI opportunity is making reliable power abundant and fast to connect.</p></div></div>
    <details className="energy-data"><summary>Data & sources</summary><table><caption>Global electricity consumption, IEA April 2026 outlook</caption><thead><tr><th scope="col">Series</th><th scope="col">2025</th><th scope="col">2030</th></tr></thead><tbody><tr><th scope="row">All data centres</th><td>485 TWh</td><td>~950 TWh</td></tr><tr><th scope="row">All data centres, indexed</th><td>100</td><td>~196</td></tr><tr><th scope="row">AI-focused, indexed</th><td>100</td><td>~300</td></tr></tbody></table><p>Indexed total calculated as 950 ÷ 485 × 100. Projections are uncertain.</p></details>
    <p className="energy-source">Source: <a href={source} target="_blank" rel="noreferrer">IEA, Key Questions on Energy and AI (2026) ↗</a> · CC BY 4.0. Chart adapted from reported figures. <a href="https://www.iea.org/reports/electricity-2026/grids" target="_blank" rel="noreferrer">Grid context ↗</a></p>
  </figure>;
}
