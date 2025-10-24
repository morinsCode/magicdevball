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

/* app.get("/api", async (_request, response) => {
  const { rows } = await client.query(
    "SELECT * FROM answers WHERE answer = $1",
    ["Have you tried console.log?"]
  );

  response.send(rows);
});
 */

app.get("/api", async (_request, response) => {
  const { rows } = await client.query(
    "SELECT * FROM answers ORDER BY RANDOM() LIMIT 1;"
  );

  response.send(rows);
});

app.use(express.static(path.join(path.resolve(), "dist")));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/`);
});
