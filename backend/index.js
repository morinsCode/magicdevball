import express from "express";
import path from "path";
/* import dotenv from "dotenv";
import { Client } from "pg"; */

const app = express();
const PORT = process.env.PORT || 3000;

/* const client = new Client({
  connectionString: process.env.PGURI,
}); */

/* dotenv.config(); */

app.get("/api", (_request, response) => {
  response.send({ hello: "World" });
});

app.use(express.static(path.join(path.resolve(), "dist")));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/`);
});
