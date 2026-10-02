import productSpaceLogo from "../assets/product-space-logo.png";
import elonTweetExample from "../assets/elon-tweet-example.png";

// ── Types ───────────────────────────────────────────────────────────────────
export interface TlItem {
  date: string;
  role: string;
  company: string;
  bullets: string[];
}

interface Project {
  tag: string;
  title: string;
  body: string[];
  meta: string;
  findings?: { value: string; label: string }[];
  exampleImage?: string;
  logo?: string;
  href?: string;
}

export interface Prediction {
  n: string;
  title: string;
  body: string;
  evidence: string;
  caveat: string;
  watch: string;
  sources: { label: string; href: string }[];
}

// ── Data ────────────────────────────────────────────────────────────────────
export const timeline: TlItem[] = [
  { date: "Jul 2026 · Present", role: "Senior Associate Product Manager", company: "PwC · Boca Raton, FL", bullets: ["Building an AI-powered client intelligence tool"] },
  { date: "Sep 2024 · Jul 2026", role: "Associate Product Manager", company: "PwC · Miami, FL", bullets: ["Supporting enterprise AI adoption and ChatGPT Enterprise’s then-largest contract"] },
  { date: "Jan 2023 · Dec 2023", role: "Founding Director", company: "Product Space @ UF", bullets: ["Helped establish the first Product Space chapter at the University of Florida."] },
  { date: "Jun 2023 · Aug 2023", role: "Product Management Intern", company: "PwC · Hallandale Beach, FL", bullets: ["Worked in Low Code Services, building internal automations with Microsoft Power Platform."] },
  { date: "Aug 2022 · Jan 2023", role: "Consulting Analyst", company: "City of Neptune Beach · Neptune Beach, FL", bullets: ["Developed parking and pricing strategy through a pro bono consulting engagement with UF AIS."] },
  { date: "Jun 2022 · Aug 2022", role: "Product Development Intern", company: "Merge · Startup · Unpaid internship", bullets: ["Outreach and app design for a credit card rewards product"] },
  { date: "2021 · 2022", role: "Recreation Associate", company: "Holiday Park · Fort Lauderdale, FL", bullets: ["Coached and refereed sports leagues and ran summer camp programming."] },
  { date: "2019 · 2021", role: "Kitchen Team", company: "Maya Papaya · Fort Lauderdale, FL", bullets: ["Worked the kitchen, made a lot of acai bowls, and learned that pace and consistency matter."] },
];

export const projects: Project[] = [
  {
    tag: "Personal Project · 2023",
    title: "Elon Sentiment Tracker",
    exampleImage: elonTweetExample,
    body: [
      "Elon's Twitter feed was a literal market-moving force. Single tweets swinging stock prices before most people saw the notification. Since I was invested in his companies, I wanted to stay ahead of the volatility rather than just reacting to it.",
      "Built a Python program using tweepy to monitor his feed 24/7. Each tweet was automatically passed through OpenAI GPT-3.5 to determine if the news was potentially good or bad for Tesla or SpaceX.",
    ],
    meta: "Stack: Python · Tweepy · OpenAI API  |  Status: Discontinued (API costs)",
  },
  {
    tag: "Pro Bono Consulting · UF",
    title: "Neptune Beach Parking Strategy",
    body: [
      "Pro bono consulting through the Association for Information Systems at UF, studying parking demand around the 160 available spaces at Beaches Town Center. My contribution focused on proposed parking-management solutions.",
      "Using Replica mobility data and the team’s Flowbird parking analysis, recommended demand-based parking rates and designated curbside spaces for delivery and rideshare. These were proposals to improve turnover and safety; implementation outcomes were not measured.",
    ],
    meta: "Sources: 2022 Replica & Flowbird data · Team deliverables: Excel citation dashboard, R Shiny visitor dashboard, research white paper",
    findings: [
      { value: "160", label: "Available spaces at Beaches Town Center" },
      { value: "90%", label: "Car-centric trips across Neptune Beach" },
    ],
  },
  {
    tag: "Community · University of Florida",
    title: "Product Space @ UF",
    logo: productSpaceLogo,
    href: "https://www.instagram.com/ufproductspace/",
    body: [
      "Served as a founding director of Product Space at UF, the university’s first product management club. At the time, PM wasn't even a known career path for students locally.",
      "Built curriculum from scratch, created a community, and watched it grow into one of the most competitive organizations on campus to get into.",
    ],
    meta: "Impact: First PM club at UF · Now highly competitive to join",
  },
];

