import { motion } from "framer-motion";
import portfolioData from "../data/portfolioData";

function SkillCategory({ title, skills }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="glass rounded-3xl p-6"
    >
      <h3 className="text-2xl font-bold mb-6 text-cyan-400">
        {title}
      </h3>

      <div className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <span
            key={skill}
            className="px-4 py-2 rounded-full bg-slate-800 border border-cyan-500/20 hover:border-cyan-400 transition"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

function Skills() {
  const { frontend, backend, database, tools } =
    portfolioData.skills;

  return (
    <section
      id="skills"
      className="py-24 px-6"
    >
      <div className="max-w-6xl mx-auto">

        <h2 className="text-center text-5xl font-bold gradient-text mb-16">
          Tech Stack
        </h2>

        <div className="grid md:grid-cols-2 gap-8">

          <SkillCategory
            title="Frontend"
            skills={frontend}
          />

          <SkillCategory
            title="Backend"
            skills={backend}
          />

          <SkillCategory
            title="Database"
            skills={database}
          />

          <SkillCategory
            title="Tools"
            skills={tools}
          />

        </div>

      </div>
    </section>
  );
}

export default Skills;