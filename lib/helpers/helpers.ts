import { Price } from 'types/stripe';

export function getURL() {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    'http://localhost:3000/';
  // Make sure to include `https://` when not localhost.
  url = url.includes('http') ? url : `https://${url}`;
  // Make sure to including trailing `/`.
  url = url.charAt(url.length - 1) === '/' ? url : `${url}/`;
  return url;
}

export async function postData(req: { url: string; data?: { price: Price } }) {
  const { url, data } = req;
  console.log('posting,', url, data);

  const res: Response = await fetch(url, {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    credentials: 'same-origin',
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    console.log('Error in postData', { url, data, res });

    throw Error(res.statusText);
  }

  return res.json();
}

export function findArrayInString(str: string) {
  const firstParseAttempt = parseJson(str);
  if (firstParseAttempt !== false && Array.isArray(firstParseAttempt)) {
    return firstParseAttempt;
  }
  try {
    const arrayString = str.slice(str.indexOf('['), str.lastIndexOf(']') + 1);
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
    str += '.';
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
