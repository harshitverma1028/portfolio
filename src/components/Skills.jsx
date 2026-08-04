import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

import {
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaGithub,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaDatabase,
  FaTools,
  FaCode,
  FaServer,
} from "react-icons/fa";

import {
  SiTailwindcss,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiPostgresql,
  SiVite,
  SiPostman,
  SiSocketdotio,
  SiTypescript,
  SiRedux,
  SiDocker,
} from "react-icons/si";

import portfolioData from "../data/portfolioData";


const SKILL_ICONS = {
  react: FaReact,
  "react.js": FaReact,
  reactjs: FaReact,

  javascript: FaJs,
  js: FaJs,

  typescript: SiTypescript,
  ts: SiTypescript,

  html: FaHtml5,
  html5: FaHtml5,

  css: FaCss3Alt,
  css3: FaCss3Alt,

  tailwind: SiTailwindcss,
  "tailwind css": SiTailwindcss,
  tailwindcss: SiTailwindcss,

  node: FaNodeJs,
  "node.js": FaNodeJs,
  nodejs: FaNodeJs,

  express: SiExpress,
  "express.js": SiExpress,
  expressjs: SiExpress,

  mongodb: SiMongodb,
  mongo: SiMongodb,

  mysql: SiMysql,
  postgresql: SiPostgresql,
  postgres: SiPostgresql,

  git: FaGitAlt,
  github: FaGithub,

  vite: SiVite,
  postman: SiPostman,

  "socket.io": SiSocketdotio,
  socketio: SiSocketdotio,

  redux: SiRedux,
  docker: SiDocker,
};


const CARD_CONFIG = [
  {
    key: "frontend",
    title: "Frontend",
    description: "Interfaces & experiences",
    icon: FaCode,
    accent: "#22D3EE",
  },

  {
    key: "backend",
    title: "Backend",
    description: "APIs & server systems",
    icon: FaServer,
    accent: "#A78BFA",
  },

  {
    key: "database",
    title: "Database",
    description: "Data & persistence",
    icon: FaDatabase,
    accent: "#34D399",
  },

  {
    key: "tools",
    title: "Tools",
    description: "Development workflow",
    icon: FaTools,
    accent: "#F59E0B",
  },
];



function SkillItem({ skill, accent }) {
  const normalizedSkill = skill.toLowerCase().trim();

  const Icon =
    SKILL_ICONS[normalizedSkill] ||
    FaCode;

  return (
    <div
      className="
        group/skill
        flex
        items-center
        gap-2
        rounded-lg
        border
        border-white/[0.055]
        bg-white/[0.025]
        px-2.5
        py-2
        transition-all
        duration-200
        hover:-translate-y-[1px]
        hover:border-white/[0.12]
        hover:bg-white/[0.05]
      "
    >
      <Icon
        className="
          shrink-0
          text-[15px]
          transition-transform
          duration-200
          group-hover/skill:scale-110
        "
        style={{ color: accent }}
      />

      <span
        className="
          min-w-0
          truncate
          text-[11px]
          font-medium
          text-slate-400
          transition-colors
          group-hover/skill:text-slate-200
        "
      >
        {skill}
      </span>
    </div>
  );
}



