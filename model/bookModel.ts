import mongoose  from "mongoose";
import { iBook, iBookData } from "../utils/interface";

const bookModel = new mongoose.Schema<iBook>({
    checkIn:{
        type:String,
        required:true,
    },
    checkOut:{
        type:String,
        required:true,
    },
    userID:{
        type:String
    },
    room:{
        type:mongoose.Types.ObjectId,

    },
    isAvailabe:{
        type:Boolean,
        default:true
    }
},
{timestamps:true}
)


export default mongoose.model<iBookData>("books", bookModel)