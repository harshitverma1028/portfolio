import { useCallback } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

function ParticlesBackground() {
  const particlesInit =
    useCallback(async (engine) => {
      await loadSlim(engine);
    }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: {
          color: {
            value: "#020617",
          },
        },

        fpsLimit: 120,

        particles: {
          color: {
            value: "#38bdf8",
          },

          links: {
            color: "#38bdf8",
            distance: 150,
            enable: true,
            opacity: 0.2,
            width: 1,
          },

          move: {
            enable: true,
            speed: 1,
          },

          number: {
            value: 50,
          },

          opacity: {
            value: 0.2,
          },

          size: {
            value: {
              min: 1,
              max: 4,
            },
          },
        },
      }}
      className="
      fixed
      inset-0
      -z-20
    "
    />
  );
}

export default ParticlesBackground;