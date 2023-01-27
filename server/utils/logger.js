"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const info = (...params) => {
    console.log(...params);
};
const error = (...parmas) => {
    console.log(...parmas);
};
exports.default = { info, error };
