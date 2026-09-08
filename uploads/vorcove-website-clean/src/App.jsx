import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Services from "./components/Services.jsx";
import Approach from "./components/Approach.jsx";
import Work from "./components/Work.jsx";
import FinalCta from "./components/FinalCta.jsx";
import Footer from "./components/Footer.jsx";

// The whole page is just these sections stacked in order.
// To add a new section: make a file in src/components/, then drop it in here.
export default function App() {
  return (
    <div className="page">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Approach />
        <Work />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
