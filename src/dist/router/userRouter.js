"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controller/userController");
const multer_1 = require("../config/multer");
exports.router = express_1.default.Router();
exports.router.route('/registerUser').post(multer_1.upload, userController_1.registerUser);
exports.router.route('/siginIn').post(userController_1.siginIn);
exports.router.route('/viewUsers').get(userController_1.viewUsers);
exports.router.route('/:id/viewOneUser').get(userController_1.viewOneUser);
exports.default = exports.router;
