import { Request, Response, NextFunction } from 'express'
import { User } from '../../../models/User'
import { Role } from '../../../models/enums/Role'

export const deleteResume = async(req: Request, res: Response, next: NextFunction) => {
    if(req.body.payload.role !== Role.Student) {return res.status(400).json('Only students can delete resumes')}
    try {
        await User.findByIdAndUpdate( req.body.payload._id,
            { $set: { resume: null }})
        res.status(200).json('Successfully deleted resume')
    } catch (error) {
        res.status(400).json(error)
    }
} 