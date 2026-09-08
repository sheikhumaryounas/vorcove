import { Reveal } from "../hooks/useReveal.jsx";
import { SERVICES } from "../content.js";

export default function Services() {
  return (
    <section id="services" className="section">
      <div className="container">
        <Reveal>
          <p className="kicker">Services</p>
          <h2 className="section-h2">Three disciplines, one team, no translation layer.</h2>
        </Reveal>
        <div className="grid-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 120}>
              <article className="card card-lift">
                <span className="card-icon">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d={s.glyph} />
                  </svg>
                </span>
                <h3 className="card-title">{s.title}</h3>
                <p className="card-body">{s.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
