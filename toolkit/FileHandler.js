'use strict';

const fs = require('fs');

const write = (filePath, fileName, fileExtension, data) => {
    fs.writeFileSync(`${filePath}/${fileName}.${fileExtension}`, data);
};

const load = (filePath) => {
    return fs.readFileSync(filePath);
};

const loadJSON = (filePath) => {
  const data = fs.readFileSync(filePath);

  return JSON.parse(data);
};

module.exports = {
    write,
    load,
    loadJSON
};