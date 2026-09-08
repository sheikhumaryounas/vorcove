import Logo from "./Logo.jsx";
import { NAV, SERVICES, CONTACT_EMAIL } from "../content.js";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Logo inverted />
          <p className="footer-tag">AI-powered software, designed and built by the two people you talk to.</p>
        </div>
        <div>
          <p className="footer-head">Studio</p>
          <ul>{NAV.map((i) => <li key={i.href}><a href={i.href}>{i.label}</a></li>)}</ul>
        </div>
        <div>
          <p className="footer-head">Capabilities</p>
          <ul>{SERVICES.map((s) => <li key={s.title}>{s.title}</li>)}</ul>
        </div>
        <div>
          <p className="footer-head">Contact</p>
          <ul>
            <li><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></li>
            <li>Remote · US &amp; EU hours</li>
          </ul>
        </div>
      </div>
      <div className="container">
        <p className="footer-bottom">© {new Date().getFullYear()} Vorcove. All rights reserved.</p>
      </div>
    </footer>
  );
}
