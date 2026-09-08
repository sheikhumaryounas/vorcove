import { useState } from "react";
import Logo from "./Logo.jsx";
import { useScrollY } from "../hooks/useReveal.jsx";
import { NAV } from "../content.js";

export default function Navbar() {
  const y = useScrollY();
  const stuck = y > 80;            // add frosted background after scrolling
  const [open, setOpen] = useState(false);

  return (
    <header className={`nav ${stuck ? "nav-stuck" : ""}`}>
      <div className="nav-inner">
        <a href="#top" className="nav-logo"><Logo /></a>

        <nav className="nav-links">
          {NAV.map((item) => (
            <a key={item.href} href={item.href}>{item.label}</a>
          ))}
          <a href="#contact" className="btn btn-solid btn-lift">Start a project</a>
        </nav>

        <button
          className="nav-toggle"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6">
            {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 8h16M4 16h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="nav-mobile">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</a>
          ))}
          <a href="#contact" className="btn btn-solid" onClick={() => setOpen(false)}>Start a project</a>
        </nav>
      )}
    </header>
  );
}
