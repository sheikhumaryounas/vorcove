# Vorcove — website

Simple Vite + React site. Same design, scrolling, and animations as the
Lovable version — but a clean, minimal structure you can keep building on.

## Run it locally
    npm install
    npm run dev
Open the URL it prints (usually http://localhost:5173).

Other commands:
    npm run build     # production build into /dist
    npm run preview   # preview the production build

## Where things are
    index.html                  page shell + fonts + favicon
    src/main.jsx                React entry point
    src/App.jsx                 lists the page sections in order
    src/content.js              ← ALL TEXT: copy, services, stats, work, email
    src/styles.css              ← ALL DESIGN: colors + fonts at the top, then styles
    src/hooks/useReveal.jsx     scroll-reveal + parallax helpers
    src/components/             one file per section:
        Navbar.jsx  Hero.jsx  Services.jsx  Approach.jsx
        Work.jsx    FinalCta.jsx  Footer.jsx  Logo.jsx
    public/assets/v-mark.png    the logo mark

## How to change common things
- Edit any wording, service, stat, or work item → src/content.js
- Change colors or fonts → the :root block at the top of src/styles.css
- Add a new section:
    1. create src/components/MySection.jsx (copy Services.jsx as a template)
    2. import it in src/App.jsx and drop <MySection /> where you want it
- Replace the logo → swap public/assets/v-mark.png (keep the same name)
