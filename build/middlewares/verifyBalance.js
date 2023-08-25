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
function verifyBalance(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { user_id } = res.locals.user;
            const { amount } = req.body;
            const wallet = yield wallet_service_1.default.getWallet(user_id);
            if (parseFloat(amount.toFixed(2)) > parseFloat(wallet.balance.toFixed(2))) {
                return res.status(400).json({
                    success: false,
                    error: "insufficient funds"
                });
            }
            return next();
        }
        catch (error) {
            return res.status(500).json({ error: "an error occurred" });
        }
    });
}
exports.default = verifyBalance;