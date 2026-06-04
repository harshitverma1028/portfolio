import { FaGithub, FaLinkedin } from "react-icons/fa";
import portfolioData from "../data/portfolioData";

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-slate-950/70 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <a
          href="#home"
          className="text-3xl font-bold gradient-text"
        >
          HV
        </a>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8 text-slate-300">

          <a
            href="#about"
            className="hover:text-cyan-400 transition"
          >
            About
          </a>

          <a
            href="#skills"
            className="hover:text-cyan-400 transition"
          >
            Skills
          </a>

          <a
            href="#projects"
            className="hover:text-cyan-400 transition"
          >
            Projects
          </a>

          <a
            href="#contact"
            className="hover:text-cyan-400 transition"
          >
            Contact
          </a>

        </div>

        {/* Socials */}
        <div className="flex items-center gap-4">

          <a
            href={portfolioData.github}
            target="_blank"
            rel="noreferrer"
            className="hover:text-cyan-400 transition"
          >
            <FaGithub size={24} />
          </a>

          <a
            href={portfolioData.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hover:text-cyan-400 transition"
          >
            <FaLinkedin size={24} />
          </a>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;