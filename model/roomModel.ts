import mongoose from "mongoose";
import { iRoom, iRoomData } from "../utils/interface";

const roomSchema = new mongoose.Schema<iRoom>({
    roomType : {
        type : String
    },
    bedSize : {
        type : String
    },
    Guest : {
        type : Number
    },
    price : {
        type : Number
    },
    Description : {
        type : String
    },
    location : {
        type : String
    },
    pix : {
        type : String
    },
    pixes : [{
        type : Array<String>
    }],
    user : {
        type : mongoose.Types.ObjectId,
        ref : "users"
    }
}, {timestamps : true})

export default mongoose.model<iRoomData>("rooms", roomSchema)