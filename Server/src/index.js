import mongoose from "mongoose";
import cors from "cors";
import express from "express";
import "dotenv/config";
import userRouter from "./routes/User.js";
import ticketRouter from "./routes/Tickets.js";


const app= express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MOOD_URL,()=>{console.log("Is SAALA CUP NAMDE");
});

app.use("/user",userRouter);
app.use("/ticket",ticketRouter);

app.listen(8000,()=>{console.log("Accha hai me andha hun");
});
