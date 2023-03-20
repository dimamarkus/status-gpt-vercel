let inDevEnv = false;
let inTestEnv = false;
let inProdEnv = true;

if (process) {
  if (process.env.NODE_ENV === "development") {
    inDevEnv = true;
    inTestEnv = false;
    inProdEnv = false;
  } else if (process.env.NODE_ENV === "test") {
    inDevEnv = false;
    inTestEnv = true;
    inProdEnv = false;
  }
}

export { inDevEnv, inTestEnv, inProdEnv };
