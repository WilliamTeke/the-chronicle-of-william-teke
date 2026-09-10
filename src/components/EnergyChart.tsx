import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

// Rounded published scenario endpoints, not invented annual observations.
const scenarios = [
  { key: 'lift', name: 'Lift-off · >1,700 TWh', color: '#ffb86b', value: 1700 },
  { key: 'efficient', name: 'High efficiency · ~970 TWh', color: '#66e5bc', value: 970 },
  { key: 'headwinds', name: 'Headwinds · ~700 TWh', color: '#a99bff', value: 700 },
];
const data = [
  { year: 2024, lift: 415, efficient: 415, headwinds: 415 },
  { year: 2035, lift: 1700, efficient: 970, headwinds: 700 },
];
export default function EnergyChart() {
  return <figure className="energy-research">
    <figcaption><div><span className="energy-kicker">IEA SCENARIOS / PUBLISHED 2025</span><h4>How much electricity could data centres need?</h4></div></figcaption>
    <div className="energy-legend" style={{marginTop:20}}>{scenarios.map(s => <span key={s.key}><i style={{background:s.color}}/>{s.name}</span>)}</div>
    <div className="energy-chart-canvas" aria-label="Global data centre electricity demand scenarios, including AI and non-AI workloads">
      <p className="energy-axis-label">Annual electricity consumption · TWh</p>
      <ResponsiveContainer width="100%" height={340}>
        <LineChart data={data} margin={{top:20,right:25,bottom:10,left:5}} accessibilityLayer>
          <CartesianGrid stroke="#ffffff18" strokeDasharray="3 6" vertical={false}/>
          <XAxis dataKey="year" type="number" domain={[2024,2035]} ticks={[2024,2030,2035]} stroke="#b8cbd3" tick={{fontSize:12}} padding={{left:10,right:10}}/>
          <YAxis domain={[0,2000]} ticks={[0,500,1000,1500,2000]} stroke="#b8cbd3" tick={{fontSize:12}} width={48}/>
          <Tooltip contentStyle={{background:'#102429',border:'1px solid #4ccfb9',borderRadius:10,color:'#f0faf7'}} labelFormatter={year => Number(year)===2024?'2024 estimate':'2035 scenarios'} formatter={(value,name)=>[`${Number(value)===1700?'>':''}${Number(value).toLocaleString()} TWh`,String(name).split(' · ')[0]]}/>
          {scenarios.map(s => <Line key={s.key} dataKey={s.key} name={s.name} stroke={s.color} strokeWidth={3} strokeDasharray="7 5" dot={{r:5,fill:s.color}} activeDot={{r:8}} isAnimationActive={false}/>)}
        </LineChart>
      </ResponsiveContainer>
    </div>
    <p className="energy-method">2024 estimate: 415 TWh. Dashed lines connect published endpoints, not annual forecasts. Lift-off exceeds the plotted 1,700 TWh marker. Includes AI and non-AI workloads.</p>
    <p className="energy-source"><a href="https://www.iea.org/reports/energy-and-ai/energy-demand-from-ai" target="_blank" rel="noreferrer">IEA, Energy and AI (2025) ↗</a> · CC BY 4.0 · Rounded scenarios, not certainties.</p>
  </figure>;
}
