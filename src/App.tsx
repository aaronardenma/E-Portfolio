import { useEffect, useRef, useState } from "react";
import logo from "../assets/Site Logo.svg";
import resume from "../assets/Aaron Ma_Resume.pdf";
import semiCircle from "../assets/semi circle.svg";
import circle from "../assets/circle.svg";
import squiggly from "../assets/squiggly.svg";
import triangle from "../assets/triangle.svg";
import trailmate from "../assets/trailmate.png";
import calmCorners from "../assets/calmCorners.png";
import netflix from "../assets/netflix logo.jpeg";
import gamePartyFinder from "../assets/game party finder.png";
import maternalClassifier from "../assets/maternal classifier model.png";

interface ProjectLink {
  label: string;
  href: string;
}

interface FeaturedProjectData {
  number: string;
  name: string;
  type: string;
  description: string;
  features: string[];
  stack: string;
  image: string;
  alt: string;
  primaryLink: string;
  links: ProjectLink[];
}

interface SupportingProjectData {
  name: string;
  type: string;
  description: string;
  features: string[];
  stack: string;
  image?: string;
  alt?: string;
  href?: string;
  customMedia?: boolean;
}

const featuredProjects: FeaturedProjectData[] = [
  {
    number: "01",
    name: "Netflix Wrapped",
    type: "Data product · Full stack",
    description: "A personal analytics app that transforms Netflix viewing history into meaningful trends, visual stories, and recommendations.",
    features: [
      "Interactive yearly recaps generated from Netflix viewing-history uploads",
      "Hybrid content recommender using TF-IDF, cosine similarity, recency, and user feedback",
      "Asynchronous CSV processing with Redis and RQ for responsive initial results",
    ],
    stack: "React · Django · PostgreSQL · D3.js · scikit-learn",
    image: netflix,
    alt: "Netflix Wrapped project artwork",
    primaryLink: "https://github.com/aaronardenma/Netflix-wrapped",
    links: [{ label: "View project", href: "https://github.com/aaronardenma/Netflix-wrapped" }],
  },
  {
    number: "02",
    name: "Trailmate",
    type: "Full-stack product · 2025",
    description: "A hiking planner that helps people discover trails and prepare around weather, difficulty, gear, and live hazard reports.",
    features: [
      "Trail discovery with search filters, dynamic routing, and shared Redux state",
      "Live maps, forecasts, directions, and location-based hazard reporting",
      "JWT authentication, tested REST APIs, and a Dockerized full-stack setup",
    ],
    stack: "React · Express · MongoDB · Google Maps · Docker",
    image: trailmate,
    alt: "Trailmate hiking planner interface showing nearby trails and route details",
    primaryLink: "https://github.com/aaronardenma/Trailmate",
    links: [{ label: "View project", href: "https://github.com/aaronardenma/Trailmate" }],
  },
];

const supportingProjects: SupportingProjectData[] = [
  {
    name: "Calm Corners",
    type: "Community utility · Hackathon",
    description: "A crowdsourced noise-level tracker that makes it easier to find the right library, café, or study spot in real time.",
    features: [
      "Interactive Google Map with colour-coded noise markers",
      "Crowdsourced reviews with real-time noise-level updates",
      "MongoDB models and REST endpoints for places and submissions",
    ],
    stack: "React · TypeScript · Node · MongoDB · Google Maps",
    image: calmCorners,
    alt: "Calm Corners map interface with colour-coded study space noise levels",
    href: "https://devpost.com/software/calmcorners",
  },
  {
    name: "Welldo",
    type: "Wellness · Database systems",
    description: "A mental-health activity app that recommends helpful routines based on how a person feels.",
    features: [
      "Mood-based preset and personalized activity recommendations",
      "Relational Oracle schema with analytical SQL queries",
      "Authenticated, responsive React experience backed by Express",
    ],
    stack: "React · Express · Oracle · SQL",
    customMedia: true,
  },
  {
    name: "Game Party Finder",
    type: "Desktop application",
    description: "A Java desktop app for finding other players, built with test-driven development and local persistence.",
    features: [
      "Player and party matching through a desktop Swing interface",
      "Local JSON persistence for saved party data",
      "JUnit coverage developed with test-driven design principles",
    ],
    stack: "Java · Swing · JUnit · JSON",
    image: gamePartyFinder,
    alt: "Game Party Finder desktop application interface",
    href: "https://github.com/aaronardenma/Game-Party-Finder",
  },
  {
    name: "Maternal Health Classifier",
    type: "Machine learning · Research",
    description: "A k-nearest-neighbours model that classifies maternal health risk with 82% test accuracy.",
    features: [
      "K-nearest-neighbours classification across six health factors",
      "Cross-validation that reached 82% accuracy and 88% precision",
      "Exploratory risk visualizations built with ggplot2 and tidyverse",
    ],
    stack: "R · tidyverse · ggplot2 · kknn",
    image: maternalClassifier,
    alt: "Maternal health risk model data visualizations",
    href: "https://github.com/aaronardenma/dsci-100-2023w1-group-41",
  },
];

