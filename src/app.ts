import express, { Request, Response } from "express";
const emojies = require("../src/unicode");
const app = express();
const port = 3000;

function getRandomEmoji(): string {
  return emojies[Math.floor(Math.random() * emojies.length)];
}

app.get("/", (req: Request, res: Response) => {
  let emoji = "&#x" + getRandomEmoji().replace("-", ";&#x");
  console.log(emoji);
  res.send(emoji);
});

app.listen(port, () => {
  console.log(`Express is listening at http://localhost:${port}`);
});
