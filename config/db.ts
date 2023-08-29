import dotenv from "dotenv"
import mongoose from "mongoose";

dotenv.config()

const URL:string = process.env.DB!

export const dbConnect = async () => {
  await mongoose.connect(URL).then(() => {
     console.log("connection to the database is established")
  })
}