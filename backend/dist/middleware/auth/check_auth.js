"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.check_auth = void 0;
function check_auth({ session, body }, res, next) {
    next();
}
exports.check_auth = check_auth;
