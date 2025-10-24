import { useState } from "react";
import magicdevball from "./assets/magicdevball.png";
import "./App.css";

function App() {
  const [answer, setAnswer] = useState("");

  const handleAskGuidence = async () => {
    try {
      const res = await fetch("/api");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      // backend returns an array of rows; pick the answer field if present
      const text = data?.[0]?.answer ?? JSON.stringify(data);
      setAnswer(text);
      console.log("Ask for guidence response:", data);
    } catch (err) {
      console.error("Failed to fetch guidance:", err);
      setAnswer("Failed to fetch guidance");
    }
  };

  return (
    <>
      <div className="card">
        <button onClick={handleAskGuidence}>Ask for guidence</button>
        <div>
          <p>{answer}</p>
        </div>
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
