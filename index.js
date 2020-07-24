#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const rimraf = require("rimraf");

// const expiredTime = 1000 * 60 * 60 * 24 * 30 * 2 // 2 月
function findPath(root) {
  fs.readdir(root, (err, files) => {
    files.forEach(filename => {
      const realPath = path.join(root, filename);
      fs.stat(realPath, (_, stats) => {
        if (!stats.isDirectory()) {
          return;
        }
        if (filename === "node_modules") {
          // if (Date.now() - stats.ctimeMs > expiredTime) {
          console.log("deleting", realPath);
          rimraf(realPath, () => {
            console.log(`success delete ${realPath}`)
          })
          // }
          return;
        }
        findPath(realPath);
      });
    });
  });
}

findPath(process.cwd());
