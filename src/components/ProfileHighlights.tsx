import jiuJitsuVideo from "../assets/jiu-jitsu.mp4";
import jiuJitsuPoster from "../assets/jiu-jitsu-poster.jpg";

const languages = [
  { code: 'EN', name: 'English', level: 'Native or bilingual' },
  { code: 'ES', name: 'Spanish', level: 'Limited working proficiency' },
  { code: 'TR', name: 'Turkish', level: 'Elementary proficiency' },
];

export default function ProfileHighlights() {
  return <section className="profile-highlights" aria-label="Education and personal interests">
    <div className="education-heading"><p className="section-label">Education &amp; continued learning</p><span>Rooted in Florida. Still learning.</span></div>
    <div className="education-grid">
      <article className="education-uf">
        <div className="campus-photo uf-photo">
          <img src="https://dermatology.med.ufl.edu/wordpress/files/2023/02/tower-600x400.jpg" alt="Century Tower and trees on the University of Florida campus" loading="lazy" width="600" height="400" />
          <div className="campus-title"><span className="campus-eyebrow">Gainesville, Florida</span><h3>University of Florida</h3></div>
          <span className="school-monogram" aria-hidden="true">UF</span>
        </div>
        <div className="uf-degrees">
          <div><span className="education-year">2024 · Graduate</span><h4><a className="academic-link" href="https://warrington.ufl.edu/graduate/masters-information-systems-operations-management-data-science/" target="_blank" rel="noreferrer">Master of Science <span aria-hidden="true">↗</span></a></h4><p>Information Systems and Operations Management</p><span className="education-concentration">Data Science concentration</span></div>
          <div><span className="education-year">2023 · Undergraduate</span><h4><a className="academic-link" href="https://catalog.ufl.edu/UGRD/colleges-schools/UGBUS/IST_BSBA/" target="_blank" rel="noreferrer">Bachelor of Science <span aria-hidden="true">↗</span></a></h4><p>Information Systems</p></div>
        </div>
        <a className="campus-credit" href="https://dermatology.med.ufl.edu/recruitment/" target="_blank" rel="noreferrer">Campus photo · University of Florida ↗</a>
      </article>
      <article className="education-northwestern">
        <div className="campus-photo northwestern-photo">
          <img src="https://www.kellogg.northwestern.edu/-/media/images/web2022/the-experience/locations/evanston/evanston-updated-slideshow/05-evanston-984x728.jpg?hash=6434FB54D705978907484D31A67F7012&rev=8f3a76007327443f8d5d3c040fefa792&sc_lang=en" alt="Kellogg Global Hub beside Lake Michigan at Northwestern University" loading="lazy" width="984" height="728" />
          <span className="certificate-badge">Executive certificate</span>
        </div>
        <div className="northwestern-detail"><p className="education-school">Northwestern University</p><p className="education-provider">Kellogg Executive Education</p><h4><a className="academic-link" href="https://execedcertificate.kellogg.northwestern.edu/19288249-6c58-4e15-b3ff-927cc2716cba#acc.a9eVtizg" target="_blank" rel="noopener noreferrer" aria-label="View Kellogg AI and Product Strategy certificate (opens in a new tab)">AI &amp; Product Strategy <span aria-hidden="true">↗</span></a></h4><p className="education-certificate-name">Advanced Certificate · September 2026</p></div>
        <a className="campus-credit" href="https://www.kellogg.northwestern.edu/the-experience/campuses/evanston/" target="_blank" rel="noreferrer">Campus photo · Kellogg ↗</a>
      </article>
    </div>
    <div className="profile-personal">
      <div className="profile-languages"><p className="section-label">Across languages</p><div className="language-grid">{languages.map(language => <div key={language.code}><span className="language-code" aria-hidden="true">{language.code}</span><div className="language-detail"><h4>{language.name}</h4><p>{language.level}</p></div></div>)}</div></div>
      <article className="profile-instructor"><div className="instructor-copy"><p className="section-label">Beyond the screen</p><h3>On the mat.<br />Sharing the practice.</h3><p>Jiu-Jitsu instructor<br /><span><a href="https://www.instagram.com/gatorbjj/?hl=en" target="_blank" rel="noopener noreferrer" aria-label="Gator Club Jiu-Jitsu on Instagram (opens in a new tab)" style={{ textDecoration: "underline", textUnderlineOffset: 4 }}>Gator Club Jiu-Jitsu ↗</a> · University of Florida</span></p></div><video className="jiu-jitsu-video" controls muted playsInline loop preload="none" poster={jiuJitsuPoster} width="540" height="960" aria-label="Jiu-Jitsu training video, without audio"><source src={jiuJitsuVideo} type="video/mp4" />Your browser does not support video playback.</video></article>
    </div>
  </section>;
}
