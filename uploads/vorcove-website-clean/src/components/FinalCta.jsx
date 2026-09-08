import { Reveal } from "../hooks/useReveal.jsx";
import { CONTACT_EMAIL } from "../content.js";

export default function FinalCta() {
  return (
    <section id="contact" className="section cta">
      <Reveal className="container cta-inner">
        <h2 className="cta-h2">Tell us where the revenue is stuck.</h2>
        <p className="cta-sub">
          Send a few lines about the problem. You'll hear back from an engineer, not a sales rep.
        </p>
        <a href={`mailto:${CONTACT_EMAIL}`} className="btn btn-solid btn-lift cta-btn">
          Start a project
        </a>
      </Reveal>
    </section>
  );
}
