import { useState } from "react";
import magicdevball from "./assets/magicdevball.png";
import "./App.css";

function App() {
  const [answer, setAnswer] = useState("");
  const [offerText, setOfferText] = useState("");

  // === GET REQUEST ===
  const handleAskGuidence = async () => {
    try {
      const res = await fetch("/api");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const text = data?.[0]?.answer ?? JSON.stringify(data);
      setAnswer(text);
      console.log("Ask for guidence response:", data);
    } catch (err) {
      console.error("Failed to fetch guidance:", err);
      setAnswer("Failed to fetch guidance");
    }
  };

  // === POST REQUEST ===
  const handleOfferSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answer: offerText }),
      });
      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        throw new Error(errBody.error || `HTTP ${res.status}`);
      }
      const created = await res.json();

      setOfferText("");
      console.log("Created answer:", created);
    } catch (err) {
      console.error("Failed to submit wisdom:", err);
    }
  };

  return (
    <>
      {/* Ask for guidence */}
      <div className="card">
        <button onClick={handleAskGuidence}>Ask for guidence</button>
        <div>
          <p>{answer}</p>
        </div>
      </div>

      {/* Logo */}
      <div>
        <img src={magicdevball} className="logo" alt="Magic Dev Ball logo" />
      </div>

      {/* Offer wisdom */}
      <div className="card">
        <div>Offer wisdom</div>
        <form onSubmit={handleOfferSubmit} style={{ marginTop: "8px" }}>
          <input
            type="text"
            value={offerText}
            onChange={(e) => setOfferText(e.target.value)}
            placeholder="Type your wisdom"
            required
          />
          <div>
            <button type="submit">Offer</button>
          </div>
        </form>
        {/* <div style={{ height: "24px" }}>{offerText}</div> */}
      </div>
    </>
  );
}

export default App;

//force a commit
