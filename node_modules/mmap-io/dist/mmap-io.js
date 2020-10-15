"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mmap_lib_raw_ = require("../build/Release/mmap-io");
// snatch the raw C++-sync func
const raw_sync_fn_ = mmap_lib_raw_.sync_lib_private__;
// Hide the original C++11 func from users
delete mmap_lib_raw_.sync_lib_private__;
// Take care of all the param juggling here instead of in C++ code, by making
// some overloads, and doing some argument defaults /ozra
mmap_lib_raw_.sync = function (buf, par_a, par_b, par_c, par_d) {
    if (typeof par_a === "boolean") {
        raw_sync_fn_(buf, 0, buf.length, par_a, par_b || false);
    }
    else {
        raw_sync_fn_(buf, par_a || 0, par_b || buf.length, par_c || false, par_d || false);
    }
};
// mmap_lib_raw_.sync = sync_
const mmap = mmap_lib_raw_;
module.exports = mmap;
exports.default = mmap;