interface HeaderProps {
  darkMode: boolean;
  onThemeToggle: () => void;
}

function Header({ darkMode, onThemeToggle }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.classList.remove("menu-open");
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  return (
    <header className={`site-header${scrolled ? " scrolled" : ""}`} aria-label="Main navigation">
      <a className="brand" href="#top" aria-label="Aaron Ma, home" onClick={() => setMenuOpen(false)}>
        <img src={logo} alt="" />
        <span>Aaron Ma</span>
      </a>
      <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="site-nav" onClick={() => setMenuOpen((open) => !open)}>
        <span></span><span></span>
        <span className="sr-only">{menuOpen ? "Close" : "Open"} navigation</span>
      </button>
      <nav id="site-nav">
        <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
        <a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a>
        <a href="#contact" onClick={() => setMenuOpen(false)}>Connect</a>
        <a href={resume} target="_blank" rel="noreferrer">Resume <span aria-hidden="true">↗</span></a>
        <button className="theme-toggle" type="button" aria-label={`Switch to ${darkMode ? "light" : "dark"} theme`} title="Switch theme" onClick={onThemeToggle}>
          <span className="theme-icon" aria-hidden="true">{darkMode ? "☾" : "☼"}</span>
        </button>
      </nav>
    </header>
  );
}

function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const shapeRefs = useRef<Array<HTMLImageElement | null>>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const hero = heroRef.current;
    if (!hero) return;

    const moveShapes = (event: PointerEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 22;
      const y = (event.clientY / window.innerHeight - 0.5) * 22;
      shapeRefs.current.forEach((shape) => {
        if (!shape) return;
        const speed = Number(shape.dataset.speed);
        shape.style.translate = `${x * speed}px ${y * speed}px`;
      });
    };

    hero.addEventListener("pointermove", moveShapes);
    return () => hero.removeEventListener("pointermove", moveShapes);
  }, []);

  const shapes: Array<[string, number]> = [
    [semiCircle, -0.7],
    [circle, 0.45],
    [squiggly, -0.35],
    [triangle, 0.6],
  ];

  return (
    <section className="hero" id="top" aria-labelledby="hero-title" ref={heroRef}>
      <div className="hero-shapes" aria-hidden="true">
        {shapes.map(([src, speed], index) => (
          <img key={src} src={src} alt="" data-speed={speed} ref={(element) => { shapeRefs.current[index] = element; }} />
        ))}
      </div>
      <div className="hero-copy reveal">
        <p className="eyebrow"><span></span> Vancouver, BC · Open to opportunities</p>
        <h1 id="hero-title">Hey, I’m <em>Aaron.</em></h1>
        <p className="hero-intro">A software engineer who builds thoughtful digital products at the intersection of <strong>people, data, and code.</strong></p>
        <div className="hero-actions">
          <a className="button button-primary" href="#about">More about me <span aria-hidden="true">↓</span></a>
          <a className="text-link" href="mailto:aaronardenma@gmail.com">aaronardenma@gmail.com <span aria-hidden="true">↗</span></a>
        </div>
      </div>
      <a className="scroll-cue" href="#about" aria-label="Scroll to about Aaron"><span>Scroll to about</span><i aria-hidden="true"></i></a>
    </section>
  );
}

interface FeaturedProjectProps {
  project: FeaturedProjectData;
  reverse: boolean;
}

function FeaturedProject({ project, reverse }: FeaturedProjectProps) {
  return (
    <article className={`project-card project-featured${reverse ? " project-reverse" : ""} reveal`}>
      <a className="project-media" href={project.primaryLink} target="_blank" rel="noreferrer" aria-label={`View ${project.name}`}>
        <img src={project.image} alt={project.alt} />
        <span className="project-number">{project.number}</span>
        <span className="project-open" aria-hidden="true">↗</span>
      </a>
      <div className="project-copy">
        <div><p className="project-type">{project.type}</p><h3>{project.name}</h3></div>
        <div>
          <p>{project.description}</p>
          <ul className="project-features">
            {project.features.map((feature) => <li key={feature}>{feature}</li>)}
          </ul>
          <p className="project-stack">{project.stack}</p>
          <div className="project-links">
            {project.links.map((link) => <a className="project-link" href={link.href} target="_blank" rel="noreferrer" key={link.href}>{link.label} ↗</a>)}
          </div>
        </div>
      </div>
    </article>
  );
}

interface SupportingProjectProps {
  project: SupportingProjectData;
}

function SupportingProject({ project }: SupportingProjectProps) {
  const media = project.customMedia ? (
    <div className="small-media small-media-welldo"><div className="wordmark">WELL<span>DO</span></div><span aria-hidden="true">04</span></div>
  ) : (
    <a className="small-media" href={project.href} target="_blank" rel="noreferrer">
      <img src={project.image} alt={project.alt} /><span aria-hidden="true">↗</span>
    </a>
  );

  return (
    <article className="project-small reveal">
      {media}
      <p className="project-type">{project.type}</p>
      <h3>{project.name}</h3>
      <p>{project.description}</p>
      <ul className="project-features">
        {project.features.map((feature) => <li key={feature}>{feature}</li>)}
      </ul>
      <p className="project-stack">{project.stack}</p>
    </article>
  );
}

