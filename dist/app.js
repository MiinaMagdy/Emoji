"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const emojies = require("../src/unicode");
const app = (0, express_1.default)();
const port = 3000;
function getRandomEmoji() {
    return emojies[Math.floor(Math.random() * emojies.length)];
}
app.get("/", (req, res) => {
    let image = getRandomEmoji() + ".svg";
    console.log(image);
    res.send(`https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/${image}`);
});
app.listen(port, () => {
    console.log(`Express is listening at http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map