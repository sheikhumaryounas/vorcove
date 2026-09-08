import { Reveal, useScrollY } from "../hooks/useReveal.jsx";

export default function Hero() {
  const y = useScrollY();
  return (
    <section id="top" className="hero">
      <div className="hero-grid">
        <div>
          <Reveal>
            <span className="pill"><span className="pill-dot" />Two engineers. One accountable team.</span>
          </Reveal>
          <Reveal delay={90}>
            <h1 className="hero-h1">
              Products that <span className="underline-mark">grow your revenue</span>, built and shipped.
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="hero-sub">
              Vorcove is a small, sharp software studio designing AI-powered products for US and EU
              businesses — from first demo to production.
            </p>
          </Reveal>
          <Reveal delay={270}>
            <div className="hero-cta">
              <a href="#contact" className="btn btn-solid btn-lift">Start a project</a>
              <a href="#work" className="btn btn-ghost btn-lift">See the work</a>
            </div>
          </Reveal>
        </div>

        <div className="hero-mark-wrap">
          <div className="float-mark" style={{ transform: `translateY(${Math.min(y, 600) * -0.06}px)` }}>
            <img src="/assets/v-mark.png" alt="" className="hero-mark" />
          </div>
        </div>
      </div>

      <Reveal delay={120} className="hero-strip-wrap">
        <div className="hero-strip">
          {["AI & automation", "Full-stack product", "Data & ML", "Shipped, not pitched"].map((item, i) => (
            <span key={item} className="hero-strip-item">
              {i > 0 && <span className="dot">·</span>}
              {item}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
