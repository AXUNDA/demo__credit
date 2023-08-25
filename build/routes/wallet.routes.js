"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const wallet_controller_1 = __importDefault(require("../controllers/wallet.controller"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const checkToken_1 = __importDefault(require("../middlewares/checkToken"));
const verifyBalance_1 = __importDefault(require("../middlewares/verifyBalance"));
router.use(checkToken_1.default);
router.get('/', wallet_controller_1.default.getBalance);
router.post('/transfer', verifyBalance_1.default, wallet_controller_1.default.transfer);
router.post('/withdraw', verifyBalance_1.default, wallet_controller_1.default.withdraw);
router.post('/deposit', wallet_controller_1.default.topUp);
router.get('/history', wallet_controller_1.default.getHistory);
exports.default = router;
