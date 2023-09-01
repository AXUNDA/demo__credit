"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transferSchema = void 0;
const zod_1 = require("zod");
exports.transferSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        recipient_email: (0, zod_1.string)({
            required_error: " recipient email is required"
        }).email("a valid email is required"),
        amount: (0, zod_1.number)({
            required_error: "transfer amount is required"
        }).min(10, "minimum amount is 10").max(1000, "maximum amount is 1000")
    })
});
