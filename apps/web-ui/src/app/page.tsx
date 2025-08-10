import { csn } from '@/utils/class.utils';
import styles from './page.module.css';
import Header from '@/components/Header';

const sections = {
  hero: 'hero',
  services: 'services',
  technologies: 'technologies',
  about: 'about',
  contact: 'contact',
} as const;

export default function Home() {
  return (
    <div className={styles.page}>
      <Header className={styles.header}>
        <div className={styles['header-content']}>
          <div className={styles['header-title-container']}>
            <h3>Viktor Livar</h3>
            <h4 className={styles['header-subtitle']}>
              Full-Stack MVP Development & Fractional CTO
            </h4>
          </div>
          <div className={styles['contact-now-button-container']}>
            <button className={styles['contact-now-button']}>Contact Now</button>
          </div>
          <div className={styles.navigation}>
            <a href={`#${sections.services}`}>Services</a>
            <a href={`#${sections.about}`}>About</a>
            <a href={`#${sections.contact}`}>Contact</a>
          </div>
        </div>
      </Header>

      <main className={styles.main}>
        <section id={sections.hero} className={styles['hero-section']}>
          <div className={styles['hero-section-content-wrapper']}>
            <div className={styles['section-content']}>
              <h1>Viktor Livar</h1>
              <h3>Rapid MVP Development for Early-Stage Startups</h3>
              <h4>
                Hands-on full-stack expertise to take your idea from concept to market-ready
                MVP quickly and efficiently.
              </h4>
            </div>
          </div>
        </section>

        <section id={sections.services} className={styles['section-content']}>
          <h2>Services</h2>

          <div className={styles['service-container']}>
            <h4>MVP Development:</h4>
            <p className={styles['service-container-summary']}>
              Rapid, hands-on development of Minimum Viable Products for solo founders and
              early-stage startups.
            </p>
            <p>
              Viktor personally handles the entire MVP creation process — from technical
              planning and architecture through development, testing, and deployment —
              specializing in AWS, Node.js, React, and PostgreSQL to ensure your product
              launches quickly, effectively, and ready to scale.
            </p>
          </div>

          <div className={styles['service-container']}>
            <h4>Fractional CTO Services:</h4>
            <p className={styles['service-container-summary']}>
              Part-time, strategic technical leadership tailored for early-stage startups.
            </p>
            <p>
              Viktor provides expert guidance on technology decisions, roadmap planning, team
              mentoring, and establishing robust engineering practices, offering startups
              flexible access to CTO-level expertise without the overhead of a full-time
              executive.
            </p>
          </div>

          <div className={styles['service-container']}>
            <h4>Technical Advisory & Hiring Support:</h4>
            <p className={styles['service-container-summary']}>
              Expert consulting services including architecture reviews, codebase evaluations,
              and technical hiring support.
            </p>
            <p>
              Viktor helps founders identify, evaluate, and onboard strong technical talent,
              implement effective engineering processes, and ensures your technical decisions
              support your long-term business goals.
            </p>
          </div>
        </section>

        <div className={styles['section-separator-line']} />

        <section id={sections.technologies} className={styles['section-content']}>
          <h2>Technologies</h2>

          <div className={styles['technologies-container']}>
            <div className={csn(styles['technologies-item'], styles['technologies-big-item'])}>
              AWS
            </div>
            <div className={csn(styles['technologies-item'], styles['technologies-big-item'])}>
              NodeJS
            </div>
            <div className={csn(styles['technologies-item'], styles['technologies-big-item'])}>
              React
            </div>
            <div className={csn(styles['technologies-item'], styles['technologies-big-item'])}>
              PostgreSQL
            </div>
            <div className={styles['technologies-item']}>TS</div>
            <div className={styles['technologies-item']}>JS</div>
            <div className={styles['technologies-item']}>Go</div>
            <div className={styles['technologies-item']}>MUI</div>
            <div className={styles['technologies-item']}>Redux</div>
            <div className={styles['technologies-item']}>GraphQL</div>
            <div className={styles['technologies-item']}>Serverless</div>
            <div className={styles['technologies-item']}>Apollo</div>
          </div>
        </section>

        <div className={styles['section-separator-line']} />

        <section id={sections.about} className={styles['section-content']}>
          <h2>About Viktor Livar</h2>

          <div>
            <p>
              Viktor Livar is a seasoned software architect and startup technology advisor with
              over a decade of experience leading engineering teams. Specializing in AWS,
              Node.js, React, and PostgreSQL,
            </p>
            <br />
            <p>
              Viktor has built scalable solutions for startups across fintech and SaaS sectors.
              His approach combines hands-on development, strategic technical leadership, and
              practical advice—helping founders turn their ideas into robust, market-ready
              products.
            </p>
          </div>
        </section>

        <div className={styles['section-separator-line']} />

        <section id={sections.contact} className={styles['section-content']}>
          <h2>Get in Touch</h2>
          <p>Ready to discuss your MVP or need strategic technical guidance?</p>

          <ul>
            <li>Email: viktor.livar.o@gmail.com</li>
            <li>LinkedIn: [LinkedIn Profile Link]</li>
          </ul>
        </section>
      </main>

      <footer className={styles.footer}>
        <h4>© 2025 Viktor Livar • Full-Stack MVP Development & Fractional CTO</h4>
        <h6>AWS • Node.js • React • PostgreSQL</h6>
        <br />
        <a href="">Email: viktor.livar.o@gmail.com</a>
        <a href="">LinkedIn: [your profile]</a>
      </footer>
    </div>
  );
}
