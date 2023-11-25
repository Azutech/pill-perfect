"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const http_status_codes_1 = require("http-status-codes");
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes");
dotenv_1.default.config();
const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies and credentials to be sent with the request
};
const server = (0, express_1.default)();
server.use((0, cors_1.default)(corsOptions));
server.use((0, cookie_parser_1.default)());
server.use(express_1.default.json());
server.use((0, helmet_1.default)());
server.use('/api/v1', routes_1.routes);
server.get('/', (req, res) => {
    res.status(http_status_codes_1.StatusCodes.OK).json({
        message: 'Welcome To PillPerfect 💊💊 ',
    });
});
server.get('*', (req, res) => {
    res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ message: 'route not found 🔎' });
});
exports.default = server;
