const languages = [
  { code: 'EN', name: 'English', level: 'Native or bilingual' },
  { code: 'ES', name: 'Spanish', level: 'Limited working proficiency' },
  { code: 'TR', name: 'Turkish', level: 'Elementary proficiency' },
];

export default function ProfileHighlights() {
  return <section className="profile-highlights" aria-labelledby="profile-title">
    <div className="profile-heading"><p className="section-label">The next chapter</p><h2 id="profile-title">Where AI meets product.</h2></div>
    <div className="profile-feature">
      <div className="profile-practice">
        <p className="profile-kicker">In practice · PwC</p>
        <h3>Client intelligence.<br /><span>Built for people.</span></h3>
        <p>I build products that make it easier for client-facing teams to find and use client intelligence. The goal is simple: solve real problems with products people actually want to use.</p>
        <a href="#experience" className="profile-text-link">Follow my career <span aria-hidden="true">↗</span></a>
      </div>
      <article className="profile-certificate">
        <div className="certificate-orbits" aria-hidden="true"><i /><i /><i /><span>AI</span></div>
        <div className="certificate-copy"><p className="profile-kicker">Kellogg Executive Education</p><h3>AI &amp;<br />Product Strategy</h3><p>Advanced Certificate</p><span className="certificate-date">Issued September 2026</span></div>
      </article>
    </div>
    <div className="profile-foundation">
      <div><p className="section-label">The foundation</p><h3>University<br />of Florida</h3></div>
      <article><span className="degree-year">2024</span><h4>Master of Science</h4><p>Information Systems and Operations Management</p><span className="degree-detail">Concentration in Data Science</span></article>
      <article><span className="degree-year">2023</span><h4>Bachelor of Science</h4><p>Information Systems</p></article>
    </div>
    <div className="profile-personal">
      <div className="profile-languages"><p className="section-label">Across languages</p><div className="language-grid">{languages.map(language => <div key={language.code}><span className="language-code" aria-hidden="true">{language.code}</span><h4>{language.name}</h4><p>{language.level}</p></div>)}</div></div>
      <article className="profile-instructor"><p className="section-label">Beyond the screen</p><h3>On the mat.<br />Sharing the practice.</h3><p>Jiu-Jitsu instructor<br /><span>Gator Club Jiu-Jitsu · University of Florida</span></p></article>
    </div>
  </section>;
}
