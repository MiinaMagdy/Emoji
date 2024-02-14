import express, { Request, Response } from "express";
const emojies = require("../src/unicode");
const app = express();
const port = 3000;

function getRandomEmoji() {
  return emojies[Math.floor(Math.random() * emojies.length)];
}

app.get("/:id", (req: Request, res: Response) => {
  const image = getRandomEmoji() + ".svg";
  const fileUrl = `https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/${image}`;
  res.redirect(fileUrl);
});

app.listen(port, () => {
  console.log(`Express is listening at http://localhost:${port}`);
});
