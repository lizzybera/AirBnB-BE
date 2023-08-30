import express from "express"
import { createRoom, viewRoom, viewRooms, viewUserRooms } from "../controller/roomController"
import { multiplePics } from "../config/multer"

const router = express.Router()

router.route("/viewRooms").get(viewRooms)
router.route("/:roomID/viewRoom").get(viewRoom)
router.route("/:userID/viewUserRoom").get(viewUserRooms)
router.route("/:userID/createRoom").post( 
    multiplePics ,
    createRoom)

export default router