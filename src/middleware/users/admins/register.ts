import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcryptjs'
import { adminJoi } from '../../schemas'
import dotenv from 'dotenv'
import { Admin } from '../../../models/Admin'
import { User } from '../../../models/User'
dotenv.config()

export const adminRegister = async (req: Request, res: Response) => {
    try {
        await adminJoi.validateAsync(req.body)
        //find an existing user
        let doesExist = await Admin.findOne({ email: req.body.email });
        if (doesExist) return res.status(400).send("User already registered.");
        const admin = new Admin(req.body)
        admin.password = await bcrypt.hash(req.body.password, 10);
        await admin.save();
        //save in shared collection
        const user = new User({email: req.body.email,password: admin.password, role: req.body.role})
        await user.save()
        res.status(200).json(`Welcome, Admin ${admin.firstName}`)
    } catch (error) {
        res.status(400).json(error)
    }
}