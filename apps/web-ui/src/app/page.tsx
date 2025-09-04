import Header from '@/components/Header';
import HeaderMenu from '@/components/HeaderMenu';
import RevealProvider from '@/components/RevealProvider';
import { csn } from '@/utils/class.utils';
import Image from 'next/image';
import styles from './page.module.css';
import { technologies } from './technologies';

const sections = {
  hero: 'hero',
  services: 'services',
  technologies: 'technologies',
  about: 'about',
  contact: 'contact',
} as const;

const EMAIL = 'viktor.livar.o@gmail.com';

export default function Home() {
  return (
    <RevealProvider>
      <div className={styles.page}>
        <Header className={styles.header}>
          <div className={styles['header-content']}>
            <div className={styles['header-title-container']}>
              <h3>Viktor Livar</h3>
              <h4 className={styles['header-subtitle']}>
                Full-Stack MVP Development & Fractional CTO
              </h4>
            </div>
            <div className={styles['contact-now-button-header-container']}>
              <button className={styles['contact-now-button']}>Contact Now</button>
            </div>

            <div className={styles.navigation}>
              <a href={`#${sections.services}`}>Services</a>
              <a href={`#${sections.about}`}>About</a>
              <a href={`#${sections.contact}`}>Contact</a>
            </div>

            <HeaderMenu rootClassName={styles['header-menu-root']}>
              <div className={styles['header-menu-content']}>
                <a href={`#${sections.services}`}>Services</a>
                <a href={`#${sections.about}`}>About</a>
                <a href={`#${sections.contact}`}>Contact</a>
                <button className={styles['contact-now-button']}>Start a Conversation</button>
              </div>
            </HeaderMenu>
          </div>
        </Header>

        <main className={styles.main} data-reveal>
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

          <div className={styles['hero-section-separator-line']} />

          <section id={sections.services} className={styles['section-content']}>
            <h2 data-reveal>Services</h2>

            <div className={styles['service-container']} data-reveal>
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

            <div className={styles['service-container']} data-reveal>
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

            <div className={styles['service-container']} data-reveal>
              <h4>Technical Advisory & Hiring Support:</h4>
              <p className={styles['service-container-summary']}>
                Expert consulting services including architecture reviews, codebase
                evaluations, and technical hiring support.
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
            <h2 data-reveal>Technologies</h2>

            <div className={styles['technologies-container']}>
              {technologies.map((item) => (
                <div
                  key={item.name}
                  className={csn(
                    styles['technologies-item'],
                    item.isBig && styles['technologies-big-item'],
                  )}
                  data-reveal
                >
                  <div className={styles['technologies-item-image-container']}>
                    <Image src={item.image} alt={item.name} fill />
                  </div>
                  <div className={styles['technologies-item-name']}>{item.name}</div>
                </div>
              ))}
            </div>
          </section>

          <div className={styles['section-separator-line']} />

          <section id={sections.about} className={styles['section-content']}>
            <h2 className={styles['about-section-title']} data-reveal>
              About Viktor Livar
            </h2>

            <div className={styles['about-section-content-container']}>
              <Image
                src="/viktorlivar.png"
                alt="Viktor Livar"
                data-reveal
                width={32}
                height={32}
              />

              <div className={styles['about-section-text-container']}>
                <p data-reveal>
                  Viktor Livar is a seasoned software architect and startup technology advisor
                  with over a decade of experience leading engineering teams. <br />
                  Specializing in AWS, Node.js, React, and PostgreSQL, Viktor has built
                  scalable solutions for startups across fintech and SaaS sectors.
                </p>
                <p data-reveal>
                  His approach combines hands-on development, strategic technical leadership,
                  and practical advice—helping founders turn their ideas into robust,
                  market-ready products.
                </p>
              </div>
            </div>
          </section>

          <div className={styles['section-separator-line']} />

          <section id={sections.contact} className={styles['section-content']}>
            <h2 data-reveal>Get in Touch</h2>

            <div className={styles['contact-section-container']}>
              <p className={styles['contact-section-main-text']} data-reveal>
                Ready to discuss your MVP or need strategic technical guidance?
              </p>

              <button
                className={csn(
                  styles['contact-now-button'],
                  styles['contact-section-contact-now-button'],
                )}
                data-reveal
              >
                Start a Conversation
              </button>

              <p className={styles['contact-section-contact-now-subtext']} data-reveal>
                Viktor typically responds within 24 hours.
              </p>
            </div>
          </section>
        </main>

        <footer className={styles.footer}>
          <div className={styles['footer-content-container']}>
            <h4>© 2025 Viktor Livar • Full-Stack MVP Development & Fractional CTO</h4>
            <h5>AWS • Node.js • React • PostgreSQL</h5>

            <div>
              <a href={`mailto:${EMAIL}`} className={styles['footer-email']}>
                {EMAIL}
              </a>
            </div>

            <div className={styles['social-media-group']}>
              <a
                href="https://www.linkedin.com/in/viktor-livar-72024a93"
                target="_blank"
                className={styles['social-media-item']}
              >
                <Image src="icons/linkedin.svg" alt="linkedin" width={32} height={32} />
              </a>
              <a
                href="https://x.com/Viktor21663863"
                target="_blank"
                className={styles['social-media-item']}
              >
                <Image src="icons/x.svg" alt="x" width={32} height={32} />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </RevealProvider>
  );
}
