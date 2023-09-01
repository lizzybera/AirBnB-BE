import express, { Request, Response } from "express"
import { HTTP } from "../error/mainError"
import userModel from "../model/userModel"
import roomModel from "../model/roomModel"
import mongoose from "mongoose"
import cloudinary from "../config/cloudinary"

export const createRoom = async (req : any, res : Response)=>{
    try {
        const {userID} = req.params
        const {roomType, bedSize, Guest, price, Description, location} = req.body

        const user : any = await userModel.findById(userID)

        let data = req.files;
        let pixes: Array<string> = [];

        for (let i of data){
            const {secure_url} = await cloudinary.uploader.upload(i.path)

            pixes.push(secure_url)
        }

        const roomed : any = await roomModel.create({roomType, bedSize, Guest, price, Description, location, pixes})

        user?.room?.push(new mongoose.Types.ObjectId(roomed._id!))
        user.save()

        return res.status(HTTP.OK).json({
            message : "Room created",
            data : roomed
        })
        
    } catch (error : any ) {
        return res.status(HTTP.BAD).json({
            message : "error",
            data : error.message
        })
        
    }
}

export const viewRooms = async (req : Request, res : Response)=>{
    try {
        const roomed = await roomModel.find()

        return res.status(HTTP.OK).json({
            message : "viewing Rooms",
            data : roomed
        })
        
    } catch (error) {
        return res.status(HTTP.BAD).json({
            message : "error"
        })
    }
}

export const viewUserRooms = async (req : Request, res : Response) =>{
    try {
        const {userID} = req.params

        const user = await userModel.findById(userID).populate({
            path : "room",
            options : {
                sort : {
                    createdAt : -1
                }
            }
        })

        res.status(HTTP.OK).json({
            message : "viewing user Rooms",
            data : user
        })
    } catch (error) {
        res.status(HTTP.BAD).json({
            message : "Error" 
        })
    }
}

export const viewRoom = async (req : Request, res : Response)=>{
    try {
        const {roomID} = req.params
        const roomed = await roomModel.findById(roomID)

        return res.status(HTTP.OK).json({
            message : "viewing Room",
            data : roomed
        })
        
    } catch (error) {
        return res.status(HTTP.BAD).json({
            message : "error"
        })
    }
}
