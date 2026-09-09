export default function ParkingDiagram() {
  return <figure className="parking-diagram">
    <div className="parking-diagram-heading"><span>Beaches Town Center</span><span>Proposed curbside strategy</span></div>
    <svg viewBox="0 0 720 250" role="img" aria-labelledby="parking-title parking-desc">
      <title id="parking-title">Concept for managing parking near shops and restaurants</title>
      <desc id="parking-desc">A schematic street with storefronts, standard parking spaces, and two highlighted curbside spaces proposed for delivery and rideshare. This illustrates the recommendation, not the actual street layout or total number of spaces.</desc>
      <defs><pattern id="parking-water" width="34" height="14" patternUnits="userSpaceOnUse"><path d="M0 7 Q8 0 17 7 T34 7" fill="none" stroke="#5996b2" strokeWidth="1" opacity=".35" /></pattern></defs>
      <rect x="0" y="0" width="720" height="250" fill="#0b1720" />
      {[38,196,354].map(x => <g key={x}><rect x={x} y="18" width="128" height="50" rx="3" fill="#203541" stroke="#577481" /><path d={`M${x+10} 49h108`} stroke="#7392a0" strokeWidth="2" /><path d={`M${x+19} 30v10m20-10v10m20-10v10m20-10v10m20-10v10`} stroke="#90a8b4" strokeWidth="7" /></g>)}
      <path d="M20 81H534" stroke="#405563" strokeWidth="9" />
      <path d="M20 157H534" stroke="#405563" strokeWidth="2" />
      {[38,98,158,218,278,338,398,458].map((x,i) => <g key={x}>
        <rect x={x} y="94" width="48" height="53" rx="3" fill={i>5 ? '#214d59' : '#142733'} stroke={i>5 ? '#78d1d9' : '#688795'} strokeWidth="1.5" />
        {i<5 && <g><rect x={x+13} y="103" width="22" height="35" rx="6" fill="#6f8c9c" /><rect x={x+16} y="110" width="16" height="12" rx="2" fill="#1b303e" /></g>}
        {i>5 && <path d={`M${x+14} 120h20m-7-7 7 7-7 7`} fill="none" stroke="#b3f1ed" strokeWidth="2" />}
      </g>)}
      <path d="M30 189H527" stroke="#758590" strokeWidth="2" strokeDasharray="18 15" />
      <path d="M240 218h70m-10-6 10 6-10 6" fill="none" stroke="#9db6c3" strokeWidth="2" />
      <rect x="557" y="0" width="27" height="250" fill="#897a5e" opacity=".45" />
      <rect x="584" width="136" height="250" fill="#102d40" />
      <rect x="584" width="136" height="250" fill="url(#parking-water)" />
      <path d="M588 0q-10 35 0 70t0 70t0 70t0 40" fill="none" stroke="#b6cad0" opacity=".45" strokeWidth="2" />
    </svg>
    <div className="parking-legend"><span><i />General parking</span><span><i />Proposed delivery / rideshare spaces</span></div>
    <figcaption>Allocate a small number of spaces for short pickups near shops and restaurants.<span>Concept illustration · not a geographic map or an implemented layout</span></figcaption>
  </figure>;
}
