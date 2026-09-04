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

const featuredProjects = [
  {
    number: "01",
    name: "Trailmate",
    type: "Full-stack product · 2025",
    description: "A hiking planner that helps people discover trails and prepare around weather, difficulty, gear, and live hazard reports.",
    stack: "React · Express · MongoDB · Google Maps · Docker",
    image: trailmate,
    alt: "Trailmate hiking planner interface showing nearby trails and route details",
    primaryLink: "https://github.com/aaronardenma/Trailmate",
    links: [{ label: "View project", href: "https://github.com/aaronardenma/Trailmate" }],
  },
  {
    number: "02",
    name: "Calm Corners",
    type: "Community utility · Hackathon",
    description: "A crowdsourced noise-level tracker that makes it easier to find the right library, café, or study spot in real time.",
    stack: "React · TypeScript · Node · MongoDB · Google Maps",
    image: calmCorners,
    alt: "Calm Corners map interface with colour-coded study space noise levels",
    primaryLink: "https://devpost.com/software/calmcorners",
    links: [
      { label: "GitHub", href: "https://github.com/aaronardenma/CalmCorners" },
      { label: "Devpost", href: "https://devpost.com/software/calmcorners" },
    ],
  },
];

const supportingProjects = [
  {
    name: "Netflix Wrapped",
    type: "Data visualization · Full stack",
    description: "Turns viewing-history data into personal trends, visual stories, and recommendations.",
    stack: "React · Django · PostgreSQL · D3.js",
    image: netflix,
    alt: "Netflix Wrapped project artwork",
    href: "https://github.com/aaronardenma/Netflix-wrapped",
  },
  {
    name: "Welldo",
    type: "Wellness · Database systems",
    description: "A mental-health activity app that recommends helpful routines based on how a person feels.",
    stack: "React · Express · Oracle · SQL",
    customMedia: true,
  },
  {
    name: "Game Party Finder",
    type: "Desktop application",
    description: "A Java desktop app for finding other players, built with test-driven development and local persistence.",
    stack: "Java · Swing · JUnit · JSON",
    image: gamePartyFinder,
    alt: "Game Party Finder desktop application interface",
    href: "https://github.com/aaronardenma/Game-Party-Finder",
  },
  {
    name: "Maternal Health Classifier",
    type: "Machine learning · Research",
    description: "A k-nearest-neighbours model that classifies maternal health risk with 82% test accuracy.",
    stack: "R · tidyverse · ggplot2 · kknn",
    image: maternalClassifier,
    alt: "Maternal health risk model data visualizations",
    href: "https://github.com/aaronardenma/dsci-100-2023w1-group-41",
  },
];

function Header({ darkMode, onThemeToggle }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    const closeOnEscape = (event) => event.key === "Escape" && setMenuOpen(false);
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
        <a href="#work" onClick={() => setMenuOpen(false)}>Work</a>
        <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
        <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        <a href={resume} target="_blank" rel="noreferrer">Résumé <span aria-hidden="true">↗</span></a>
        <button className="theme-toggle" type="button" aria-label={`Switch to ${darkMode ? "light" : "dark"} theme`} title="Switch theme" onClick={onThemeToggle}>
          <span className="theme-icon" aria-hidden="true">{darkMode ? "☾" : "☼"}</span>
        </button>
      </nav>
    </header>
  );
}

function Hero() {
  const heroRef = useRef(null);
  const shapeRefs = useRef([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const hero = heroRef.current;
    const moveShapes = (event) => {
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

  const shapes = [
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
          <a className="button button-primary" href="#work">Explore my work <span aria-hidden="true">↓</span></a>
          <a className="text-link" href="mailto:aaronardenma@gmail.com">aaronardenma@gmail.com <span aria-hidden="true">↗</span></a>
        </div>
      </div>
      <aside className="hero-note reveal" aria-label="A short introduction">
        <p className="note-index">01 / HELLO</p>
        <p className="note-main">Curious by nature.<br />Practical by design.</p>
        <p className="note-detail">Computer Science at UBC, with roots in psychology and commerce. I like turning fuzzy problems into useful, human software.</p>
        <div className="note-links">
          <a href="https://github.com/aaronardenma" target="_blank" rel="noreferrer">GitHub ↗</a>
          <a href="https://www.linkedin.com/in/aaronardenma/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
        </div>
      </aside>
      <a className="scroll-cue" href="#work" aria-label="Scroll to selected work"><span>Scroll to work</span><i aria-hidden="true"></i></a>
    </section>
  );
}

function FeaturedProject({ project, reverse }) {
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
          <p className="project-stack">{project.stack}</p>
          <div className="project-links">
            {project.links.map((link) => <a className="project-link" href={link.href} target="_blank" rel="noreferrer" key={link.href}>{link.label} ↗</a>)}
          </div>
        </div>
      </div>
    </article>
  );
}

function SupportingProject({ project, index }) {
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
      <p className="project-stack">{project.stack}</p>
    </article>
  );
}

function Work() {
  return (
    <section className="work section" id="work" aria-labelledby="work-title">
      <div className="section-heading reveal">
        <div><p className="section-kicker">02 / Selected work</p><h2 id="work-title">Ideas, made useful.</h2></div>
        <p>Full-stack products shaped by real-world needs—from safer hikes to calmer study spaces.</p>
      </div>
      <div className="projects">
        {featuredProjects.map((project, index) => <FeaturedProject project={project} reverse={index % 2 === 1} key={project.name} />)}
        <div className="project-grid">
          {supportingProjects.map((project, index) => <SupportingProject project={project} index={index} key={project.name} />)}
        </div>
      </div>
    </section>
  );
}

function About() {
  const skills = [
    ["Frontend", "React, TypeScript, JavaScript, Tailwind"],
    ["Backend", "Node, Express, Django, REST APIs"],
    ["Data", "PostgreSQL, MongoDB, Oracle, R"],
    ["Tools", "Git, Docker, Mocha, JUnit"],
  ];

  return (
    <section className="about section" id="about" aria-labelledby="about-title">
      <div className="about-title reveal"><p className="section-kicker">03 / About</p><h2 id="about-title">Built from<br /><em>different angles.</em></h2></div>
      <div className="about-copy reveal">
        <p className="about-lead">I’m pursuing a second degree in Computer Science at UBC after studying Psychology and Commerce—an uncommon mix that shapes how I build.</p>
        <p>At SAP, I built data workflows and led the development of a customer-success events dashboard for internal sales teams. Across my work, I care about asking better questions, making complex systems feel clear, and shipping things people can actually use.</p>
        <a className="button button-outline" href={resume} target="_blank" rel="noreferrer">Read my résumé <span aria-hidden="true">↗</span></a>
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
        <h2 id="contact-title">Have a problem worth <em>solving?</em></h2>
        <a href="mailto:aaronardenma@gmail.com" aria-label="Email Aaron Ma">Let’s talk <span aria-hidden="true">↗</span></a>
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
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("portfolio-theme");
    return savedTheme ? savedTheme === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    document.body.classList.toggle("dark-theme", darkMode);
    localStorage.setItem("portfolio-theme", darkMode ? "dark" : "light");
    document.querySelector('meta[name="theme-color"]').setAttribute("content", darkMode ? "#0f1420" : "#f6f7fb");
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
      <main id="main"><Hero /><Work /><About /><Contact /></main>
    </>
  );
}
