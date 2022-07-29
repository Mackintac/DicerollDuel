"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.time_stamp = exports.InternalError = exports.GlobImport = exports.sql = void 0;
const glob_1 = __importDefault(require("glob"));
const sql_template_strings_1 = __importDefault(require("sql-template-strings"));
const env_1 = require("src/util/env");
exports.sql = sql_template_strings_1.default;
function GlobImport({ path, file_ext, }) {
    return __awaiter(this, void 0, void 0, function* () {
        !file_ext && (file_ext = '');
        return (yield new Promise((resolve, _reject) => {
            (0, glob_1.default)(env_1.cfg.rootdir + path + '/**/*' + file_ext, function (_error, res) {
                Promise.all(res
                    .filter((f) => !f.endsWith('.test.js') &&
                    !f.endsWith('.spec.js') &&
                    !f.endsWith('.test.ts') &&
                    !f.endsWith('.spec.ts'))
                    .map((file) => Promise.resolve().then(() => __importStar(require(file.replace(env_1.cfg.rootdir, 'src')))))).then((m) => resolve(m));
            });
        }).then((m) => m)).map((m) => m.default);
    });
}
exports.GlobImport = GlobImport;
function InternalError(error) {
    return {
        json: {
            status: 'failure',
            msg: error.message,
        },
        code: 500,
    };
}
exports.InternalError = InternalError;
function time_stamp() {
    const t = new Date();
    return `>> ${t.getHours()}:${t.getMinutes()}:${t.getSeconds()}`;
}
exports.time_stamp = time_stamp;
