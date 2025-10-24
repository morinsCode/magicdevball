import express from "express";
import path from "path";
import dotenv from "dotenv";
import { Client } from "pg";

const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();

const client = new Client({
  connectionString: process.env.PGURI,
});

client.connect();

app.use(express.json());

// === ROUTES ===

app.get("/api", async (_request, response) => {
  const { rows } = await client.query(
    "SELECT * FROM answers ORDER BY RANDOM() LIMIT 1;"
  );

  response.send(rows);
});

app.post("/api", async (req, res) => {
  try {
    const { answer } = req.body;
    if (!answer || typeof answer !== "string") {
      return res
        .status(400)
        .json({ error: "Missing or invalid 'answer' field" });
    }

    const insert = await client.query(
      "INSERT INTO answers(answer) VALUES($1) RETURNING *;",
      [answer]
    );

    return res.status(201).json(insert.rows[0]);
  } catch (err) {
    console.error("Failed to insert answer:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// ==== SERVE FRONTEND ====

app.use(express.static(path.join(path.resolve(), "dist")));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/`);
});
