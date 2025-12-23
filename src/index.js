const fs = require("fs");

const filepath = process.argv;
const link = filepath[2];

const checkDuplicateWords = (txt) => {
  const words = txt.split(" ");
  const foundWords = {};

  words.forEach((word) => {
    if (word.length >= 3) {
      const wordCleanup = cleanWord(word);
      foundWords[wordCleanup] = (foundWords[wordCleanup] || 0) + 1;
    }
  });

  return foundWords;
};

const paragraphBreak = (text) => {
  const paragraphs = text.toLowerCase().split("\n");

  const count = paragraphs.flatMap((paragraph) => {
    if (!paragraph) return [];
    return checkDuplicateWords(paragraph);
  });

  return count;
};

const cleanWord = (word) => {
  return word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
};

fs.readFile(link, "utf-8", (err, txt) => {
  console.log(paragraphBreak(txt));
});
