export function splitIntoChars(text: string) {
  const chars = text.split("");
  return chars.map((char, index) => ({
    char,
    index,
    isSpace: char === " ",
  }));
}
