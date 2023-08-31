import { Request,Response } from "express";
import { HTTP } from "../error/mainError";
import roomModel from "../model/roomModel";
import userModel from "../model/userModel";
import bookModel from "../model/bookModel";
import mongoose from "mongoose";


export const createBooking =async(req:Request, res:Response)=>{
    try {
        const {roomID,userID}= req.params
        const room:any =await roomModel.findById(roomID)

        const { checkIn,checkOut}=req.body

        const book:any =await bookModel.create({
            userID, checkIn, checkOut, isAvailabe:false
        })

        room?.book?.push(new mongoose.Types.ObjectId(book._id!));
        room?.save();
        return res.status(HTTP.CREATE).json({
            message:"Book created successfully",
            data:book
        })
    } catch (error:any) {
        return res.status(HTTP.BAD).json({
            message:"couldn't book room"
        })
    }
}


// not to sure about this end point ohh, i am trying to write an end point to see 
// if the user can view all his rooms he booked on the platform
export const viewBookedRoom = async(req: Request, res: Response)=>{
    try {
        const {roomID} =req.params
        const room =await roomModel.findById(roomID).populate({
            path:"book" ,
            options : {
                sort : {
                    createdAt : -1
                }
            }

        })
        return res.status(HTTP.OK).json({
            message:"can view all booked rooms",
            data:room
        })
    } catch (error:any) {
        return res.status(HTTP.BAD).json({
            message:"couldn't view all booked rooms",
            data:error.message
        })
    }
}

export const viewAllBookings =async(req:Request, res:Response)=>{
    try {
        const book = await bookModel.find()
        return res.status(HTTP.OK).json({
            message:"success",
            data:book
        })
    } catch (error:any) {
        return res.status(HTTP.BAD).json({
            message:"couldn't view all booked rooms",
            data:error.message
        })
    }
}

export const viewOneBook = async(req: Request, res: Response)=>{
    try {
        const {bookID} =req.params
        const book =await bookModel.findById(bookID)
        return res.status(HTTP.OK).json({
            message:"can see one booked",
            data:book
        })
    } catch (error:any) {
        return res.status(HTTP.BAD).json({
            message:"couldn't view all booked rooms",
            data:error.message
        })
    }
}