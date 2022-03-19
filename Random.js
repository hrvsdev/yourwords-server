const randomPara = require("random-paragraph");
const randomWords = require("random-words");

const genParagraph = () => {
  return (
    randomPara({ min: 30 }) +
    "\n\n" +
    randomPara({ min: 30 }) +
    "\n\n" +
    randomPara({ min: 30 }) +
    "\n\n" +
    randomPara({ min: 30 }) +
    "\n\n" +
    randomPara({ min: 30 })
  );
};

const genTitle = () => {
  return randomWords({ min: 10, max: 15, join: " " });
};

const genCategory = () => {
  const categories = [
    "technology",
    "world",
    "featured",
    "popular",
    "business",
    "safety",
  ];
  return categories[Math.floor(Math.random() * categories.length)];
};

module.exports = { genParagraph, genTitle, genCategory };