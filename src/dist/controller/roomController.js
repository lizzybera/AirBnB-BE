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
exports.viewRoom = exports.viewUserRooms = exports.viewRooms = exports.createRoom = void 0;
const mainError_1 = require("../error/mainError");
const userModel_1 = __importDefault(require("../model/userModel"));
const roomModel_1 = __importDefault(require("../model/roomModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const createRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { userID } = req.params;
        const { roomType, bedSize, Guest, price, Description, location } = req.body;
        const user = yield userModel_1.default.findById(userID);
        let data = req.files;
        let pixes = [];
        for (let i of data) {
            const { secure_url } = yield cloudinary_1.default.uploader.upload(i.path);
            pixes.push(secure_url);
        }
        const roomed = yield roomModel_1.default.create({ roomType, bedSize, Guest, price, Description, location, pixes });
        (_a = user === null || user === void 0 ? void 0 : user.room) === null || _a === void 0 ? void 0 : _a.push(new mongoose_1.default.Types.ObjectId(roomed._id));
        user.save();
        return res.status(mainError_1.HTTP.OK).json({
            message: "Room created",
            data: roomed
        });
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD).json({
            message: "error"
        });
    }
});
exports.createRoom = createRoom;
const viewRooms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roomed = yield roomModel_1.default.find();
        return res.status(mainError_1.HTTP.OK).json({
            message: "viewing Rooms",
            data: roomed
        });
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD).json({
            message: "error"
        });
    }
});
exports.viewRooms = viewRooms;
const viewUserRooms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const user = yield userModel_1.default.findById(userID).populate({
            path: "room",
            options: {
                sort: {
                    createdAt: -1
                }
            }
        });
        res.status(mainError_1.HTTP.OK).json({
            message: "viewing user Rooms",
            data: user
        });
    }
    catch (error) {
        res.status(mainError_1.HTTP.BAD).json({
            message: "Error"
        });
    }
});
exports.viewUserRooms = viewUserRooms;
const viewRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { roomID } = req.params;
        const roomed = yield roomModel_1.default.findById(roomID);
        return res.status(mainError_1.HTTP.OK).json({
            message: "viewing Room",
            data: roomed
        });
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD).json({
            message: "error"
        });
    }
});
exports.viewRoom = viewRoom;
