import { useEffect, useState } from "react";

import Home from "./pages/Home";
import LoadingScreen from "./components/LoadingScreen";

function App() {
  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2200);

    return () =>
      clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <Home />
      )}
    </>
  );
}

export default App;