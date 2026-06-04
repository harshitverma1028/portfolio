import { useState } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaBars,
  FaTimes,
} from "react-icons/fa";

import portfolioData from "../data/portfolioData";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    {
      name: "About",
      href: "#about",
    },
    {
      name: "Skills",
      href: "#skills",
    },
    {
      name: "DSA",
      href: "#dsa",
    },
    {
      name: "Projects",
      href: "#projects",
    },
    {
      name: "Contact",
      href: "#contact",
    },
  ];

  return (
    <nav
      className="
      fixed
      top-0
      left-0
      w-full
      z-50
      bg-slate-950/70
      backdrop-blur-md
      border-b
      border-slate-800
    "
    >
      <div
        className="
        max-w-7xl
        mx-auto
        px-6
        py-4
        flex
        justify-between
        items-center
      "
      >
        <a
          href="#home"
          className="
          text-3xl
          font-bold
          gradient-text
        "
        >
          Harshit Verma
        </a>

        <div className="hidden md:flex gap-8 text-slate-300">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-cyan-400"
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="hidden md:flex gap-4">
          <a
            href={portfolioData.github}
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub size={24} />
          </a>

          <a
            href={portfolioData.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedin size={24} />
          </a>
        </div>

        <button
          className="md:hidden"
          onClick={() =>
            setIsOpen(!isOpen)
          }
        >
          {isOpen ? (
            <FaTimes size={24} />
          ) : (
            <FaBars size={24} />
          )}
        </button>
      </div>

      {isOpen && (
        <div
          className="
          md:hidden
          glass
          mx-4
          mb-4
          rounded-2xl
          p-5
        "
        >
          <div className="flex flex-col gap-4">

            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() =>
                  setIsOpen(false)
                }
                className="
                text-slate-300
                hover:text-cyan-400
              "
              >
                {link.name}
              </a>
            ))}

            <div className="flex gap-4 pt-4">

              <a
                href={portfolioData.github}
                target="_blank"
                rel="noreferrer"
              >
                <FaGithub size={22} />
              </a>

              <a
                href={portfolioData.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                <FaLinkedin size={22} />
              </a>

            </div>

          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;