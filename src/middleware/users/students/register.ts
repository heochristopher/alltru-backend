import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcryptjs'
import { studentJoi } from '../../schemas'
import dotenv from 'dotenv'
import { Student } from '../../../models/Student'
import { User } from '../../../models/User'
dotenv.config()

export const studentRegister = async (req: Request, res: Response) => {
    try {
        await studentJoi.validateAsync(req.body)
        //find an existing user
        let doesExist = await Student.findOne({ email: req.body.email });
        if (doesExist) return res.status(400).send("Student already registered.");
        const student = new Student(req.body)
        student.password = await bcrypt.hash(req.body.password, 10);
        await student.save();
        // save in shared collection
        const user = new User({email: req.body.email,password: student.password, role: req.body.role})
        await user.save()
        res.status(200).json(`Welcome, ${student.firstName}`)
    } catch (error) {
        res.status(400).json(error)
    }
}