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
exports.password = void 0;
const http_status_codes_1 = require("http-status-codes");
const validatePassword_1 = require("../../utils/validatePassword");
const brcypt_1 = require("../../utils/brcypt");
const users_1 = require("../../models/users");
const password = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, comfirmPassword } = req.body;
    const { id } = req.params;
    try {
        if (Object.keys(req.body).length === 0) {
            throw new Error('Invalid Parameter');
        }
        if (password !== comfirmPassword) {
            throw new Error('password does not match');
        }
        const validPassword = (0, validatePassword_1.validatePassword)(password);
        if (!validPassword) {
            throw new Error('Password must be at least 8 characters long, with at least 1 uppercase letter, 1 lowercase letter, and 1 symbol');
        }
        const hash = yield (0, brcypt_1.hashPassword)(password);
        const findUser = yield users_1.User.findByIdAndUpdate({ _id: id }, {
            $set: {
                password: hash
            },
        }, { new: true });
        if (!findUser) {
            throw new Error('User not found');
        }
        return res.status(http_status_codes_1.StatusCodes.OK).json({ message: "Success 🎉", });
    }
    catch (err) {
        console.error(err.message);
        const statusMap = {
            'User not found 🔍': http_status_codes_1.StatusCodes.NOT_FOUND,
        };
        const statusCode = statusMap[err.message] || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
        return res.status(statusCode).json({ error: err.message });
    }
});
exports.password = password;
