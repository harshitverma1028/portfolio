import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import portfolioData from "../data/portfolioData";

function Certifications() {
  const [selected, setSelected] = useState(null);

  return (
    <section
      id="certifications"
      className="py-24 px-4 md:px-6"
    >
      <div className="max-w-7xl mx-auto">

        <h2 className="text-center text-5xl font-bold gradient-text mb-16">
          Certifications
        </h2>

        <p className="text-center text-slate-400 mb-14">
          Click any certificate to preview it.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">

          {portfolioData.certifications.map((certificate) => (

            <motion.div
              key={certificate.id}
              whileHover={{
                y: -12,
                rotate: 1,
                scale: 1.03,
              }}
              whileTap={{
                scale: 0.98,
              }}
              onClick={() => setSelected(certificate)}
              className="
              cursor-pointer
              relative
              rounded-[28px]
              overflow-hidden
              border
              border-white/10
              bg-gradient-to-br
              from-slate-900
              to-slate-800
              p-7
              group
            "
            >

              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 20,
                  ease: "linear",
                }}
                className="absolute -top-16 -right-16 w-32 h-32 rounded-full opacity-20"
                style={{
                  background: certificate.color,
                }}
              />

              <div
                className="w-14 h-14 rounded-2xl mb-6 flex items-center justify-center text-3xl"
                style={{
                  background: certificate.color,
                }}
              >
                🏆
              </div>

              <h3 className="text-xl font-bold mb-3">
                {certificate.title}
              </h3>

              <p className="text-slate-400">
                {certificate.issuer}
              </p>

              <div className="mt-6 flex justify-between items-center">

                <span className="text-cyan-400">
                  {certificate.date}
                </span>

                <motion.span
                  animate={{
                    x: [0, 6, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                  }}
                >
                  →
                </motion.span>

              </div>

            </motion.div>

          ))}

        </div>

      </div>

      <AnimatePresence>

        {selected && (

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="
            fixed
            inset-0
            bg-black/80
            backdrop-blur-md
            flex
            items-center
            justify-center
            z-[999]
            p-4
          "
            onClick={() => setSelected(null)}
          >

            <motion.div
              initial={{
                scale: 0.8,
              }}
              animate={{
                scale: 1,
              }}
              exit={{
                scale: 0.8,
              }}
              onClick={(e) => e.stopPropagation()}
              className="
              bg-slate-900
              rounded-3xl
              overflow-hidden
              w-full
              max-w-5xl
              h-[80vh]
              border
              border-cyan-500/20
            "
            >

              <div className="flex justify-between items-center p-5 border-b border-slate-700">

                <h3 className="text-xl font-bold">
                  {selected.title}
                </h3>

                <button
                  onClick={() => setSelected(null)}
                  className="text-3xl"
                >
                  ×
                </button>

              </div>

              <iframe
                src={selected.pdf}
                className="w-full h-full"
                title={selected.title}
              />

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>

    </section>
  );
}

export default Certifications;