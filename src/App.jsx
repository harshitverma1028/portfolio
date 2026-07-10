import { useEffect, useState } from "react";

import Home from "./pages/Home";
import LoadingScreen from "./components/LoadingScreen";

function App() {
  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 700);

    return () =>
      clearTimeout(timer);
  }, []);
  const [entered, setEntered] = useState(false);

  return (
    <>
        {!entered && <LoadingScreen onComplete={() => setEntered(true)} />}
        <Home />
      </>
    );
}

export default App;