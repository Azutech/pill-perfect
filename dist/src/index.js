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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("./connections/database"));
const server_1 = __importDefault(require("./server"));
const debug_1 = __importDefault(require("debug"));
const logger_1 = require("./middlewares/logger");
dotenv_1.default.config();
const config_1 = require("./utils/config");
const httpServer = http_1.default.createServer(server_1.default);
const debugLog = (0, debug_1.default)('server');
const app = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        httpServer.listen(config_1.PORT, () => {
            logger_1.logger.info(`Pill Perfect is listening at http://localhost:${config_1.PORT} 🚀🚀`);
        });
        (0, database_1.default)().catch((err) => console.error(err));
    }
    catch (err) {
        console.error(err);
    }
});
app();
exports.default = httpServer;
