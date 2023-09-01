"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const roomController_1 = require("../controller/roomController");
const multer_1 = require("../config/multer");
const router = express_1.default.Router();
router.route("/viewRooms").get(roomController_1.viewRooms);
router.route("/:roomID/viewRoom").get(roomController_1.viewRoom);
router.route("/:userID/viewUserRoom").get(roomController_1.viewUserRooms);
router.route("/:userID/createRoom").post(multer_1.upload, roomController_1.createRoom);
exports.default = router;
