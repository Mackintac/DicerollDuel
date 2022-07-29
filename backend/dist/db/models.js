"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.models = void 0;
const util_1 = require("src/util/util");
exports.models = (0, util_1.GlobImport)({
    path: '/db/models',
    file_ext: '.model.*',
});
