import { Request, Response, NextFunction } from 'express'
import { Role } from '../../models/enums/Role'

export const authorizeUser = (req: Request, res: Response, next: NextFunction, role: Role) => {
    const user = req.body.payload
    if(user.role !== role) {
        return res.status(400).json('You are not authorized')
    }
    next()
    //get middleware param from
}