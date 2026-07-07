import { useMemo, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
} from "framer-motion";
import portfolioData from "../data/portfolioData";


const ACCENTS = ["#22D3EE", "#9D7BFF", "#FBBF24", "#34D399"];

const CARD_W = 290;
const CARD_H = 230;
const V_GAP = 130; // vertical rhythm while stacked (fanned-deck overlap is intentional)
const H_GAP =
  typeof window !== "undefined"
    ? Math.min(320, window.innerWidth / 4.8)
    : 300; // horizontal rhythm once unfurled

const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));
const lerp = (a, b, t) => a + (b - a) * t;
const remap = (v, a, b) => clamp((v - a) / (b - a));

/** Single source of truth for where card `i` (of `n`) sits at scroll
 *  progress `p`. Used by both the card itself and the connector lines so
 *  everything stays perfectly in sync. */
function layoutFor(p, i, n) {
  const arrange = remap(p, 0.42 + i * 0.02, 0.86 + i * 0.02);

  const xV = i % 2 === 0 ? 100 : -100;
  const yV = (i - (n - 1) / 2) * V_GAP;
  const spread = Math.min(window.innerWidth * 0.22, 300);
const xH = (i - (n - 1) / 2) * spread;
  const yH = 0;

  const x = lerp(xV, xH, arrange);
  const y = lerp(yV, yH, arrange);

  const wobble = Math.sin(arrange * Math.PI); // 0 -> 1 -> 0 across the flip
  const rotateY = wobble * (i % 2 === 0 ? 16 : -16);
  const scale = 1 - wobble * 0.12;
  const blur = wobble * 4;

  const entrance = remap(p, i * 0.045, 0.3 + i * 0.045);
  const rotateX = lerp(65, 0, entrance);
  const opacity = entrance;

  return { x, y, rotateX, rotateY, scale, blur, opacity, arrange };
}

