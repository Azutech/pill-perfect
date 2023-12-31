"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const auth_1 = require("./auth");
const user_1 = require("./user");
exports.routes = (0, express_1.Router)();
exports.routes.use('/auth', auth_1.auth);
exports.routes.use('/user', user_1.user);
