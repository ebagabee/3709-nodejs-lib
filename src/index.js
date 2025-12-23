const fs = require("fs");

const filepath = process.argv;
const link = filepath[2];

fs.readFile(link, "utf-8", (err, txt) => {
  console.log(txt);
});
