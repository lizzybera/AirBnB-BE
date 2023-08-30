"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainApp = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mainError_1 = require("./error/mainError");
const ErrorHandling_1 = require("./error/ErrorHandling");
const userRouter_1 = __importDefault(require("./router/userRouter"));
const roomRouter_1 = __importDefault(require("./router/roomRouter"));
const mainApp = (app) => {
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    app.get("/", (req, res) => {
        try {
            return res.status(200).json({
                message: "Welcome Aboard"
            });
        }
        catch (error) {
            return res.status(404).json({
                message: "Error"
            });
        }
    });
    app.use("/api/v1", userRouter_1.default);
    app.use("/api/v1", roomRouter_1.default);
    app.all("*", (req, res, next) => {
        next(new mainError_1.mainError({
            name: "Router Error",
            message: "this router path is not correct",
            status: mainError_1.HTTP.BAD,
            success: false,
        }));
    });
    app.use(ErrorHandling_1.errorHandling);
};
exports.mainApp = mainApp;
