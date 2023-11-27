"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
const express_1 = require("express");
const user_1 = require("../controllers/user");
exports.user = (0, express_1.Router)();
exports.user.get('/dashboard/:id', user_1.userdashboard);
exports.user.get('/users', user_1.allUsers);
