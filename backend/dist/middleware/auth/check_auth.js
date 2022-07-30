"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.check_auth = void 0;
function check_auth({ session, body }, res, next) {
    console.log(body);
    if (!session || !session.username) {
        res.status(401).json({
            status: 'Not Authorized',
        });
        return;
    }
    next();
}
exports.check_auth = check_auth;
