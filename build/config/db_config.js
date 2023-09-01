"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    db: process.env.db,
    password: process.env.db_pass,
    db_user: process.env.db_user,
    host: process.env.db_host,
    port: Number(process.env.db_port)
};
