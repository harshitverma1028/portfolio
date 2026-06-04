import { useEffect, useState } from "react";

function CustomCursor() {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const updateCursor = (e) => {
      setPosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener(
      "mousemove",
      updateCursor
    );

    return () =>
      window.removeEventListener(
        "mousemove",
        updateCursor
      );
  }, []);

  return (
    <div
      className="
      hidden
      lg:block
      fixed
      pointer-events-none
      z-50
      w-72
      h-72
      rounded-full
      bg-cyan-500/10
      blur-3xl
    "
      style={{
        left: position.x - 140,
        top: position.y - 140,
      }}
    />
  );
}

export default CustomCursor;