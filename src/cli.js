import fs from "fs";
import { handleErrors } from "./errors/errorFunction.js";
import { countWords } from "./index.js";
import { mountOutputFile } from "./helpers.js";
import { Command } from "commander";

const program = new Command();

program
  .version("0.0.1")
  .option("-t, --text <string>", "textpath to be process")
  .option(
    "-d, --destination <string>",
    "folder path where save the file created"
  )
  .action((options) => {
    const { text, destination } = options;

    if (!text || !destination) {
      console.error("Enter the origin and final destination paths");
      program.help();
      return;
    }
  });

const filepath = process.argv;
const link = filepath[2];
const path = filepath[3];

fs.readFile(link, "utf-8", (err, txt) => {
  try {
    if (err) throw err;
    const result = countWords(txt);
    createAndSaveFile(result, path);
  } catch (err) {
    handleErrors(err);
  }
});

const createAndSaveFile = (listWords, path) => {
  const newFile = `${path}/result.txt`;
  const content = mountOutputFile(listWords);

  fs.promises
    .writeFile(newFile, content)
    .then(() => {
      console.log("File created!");
    })
    .catch((err) => {
      throw err;
    })
    .finally(() => {
      console.log("Finalized!");
    });
};
