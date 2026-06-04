import { motion } from "framer-motion";
import portfolioData from "../data/portfolioData";

function DSA() {
  const stats = [
    {
      title: "Problems Solved",
      value: portfolioData.dsa.solved,
    },
    {
      title: "Contests",
      value: portfolioData.dsa.contests,
    },
    {
      title: "LeetCode Rating",
      value: portfolioData.dsa.leetcodeRating,
    },
    {
      title: "Badges",
      value: portfolioData.dsa.badges,
    },
  ];

  return (
    <section
      id="dsa"
      className="py-24 px-6"
    >
      <div className="max-w-6xl mx-auto">

        <h2 className="text-center text-5xl font-bold gradient-text mb-16">
          DSA Journey
        </h2>

        <div className="grid md:grid-cols-4 gap-6">

          {stats.map((item, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.15,
              }}
              viewport={{
                once: true,
              }}
              className="glass rounded-3xl p-8 text-center"
            >
              <h3 className="text-4xl font-bold text-cyan-400">
                {item.value}
              </h3>

              <p className="text-slate-400 mt-2">
                {item.title}
              </p>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}

export default DSA;