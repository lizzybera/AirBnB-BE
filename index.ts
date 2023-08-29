import express from "express";
import dotenv from "dotenv"
import { mainApp } from "./mainApp";
dotenv.config()




const port: number = parseInt(process.env.PORT!);
const app = express();
mainApp(app);

const server = app.listen(process.env.PORT || port, () => {
    console.log("server is live")
});

process.on("uncaughtException", (error: any) => {
    console.log("uncaughtException", error);

    process.exit(1);
});
process.on("unhandledRejection", (reason: any) => {
    console.log("unhandledRejection", reason);

    server.close(() => {
        process.exit(1);
    });
});