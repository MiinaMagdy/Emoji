import express, { Request, Response } from "express";
const emojies = require("../src/unicode");
const app = express();
const port = 3000;

function getRandomEmoji() {
  return emojies[Math.floor(Math.random() * emojies.length)];
}

app.get("/", (req: Request, res: Response) => {
  const image = getRandomEmoji() + ".svg";
  const fileUrl = `https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/${image}`;
  fetch(fileUrl)
    .then(async (response) => {
      const data = Buffer.from(await response.arrayBuffer()).toString("base64");
      res.send(`<img src="data:image/svg+xml;base64,${data}" />`);
    })
    .catch((err) => {
      console.error(err);
      res.send("Error");
    });
});

app.listen(port, () => {
  console.log(`Express is listening at http://localhost:${port}`);
});
