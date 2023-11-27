"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allUsers = void 0;
const http_status_codes_1 = require("http-status-codes");
const users_1 = require("../../models/users");
const allUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield users_1.User.find();
        if (user.length === 0) {
            throw new Error('Users not found 🔍');
        }
        return res.status(http_status_codes_1.StatusCodes.OK).json(user);
    }
    catch (err) {
        console.error(err.message);
        const statusMap = {
            'Users not found 🔍': http_status_codes_1.StatusCodes.NOT_FOUND,
        };
        const statusCode = statusMap[err.message] || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
        return res.status(statusCode).json({ error: err.message });
    }
});
exports.allUsers = allUsers;
