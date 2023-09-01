"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const errorHandler_1 = require("./middlewares/errorHandler");
const index_routes_1 = __importDefault(require("./routes/index.routes"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = __importDefault(require("http"));
dotenv_1.default.config();
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use('/', index_routes_1.default);
app.use(errorHandler_1.errorHandler);
const server = http_1.default.createServer(app);
const port = process.env.port || 3000;
server.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
exports.default = server;
