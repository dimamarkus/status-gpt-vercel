export function currentDate() {
  const date = new Date();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  return `${month}-${day}`;
}

export function toDateTime(secs: number) {
  var t = new Date("1970-01-01T00:30:00Z"); // Unix epoch start.
  t.setSeconds(secs);
  return t;
}

export function getCurrentTime() {
  const currentDateTime = new Date();
  const currentTime = currentDateTime.toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return currentTime;
}
