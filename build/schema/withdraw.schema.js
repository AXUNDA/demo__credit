"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withdrawSchema = void 0;
const zod_1 = require("zod");
exports.withdrawSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        amount: (0, zod_1.number)({
            required_error: " amount is required",
        }).min(10, "minimum amount is 10").max(1000, "maximum amount is 1000")
    })
});
