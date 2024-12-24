const nameFormatter = (name) => {
 return name
  .split("-")
  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  .join(" ");
};

const adjustFontSize = () => {
 const textElements = document.querySelectorAll(".card .pokemon-name p");
 textElements.forEach((textElement) => {
  const textLength = textElement.textContent.length;

  let fontSize = 16;

  if (textLength > 17) {
   fontSize = 11;
  } else if (textLength > 16) {
   fontSize = 12;
  } else if (textLength > 14) {
   fontSize = 13;
  } else if (textLength > 12) {
   fontSize = 14;
  }

  textElement.style.fontSize = `${fontSize}px`;
 });
};

export { nameFormatter, adjustFontSize };
