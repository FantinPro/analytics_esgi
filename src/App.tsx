import { useEffect, useState } from "react";
import "./App.css";
import reactLogo from "./assets/react.svg";
import { ESGIAnalytics } from "./lib/Analytics";
import { useMouseTracker, useTracker } from "./lib/hooks/tracker";
import viteLogo from "/vite.svg";

function App() {
  const [count, setCount] = useState(0);

  const trackerRef = useTracker<HTMLDivElement>({
    tag: "area-test",
    event: "click",
  });

  const trackerMouseRef = useMouseTracker<HTMLDivElement>();

  useEffect(() => {
    ESGIAnalytics.register(import.meta.env.VITE_APP_ID, "frontend_app");
  }, []);

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div ref={trackerRef} className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      <div
        ref={trackerMouseRef}
        style={{
          height: "400px",
          width: "500px",
          backgroundColor: "red",
        }}
      >
        Zone de mouse tracking
      </div>
    </div>
  );
}

export default App;
