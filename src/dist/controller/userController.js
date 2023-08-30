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
exports.viewOneUser = exports.viewUsers = exports.siginIn = exports.registerUser = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { name, email, password } = req.body;
        const salt = yield bcrypt_1.default.genSalt(10);
        const hash = yield bcrypt_1.default.hash(password, salt);
        const { secure_url, public_id } = yield cloudinary_1.default.uploader.upload((_a = req.file) === null || _a === void 0 ? void 0 : _a.path);
        const user = yield userModel_1.default.create({
            name,
            email,
            password: hash,
            avatar: secure_url,
            avatarUrl: public_id,
        });
        return res.status(201).json({
            message: "user created successfully",
            data: user
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "user credentials required",
            data: error.message
        });
    }
});
exports.registerUser = registerUser;
const siginIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield userModel_1.default.findOne({ email });
        const check = yield bcrypt_1.default.compare(password, user === null || user === void 0 ? void 0 : user.password);
        if (user) {
            if (check) {
                return res.status(201).json({
                    message: `welcome ${user.name}, you can either create a room or view and rent rooms`,
                    data: user._id
                });
            }
            else {
                return res.status(404).json({
                    message: "user not signed in",
                });
            }
        }
        else {
            return res.status(404).json({
                message: "user registration failed",
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: "user credentials required",
            data: error.message
        });
    }
});
exports.siginIn = siginIn;
const viewUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.default.find();
        return res.status(200).json({
            message: "can see all users",
            data: user
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "can't view users",
            data: error.message
        });
    }
});
exports.viewUsers = viewUsers;
const viewOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const user = yield userModel_1.default.findById(userID);
        return res.status(200).json({
            message: "can see one users",
            data: user
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "can't view one user",
            data: error.message
        });
    }
});
exports.viewOneUser = viewOneUser;
