export const countWords = (text) => {
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
