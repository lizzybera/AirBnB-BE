import mongoose from "mongoose"

export interface iuser{
    name?:string
    email?:string
    password?:string
    avatar?:string
    avatarUrl?:string
    room:{}[]
}


export interface iRoom {
    roomType : string
    bedSize : string
    Guest : number
    price : number
    Description : string
    location : string
    pix : string
    pixes : Array<string>
    user : {}
}

export interface iRoomData extends iRoom, mongoose.Document {}

export interface iUserData extends iuser, mongoose.Document{}