import { Request, Response, NextFunction } from 'express'
import { Role } from '../../../models/enums/Role'
import { Student, StudentInterface } from '../../../models/Student'

export const sendUserStudent = async (req: Request, res: Response) => {
    try {
        const payload = req.body.payload
        const user = await Student.findById(payload._id)
        const student: StudentInterface = {
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
            saved: user!.saved,
            applied: user!.applied
        }
        res.json(student)
    } catch (error) {
        res.status(400).json(error)
    }
}