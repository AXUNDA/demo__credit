"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const database_1 = __importDefault(require("../db/database"));
const argon2 = __importStar(require("argon2"));
const custom_error_1 = __importDefault(require("../errors/custom_error"));
const jwt_service_1 = __importDefault(require("./jwt.service"));
const wallet_service_1 = __importDefault(require("./wallet.service"));
const uuid_random_1 = __importDefault(require("uuid-random"));
exports.default = {
    createUser(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hash = yield argon2.hash(body.password);
                const response = yield (0, database_1.default)("users").insert({ email: body.email.toLowerCase(), password: hash, user_id: (0, uuid_random_1.default)() });
                if (response.length > 0) {
                    const user = yield this.getUser({ email: body.email });
                    const wallet = yield wallet_service_1.default.createWallet(user.user_id);
                    delete user.password;
                    delete wallet.user_id;
                    const token = yield jwt_service_1.default.sign(user);
                    return {
                        token,
                        user,
                        wallet
                    };
                }
            }
            catch (error) {
                if (error.code == "ER_DUP_ENTRY") {
                    throw new custom_error_1.default("user already exists", 409);
                }
            }
        });
    },
    login(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.getUser({ email: body.email });
            const status = yield argon2.verify(user.password, body.password);
            if (status === true) {
                delete user.password;
                const token = yield jwt_service_1.default.sign(user);
                const wallet = yield wallet_service_1.default.getWallet(user.user_id);
                return { token, wallet };
            }
            else {
                throw new custom_error_1.default("invalid credentials", 400);
            }
        });
    },
    getUser(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield (0, database_1.default)('users').select("*").from("users").where(query);
            if (data.length > 0) {
                const user = data[0];
                return user;
            }
            else {
                throw new custom_error_1.default("user not found", 404);
            }
        });
    },
};
