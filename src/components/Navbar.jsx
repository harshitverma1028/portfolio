import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import portfolioData from "../data/portfolioData";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "DSA", href: "#dsa" },
  { name: "Projects", href: "#projects" },
  { name: "Certificates", href: "#certifications" },
  { name: "Contact", href: "#contact" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hovered, setHovered] = useState(null);

  return (
    <>
      {/* Desktop Navbar */}

      <header className="fixed top-0 left-0 w-full z-50">
        <div className="max-w-7xl mx-auto h-24 px-8 lg:px-12 flex items-center justify-between">

          {/* Logo */}

          <motion.a
            href="#home"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="text-3xl font-bold gradient-text select-none"
          >
            {portfolioData.name}
          </motion.a>

          {/* Navigation */}

          <nav className="hidden md:flex items-center relative gap-12">

            {navLinks.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
                className="relative py-2 text-[15px] font-medium tracking-wide text-white hover:text-cyan-400 transition-colors duration-300"
              >
                {item.name}

                {hovered === index && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute left-0 right-0 -bottom-1 h-[2px] rounded-full bg-cyan-400"
                    transition={{
                      type: "spring",
                      stiffness: 450,
                      damping: 32,
                    }}
                  />
                )}
              </motion.a>
            ))}

          </nav>

          {/* Social Icons */}

          <div className="hidden md:flex items-center gap-6">

            <motion.a
              href={portfolioData.github}
              target="_blank"
              rel="noreferrer"
              whileHover={{
                scale: 1.15,
                y: -3,
              }}
              whileTap={{ scale: 0.9 }}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <FaGithub size={22} />
            </motion.a>

            <motion.a
              href={portfolioData.linkedin}
              target="_blank"
              rel="noreferrer"
              whileHover={{
                scale: 1.15,
                y: -3,
              }}
              whileTap={{ scale: 0.9 }}
              className="text-slate-400 hover:text-[#0A66C2] transition-colors"
            >
              <FaLinkedin size={22} />
            </motion.a>

          </div>

          {/* Mobile Button */}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white"
          >
            {isOpen ? (
              <FaTimes size={24} />
            ) : (
              <FaBars size={24} />
            )}
          </button>

        </div>
      </header>

      {/* Mobile Menu */}

      <AnimatePresence>

        {isOpen && (

          <motion.div
            initial={{
              opacity: 0,
              y: -30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -30,
            }}
            transition={{
              duration: 0.25,
            }}
            className="fixed top-20 left-4 right-4 md:hidden rounded-3xl bg-[#0b1220]/95 backdrop-blur-xl border border-cyan-500/20 overflow-hidden z-40"
          >

            <div className="flex flex-col py-4">

              {navLinks.map((item) => (

                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  whileHover={{
                    x: 6,
                  }}
                  className="px-6 py-4 text-slate-300 hover:text-cyan-400 transition"
                >
                  {item.name}
                </motion.a>

              ))}

              <div className="border-t border-slate-700 mt-2 pt-5 px-6 flex gap-6">

                <motion.a
                  whileHover={{
                    scale: 1.15,
                  }}
                  href={portfolioData.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-400 hover:text-white"
                >
                  <FaGithub size={23} />
                </motion.a>

                <motion.a
                  whileHover={{
                    scale: 1.15,
                  }}
                  href={portfolioData.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-400 hover:text-[#0A66C2]"
                >
                  <FaLinkedin size={23} />
                </motion.a>

              </div>

            </div>

          </motion.div>

        )}

      </AnimatePresence>

    </>
  );
}

export default Navbar;