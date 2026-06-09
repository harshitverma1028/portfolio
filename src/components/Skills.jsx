import { motion } from "framer-motion";
import portfolioData from "../data/portfolioData";

function Skills() {
  const skillSections = [
    {
      title: "Frontend",
      skills: portfolioData.skills.frontend,
    },
    {
      title: "Backend",
      skills: portfolioData.skills.backend,
    },
    {
      title: "Database",
      skills: portfolioData.skills.database,
    },
    {
      title: "Tools",
      skills: portfolioData.skills.tools,
    },
  ];

  return (
    <section
      id="skills"
      className="py-28 px-4 md:px-6"
    >
      <div className="max-w-7xl mx-auto">

        <h2 className="text-center text-5xl font-bold gradient-text mb-24">
          Tech Stack Journey
        </h2>

        <div className="relative">

          {skillSections.map((section, index) => (
            <div
              key={section.title}
              className={`
  relative
  flex
  ${
    index === skillSections.length - 1
      ? "mb-0"
      : "mb-16"
  }
  ${
    index % 2 === 0
      ? "justify-end"
      : "justify-start"
  }
`}
            >
              <motion.div
                initial={{
                  opacity: 0,
                  x:
                    index % 2 === 0
                      ? 100
                      : -100,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.6,
                }}
                whileHover={{
                  y: -10,
                  scale: 1.03,
                }}
                className="
                relative
                w-full
                md:w-125
                glass
                rounded-[30px]
                p-8
                border
                border-cyan-500/10
                z-10
              "
              >
                <h3 className="text-3xl font-bold mb-6 text-cyan-400">
                  {section.title}
                </h3>

                <div className="flex flex-wrap gap-3">
                  {section.skills.map((skill) => (
                    <motion.span
                      key={skill}
                      whileHover={{
                        scale: 1.08,
                      }}
                      className="
                      px-4
                      py-2
                      rounded-xl
                      bg-slate-800
                      border
                      border-cyan-500/20
                      hover:border-cyan-400
                      transition
                    "
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {/* CONNECTOR TO NEXT CARD */}

              {index !== skillSections.length - 1 && (
                <svg
                  className={`
                  hidden
                  md:block
                  absolute
                  top-full
                  h-40
                  pointer-events-none
                  ${
                    index % 2 === 0
                      ? "right-[250px] w-[450px]"
                      : "left-[250px] w-[450px]"
                  }
                `}
                >
                  <path
                    className="skill-path"
                    d={
                      index % 2 === 0
                        ? "M430 0 C430 70 20 70 20 150"
                        : "M20 0 C20 70 430 70 430 150"
                    }
                    fill="none"
                    stroke="#22d3ee"
                    strokeWidth="3"
                    strokeDasharray="10 10"
                    opacity="0.6"
                  />

                  <circle
                    cx={
                      index % 2 === 0
                        ? "20"
                        : "430"
                    }
                    cy="150"
                    r="6"
                    fill="#22d3ee"
                  />
                </svg>
              )}
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Skills;