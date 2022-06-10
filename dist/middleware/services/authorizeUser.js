"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeUser = void 0;
const authorizeUser = (req, res, next, role) => {
    const user = req.body.payload;
    if (user.role !== role) {
        return res.status(400).json('You are not authorized');
    }
    next();
    //get middleware param from
};
exports.authorizeUser = authorizeUser;
