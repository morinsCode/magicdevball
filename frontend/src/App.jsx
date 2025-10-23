/* import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg"; */
import magicdevball from "./assets/magicdevball.png";
import "./App.css";

function App() {
  /* const [count, setCount] = useState(0); */

  return (
    <>
      <div className="card">
        <button>Ask for guidence</button>
      </div>
      <div>
        <img src={magicdevball} className="logo" alt="Magic Dev Ball logo" />
      </div>

      <div className="card">
        <button>Offer wisdom</button>
      </div>
    </>
  );
}

export default App;
