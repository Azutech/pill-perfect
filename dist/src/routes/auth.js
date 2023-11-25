"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const express_1 = require("express");
const Auth_1 = require("../controllers/Auth");
exports.auth = (0, express_1.Router)();
exports.auth.post('/registration', Auth_1.registration);
exports.auth.post('/setRole/:id', Auth_1.setRole);
exports.auth.post('/password/:id', Auth_1.password);
