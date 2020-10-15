"use strict";

const EventEmitter = require("eventemitter2").EventEmitter2;
const request = require("./request");

class Channel extends EventEmitter {
  constructor(workerFn, workerMax) {
    super();
    this.worker = workerFn;
    this.workerMax = workerMax;
    this.requests = [];
    this.isRunning = true;
    this.currentCount = 0;
  }

  execute() {
    if (!this.isRunning) {
      return;
    }

    const isBusy = this.currentCount >= this.workerMax;
    if (isBusy) {
      setImmediate(() => this.execute());
      return;
    }

    if (this.requests.length > 0) {
      this.currentCount++;
      const task = this.requests.shift();
      request
        .execute(this.worker, task)
        .then(r => this.done(null, r))
        .catch(this.done);
    }

    if (this.currentCount <= 0) {
      this.stop();
      return;
    }

    setImmediate(() => this.execute());
  }

  stop() {
    this.isRunning = false;
    this.emit("stop");
  }

  add(args) {
    this.isRunning = true;
    this.requests.push(args);
    setImmediate(() => this.execute());
  }

  done(err, value) {
    this.emit("done", err, value);
    this.currentCount--;
  }
}

module.exports = Channel;
