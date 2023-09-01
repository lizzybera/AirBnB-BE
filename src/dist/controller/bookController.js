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
exports.viewOneBook = exports.viewAllBookings = exports.viewBookedRoom = exports.createBooking = void 0;
const mainError_1 = require("../error/mainError");
const roomModel_1 = __importDefault(require("../model/roomModel"));
const bookModel_1 = __importDefault(require("../model/bookModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const createBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { roomID, userID } = req.params;
        const room = yield roomModel_1.default.findById(roomID);
        const { checkIn, checkOut } = req.body;
        const book = yield bookModel_1.default.create({
            userID, checkIn, checkOut, isAvailabe: false
        });
        (_a = room === null || room === void 0 ? void 0 : room.book) === null || _a === void 0 ? void 0 : _a.push(new mongoose_1.default.Types.ObjectId(book._id));
        room === null || room === void 0 ? void 0 : room.save();
        return res.status(mainError_1.HTTP.CREATE).json({
            message: "Book created successfully",
            data: book
        });
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD).json({
            message: "couldn't book room"
        });
    }
});
exports.createBooking = createBooking;
// not to sure about this end point ohh, i am trying to write an end point to see 
// if the user can view all his rooms he booked on the platform
const viewBookedRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { roomID } = req.params;
        const room = yield roomModel_1.default.findById(roomID).populate({
            path: "book",
            options: {
                sort: {
                    createdAt: -1
                }
            }
        });
        return res.status(mainError_1.HTTP.OK).json({
            message: "can view all booked rooms",
            data: room
        });
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD).json({
            message: "couldn't view all booked rooms",
            data: error.message
        });
    }
});
exports.viewBookedRoom = viewBookedRoom;
const viewAllBookings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield bookModel_1.default.find();
        return res.status(mainError_1.HTTP.OK).json({
            message: "success",
            data: book
        });
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD).json({
            message: "couldn't view all booked rooms",
            data: error.message
        });
    }
});
exports.viewAllBookings = viewAllBookings;
const viewOneBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookID } = req.params;
        const book = yield bookModel_1.default.findById(bookID);
        return res.status(mainError_1.HTTP.OK).json({
            message: "can see one booked",
            data: book
        });
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD).json({
            message: "couldn't view all booked rooms",
            data: error.message
        });
    }
});
exports.viewOneBook = viewOneBook;
