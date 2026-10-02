export function linkAcademicOrganizations(text: string) {
  return text.split(/(Association for Information Systems at UF|UF AIS)/g).map((part, index) =>
    part === "UF AIS" || part === "Association for Information Systems at UF"
      ? <a key={index} className="academic-link" href="https://www.ufais.org/" target="_blank" rel="noreferrer">{part}</a>
      : part
  );
}

