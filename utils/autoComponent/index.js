
const {WATCH_FOLDER} = require("./config.js");
const {createFiles} = require("./createFiles.js");
const {getPathEnding, toTitleCase} = require("./utils.js");
const chokidar = require("chokidar");

console.log(`Watching ${WATCH_FOLDER} for new folders...`)

const watcher = chokidar
  .watch(WATCH_FOLDER, { ignored: /node_modules/, ignoreInitial: true })
  .on("addDir", (path, event) => {
    // const name = path.replace(/.*\/ui\//, "");
    const name = getPathEnding(path)
    const uppercaseName = toTitleCase(name)
    const shouldCreate = name.includes("/")
    if (!name.includes("/")) createFiles(path, uppercaseName);
  });