import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

export const requiresAuth = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies['auth-token']
    // const token = req.header('auth-token')
    if(!token) return res.status(400).json('You are not logged in')
    try {
       const payload: Object = jwt.verify(token, process.env.PRIVATEKEY as string)
       req.body.payload = payload
       next()
    } catch (error) {
        res.status(400).json(error)
    }
}
