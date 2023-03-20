export function findJsonInString(str: string) {
  const firstParseAttempt = parseJson(str);
  console.log("firstParseAttempt", firstParseAttempt);
  if (firstParseAttempt !== false) {
    return firstParseAttempt;
  } else {
    console.log("I couldn't parse these submissions:", str);
  }
  try {
    console.log("-----------------------------------------------------------");
    const regex1 = /```json([^```]*)```/gm;
    const regex2 = /```([^```]*)```/gm;
    const regex3 = /{([^}]*)}/;
    const matches1 = str.match(regex1);
    const matches2 = str.match(regex2);
    const matches3 = str.match(regex3);
    const anyMatches = matches1 || matches2 || matches3;
    const jsonString = anyMatches ? anyMatches[0] || anyMatches[1] : "";
    const foundJson = parseJson(jsonString);
    console.log("matches1", matches1);
    console.log("matches2", matches2);
    console.log("matches3", matches3);
    console.log("anyMatches", anyMatches);
    console.log("jsonString", jsonString);
    console.log("foundJson", foundJson);
    return foundJson === false ? null : foundJson;
  } catch (error) {
    console.log("I couldn't parse these submissions:", str);
    return null;
  }
}

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

export const titleCase = (str: string) =>
  str
    .replace(/^[-_]*(.)/, (_, char: string) => char.toUpperCase()) // Initial char (after -/_)
    .replace(/[-_]+(.)/g, (_, char: string) => " " + char.toUpperCase()); // First char after each -/_