function JourneyCard({ section, index, total, accent, scrollYProgress }) {
  const rawX = useTransform(scrollYProgress, (p) => layoutFor(p, index, total).x);
  const rawY = useTransform(scrollYProgress, (p) => layoutFor(p, index, total).y);
  const rotateX = useTransform(scrollYProgress, (p) => layoutFor(p, index, total).rotateX);
  const rotateY = useTransform(scrollYProgress, (p) => layoutFor(p, index, total).rotateY);
  const scale = useTransform(scrollYProgress, (p) => layoutFor(p, index, total).scale);
  const opacity = useTransform(scrollYProgress, (p) => layoutFor(p, index, total).opacity);
  const blurPx = useTransform(scrollYProgress, (p) => layoutFor(p, index, total).blur);
  const filter = useMotionTemplate`blur(${blurPx}px)`;

  return (
    <motion.div
      style={{
        x: rawX,
        y: rawY,
        rotateX,
        rotateY,
        scale,
        opacity,
        filter,
        width: CARD_W,
        height: CARD_H,
        zIndex: index,
        position: "absolute",
      }}
      whileHover={{ y: -8, scale: 1.04, transition: { duration: 0.25 } }}
      className="rounded-[26px] p-6 border backdrop-blur-xl"
    >
      <div
        className="absolute inset-0 rounded-[26px] -z-10"
        style={{
          background:
            "linear-gradient(160deg, rgba(16,20,32,0.75), rgba(8,10,18,0.55))",
          border: `1px solid ${accent}33`,
          boxShadow: `0 0 40px -18px ${accent}88`,
        }}
      />

      <span
        className="font-mono text-xs tracking-widest"
        style={{ color: accent }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <h3
        className="text-2xl font-bold mt-2 mb-4"
        style={{ color: accent, fontFamily: "'Space Grotesk', sans-serif" }}
      >
        {section.title}
      </h3>

      <div className="flex flex-wrap gap-2 overflow-hidden max-h-[120px]">
        {section.skills.map((skill) => (
          <span
            key={skill}
            className="px-3 py-1 rounded-lg text-sm text-slate-200 border transition-colors"
            style={{
              background: "rgba(148,163,184,0.06)",
              borderColor: "rgba(148,163,184,0.15)",
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

function Connector({ index, total, accent, scrollYProgress }) {
  const d = useTransform(scrollYProgress, (p) => {
    const a = layoutFor(p, index, total);
    const b = layoutFor(p, index + 1, total);

    const offX = lerp(0, CARD_W / 2, a.arrange);
    const offY = lerp(CARD_H / 2, 0, a.arrange);

    const x1 = a.x + offX;
    const y1 = a.y + offY;
    const x2 = b.x - offX;
    const y2 = b.y - offY;
    const bend = lerp(55, 22, a.arrange);

    const mx = (x1 + x2) / 2;
    const my = (y1 + y2) / 2 + bend;

    return `M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`;
  });

  const dotCx = useTransform(scrollYProgress, (p) => {
    const a = layoutFor(p, index, total);
    const b = layoutFor(p, index + 1, total);
    return (a.x + b.x) / 2;
  });
  const dotCy = useTransform(scrollYProgress, (p) => {
    const a = layoutFor(p, index, total);
    const b = layoutFor(p, index + 1, total);
    const bend = lerp(55, 22, a.arrange);
    return (a.y + b.y) / 2 + bend;
  });

  return (
    <>
      <motion.path
        d={d}
        fill="none"
        stroke={accent}
        strokeWidth="1.5"
        strokeDasharray="6 8"
        opacity="0.5"
      />
      <motion.circle
        cx={dotCx}
        cy={dotCy}
        r="4"
        fill={accent}
        animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.3, 0.8] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      />
    </>
  );
}

function StaticSkills({ skillSections }) {
  // Respect prefers-reduced-motion: a calm fade-in grid, same data.
  return (
    <section id="skills" className="py-28 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center text-5xl font-bold gradient-text mb-16">
          Tech Stack Journey
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {skillSections.map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass rounded-[26px] p-8 border"
              style={{ borderColor: `${ACCENTS[i % ACCENTS.length]}33` }}
            >
              <h3
                className="text-2xl font-bold mb-4"
                style={{ color: ACCENTS[i % ACCENTS.length] }}
              >
                {section.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {section.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-lg text-sm text-slate-200 border border-slate-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  const skillSections = useMemo(
    () => [
      { title: "Frontend", skills: portfolioData.skills.frontend },
      { title: "Backend", skills: portfolioData.skills.backend },
      { title: "Database", skills: portfolioData.skills.database },
      { title: "Tools", skills: portfolioData.skills.tools },
    ],
    []
  );

  const prefersReducedMotion = useReducedMotion();
  const driverRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: driverRef,
    offset: ["start start", "end end"],
  });

  const barScaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  if (prefersReducedMotion) {
    return <StaticSkills skillSections={skillSections} />;
  }

  const n = skillSections.length;

  return (
    <section
      id="skills"
      ref={driverRef}
      className="relative"
      style={{ height: "300vh", background: "#05070D" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col items-center justify-center">
        {/* ambient atmosphere */}
        <motion.div
          className="absolute -top-40 -left-32 w-[420px] h-[420px] rounded-full blur-3xl pointer-events-none"
          style={{ background: "#22D3EE22" }}
          animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-40 -right-32 w-[420px] h-[420px] rounded-full blur-3xl pointer-events-none"
          style={{ background: "#9D7BFF22" }}
          animate={{ x: [0, -30, 0], y: [0, -30, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />

        <h2 className="text-center text-4xl md:text-5xl font-bold gradient-text mb-10 z-10">
          Tech Stack Journey
        </h2>

        <div
  className="relative z-10 w-full"
  style={{
    height: 420,
    perspective: 1400,
  }}
        >
          <svg
            className="absolute inset-0 overflow-visible pointer-events-none"
            style={{
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: 1,
              height: 1,
            }}
          >
            <g style={{ transform: "translate(0px, 0px)" }}>
              {skillSections.slice(0, -1).map((_, i) => (
                <Connector
                  key={i}
                  index={i}
                  total={n}
                  accent={ACCENTS[i % ACCENTS.length]}
                  scrollYProgress={scrollYProgress}
                />
              ))}
            </g>
          </svg>

          <div
            className="absolute"
            style={{
              left: "41%",
              top: "40%",
              transform: "translate(-50%, -50%)",
              transformStyle: "preserve-3d",
            }}
          >
            {skillSections.map((section, i) => (
              <JourneyCard
                key={section.title}
                section={section}
                index={i}
                total={n}
                accent={ACCENTS[i % ACCENTS.length]}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>

        <motion.p
          style={{ opacity: hintOpacity }}
          className="absolute bottom-10 text-slate-500 text-sm tracking-wide z-10"
        >
          scroll to unfurl the stack
        </motion.p>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-40 h-[2px] bg-slate-800 overflow-hidden rounded-full z-10">
          <motion.div
            style={{ scaleX: barScaleX, transformOrigin: "left" }}
            className="h-full w-full"
            initial={false}
          >
            <div
              className="h-full w-full rounded-full"
              style={{ background: "linear-gradient(90deg, #22D3EE, #9D7BFF)" }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Skills;
