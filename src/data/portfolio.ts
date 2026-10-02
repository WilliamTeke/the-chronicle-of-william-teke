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

interface Prediction {
  n: string;
  title: string;
  body: string;
  bullets: string[];
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
    "n": "builders",
    "title": "The Job Title Disappears",
    "body": "My bet: product manager, designer, and software engineer eventually collapse into one role: builder. As AI makes implementation more accessible, the distinction between who defines, designs, and builds the product starts to matter less than who delivers it.",
    "bullets": [
      "A simpler ladder: entry, mid, senior. Advancement reflects the scope of problems you can own, not a growing collection of titles.",
      "Everyone owns the full loop: find the right problem, talk to stakeholders, build, ship, and learn from the result.",
      "The skills still matter. I think the permanent boundaries between the jobs will matter much less."
    ]
  },
  {
    "n": "expertise",
    "title": "The Company Becomes a Project",
    "body": "My bet: more careers start to resemble a portfolio of projects rather than a permanent seat at one company. If AI covers more of the build phase, the person worth bringing in is the one who deeply understands the specific problem. Niche expertise becomes more valuable than being a generalist who can operate the tools.",
    "bullets": [
      "Teams assemble around a problem, deliver, and re-form. Even employees may work more like contractors.",
      "What you study matters differently: domain knowledge shapes the questions you ask, the tradeoffs you notice, and how clearly you explain them.",
      "Retention becomes a harder question. Companies may have to win people back with each project through meaningful work, trust, and ownership."
    ]
  },
  {
    "n": "physical",
    "title": "Prestige Changes Collars",
    "body": "I think the status gap between white-collar and blue-collar work could reverse. As more desk work is automated or compressed, skilled physical work may become the harder capability to replace. The person who can diagnose and fix something in the real world could command more prestige than the person with the impressive office title.",
    "bullets": [
      "Some knowledge workers may spread their time across several jobs or clients as AI reduces the effort each requires.",
      "An electrician, technician, or craftsperson still has to show up. Physical presence limits how many jobs can be done at once.",
      "My bet depends on timing: reliable robotics for varied, complex environments takes longer than automating digital workflows."
    ]
  }
];

