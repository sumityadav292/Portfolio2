
import Navbar from "./component/Navbar.jsx";
import Hero from "./component/Hero.jsx";

const skills = [
  'HTML', 'CSS', 'JavaScript', 'React.js',
  'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB',
  'Git', 'GitHub', 'REST APIs', 'SQL',
]

const projects = [
  {
  title: 'Personal Portfolio Website',
  description: 'A Personal Portfolio Website built with React, Node.js and MongoDB.',
  stack: 'React · Tailwind CSS · JavaScript',
  demo: 'https://sumityadavportfolio1.netlify.app'
},
  {
    title: 'Weather App',
    description: 'A weather interface that displays information using an external API.',
    stack: 'React · JavaScript · API',
    demo: 'https://sumityadavproject.netlify.app/',
  },
  {
    title: 'Movie Clone',
    description: 'A movie discovery interface with a modern, responsive design.',
    stack: 'React · CSS · JavaScript',
    demo: 'https://movieclonesumit.vercel.app/',
  },
  {
    title: 'Battery Percentage App',
    description: 'A simple app that displays the battery percentage of your device.',
    stack: 'HTML · CSS · JavaScript',
    demo: 'https://batterypercentages.netlify.app/',
  },
  {
    title: 'Tribal-Haat',
    description: 'A tribal e-commerce website that allows users to buy and sell products.',
    stack: 'React · Tailwind CSS · JavaScript',
    demo: 'https://tribalyadavdemosumit.netlify.app/',
  }, 
  {
    title: 'Student Management System',
    description: 'A student management system that allows users to manage student data.',
    stack: 'HTML · CSS · JavaScript',
    demo: 'https://sumityadavproj.netlify.app/',
  }
]

function SectionHeading({ label, title, accent }) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{label}</p>
      <h2>
        {title} <span>{accent}</span>
      </h2>
    </div>
  )
}

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />

        <section id="about" className="page-section">
          <SectionHeading
  label={<span style={{ fontWeight: "bold", fontSize: "24px", color: "#16db8ce5" }}>01 / ABOUT ME</span>}
  title="Code with purpose."
  accent="Design with passion."
/>


          <p className="section-copy" style={{ fontWeight: "bold", fontSize: "20px" , color: '#5865F2' }}>
                  I am a web developer focused on building useful,
                   responsive and visually engaging digital experiences.
                   I enjoy working across frontend interfaces and backend APIs.
                </p>

        </section>

        <section id="skills" className="page-section">
          <SectionHeading
  label={<span style={{ fontWeight: "bold", fontSize: "24px" ,color: "#16db8ce5" }}>02 / MY TOOLKIT</span>}
  title="Technologies I"
  accent="work with."
/>

          <div className="skill-grid">
            {skills.map((skill) => (
              <div className="skill-card" key={skill}>
                <span className="skill-dot" />
                {skill}
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="page-section">
          <SectionHeading
  label={<span style={{ fontWeight: "bold", fontSize: "24px" ,color: "#16db8ce5" }}>03 / SELECTED WORK</span>}
  title="Ideas turned into"
  accent="projects."
/>

          <div className="project-grid">
            {projects.map((project, index) => (
              <article className="project-card" key={project.title}>
                <span className="project-number">
                  0{index + 1}
                </span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <span className="project-stack">{project.stack}</span>
                <a href={project.demo} target="_blank" rel="noreferrer">
                  Explore project ↗
                </a>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="page-section contact-section">
<SectionHeading
  label={<span style={{ fontWeight: "bold", fontSize: "24px", color: "#16db8ce5" }}>04 / GET IN TOUCH</span>}
  title="Have a project"
  accent="in mind?"
/>

          <p className="section-copy" style={{ fontWeight: "bold", fontSize: "20px", color: '#D16587' }}>
            Interested in working together? Let's talk about what we can build.
          </p>
          <a
  className="primary-button"
  href="https://mail.google.com/mail/?view=cm&fs=1&to=yadavsumit0199@gmail.com&su=Portfolio%20Inquiry&body=Hi%20Sumit,%20I%20am%20interested%20in%20your%20work%20and%20would%20like%20to%20connect!"
  target="_blank"
  rel="noopener noreferrer"
  style={{ marginRight: "50px" }}
>
  Email Me ↗
</a>                                 


          <a
  className="primary-button"
  href="https://www.linkedin.com/in/sumit8887y/"
  target="_blank"
  rel="noopener noreferrer"
  style={{ marginRight: "50px" }}
>
  Linkedin ↗
</a>

          <a className="primary-button" href="https://wa.me/918887905495"    target="_blank" rel="noopener noreferrer"  style={{ marginRight: "50px" }}> WhatsApp ↗</a>
          <a className="primary-button" href="https://github.com/sumityadav292/"  target="_blank" rel="noopener noreferrer"  style={{ marginRight: "50px" }}> GitHub ↗</a>
          <a className="primary-button" href="https://leetcode.com/u/Sumit63yadav/"  target="_blank" rel="noopener noreferrer"   style={{ marginRight: "50px" }}> LeetCode ↗</a>






        </section>
      </main>

      <footer className="footer">
        <a href="https://sumityadavportfolio1.netlify.app/"   target="_blank" rel="noopener noreferrer"  className="brand">༒☬Sumit Yadav☬༒<span>.</span></a>
        <p style={{ fontWeight: "bold", fontSize: "11px", textAlign: "center", marginLeft: "-220px", marginBottom: "-20px" }}>Designed & built by Sumit Yadav © {new Date().getFullYear()}</p>
        <a href="#home"  style={{ fontWeight: "bold", fontSize: "15px", marginBottom:"-5px" , color: '#D16587' }}>Back to top <b>⬆️</b></a>
      </footer>
    </>
  )
}