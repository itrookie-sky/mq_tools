const fs = require("fs");
const path = require("./path");

/**
 * 递归文件夹
 * @param {string} filePath
 * @param {object} node
 */
function fileWalk(filePath, node) {
  let files = fs.readdirSync(filePath);
  files.forEach(walk);

  function walk(fileName) {
    if (fileName == ".DS_Store") return;
    let currentPath = path.join(filePath, `/${fileName}`);
    let stat = fs.statSync(currentPath);

    let exist = node.hasOwnProperty();

    if (stat.isDirectory()) {
      let item = {};
      if (!exist) {
        node[fileName] = item;
      }
      //递归节点
      fileWalk(currentPath, item);
    } else if (stat.isFile()) {
      node[fileName] = currentPath;
    }
  }
}

exports.fileWalk = fileWalk;