function Work() {
  return (
    <section className="work section" id="projects" aria-labelledby="projects-title">
      <div className="section-heading reveal">
        <div><p className="section-kicker">03 / Selected work</p><h2 id="projects-title">A few things I’ve built.</h2></div>
        <p>Selected full-stack and data projects, built from first question to working product.</p>
      </div>
      <div className="projects">
        {featuredProjects.map((project, index) => <FeaturedProject project={project} reverse={index % 2 === 1} key={project.name} />)}
        <div className="project-grid">
          {supportingProjects.map((project) => <SupportingProject project={project} key={project.name} />)}
        </div>
      </div>
    </section>
  );
}

function About() {
  const skills: Array<[string, string]> = [
    ["Frontend", "React, TypeScript, JavaScript, Tailwind"],
    ["Backend", "Node, Express, Django, REST APIs"],
    ["Data", "PostgreSQL, MongoDB, Oracle, R"],
    ["Tools", "Git, Docker, Mocha, JUnit"],
  ];

  return (
    <section className="about section" id="about" aria-labelledby="about-title">
      <div className="about-title reveal"><p className="section-kicker">02 / About</p><h2 id="about-title">About <em>me.</em></h2></div>
      <div className="about-copy reveal">
        <p className="about-lead">I’m pursuing a second degree in Computer Science at UBC after studying Psychology and Commerce—an uncommon mix that shapes how I build.</p>
        <p>Across my work, I care about asking better questions, making complex systems feel clear, and shipping things people can actually use.</p>
        <a className="button button-outline" href={resume} target="_blank" rel="noreferrer">Read my resume <span aria-hidden="true">↗</span></a>
      </div>
      <div className="experience reveal">
        <div className="experience-intro">
          <p className="section-kicker">Experience</p>
          <h3>Recent roles.</h3>
        </div>
        <div className="experience-list">
          <article className="experience-item">
            <div>
              <span>2026 — Present</span>
              <h4>Apera AI</h4>
              <p>Full-Stack Software Development Engineer Intern</p>
            </div>
            <p>Built React, TypeScript, and Three.js tools for robot playback and analytics; designed Flask APIs and Python/AWS migration workflows; and expanded automated coverage across the React and Flask test suites.</p>
          </article>
          <article className="experience-item">
            <div>
              <span>2025 — 2026</span>
              <h4>SS&amp;C Technologies</h4>
              <p>Software Engineer Intern</p>
            </div>
            <p>Developed 20+ Angular and TypeScript components, built NgRx and RxJS state workflows, integrated REST APIs, and delivered 75+ frontend and backend features and fixes in an Agile team.</p>
          </article>
          <article className="experience-item">
            <div>
              <span>2022 — 2023</span>
              <h4>SAP</h4>
              <p>Customer Success Marketing &amp; Communications Specialist Intern</p>
            </div>
            <p>Automated pandas and NumPy data workflows to reduce manual processing by 98%, led a customer-success dashboard that cut data availability lag by 50%, and added pytest validation with technical documentation.</p>
          </article>
        </div>
      </div>
      <div className="skills reveal">
        {skills.map(([title, items], index) => <div key={title}><span>0{index + 1}</span><p><strong>{title}</strong>{items}</p></div>)}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact section" id="contact" aria-labelledby="contact-title">
      <div className="contact-shape" aria-hidden="true"></div>
      <p className="section-kicker reveal">04 / Let’s connect</p>
      <div className="contact-main reveal">
        <h2 id="contact-title">Interested in <em>connecting?</em></h2>
        <a href="mailto:aaronardenma@gmail.com" aria-label="Email Aaron Ma">Contact me <span aria-hidden="true">↗</span></a>
      </div>
      <div className="contact-footer reveal">
        <p>Based in Vancouver, BC</p>
        <div>
          <a href="https://github.com/aaronardenma" target="_blank" rel="noreferrer">GitHub ↗</a>
          <a href="https://www.linkedin.com/in/aaronardenma/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
        </div>
        <p>© {new Date().getFullYear()} Aaron Ma</p>
      </div>
    </section>
  );
}

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem("portfolio-theme");
    return savedTheme ? savedTheme === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    document.body.classList.toggle("dark-theme", darkMode);
    localStorage.setItem("portfolio-theme", darkMode ? "dark" : "light");
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", darkMode ? "#0f1420" : "#f6f7fb");
  }, [darkMode]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -30px" });
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header darkMode={darkMode} onThemeToggle={() => setDarkMode((dark) => !dark)} />
      <main id="main"><Hero /><About /><Work /><Contact /></main>
    </>
  );
}
