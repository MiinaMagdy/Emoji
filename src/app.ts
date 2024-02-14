import express, { Request, Response } from "express";
import https from "https";
const emojies = require("../src/unicode");
const app = express();
const port = 3000;

function getRandomEmoji() {
  return emojies[Math.floor(Math.random() * emojies.length)];
}

app.get("/", (req: Request, res: Response) => {
  let image = getRandomEmoji() + ".svg";
  console.log(image);
  res.redirect(
    `https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/${image}`
  );
});

app.listen(port, () => {
  console.log(`Express is listening at http://localhost:${port}`);
});
