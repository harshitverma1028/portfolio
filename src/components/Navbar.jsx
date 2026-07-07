import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaBars, FaTimes } from "react-icons/fa";
import portfolioData from "../data/portfolioData";

/* Same theme as Hero / Skills:
   bg #05070D   cyan #22D3EE   violet #9D7BFF                       */

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "DSA", href: "#dsa" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex justify-center px-4 pt-4">
      <motion.nav
        animate={{
          maxWidth: scrolled ? 880 : 1120,
          paddingTop: scrolled ? 8 : 14,
          paddingBottom: scrolled ? 8 : 14,
        }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="w-full rounded-full border backdrop-blur-xl px-6"
        style={{
          background: scrolled
            ? "rgba(10,13,22,0.75)"
            : "rgba(10,13,22,0.45)",
          borderColor: "rgba(34,211,238,0.15)",
          boxShadow: scrolled
            ? "0 8px 30px -12px rgba(34,211,238,0.25)"
            : "none",
        }}
      >
        <div className="flex justify-between items-center">
          <motion.a
            href="#home"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="text-2xl md:text-3xl font-bold gradient-text"
          >
            {portfolioData.name}
          </motion.a>

          <div className="hidden md:flex items-center gap-1 relative">
            {navLinks.map((link, i) => (
              <a
                key={link.name}
                href={link.href}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className="relative px-4 py-2 rounded-full text-slate-300 hover:text-cyan-300 transition-colors"
              >
                {hovered === i && (
                  <motion.div
                    layoutId="nav-hover-pill"
                    className="absolute inset-0 rounded-full -z-10"
                    style={{ background: "rgba(34,211,238,0.12)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <motion.a
              href={portfolioData.github}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.15, rotate: -8, color: "#22D3EE" }}
              whileTap={{ scale: 0.9 }}
              className="text-slate-300"
            >
              <FaGithub size={22} />
            </motion.a>
            <motion.a
              href={portfolioData.linkedin}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.15, rotate: 8, color: "#9D7BFF" }}
              whileTap={{ scale: 0.9 }}
              className="text-slate-300"
            >
              <FaLinkedin size={22} />
            </motion.a>
          </div>

          <motion.button
            whileTap={{ scale: 0.9 }}
            className="md:hidden text-slate-200"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="block"
                >
                  <FaTimes size={22} />
                </motion.span>
              ) : (
                <motion.span
                  key="bars"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="block"
                >
                  <FaBars size={22} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden glass fixed top-20 left-4 right-4 rounded-3xl p-5 border"
            style={{ borderColor: "rgba(34,211,238,0.15)" }}
          >
            <motion.div
              className="flex flex-col gap-1"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
              }}
            >
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  variants={{
                    hidden: { opacity: 0, x: -12 },
                    show: { opacity: 1, x: 0 },
                  }}
                  whileHover={{ x: 4 }}
                  className="px-3 py-2 rounded-xl text-slate-300 hover:text-cyan-300 hover:bg-cyan-500/5 transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}

              <motion.div
                variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
                className="flex gap-5 pt-4 mt-2 border-t border-slate-800 px-3"
              >
                <a href={portfolioData.github} target="_blank" rel="noreferrer" className="text-slate-300 hover:text-cyan-400">
                  <FaGithub size={22} />
                </a>
                <a href={portfolioData.linkedin} target="_blank" rel="noreferrer" className="text-slate-300 hover:text-violet-400">
                  <FaLinkedin size={22} />
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Navbar;
