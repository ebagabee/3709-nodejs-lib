import fs from "fs";
import { handleErrors } from "./errors/errorFunction.js";
import { countWords } from "./index.js";

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

// const createAndSaveFile = async (listWords, path) => {
//   const newFile = `${path}/result.txt`;
//   const content = JSON.stringify(listWords);
//   try {
//     await fs.promises.writeFile(newFile, content);
//     console.log("File created!");
//   } catch (error) {
//     throw error;
//   }
// };

const createAndSaveFile = (listWords, path) => {
  const newFile = `${path}/result.txt`;
  const content = JSON.stringify(listWords);

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
