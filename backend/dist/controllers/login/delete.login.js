"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logout = void 0;
function Logout(req, res) {
    let { session } = req;
    if (!session.username) {
        res.status(202).json({
            status: 'No account to logout.',
        });
        return;
    }
    session.destroy(() => (session.cookie.expires = new Date()));
    res.status(200).json({
        status: 'Logout Successful',
    });
}
exports.Logout = Logout;
