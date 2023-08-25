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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const custom_error_1 = __importDefault(require("../errors/custom_error"));
exports.default = {
    sign(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield jsonwebtoken_1.default.sign(data, process.env.jwt_key, { expiresIn: "3d" });
        });
    },
    verify(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield jsonwebtoken_1.default.verify(token, process.env.jwt_key);
            }
            catch (error) {
                throw new custom_error_1.default('un-authorized', 409);
            }
        });
    }
};
