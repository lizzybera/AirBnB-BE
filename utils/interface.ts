import mongoose from "mongoose"

export interface iuser{
    name?:string
    email?:string
    password?:string
    avatar?:string
    avatarUrl?:string
    room:{}[]
}
export interface iBook {

}
export interface iBookData extends iBook, mongoose.Document{}

export interface iUserData extends iuser, mongoose.Document{}