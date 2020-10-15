"use strict";

const co = require("co");
const isGenerator = require("is-generator-function");

module.exports = {
  execute,
};

function execute(fn, args) {
  const promisifyFn = isGenerator(fn) ? co.wrap(fn) : fn;
  return Promise.resolve(promisifyFn(args));
}
