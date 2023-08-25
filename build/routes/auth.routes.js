"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const validateJson_1 = __importDefault(require("../middlewares/validateJson"));
const user_schema_1 = require("../schema/user.schema");
const router = express_1.default.Router();
router.post('/', (0, validateJson_1.default)(user_schema_1.createUserSchema), auth_controller_1.default.signUp);
router.post('/signin', (0, validateJson_1.default)(user_schema_1.createUserSchema), auth_controller_1.default.signIn);
exports.default = router;
