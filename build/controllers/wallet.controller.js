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
const wallet_service_1 = __importDefault(require("../services/wallet.service"));
exports.default = {
    topUp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user_id } = res.locals.user;
                const response = yield wallet_service_1.default.topUp(user_id, req.body.amount);
                return res.status(200).json(Object.assign({ status: "top up successful" }, response));
            }
            catch (error) {
                next(error);
            }
        });
    },
    withdraw(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user_id } = res.locals.user;
                const response = yield wallet_service_1.default.withdraw(user_id, req.body.amount);
                return res.status(200).json(Object.assign({ status: "withdrawal successful" }, response));
            }
            catch (error) {
                next(error);
            }
        });
    },
    transfer(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user_id } = res.locals.user;
                const response = yield wallet_service_1.default.transfer(user_id, req.body.amount, req.body.email);
                return res.status(200).json(Object.assign({ status: "transfer successful" }, response));
            }
            catch (error) {
                next(error);
            }
        });
    },
    getBalance(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user_id } = res.locals.user;
                const response = yield wallet_service_1.default.getWallet(user_id);
                return res.status(200).json(Object.assign({}, response));
            }
            catch (error) {
                next(error);
            }
        });
    },
    getHistory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user_id } = res.locals.user;
                const response = yield wallet_service_1.default.getTransactionHistory(user_id);
                return res.status(200).json(Object.assign({}, response));
            }
            catch (error) {
                next(error);
            }
        });
    }
};