function SkillCard({
  section,
  index,
  reduceMotion,
}) {
  const CategoryIcon = section.icon;

  return (
    <motion.div
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              y: 20,
            }
      }
      whileInView={
        reduceMotion
          ? undefined
          : {
              opacity: 1,
              y: 0,
            }
      }
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.45,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        group
        relative
        overflow-hidden
        rounded-2xl
        border
        border-white/[0.07]
        bg-[#090D15]
        p-5
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-white/[0.14]
        sm:p-6
      "
    >


      <div
        className="
          pointer-events-none
          absolute
          left-[15%]
          top-0
          h-px
          w-[70%]
          opacity-50
          blur-[0.5px]
          transition-all
          duration-500
          group-hover:left-[5%]
          group-hover:w-[90%]
          group-hover:opacity-100
        "
        style={{
          background: `linear-gradient(
            90deg,
            transparent,
            ${section.accent},
            transparent
          )`,
        }}
      />



      <div
        className="
          pointer-events-none
          absolute
          -right-16
          -top-16
          h-36
          w-36
          rounded-full
          opacity-[0.04]
          blur-3xl
          transition-opacity
          duration-500
          group-hover:opacity-[0.09]
        "
        style={{
          background: section.accent,
        }}
      />



      <div className="relative mb-5 flex items-center">
        <div
          className="
            mr-3
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            border
          "
          style={{
            color: section.accent,
            borderColor: `${section.accent}25`,
            background: `${section.accent}09`,
          }}
        >
          <CategoryIcon className="text-base" />
        </div>

        <div>
          <h3 className="text-[16px] font-semibold text-slate-100">
            {section.title}
          </h3>

          <p className="mt-0.5 text-[10px] text-slate-600">
            {section.description}
          </p>
        </div>

        <span
          className="
            ml-auto
            font-mono
            text-[9px]
            tracking-widest
          "
          style={{
            color: `${section.accent}80`,
          }}
        >
          0{index + 1}
        </span>
      </div>



      <div className="mb-4 h-px bg-white/[0.055]" />



      <div className="grid grid-cols-2 gap-2">
        {section.skills.map((skill) => (
          <SkillItem
            key={skill}
            skill={skill}
            accent={section.accent}
          />
        ))}
      </div>



      <div className="mt-5 flex items-center gap-2">
        <div
          className="h-1.5 w-1.5 rounded-full"
          style={{
            background: section.accent,
            boxShadow: `0 0 7px ${section.accent}`,
          }}
        />

        <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-slate-700">
          {section.skills.length} technologies
        </span>

        <div className="ml-auto h-px w-8 bg-white/[0.06]" />
      </div>
    </motion.div>
  );
}



function Skills() {
  const reduceMotion = useReducedMotion();

  const sections = useMemo(
    () =>
      CARD_CONFIG.map((config) => ({
        ...config,
        skills:
          portfolioData.skills[config.key] ||
          [],
      })),
    []
  );

  return (
    <section
      id="skills"
      className="
        relative
        overflow-hidden
        bg-[#05070D]
        px-4
        py-24
        sm:px-6
        md:py-28
      "
    >


      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.018]
        "
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(148,163,184,0.6) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(148,163,184,0.6) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "50px 50px",
        }}
      />



      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-0
          h-[350px]
          w-[700px]
          max-w-full
          -translate-x-1/2
        "
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(34,211,238,0.055), transparent 65%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl">


        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 15,
                }
          }
          whileInView={
            reduceMotion
              ? undefined
              : {
                  opacity: 1,
                  y: 0,
                }
          }
          viewport={{ once: true }}
          transition={{
            duration: 0.45,
          }}
          className="mb-12 text-center"
        >

          <div className="mb-3 flex items-center justify-center gap-3">

            <span className="h-px w-7 bg-cyan-400/30" />

            <span
              className="
                font-mono
                text-[9px]
                uppercase
                tracking-[0.3em]
                text-cyan-400/60
              "
            >
              Technical Stack
            </span>

            <span className="h-px w-7 bg-cyan-400/30" />

          </div>

          <h2
            className="
              text-3xl
              font-bold
              tracking-tight
              text-white
              sm:text-4xl
              md:text-5xl
            "
            style={{
              fontFamily:
                "'Space Grotesk', sans-serif",
            }}
          >
            Skills &{" "}

            <span
              className="
                bg-gradient-to-r
                from-cyan-300
                via-cyan-400
                to-violet-400
                bg-clip-text
                text-transparent
              "
            >
              Technologies
            </span>

          </h2>

          <p
            className="
              mx-auto
              mt-4
              max-w-lg
              text-sm
              leading-6
              text-slate-500
            "
          >
            Technologies and tools I use to build
            modern, scalable and reliable applications.
          </p>

        </motion.div>

        <div
          className="
            grid
            grid-cols-1
            gap-4
            md:grid-cols-2
            md:gap-5
          "
        >
          {sections.map((section, index) => (
            <SkillCard
              key={section.key}
              section={section}
              index={index}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

export default Skills;