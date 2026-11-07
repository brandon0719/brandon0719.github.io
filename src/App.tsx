import { useCallback, useState } from 'react'
import CursorRing from './components/CursorRing'
import DayOff from './components/DayOff'
import ParticleStage from './components/ParticleStage'
import Reveal from './components/Reveal'
import Rise from './components/Rise'
import Scramble from './components/Scramble'
import { content } from './content'
import { magnet, spotlight } from './pointerEffects'
import { tenure } from './tenure'

const IDLE_WORK_TEXT = 'Projects'

export default function App() {
  const [nameReady, setNameReady] = useState(false)
  const [workText, setWorkText] = useState(IDLE_WORK_TEXT)
  const onNameReady = useCallback(() => setNameReady(true), [])

  return (
    <>
      <div className="scroll-progress" aria-hidden="true" />
      <header className="site-header">
        <span>(c)2026</span>
        <nav aria-label="Main">
          <a className="u" href="#work">
            <Scramble text="work" />
          </a>
          <a className="u" href="#experience">
            <Scramble text="experience" />
          </a>
          <a className="u" href="#about">
            <Scramble text="about" />
          </a>
          <a className="u" href="#contact">
            <Scramble text="contact" />
          </a>
        </nav>
      </header>

      <main>
        <section className="hero">
          <ParticleStage text={content.name} onReady={onNameReady} />
          <h1 className={nameReady ? "sr-only" : "hero-name"}>
            {content.name}
          </h1>
          <a className="scroll-hint" href="#about">
            scroll
          </a>
        </section>

        <section className="about" id="about">
          <p className="label">
            <Scramble text="(about)" />
          </p>
          <div className="about-body">
            <p className="about-lead">
              <Rise text={content.intro} />
            </p>
            <dl className="facts">
              {content.facts.map((fact, i) => (
                <Reveal className="fact" index={i} key={fact.label}>
                  <dt>
                    <Scramble text={fact.label} />
                  </dt>
                  <dd>{fact.value}</dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </section>

        <section className="work" id="work">
          <h2 className="sr-only">Work</h2>
          <div className="work-stage">
            <ParticleStage text={workText} />
          </div>
          <ol
            className="rows"
            onPointerLeave={() => setWorkText(IDLE_WORK_TEXT)}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget))
                setWorkText(IDLE_WORK_TEXT);
            }}>
            {content.projects.map((project, i) => (
              <Reveal as="li" index={i} key={project.name}>
                <a
                  className="row"
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  onPointerEnter={(e) => {
                    if (e.pointerType === "mouse") setWorkText(project.name);
                  }}
                  onFocus={() => setWorkText(project.name)}>
                  <span className="row-num">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="row-name">{project.name}</span>
                  <span className="row-note">{project.note}</span>
                  <span className="row-year">{project.year}</span>
                  <span className="row-arrow" aria-hidden="true">
                    →
                  </span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </Reveal>
            ))}
          </ol>
        </section>

        <DayOff
          lead={content.dayOff.lead}
          activities={content.dayOff.activities}
        />

        <section className="experience" id="experience">
          <h2 className="label">
            <Scramble text="(experience)" />
          </h2>
          <ol className="jobs">
            {content.experience.map((job, i) => (
              <Reveal
                as="li"
                className="job"
                index={i}
                key={`${job.company} ${job.role}`}
                onPointerMove={spotlight}>
                <h3 className="job-company">
                  <Rise text={job.company} />
                </h3>
                <p className="job-dates">
                  <Scramble text={job.dates} />
                </p>
                <p className="job-role">{job.role}</p>
                <p className="job-location">{job.location}</p>
                <p className="job-tenure">
                  <Scramble text={tenure(job.dates)} />
                </p>
                {job.note && <p className="job-note">{job.note}</p>}
              </Reveal>
            ))}
          </ol>
        </section>

        <section className="contact" id="contact">
          <p className="label">
            <Scramble text="(contact)" />
          </p>
          <Reveal className="contact-email">
            <span className="contact-kind">
              <Scramble text="email" />
            </span>
            <a
              className="u contact-link"
              href={`mailto:${content.email}`}
              {...magnet(0.05)}>
              <Rise text={content.email} />
            </a>
          </Reveal>
          <ul className="socials">
            {content.socials.map((social, i) => (
              <Reveal as="li" index={i + 1} key={social.label}>
                <a
                  className="u"
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  {...magnet(0.35)}>
                  <Scramble text={social.label} />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </Reveal>
            ))}
          </ul>
        </section>
      </main>

      <CursorRing />
    </>
  );
}
