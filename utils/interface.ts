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
    pixes : string
    user : {}
}

export interface iBook {
userID?:string
checkIn?:string
checkOut?:string
room?:{}
isAvailabe?:boolean

}

export interface iBookData extends iBook, mongoose.Document{}

export interface iRoomData extends iRoom, mongoose.Document {}

export interface iUserData extends iuser, mongoose.Document{}