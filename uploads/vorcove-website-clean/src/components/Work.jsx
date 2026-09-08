import { Reveal } from "../hooks/useReveal.jsx";
import { WORK } from "../content.js";

export default function Work() {
  return (
    <section id="work" className="section section-surface">
      <div className="container">
        <Reveal>
          <p className="kicker">Work</p>
          <h2 className="section-h2">Shipped software, measured in outcomes.</h2>
        </Reveal>
        <div className="grid-2">
          {WORK.map((item, i) => (
            <Reveal key={item.title} delay={i * 110}>
              <article className="card card-lift">
                <span className="tag">{item.tag}</span>
                <h3 className="card-title">{item.title}</h3>
                <p className="card-body">{item.result}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
