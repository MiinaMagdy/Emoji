import express, { Request, Response } from "express";
const emojies = require("../src/unicode");
const app = express();
const port = 3000;

function getRandomEmoji() {
  return emojies[Math.floor(Math.random() * emojies.length)];
}

app.get("/emoji.svg", (req: Request, res: Response) => {
  const image = getRandomEmoji() + ".svg";
  const fileUrl = `https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/${image}`;
  console.log(fileUrl);
  fetch(fileUrl)
    .then(async (response) => {
      const data = Buffer.from(await response.arrayBuffer()).toString();
      res.setHeader("Cache-Control", "public, max-age=31536000");
      res.setHeader("Content-Type", "image/svg+xml");
      res.send(data);
    })
    .catch((err) => {
      console.error(err);
      res.send("Error");
    });
});

app.listen(port, () => {
  console.log(`Express is listening at http://localhost:${port}`);
});
