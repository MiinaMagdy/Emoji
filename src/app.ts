import express, { Request, Response } from "express";
import https from "https";
const emojies = require("../src/unicode");
const app = express();
const port = 3000;

function getRandomEmoji() {
  return emojies[Math.floor(Math.random() * emojies.length)];
}

app.get("/", (req: Request, res: Response) => {
  const image = getRandomEmoji() + ".svg";
  const fileUrl = `https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/${image}`;

  res.redirect(fileUrl);
});

app.get("/random", (req: Request, res: Response) => {
  // Replace 'http://example.com/yourfile.txt' with the actual URL of your file
  const image = getRandomEmoji() + ".svg";
  const fileUrl = `https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/${image}`;

  // Make a GET request to the remote server
  https.get(fileUrl, (remoteRes) => {
    // Check if the request was successful
    if (remoteRes.statusCode === 200 && remoteRes.headers["content-type"]) {
      // Set the appropriate headers for the response
      res.setHeader("Content-Type", remoteRes.headers["content-type"]);
      res.setHeader("Content-Disposition", `attachment; filename=${image}`);

      // Pipe the remote file stream to the response stream
      remoteRes.pipe(res);
    } else if (typeof remoteRes.statusCode === "number") {
      // Handle non-200 status code (e.g., file not found)
      res.status(remoteRes.statusCode).end();
    }
  });
});

app.listen(port, () => {
  console.log(`Express is listening at http://localhost:${port}`);
});
