import { Request, Response, NextFunction } from 'express'

export const sendUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send(req.body.payload)
    } catch (error) {
        res.status(400).json(error)
    }
}