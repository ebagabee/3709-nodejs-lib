import fs from "fs";
import path from "path";
import { handleErrors } from "./errors/errorFunction.js";
import { countWords } from "./index.js";
import { mountOutputFile } from "./helpers.js";
import { Command } from "commander";

const program = new Command();

const proccessFile = (text, destination) => {
  fs.readFile(text, "utf-8", (err, txt) => {
    try {
      if (err) throw err;
      const result = countWords(txt);
      createAndSaveFile(result, destination);
    } catch (err) {
      handleErrors(err);
    }
  });
};

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

    const textPath = path.resolve(text);
    const destiantionPath = path.resolve(destination);

    try {
      proccessFile(textPath, destiantionPath);
      console.log("text proccessed successfully!");
    } catch (error) {
      console.log("Proccess error file", error);
    }
  });

program.parse();

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
