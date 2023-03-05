const fs = require('fs');

module.exports.getPathEnding = currPath => currPath.substring(currPath.lastIndexOf('/') + 1)

module.exports.getPathParent = currPath => {
  const pathArray = currPath.split('/')
  return pathArray[pathArray.length - 2]
}

module.exports.fileExists = path => file => fs.existsSync(`${path}/${file}`);

module.exports.getFileAge = (path) => {
  const creationTime = fs.statSync(path).birthtimeMs;
  const currentTime = Date.now();
  return currentTime - creationTime
}

module.exports.toTitleCase = (str) => {
  return str.replace(
    /\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1);
    }
  );
}
