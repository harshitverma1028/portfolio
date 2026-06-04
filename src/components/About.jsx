import { motion } from "framer-motion";
import portfolioData from "../data/portfolioData";

function About() {
  return (
    <section
      id="about"
      className="py-24 px-6"
    >
      <div className="max-w-6xl mx-auto">

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center gradient-text mb-16"
        >
          About Me
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <img
              src={portfolioData.profile}
              alt="profile"
              className="w-full max-w-sm mx-auto rounded-3xl border border-cyan-500/30 shadow-xl"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="glass rounded-3xl p-8">

              <h3 className="text-3xl font-bold mb-4">
                MERN Stack Developer
              </h3>

              <p className="text-slate-300 leading-8">
                {portfolioData.about}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">

                <div className="glass rounded-xl p-4 text-center">
                  <h4 className="text-3xl font-bold text-cyan-400">
                    {portfolioData.stats.projects}
                  </h4>
                  <p className="text-sm text-slate-400">
                    Projects
                  </p>
                </div>

                <div className="glass rounded-xl p-4 text-center">
                  <h4 className="text-3xl font-bold text-purple-400">
                    {portfolioData.stats.dsa}
                  </h4>
                  <p className="text-sm text-slate-400">
                    DSA Problems
                  </p>
                </div>

                <div className="glass rounded-xl p-4 text-center">
                  <h4 className="text-3xl font-bold text-cyan-400">
                    {portfolioData.stats.technologies}
                  </h4>
                  <p className="text-sm text-slate-400">
                    Technologies
                  </p>
                </div>

              </div>

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}

export default About;