export const predictions: Prediction[] = [
  {
    n: "builders",
    title: "The Job Title Matters Less",
    body: "My bet: more tech roles converge around a builder who can frame a problem, prototype a solution, and own delivery. AI makes crossing disciplines easier; judgment, stakeholder trust, and accountability become the differentiators.",
    evidence: "In a 2025 P&G experiment, individuals using AI matched two-person teams without it on product-innovation tasks. AI also helped commercial and technical specialists produce more balanced ideas.",
    caveat: "That tested ideation, not running a product end to end. It supports broader roles, not the disappearance of specialist expertise or job titles.",
    watch: "More hiring for end-to-end ownership, with specialist review where reliability and risk demand it.",
    sources: [{ label: "HBS / P&G field experiment · 2025", href: "https://aiinstitute.hbs.edu/the-cybernetic-teammate-how-ai-is-reshaping-collaboration-and-expertise-in-the-workplace/" }, { label: "ILO / Task transformation · 2025", href: "https://www.ilo.org/publications/generative-ai-and-jobs-refined-global-index-occupational-exposure" }]
  },
  {
    n: "expertise",
    title: "The Team Becomes a Project",
    body: "My bet: companies retain a core team but assemble more specialists around specific outcomes. As building gets easier, knowing which problem matters becomes more valuable. Deep domain knowledge, clear communication, and a record of delivery could become a stronger career asset than a permanent place in an org chart.",
    evidence: "Microsoft’s 2025 Work Trend Index proposes a similar model: teams forming around goals rather than functions, supported by AI agents.",
    caveat: "This is a vendor’s organizational hypothesis, not proof of a contractor economy. BLS counted independent contractors at 7.4% of US main jobs in July 2023; project-based work can also happen inside permanent employment.",
    watch: "Internal project staffing and repeat specialist engagements. Retention may depend more on the next meaningful problem than the next title.",
    sources: [{ label: "Microsoft / Work Trend Index · 2025", href: "https://www.microsoft.com/en-us/worklab/work-trend-index/2025-the-year-the-frontier-firm-is-born" }, { label: "BLS / Employment arrangements · July 2023", href: "https://www.bls.gov/news.release/conemp.nr0.htm" }]
  },
  {
    n: "physical",
    title: "Prestige Changes Collars",
    body: "My bet: skilled trades gain status and bargaining power as digital output becomes cheaper. There is an irony here: AI may make some desk tasks easier while increasing demand for the people who build and maintain its physical infrastructure.",
    evidence: "BLS projects 9% US electrician employment growth from 2025 to 2035, versus 3% across all occupations. It explicitly identifies AI-related electricity demand, data centers, and grid upgrades as sources of opportunity.",
    caveat: "Employment growth does not prove a prestige reversal. ILO research points to transformation, not wholesale replacement, of exposed jobs. Trade wages still depend on local demand, training, and bargaining power.",
    watch: "Apprenticeship demand, wage premiums, and hiring difficulty in electrical and infrastructure work relative to desk roles.",
    sources: [{ label: "BLS / Electricians outlook · 2025–2035", href: "https://www.bls.gov/ooh/construction-and-extraction/electricians.htm" }, { label: "ILO / Occupational exposure · 2025", href: "https://www.ilo.org/publications/generative-ai-and-jobs-refined-global-index-occupational-exposure" }]
  }
];
