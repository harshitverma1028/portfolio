import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import DSA from "../components/DSA";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

import BackgroundGlow from "../components/BackgroundGlow";
import CustomCursor from "../components/CustomCursor";
import ParticlesBackground from "../components/ParticlesBackground";
import GitHubActivity from "../components/GitHubActivity";
import Certifications from "../components/Certifications";

function Home() {
  return (
    <>
      <ParticlesBackground />

      <CustomCursor />


      <BackgroundGlow />

      <Navbar />

      <main>
        <Hero />

        <About />

        <Skills />

        <DSA />

        <Projects />

        <Certifications />

        <GitHubActivity />

        <Contact />
      </main>

      <Footer />
    </>
  );
}

export default Home;