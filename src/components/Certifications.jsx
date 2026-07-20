import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import portfolioData from "../data/portfolioData";

const LAYOUT = [
  { pos: "top-[2%] left-[1%] md:left-[4%]", rotate: -7, duration: 6.5, delay: 0 },
  { pos: "top-[4%] right-[1%] md:right-[5%]", rotate: 6, duration: 7.2, delay: 0.6 },
  { pos: "top-[42%] left-[0%] md:left-[2%]", rotate: 5, duration: 6.8, delay: 1.1 },
  { pos: "top-[40%] right-[0%] md:right-[3%]", rotate: -5, duration: 7.6, delay: 0.3 },
  { pos: "bottom-[26%] left-[6%] md:left-[10%]", rotate: -9, duration: 6.2, delay: 0.9 },
  { pos: "bottom-[24%] right-[6%] md:right-[10%]", rotate: 8, duration: 7.4, delay: 0.2 },
  { pos: "bottom-[2%] left-[2%] md:left-[8%]", rotate: 6, duration: 6.9, delay: 1.3 },
  { pos: "bottom-[3%] right-[2%] md:right-[7%]", rotate: -6, duration: 7.0, delay: 0.5 },
];

function Certifications() {
  const [selected, setSelected] = useState(null);

  const renderCard = (certificate, idx, floating) => {
    const layout = LAYOUT[idx % LAYOUT.length];
    const isTablet = idx % 2 === 0;

    const card = (
      <motion.div
        key={certificate.id}
        animate={
          floating
            ? {
                opacity: 1,
                y: [0, -14, 0],
                rotate: [layout.rotate, layout.rotate + 3, layout.rotate],
              }
            : { opacity: 1, y: 0 }
        }
        transition={
          floating
            ? {
                opacity: { duration: 0 },
                y: {
                  duration: layout.duration,
                  delay: layout.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
                rotate: {
                  duration: layout.duration,
                  delay: layout.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }
            : { duration: 0.3 }
        }
        whileHover={{
          scale: 1.06,
          zIndex: 40,
        }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setSelected(certificate)}
        className={`
          cursor-pointer
          w-64
          md:w-72
          shrink-0
          group
          ${floating ? `absolute ${layout.pos}` : "relative"}
          ${
            isTablet
              ? `
                rounded-[34px]
                border-[6px]
                border-slate-800/90
                bg-linear-to-b
                from-slate-900
                to-black
                shadow-2xl
                shadow-black/50
                p-5
              `
              : `
                rounded-[28px]
                border
                border-white/25
                bg-white/10
                backdrop-blur-xl
                shadow-xl
                shadow-black/30
                p-6
              `
          }
        `}
      >
        {isTablet && (
          <div className="w-2 h-2 rounded-full bg-slate-700 mx-auto mb-4" />
        )}

        <div
          className="w-12 h-12 rounded-xl mb-5 flex items-center justify-center text-2xl"
          style={{
            background: certificate.color,
            opacity: isTablet ? 1 : 0.85,
          }}
        >
          🏆
        </div>

        <h3 className="text-lg font-bold mb-2 text-white">
          {certificate.title}
        </h3>

        <p className="text-slate-400 text-sm">
          {certificate.issuer}
        </p>

        <div className="mt-5 flex justify-between items-center">
          <span className="text-cyan-400 text-sm">
            {certificate.date}
          </span>

          <motion.span
            animate={{ x: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-white/70"
          >
            →
          </motion.span>
        </div>
      </motion.div>
    );

    return card;
  };

  return (
    <section id="certifications" className="pt-24 pb-0 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">

        {/* Mobile: simple stacked grid, no absolute floating */}
        <div className="md:hidden">
          <h2 className="text-center text-4xl font-bold gradient-text mb-4">
            Certifications
          </h2>
          <p className="text-center text-slate-400 mb-10">
            Tap any certificate to preview it.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 place-items-center">
            {portfolioData.certifications.map((certificate, idx) =>
              renderCard(certificate, idx, false)
            )}
          </div>
        </div>

        {/* Desktop / tablet: floating scattered layout with centered title */}
        <div className="hidden md:block relative min-h-200">

          <div className="absolute top-60 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
  <div className="text-center">
    <h2 className="text-6xl lg:text-7xl font-bold gradient-text mb-4">
      Certifications
    </h2>
    <p className="text-slate-400">
      Click any certificate to preview it.
    </p>
  </div>
</div>

          {portfolioData.certifications.map((certificate, idx) =>
            renderCard(certificate, idx, true)
          )}

        </div>

      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="
              fixed
              inset-0
              bg-black/80
              backdrop-blur-md
              flex
              items-center
              justify-center
              z-999
              p-4
            "
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
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
