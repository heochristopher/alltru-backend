import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcryptjs'
import { adminJoi } from '../schemas'
import dotenv from 'dotenv'
import { User } from '../../../models/User'
import { Role } from '../../../models/enums/Role'
dotenv.config()

export const adminRegister = async (req: Request, res: Response) => {
    try {
        await adminJoi.validateAsync(req.body)
        //find an existing user
        let doesExist = await User.findOne({ email: req.body.email });
        if (doesExist) return res.status(400).send("User already registered.");
        const admin = new User(req.body)
        admin.password = await bcrypt.hash(req.body.password, 10);
        admin.role = Role.Admin
        await admin.save();
        res.status(200).json(`Welcome, Admin ${admin.firstName}`)
    } catch (error) {
        res.status(400).json(error)
    }
}