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
exports.setRole = void 0;
const http_status_codes_1 = require("http-status-codes");
const users_1 = require("../../models/users");
const setRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { role, gender } = req.body;
    const { id } = req.params;
    try {
        if (Object.keys(req.body).length === 0) {
            throw new Error('Invalid Parameter');
        }
        if (role !== 'Patient' && role !== 'Doctor') {
            throw new Error('Invalid role. Role must be "patient" or "doctor"');
        }
        if (gender !== 'Male' && gender !== 'Female') {
            throw new Error('Invalid role. Role must be "patient" or "doctor"');
        }
        const findUser = yield users_1.User.findByIdAndUpdate({ _id: id }, {
            $set: {
                role: role, gender: gender
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
exports.setRole = setRole;
