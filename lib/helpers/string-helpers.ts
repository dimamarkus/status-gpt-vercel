import { inProdEnv } from "#/lib/helpers/env-helpers";

export function findJsonInString(str: string) {
  const firstParseAttempt = parseJson(str);
  if (firstParseAttempt !== false) {
    return firstParseAttempt;
  }
  try {
    const regex1 = /```json([^```]*)```/gm;
    const regex2 = /```([^```]*)```/gm;
    const regex3 = /{([^}]*)}/;
    const matches1 = str.match(regex1);
    const matches2 = str.match(regex2);
    const matches3 = str.match(regex3);

    const parse1 = matches1 && matches1[0].replace(/```json/gm, "");
    const parse2 = matches2 && matches2[0].replace(/```/gm, "");
    const parse3 = matches3 && matches3[0];

    const result1 = parse1 && parseJson(parse1);
    const result2 = parse2 && parseJson(parse2);
    const result3 = parse3 && parseJson(parse3);

    const anyMatches = matches1 || matches2 || matches3;
    const jsonString = anyMatches ? anyMatches[0] || anyMatches[1] : "";
    // const foundJson = parseJson(jsonString);
    const foundJson = result1 || result2 || result3;
    if (!inProdEnv) {
      console.log("-----------------------------------------------------------");
      console.log("str", str);
      console.log("-----------------------------------------------------------");
      console.log("matches1", matches1);
      console.log("parse1", parse1);
      console.log("result1", result1);
      console.log("----------------");
      console.log("matches2", matches2);
      console.log("parse2", parse2);
      console.log("result2", result2);
      console.log("----------------");
      console.log("matches3", matches3);
      console.log("parse3", parse3);
      console.log("result3", result3);
      console.log("----------------");
      console.log("anyMatches", anyMatches);
      console.log("jsonString", jsonString);
      console.log("foundJson", foundJson);
    }
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
    !inProdEnv && console.log("I couldn't parse these suggestions:", str);
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
    !inProdEnv && console.log("I couldn't parse these suggestions:", str);
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

export function camelToTitleCase(camelCaseText: string): string {
  if (!camelCaseText) return "";
  let titleCaseText = camelCaseText
    .replace("_", " ") // Add space before each capital letter
    .replace(/([A-Z])/g, " $1") // Add space before each capital letter
    .replace(/([A-Za-z])([0-9])/g, "$1 $2") // Add space between a letter and a number
    .replace(/([0-9])([A-Za-z])/g, "$1 $2") // Add space between a number and a letter
    .trim();

  // Capitalize each word
  titleCaseText = titleCaseText
    .toLowerCase()
    .replace(/(?:^|\s)\S/g, (letter) => letter.toUpperCase());

  return titleCaseText;
}

export function nFormatter(num: number, digits?: number) {
  if (!num) return "0";
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "K" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item ? (num / item.value).toFixed(digits || 1).replace(rx, "$1") + item.symbol : "0";
}
