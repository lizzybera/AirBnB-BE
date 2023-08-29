import express, { Application, NextFunction, Request, Response } from "express"
import cors from "cors"
import { HTTP, mainError } from "./error/mainError"
import { errorHandling } from "./error/ErrorHandling"

export const mainApp = (app: Application)=>{
    app.use(cors())

    app.use(express.json())

    app.get("/", (req : Request, res : Response) =>{
        try {
            return res.status(200).json({
                message : "Welcome Aboard"
            })
        } catch (error) {
            return res.status(404).json({
                message : "Error"
            })
        }
    })

    app.all("*", (req : Request, res : Response, next : NextFunction)=>{
        next(
            new mainError({
                name : "Router Error",
                message : "this router path is not correct",
                status : HTTP.BAD,
                success : false,
            })
        )
    })

    app.use(errorHandling)
}