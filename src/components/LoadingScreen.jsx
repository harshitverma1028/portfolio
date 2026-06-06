import { motion } from "framer-motion";

function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="
      fixed
      inset-0
      z-9999
      bg-slate-950
      flex
      items-center
      justify-center
    "
    >
      <div className="text-center">

        <h1
          className="
          text-5xl
          font-bold
          gradient-text
          mb-4
        "
        >
          HV
        </h1>

        <div
          className="
          w-48
          h-1
          bg-slate-800
          rounded-full
          overflow-hidden
        "
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{
              duration: 0.7,
            }}
            className="
            h-full
            bg-cyan-400
          "
          />
        </div>

      </div>
    </motion.div>
  );
}

export default LoadingScreen;