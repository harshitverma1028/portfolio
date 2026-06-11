import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import portfolioData from "../data/portfolioData";

function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden"
    >
      {/* Background Glow */}

      <div className="absolute inset-0">
        <div
          className="
          absolute
          top-20
          left-10
          w-72
          h-72
          bg-cyan-500
          rounded-full
          blur-[140px]
          opacity-20
        "
        />

        <div
          className="
          absolute
          bottom-10
          right-10
          w-72
          h-72
          bg-purple-500
          rounded-full
          blur-[140px]
          opacity-20
        "
        />

      </div>

      {/* Main Content */}

      <div className="relative z-10 max-w-5xl mx-auto text-center">

        <motion.img
          initial={{
            opacity: 0,
            scale: 0.8,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.8,
          }}
          src={portfolioData.profile}
          alt="Profile"
          className="
            w-44
            h-54
            mx-auto
            rounded-full
            border-3
            border-cyan-500
            object-[top_25%]
            overflow-hidden
            object-cover
            shadow-2xl
          "
        />

        <motion.h1
          initial={{
            opacity: 0,
            y: 50,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
            delay: 0.2,
          }}
          className="
            text-4xl
            md:text-7xl
            font-bold
            mt-8
          "
        >
          {portfolioData.name}
        </motion.h1>

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.4,
          }}
          className="mt-4"
        >
          <TypeAnimation
            sequence={[
              "Frontend Developer",
              2000,
              "Problem Solver",
              2000,
              "Full Stack Developer",
              2000,
            ]}
            speed={50}
            repeat={Infinity}
            className="
              text-2xl
              md:text-3xl
              font-semibold
              gradient-text
            "
          />
        </motion.div>

        <motion.p
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
            delay: 0.6,
          }}
          className="
            max-w-3xl
            mx-auto
            mt-6
            text-lg
            text-slate-300
            leading-8
          "
        >
          {portfolioData.tagline}
        </motion.p>

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.8,
          }}
          className="
            mt-10
            flex
            flex-wrap
            justify-center
            gap-4
          "
        >
          <a
            href={portfolioData.github}
            target="_blank"
            rel="noreferrer"
            className="
              px-8
              py-3
              rounded-xl
              bg-cyan-500
              hover:bg-cyan-600
              transition
              font-semibold
            "
          >
            GitHub
          </a>

          <a
            href={portfolioData.linkedin}
            target="_blank"
            rel="noreferrer"
            className="
              px-8
              py-3
              rounded-xl
              border
              border-cyan-500
              hover:bg-cyan-500/10
              transition
              font-semibold
            "
          >
            LinkedIn
          </a>

          <a
            href={portfolioData.resume}
            target="_blank"
            rel="noreferrer"
            className="
              px-8
              py-3
              rounded-xl
              border
              border-purple-500
              hover:bg-purple-500/10
              transition
              font-semibold
            "
          >
            Resume
          </a>
        </motion.div>

      </div>
    </section>
  );
}

export default Hero;