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
exports.registration = void 0;
const http_status_codes_1 = require("http-status-codes");
const users_1 = require("../../models/users");
const registration = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, phoneNumber, password } = req.body;
    try {
        const existingUser = yield users_1.User.findOne({ email });
        if (existingUser) {
            throw new Error('User already exist');
        }
        const newUser = new users_1.User({
            firstName,
            lastName,
            email,
            password,
            phoneNumber,
        });
        if (!newUser) {
            throw new Error('Unable to add Users');
        }
        yield newUser.save();
        return res
            .status(http_status_codes_1.StatusCodes.CREATED)
            .json({ message: 'New User has been added', newUser });
    }
    catch (err) {
        console.error(err.message);
        const statusMap = {
            'User already exist': http_status_codes_1.StatusCodes.CONFLICT,
            'Unable to add Users': http_status_codes_1.StatusCodes.BAD_REQUEST,
        };
        const statusCode = statusMap[err.message] || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
        return res.status(statusCode).json({ error: err.message });
    }
});
exports.registration = registration;
