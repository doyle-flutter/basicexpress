"use strict";

const Channel = require("./channel");

module.exports = {
  createChannel,
};

function createChannel(worker, count) {
  return new Channel(worker, count);
}
