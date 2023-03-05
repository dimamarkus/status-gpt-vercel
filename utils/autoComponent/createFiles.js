const {IGNORED_NAMES} = require("./config.js");
const {getFileAge, fileExists, getPathEnding, toTitleCase, getPathParent} = require("./utils.js");
const {templates} = require("./templates.js");
const fs = require("fs");

const isAComponentFolder = (path) => {
  const folderWasRecentlyCreated = getFileAge(path) < 5000 // 5 seconds;
  const folderName = getPathEnding(path);
  const isComponentGroupFolder = IGNORED_NAMES.includes(folderName.toLowerCase());

  return folderWasRecentlyCreated && !isComponentGroupFolder
}

const writeToPath = (path) => (file, content) => {
  const filePath = `${path}/${file}`;

  fs.writeFile(filePath, content, err => {
    if (err) throw err;
    console.log("Created file: ", filePath);
    return true;
  });
};

const capitalizeFolder = (currPath) => {
  const folderName = getPathEnding(currPath)
  const capitalizedFolderName = toTitleCase(folderName)
  const newPath = currPath.replace(folderName, capitalizedFolderName)
  fs.rename(currPath, newPath, function(err) {
    if (err) {
      console.log(err)
    } else {
      console.log(`Successfully renamed ${currPath} to ${newPath} the directory.`)
    }
  })
}

module.exports.createFiles = function(path, name) {
  if (isAComponentFolder(path)) {
    console.log('---------------------------------------------------------------- ')
    console.log(`Detected new component: ${name}, ${path}`);
    const files = {
      index: `${name}.tsx`,
      sass: `${name}.module.scss`,
      story: `${name}.stories.tsx`,
      test: `${name}.cy.tsx`,
    };

    const toFileMissingBool = file => !fileExists(path)(file);
    const checkAllMissing = (acc, cur) => acc && cur;
    const noneExist = Object.values(files)
    .map(toFileMissingBool)
    .reduce(checkAllMissing);

    if (noneExist) {
      capitalizeFolder(path)
      const folderName = getPathParent(path)
      const writeFile = writeToPath(path);
      Object.entries(files).forEach(([type, fileName]) => {
        writeFile(fileName, templates[type](name, folderName));
      });
    }
  }
}
