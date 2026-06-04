import { motion } from "framer-motion";
import portfolioData from "../data/portfolioData";

function Projects() {
  return (
    <section
      id="projects"
      className="py-24 px-6"
    >
      <div className="max-w-7xl mx-auto">

        <h2 className="text-center text-5xl font-bold gradient-text mb-16">
          Featured Projects
        </h2>

        <div className="grid md:grid-cols-2 gap-10">

          {portfolioData.projects.map(
            (project, index) => (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 80,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                whileHover={{
                  y: -10,
                }}
                className="glass rounded-3xl overflow-hidden"
              >

                <img
                  src={project.image}
                  alt=""
                  className="h-56 w-full object-cover"
                />

                <div className="p-6">

                  <h3 className="text-2xl font-bold">
                    {project.title}
                  </h3>

                  <p className="text-slate-300 mt-4">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-full bg-slate-800 text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4 mt-6">

                    <a
                      href={project.github}
                      target="_blank"
                      className="px-5 py-2 rounded-lg bg-cyan-500"
                    >
                      GitHub
                    </a>

                    <a
                      href={project.live}
                      target="_blank"
                      className="px-5 py-2 rounded-lg border border-cyan-500"
                    >
                      Live Demo
                    </a>

                  </div>

                </div>

              </motion.div>
            )
          )}

        </div>

      </div>
    </section>
  );
}

export default Projects;