"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = __importDefault(require("./auth.routes"));
const wallet_routes_1 = __importDefault(require("./wallet.routes"));
const router = express_1.default.Router();
router.use('/auth', auth_routes_1.default);
router.use('/wallet', wallet_routes_1.default);
router.get('/', (req, res, next) => {
    res.status(200).json({
        status: "active",
        docs: "https://github.com/AXUNDA/demo__credit"
    });
});
exports.default = router;
