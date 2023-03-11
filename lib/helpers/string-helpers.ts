export function findArrayInString(str: string) {
  const firstParseAttempt = parseJson(str);
  if (firstParseAttempt !== false && Array.isArray(firstParseAttempt)) {
    return firstParseAttempt;
  } else {
    console.log("I couldn't parse these suggestions:", str);
  }
  try {
    const arrayString = str.slice(str.indexOf("["), str.lastIndexOf("]") + 1);
    arrayString.replace(/\\\//g, "/");
    if (Array.isArray(arrayString)) {
      return arrayString;
    }
    const foundArray = parseJson(arrayString);
    return foundArray === false ? null : foundArray;
  } catch (error) {
    console.log("I couldn't parse these suggestions:", str);
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
