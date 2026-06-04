import { motion } from "framer-motion";

function BackgroundGlow() {
  return (
    <>
      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
        }}
        className="
        fixed
        top-20
        left-20
        w-96
        h-96
        bg-cyan-500
        opacity-10
        blur-[150px]
        rounded-full
        -z-10
      "
      />

      <motion.div
        animate={{
          x: [0, -50, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
        }}
        className="
        fixed
        bottom-20
        right-20
        w-96
        h-96
        bg-purple-500
        opacity-10
        blur-[150px]
        rounded-full
        -z-10
      "
      />
    </>
  );
}

export default BackgroundGlow;