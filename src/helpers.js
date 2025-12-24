const filterOccurrences = (paragraph) => {
  return Object.keys(paragraph).filter((key) => paragraph[key] > 1);
};

export const mountOutputFile = (listWords) => {
  let finalText = "";

  listWords.forEach((paragraph, index) => {
    const duplicate = filterOccurrences(paragraph).join(", ");

    if (duplicate) {
      finalText += `Duplicate words in paragraph ${index + 1}: ${duplicate} \n`;
    }
  });

  return finalText;
};
