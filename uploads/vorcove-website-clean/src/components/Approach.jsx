import { Reveal } from "../hooks/useReveal.jsx";
import { STATS } from "../content.js";

export default function Approach() {
  return (
    <section id="approach" className="section-tight">
      <Reveal className="container">
        <div className="band">
          <img src="/assets/v-mark.png" alt="" className="band-watermark" />
          <div className="band-copy">
            <p className="kicker on-dark-muted">Approach</p>
            <h2 className="band-h2">We don't pitch. We build a piece of it first.</h2>
            <p className="band-sub">
              Instead of a deck and a discovery phase, you get something running in your hands early
              — then we scale what proves out.
            </p>
          </div>
          <div className="stats">
            {STATS.map((stat, i) => (
              <Reveal key={stat.value} delay={i * 130}>
                <div className="stat">
                  <p className="stat-num">{stat.value}</p>
                  <p className="stat-label">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
