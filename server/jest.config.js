"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @type {import('ts-jest').JestConfigWithTsJest} */
const config = {
    //   verbose: true,
    testEnvironment: "node",
    preset: "ts-jest",
    testPathIgnorePatterns: ["/node_modules/", "/utils"],
    compilerOptions: {
        // ... rest
        typeRoots: ["./node_modules/@types", "./typings"],
    },
};
exports.default = config;
