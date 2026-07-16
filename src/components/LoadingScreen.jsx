import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const NAME = "HARSHIT VERMA";
function LoadingScreen({ onComplete }) {
  const [phase, setPhase] = useState("intro"); // intro -> ready -> opening -> done
  const [progress, setProgress] = useState(0);
  const hasTriggered = useRef(false);

  const trigger = () => {
    if (hasTriggered.current) return;
    hasTriggered.current = true;
    setPhase("opening");
  };

  // fake but smooth progress counter, purely for atmosphere
  useEffect(() => {
    if (phase !== "intro") return;
    const start = Date.now();
    const duration = 1500;
    const id = setInterval(() => {
      const pct = Math.min(100, Math.round(((Date.now() - start) / duration) * 100));
      setProgress(pct);
      if (pct >= 100) clearInterval(id);
    }, 30);
    return () => clearInterval(id);
  }, [phase]);

  // let the name animation finish playing before we start listening for scroll
  useEffect(() => {
    const t = setTimeout(() => setPhase("ready"), 1500);
    return () => clearTimeout(t);
  }, []);

  // listen for the "open the shutter" gesture once we're ready
  useEffect(() => {
    if (phase !== "ready") return;

    let touchY = 0;
    const handleWheel = (e) => e.deltaY > 0 && trigger();
    const handleTouchStart = (e) => (touchY = e.touches[0].clientY);
    const handleTouchMove = (e) => {
      if (touchY - e.touches[0].clientY > 20) trigger();
    };
    const handleKey = (e) =>
      ["ArrowDown", "PageDown", " "].includes(e.key) && trigger();

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("keydown", handleKey);
    };
  }, [phase]);

  // lock body scroll until the shutter has fully opened
  useEffect(() => {
    document.body.style.overflow = phase === "done" ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  if (phase === "done") return null;

  const words = NAME.split(" ");

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: phase === "opening" ? "-100%" : 0 }}
      transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => {
        if (phase === "opening") {
          onComplete?.();
          setPhase("done");
        }
      }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-[#050b14]"
    >
      {/* fine grid, gives the dark bg texture instead of a flat fill */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #1e3a4f 1px, transparent 1px), linear-gradient(to bottom, #1e3a4f 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* drifting gradient orbs for depth */}
      <motion.div
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -top-40 -left-20 h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-[120px]"
      />
      <motion.div
        animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -bottom-40 -right-20 h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[120px]"
      />

      {/* film-grain noise so the dark areas don't look flat */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* light flash sweeping through as the shutter lifts */}
      {phase === "opening" && (
        <motion.div
          initial={{ opacity: 0.6 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-cyan-300/30 via-transparent to-transparent"
        />
      )}

      {/* eyebrow label */}
      <motion.span
        initial={{ opacity: 0, letterSpacing: "0.1em" }}
        animate={{ opacity: 1, letterSpacing: "0.4em" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative mb-5 text-[11px] font-medium uppercase text-cyan-400/80"
      >
        Portfolio
      </motion.span>

      {/* name, letter by letter with a blur-to-focus reveal — wraps by word, not mid-word */}
      <div className="relative flex flex-wrap justify-center gap-x-4 px-6 text-center">
        {words.map((word, wi) => {
          const priorLetters = words.slice(0, wi).join("").length;
          return (
            <span key={wi} className="inline-flex">
              {Array.from(word).map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    delay: 0.25 + (priorLetters + i) * 0.05,
                    duration: 0.7,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-200 to-cyan-400 [text-shadow:0_0_40px_rgba(34,211,238,0.35)] sm:text-6xl md:text-7xl"
                >
                  {char}
                </motion.span>
              ))}
            </span>
          );
        })}
      </div>

      {/* role / tagline typed in under the name */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 + NAME.replace(" ", "").length * 0.05 + 0.3, duration: 0.6 }}
        className="relative mt-4 text-sm tracking-[0.15em] text-slate-400"
      >
        Full-Stack Developer
      </motion.p>

      {/* progress bar + percentage, doubles as a loading indicator */}
      <div className="relative mt-10 flex w-48 flex-col items-center gap-2">
        <div className="h-[3px] w-full overflow-hidden rounded-full bg-slate-800/80">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear", duration: 0.05 }}
            className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 shadow-[0_0_12px_rgba(34,211,238,0.6)]"
          />
        </div>
        <span className="font-mono text-xs tabular-nums text-slate-500">
          {progress}%
        </span>
      </div>

      {/* scroll/tap hint, only shown once ready */}
      <motion.button
        type="button"
        onClick={trigger}
        aria-label="Enter portfolio"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === "ready" ? 1 : 0 }}
        transition={{ duration: 0.6 }}
        className="absolute bottom-12 flex flex-col items-center gap-2 text-slate-400"
      >
        <span className="text-xs uppercase tracking-[0.3em]">
          Scroll to enter
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-8 w-5 items-start justify-center rounded-full border border-slate-600 p-1"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
        </motion.div>
      </motion.button>
    </motion.div>
  );
}

export default LoadingScreen;
