import express from "express";
import { registerUser, siginIn, viewOneUser, viewUsers } from "../controller/userController";
import {upload} from '../config/multer'


export const router = express.Router()

router.route('/registerUser').post(
    upload, 
    registerUser);

router.route('/siginIn').post( siginIn);

router.route('/viewUsers').get(viewUsers);

router.route('/:id/viewOneUser').get( viewOneUser);

export default router;