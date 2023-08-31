import { Request, Response, response } from "express";
import userModel from "../model/userModel";
import cloudinary from "../config/cloudinary";
import bcrypt from "bcrypt";

export const registerUser = async (req: any, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const salt:any = await bcrypt.genSalt(10);
    const hash:any = await bcrypt.hash(password, salt);
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      req.file?.path
    );
    const user = await userModel.create({
      name,
      email,
      password: hash,
      avatar: secure_url,
      avatarUrl: public_id,
    });
    return response.status(201).json({
        message:"user created successfully",
        data: user
    })

  } catch (error:any) {
    return res.status(404).json({
      message: "user credentials required",
      data:error.message
    });
  }
};

export const siginIn = async (req:Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await userModel.findOne({email})
      const check =await bcrypt.compare(password,user?.password!)
      if (user) {
        if (check) {
            return res.status(201).json({
                message:  `welcome ${user.name}, you can either create a room or view and rent rooms`,
                data:user._id
              }); 
        } else {
            return res.status(404).json({
                message: "user not signed in",
              });
        }
      } else {
        return res.status(404).json({
            message: "user registration failed",
          });
      }
    
  
    } catch (error:any) {
      return res.status(404).json({
        message: "user credentials required",
        data:error.message
      });
    }
  };

  export const viewUsers =async(req:Request,res:Response)=>{
    try {
        const user =await userModel.find()
        return res.status(200).json({
            message:"can see all users",
            data:user
        })
    } catch (error:any) {
        return res.status(404).json({
            message: "can't view users",
            data:error.message
          });
    }
  }

  export const viewOneUser =async(req:Request,res:Response)=>{
    try {
        const {userID} =req.params
        const user =await userModel.findById(userID)
        return res.status(200).json({
            message:"can see one users",
            data:user
        })
    } catch (error:any) {
        return res.status(404).json({
            message: "can't view one user",
            data:error.message
          });
    }
}