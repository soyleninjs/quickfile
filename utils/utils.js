const normalizeText = (str) => {
  // Normaliza el texto convirtiéndolo a minúsculas y reemplazando guiones bajos y guiones con espacios
  return str.toLowerCase().replace(/[_-]/g, ' ');
};

const formatCamelCase = (string) => {
  const words = string.split('-');
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  return words.join(' ');
};

const toCamelCase = (string) => {
  return normalizeText(string).replace(/[-_](\w)/g, (_, char) => char.toUpperCase());
};

const toPascalCase = (string) => {
  const words = normalizeText(string).split(/\s+/);
  const pascalCaseWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
  return pascalCaseWords.join("");
};

const handleText = (string) => {
  return string
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-$/, '')
    .replace(/^-/, '');
};

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    normalizeText,
    formatCamelCase,
    toCamelCase,
    toPascalCase,
    handleText,
  }
}
