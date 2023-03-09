export function findArrayInString(str: string) {
  const firstParseAttempt = parseJson(str);
  if (firstParseAttempt !== false && Array.isArray(firstParseAttempt)) {
    return firstParseAttempt;
  }
  try {
    const arrayString = str.slice(str.indexOf("["), str.lastIndexOf("]") + 1);
    const foundArray = parseJson(arrayString);
    return foundArray === false ? null : foundArray;
  } catch (error) {
    return null;
  }
}

export function parseJson(str: string) {
  try {
    return JSON.parse(str);
  } catch (e) {
    return false;
  }
}

export function getPunctuatedString(str: string) {
  let punctuationRegex = /[\.\?\!\,]/;

  if (punctuationRegex.test(str)) {
    str += ".";
  }
  return str;
}

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function toTitleCase(str: string) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}
