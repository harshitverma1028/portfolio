import { useEffect, useState } from "react";

function ScrollProgress() {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const total =
        document.documentElement.scrollHeight -
        window.innerHeight;

      const current =
        (window.scrollY / total) * 100;

      setScroll(current);
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  return (
    <div
      className="fixed top-0 left-0 h-1 z-[999]"
      style={{
        width: `${scroll}%`,
        background:
          "linear-gradient(to right,#38bdf8,#8b5cf6)",
      }}
    />
  );
}

export default ScrollProgress;