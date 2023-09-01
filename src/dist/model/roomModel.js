"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const roomSchema = new mongoose_1.default.Schema({
    roomType: {
        type: String
    },
    bedSize: {
        type: String
    },
    Guest: {
        type: Number
    },
    price: {
        type: Number
    },
    Description: {
        type: String
    },
    location: {
        type: String
    },
    pix: {
        type: String
    },
    pixes: [{
            type: (Array)
        }],
    user: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "users"
    }
}, { timestamps: true });
exports.default = mongoose_1.default.model("rooms", roomSchema);
