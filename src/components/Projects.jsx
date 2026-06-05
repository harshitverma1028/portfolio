import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import portfolioData from "../data/portfolioData";

function Projects() {
  const [selectedProject, setSelectedProject] = useState(
    portfolioData.projects[0]
  );

  return (
    <section
      id="projects"
      className="py-32 px-4 md:px-6"
    >
      <div className="max-w-7xl mx-auto">

        <h2 className="text-center text-5xl font-bold gradient-text mb-20">
          Project Collection
        </h2>

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT SIDE */}

          <div className="relative flex justify-center min-h-[500px]">

            {/* STACK */}

            <div className="relative w-[320px] h-[420px]">

              <div
                className="
                absolute
                inset-0
                rounded-[32px]
                bg-slate-800
                rotate-[-8deg]
              "
              />

              <div
                className="
                absolute
                inset-0
                rounded-[32px]
                bg-slate-700
                rotate-[-4deg]
              "
              />

              <div
                className="
                absolute
                inset-0
                rounded-[32px]
                bg-slate-600
              "
              />

              {/* ACTIVE CARD */}

              <AnimatePresence mode="wait">

                <motion.div
                  key={selectedProject.title}
                  initial={{
                    x: -150,
                    opacity: 0,
                    rotate: -10,
                  }}
                  animate={{
                    x: 100,
                    opacity: 1,
                    rotate: 4,
                  }}
                  exit={{
                    opacity: 0,
                    x: 200,
                  }}
                  transition={{
                    duration: 0.5,
                  }}
                  className="
                  absolute
                  top-0
                  w-[320px]
                  h-[420px]
                  rounded-[32px]
                  overflow-hidden
                  bg-slate-900
                  border
                  border-cyan-500/20
                  shadow-2xl
                "
                >

                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="
                    w-full
                    h-48
                    object-fit
                  "
                  />

                  <div className="p-5">

                    <h3 className="text-2xl font-bold mb-3">
                      {selectedProject.title}
                    </h3>

                    <p className="text-slate-300 text-sm mb-4">
                      {selectedProject.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-5">

                      {selectedProject.tech.map(
                        (tech) => (
                          <span
                            key={tech}
                            className="
                            px-3
                            py-1
                            rounded-full
                            text-xs
                            bg-slate-800
                          "
                          >
                            {tech}
                          </span>
                        )
                      )}

                    </div>

                    <div className="flex gap-3">

                      <a
                        href={selectedProject.github}
                        target="_blank"
                        rel="noreferrer"
                        className="
                        px-4
                        py-2
                        rounded-xl
                        bg-cyan-500
                        text-black
                        font-semibold
                      "
                      >
                        GitHub
                      </a>

                      <a
                        href={selectedProject.live}
                        target="_blank"
                        rel="noreferrer"
                        className="
                        px-4
                        py-2
                        rounded-xl
                        border
                        border-cyan-500
                      "
                      >
                        Demo
                      </a>

                    </div>

                  </div>

                </motion.div>

              </AnimatePresence>

            </div>

          </div>

          {/* RIGHT SIDE */}

          <div>

            <h3 className="text-2xl font-bold mb-8">
              Select A Project
            </h3>

            <div className="space-y-4">

              {portfolioData.projects.map(
                (project, index) => (
                  <motion.button
                    key={index}
                    whileHover={{
                      x: 10,
                    }}
                    onClick={() =>
                      setSelectedProject(
                        project
                      )
                    }
                    className={`
                    w-full
                    text-left
                    p-5
                    rounded-2xl
                    transition-all
                    ${
                      selectedProject.title ===
                      project.title
                        ? "bg-cyan-500 text-black"
                        : "bg-slate-900 hover:bg-slate-800"
                    }
                  `}
                  >
                    <h4 className="font-bold text-lg">
                      {project.title}
                    </h4>

                    <p className="text-sm mt-1 opacity-80">
                      {project.description}
                    </p>
                  </motion.button>
                )
              )}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Projects;