import { Request, Response, NextFunction } from 'express'
import { User, UserAttributes } from '../../models/User'

export const validateToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.findById(req.body.payload._id)
        const payload: UserAttributes = {
            _id: user!._id,
            email: user!.email,
            firstName: user!.firstName,
            lastName: user!.lastName,
            affiliation: user!.affiliation,
            avatar: user!.avatar,
            role: user!.role,
        }
        res.send(payload)
    } catch (error) {
        res.status(400).json(error)
    }
}