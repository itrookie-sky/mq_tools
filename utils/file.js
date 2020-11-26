const fs = require("fs");
const path = require("./path");

/**
 *
 * @param {string} filePath
 * @param {object} steps
 */
function fileDisplay(filePath, steps) {}

let dir = path.resolve("../mq_conf_test");
let steps = {};
fileDisplay(dir, steps);
console.log(steps);
