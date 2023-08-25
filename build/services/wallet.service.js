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
const database_1 = __importDefault(require("../db/database"));
const custom_error_1 = __importDefault(require("../errors/custom_error"));
const auth_service_1 = __importDefault(require("./auth.service"));
const uuid_random_1 = __importDefault(require("uuid-random"));
exports.default = {
    getWallet(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield (0, database_1.default)('wallet').select("*").from("wallet").where({ user_id });
            if (data.length > 0) {
                return data[0];
            }
            else {
                throw new custom_error_1.default("wallet not found", 404);
            }
        });
    },
    createWallet(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield (0, database_1.default)('wallet').insert({ user_id, wallet_id: (0, uuid_random_1.default)() });
            if (data.length > 0) {
                const wallet = yield this.getWallet(user_id);
                console.log(wallet);
                return wallet;
            }
            else {
                throw new custom_error_1.default("unable to create wallet", 500);
            }
        });
    },
    topUp(user_id, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            const amountInFloat = this.toFloat(amount);
            const { email } = yield auth_service_1.default.getUser({ user_id });
            yield database_1.default.transaction((trx) => __awaiter(this, void 0, void 0, function* () {
                yield trx('wallet').where({ user_id }).increment("balance", amountInFloat);
                yield trx('transaction_history').insert({
                    transaction_id: (0, uuid_random_1.default)(),
                    sender: email,
                    amount: amountInFloat,
                    transaction_type: "deposit",
                    beneficiary: 'self_',
                    sender_user_id: user_id,
                    recipient_user_id: "same as sender_user_id"
                });
            }));
            const wallet = yield this.getWallet(user_id);
            return wallet;
        });
    },
    withdraw(user_id, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            const amountInFloat = this.toFloat(amount);
            const { email } = yield auth_service_1.default.getUser({ user_id });
            yield database_1.default.transaction((trx) => __awaiter(this, void 0, void 0, function* () {
                yield trx('wallet').where({ user_id }).decrement("balance", amountInFloat);
                yield trx('transaction_history').insert({
                    transaction_id: (0, uuid_random_1.default)(),
                    sender: email,
                    amount: amountInFloat,
                    transaction_type: "withdrawal",
                    beneficiary: 'self_',
                    sender_user_id: user_id,
                    recipient_user_id: "same as sender_user_id"
                });
            }));
            const wallet = yield this.getWallet(user_id);
            return wallet;
        });
    },
    transfer(user_id, amount, recipient_email) {
        return __awaiter(this, void 0, void 0, function* () {
            const sender = yield auth_service_1.default.getUser({ user_id });
            if (sender.email == recipient_email) {
                throw new custom_error_1.default(" you can not send money to yourself", 400);
            }
            const amountInFloat = this.toFloat(amount);
            const recipient = yield auth_service_1.default.getUser({ email: recipient_email });
            yield database_1.default.transaction((trx) => __awaiter(this, void 0, void 0, function* () {
                yield trx('wallet').where({ user_id }).decrement("balance", amountInFloat);
                yield trx('wallet').where({ user_id: recipient.user_id }).increment("balance", amountInFloat);
                yield trx('transaction_history').insert({
                    transaction_id: (0, uuid_random_1.default)(),
                    sender: sender.email,
                    amount: amountInFloat,
                    transaction_type: "transfer",
                    beneficiary: recipient.email,
                    sender_user_id: user_id,
                    recipient_user_id: recipient.user_id
                });
            }));
            const wallet = yield this.getWallet(user_id);
            return wallet;
        });
    },
    toFloat(amount) {
        return parseFloat(amount.toFixed(2));
    },
    getTransactionHistory(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const history = yield (0, database_1.default)('transaction_history').select("*").from("transaction_history").where({ sender_user_id: user_id }).orWhere({ recipient_user_id: user_id });
            return history;
        });
    }
};
