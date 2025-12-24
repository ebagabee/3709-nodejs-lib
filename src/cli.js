import fs from "fs";
import { handleErrors } from "./errors/errorFunction.js";
import { countWords } from "./index.js";

const filepath = process.argv;
const link = filepath[2];

fs.readFile(link, "utf-8", (err, txt) => {
  try {
    if (err) throw err;

    console.log(countWords(txt));
  } catch (err) {
    handleErrors(err);
  }
});
