import mongoose from "mongoose";
import { iUserData, iuser } from "../utils/interface";



const userModel = new mongoose.Schema<iuser>({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        toLowerCase:true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please fill a valid email address",
          ],
          unique:true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
    },
    avatarUrl:{
        type:String,
    },
    room:[{
        type:mongoose.Types.ObjectId,
        ref:"rooms"
    }]
},
{timestamps:true}
)

export default mongoose.model<iUserData>("users", userModel)