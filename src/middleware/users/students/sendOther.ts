import { Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose'
import { Role } from '../../../models/enums/Role'
import { Student, StudentAttributes, StudentInterface } from '../../../models/Student'

export const sendOtherStudent = async (req: Request, res: Response) => {
    try {
        const user = await Student.findById(req.params.id)
        const student: StudentAttributes = {
            _id: user!._id,
            email: user!.email,
            grade: user!.grade,
            firstName: user!.firstName,
            lastName: user!.lastName,
            role: Role.Student,
            avatar: user!.avatar,
            school: user!.school,
            contact: user!.contact,
            biography: user!.biography,
            resume: user!.resume,
        }
        res.json(student)
    } catch (error) {
        res.status(400).json(error)
    }
}