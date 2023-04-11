import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useMouseTracker, useTracker } from "./hooks/tracker";
import { Analytics } from "./lib/Analytics";

function App() {
    const [count, setCount] = useState(0);

  const trackerRef = useTracker<HTMLDivElement>({
    tag: 'area-test',
    event: 'click',
  })


    const trackerMouseRef = useMouseTracker<HTMLDivElement>()

  useEffect(() => {
    const analyticsApp = new Analytics()
    analyticsApp.register('appId')
  }, [])

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

      <div ref={trackerMouseRef} style={{
                height: '400px',
                width: '500px',
                backgroundColor: 'red',
            }}>dazdazd</div>
    </div>
  )
}

export default App;
