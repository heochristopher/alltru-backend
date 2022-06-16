import { Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'
import { User } from '../../models/User'
dotenv.config()
const cloudinary = require("cloudinary").v2

export const profilePic = async(req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.file?.path)
        // const user = await User.findById(req.body.payload._id)

    } catch (error) {
        res.status(400).json(error)
    }
}