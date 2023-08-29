import mongoose from "mongoose"

export interface iuser{
    name?:string
    email?:string
    password?:string
    avatar?:string
    avatarUrl?:string
    room:{}[]
}

export interface iUserData extends iuser, mongoose.Document{}