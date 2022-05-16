import mongoose from "mongoose";
import { Router } from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
const userRouter= Router();

userRouter.post("/Signup",async(req,res)=>{
    const user= await User.create(req.body);
    res.status(201).json(user);
});

userRouter.post("/Signin",async(req,res)=>{
    const user= await User.findOne({
        email: req.body.email
    })
    if(user.password==req.body.password){
    const token = jwt.sign(JSON.stringify(user),process.env.SECRET_KEY);
    res.status(200).json({user,token});
    }
    else{
        res.status(401).json("User not found");
    }
});
export default userRouter;