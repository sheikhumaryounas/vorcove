// ─────────────────────────────────────────────────────────────
//  ALL WEBSITE TEXT LIVES HERE.
//  Edit copy, services, stats, and work items in this one file —
//  no need to touch the component code.
// ─────────────────────────────────────────────────────────────

export const NAV = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Approach", href: "#approach" },
  { label: "Contact", href: "#contact" },
];

export const SERVICES = [
  {
    title: "AI & automation",
    body: "Agents, copilots and workflow automation wired into the systems your team already uses — so hours come back and margins move.",
    // glyph = the SVG path drawn inside the icon tile
    glyph: "M12 3v3m0 12v3M3 12h3m12 0h3M6.3 6.3l2.1 2.1m7.2 7.2 2.1 2.1m0-11.4-2.1 2.1m-7.2 7.2-2.1 2.1M12 8.5A3.5 3.5 0 1 0 12 15.5a3.5 3.5 0 0 0 0-7Z",
  },
  {
    title: "Product engineering",
    body: "Full-stack products built end to end: interface, backend, infrastructure. Two senior engineers, no handoffs, weekly shipping.",
    glyph: "M4 6h16M4 12h10M4 18h7m6-3 4 3-4 3",
  },
  {
    title: "Data & ML",
    body: "Pipelines, models and dashboards that turn the data you already own into pricing, retention and forecasting decisions.",
    glyph: "M4 19V9m5 10V5m5 14v-7m5 7V8",
  },
];

export const STATS = [
  { value: "2wk", label: "to your first working demo" },
  { value: "100%", label: "direct access to the builders" },
  { value: "0", label: "middlemen, account layers, handoffs" },
];

export const WORK = [
  { tag: "AI operations", title: "Support triage copilot", result: "Cut first-response time from 9 hours to 11 minutes across 4 markets." },
  { tag: "Revenue tooling", title: "Dynamic pricing engine", result: "Lifted gross margin 7.4% in one quarter on the same traffic." },
  { tag: "Product", title: "B2B onboarding platform", result: "Doubled activation and removed 30 hours of manual setup per week." },
  { tag: "Data & ML", title: "Churn forecasting suite", result: "Flagged 82% of at-risk accounts a full billing cycle early." },
];

export const CONTACT_EMAIL = "hello@vorcove.com";
