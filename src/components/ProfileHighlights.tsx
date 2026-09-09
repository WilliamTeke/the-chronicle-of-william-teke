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
    </div>
    <div className="education-heading"><p className="section-label">Education &amp; continued learning</p><span>Rooted in Florida. Still learning.</span></div>
    <div className="education-grid">
      <article className="education-uf">
        <div className="campus-photo uf-photo">
          <img src="https://dermatology.med.ufl.edu/wordpress/files/2023/02/tower-600x400.jpg" alt="Century Tower and trees on the University of Florida campus" loading="lazy" width="600" height="400" />
          <div className="campus-title"><span className="campus-eyebrow">Gainesville, Florida</span><h3>University of Florida</h3></div>
          <span className="school-monogram" aria-hidden="true">UF</span>
        </div>
        <div className="uf-degrees">
          <div><span className="education-year">2024 · Graduate</span><h4>Master of Science</h4><p>Information Systems and Operations Management</p><span className="education-concentration">Data Science concentration</span></div>
          <div><span className="education-year">2023 · Undergraduate</span><h4>Bachelor of Science</h4><p>Information Systems</p></div>
        </div>
        <a className="campus-credit" href="https://dermatology.med.ufl.edu/recruitment/" target="_blank" rel="noreferrer">Campus photo · University of Florida ↗</a>
      </article>
      <article className="education-northwestern">
        <div className="campus-photo northwestern-photo">
          <img src="https://www.kellogg.northwestern.edu/-/media/images/web2022/the-experience/locations/evanston/evanston-updated-slideshow/05-evanston-984x728.jpg?hash=6434FB54D705978907484D31A67F7012&rev=8f3a76007327443f8d5d3c040fefa792&sc_lang=en" alt="Kellogg Global Hub beside Lake Michigan at Northwestern University" loading="lazy" width="984" height="728" />
          <span className="certificate-badge">Executive certificate</span>
        </div>
        <div className="northwestern-detail"><p className="education-school">Northwestern University</p><p className="education-provider">Kellogg Executive Education</p><h4>AI &amp; Product Strategy</h4><p className="education-certificate-name">Advanced Certificate · September 2026</p></div>
        <a className="campus-credit" href="https://www.kellogg.northwestern.edu/the-experience/campuses/evanston/" target="_blank" rel="noreferrer">Campus photo · Kellogg ↗</a>
      </article>
    </div>
    <div className="profile-personal">
      <div className="profile-languages"><p className="section-label">Across languages</p><div className="language-grid">{languages.map(language => <div key={language.code}><span className="language-code" aria-hidden="true">{language.code}</span><h4>{language.name}</h4><p>{language.level}</p></div>)}</div></div>
      <article className="profile-instructor"><p className="section-label">Beyond the screen</p><h3>On the mat.<br />Sharing the practice.</h3><p>Jiu-Jitsu instructor<br /><span>Gator Club Jiu-Jitsu · University of Florida</span></p></article>
    </div>
  </section>;
}
