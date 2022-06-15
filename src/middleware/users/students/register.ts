import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcryptjs'
import { studentJoi } from '../../services/schema'
import dotenv from 'dotenv'
import { User } from '../../../models/User'
import { Role } from '../../../models/enums/Role'
dotenv.config()

export const studentRegister = async (req: Request, res: Response) => {
    try {
        await studentJoi.validateAsync(req.body)
        //find an existing user
        let doesExist = await User.findOne({ email: req.body.email });
        if (doesExist) return res.status(400).send("Student already registered.");
        const student = new User(req.body)
        student.password = await bcrypt.hash(req.body.password, 10);
        student.role = Role.Student
        await student.save();
        res.status(200).json(`Welcome, ${student.firstName}`)
    } catch (error) {
        res.status(400).json(error)
    }
}