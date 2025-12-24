const fs = require("fs");
const handleErrors = require("./errors/errorFunction");

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

const countWords = (text) => {
  const paragraphs = extractParagraphs(text);

  const count = paragraphs.flatMap((paragraph) => {
    if (!paragraph) return [];
    return checkDuplicateWords(paragraph);
  });

  return count;
};

const extractParagraphs = (text) => {
  return text.toLowerCase().split("\n");
};

const cleanWord = (word) => {
  return word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
};

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
