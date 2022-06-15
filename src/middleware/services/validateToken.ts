import { Request, Response, NextFunction } from 'express'

export const validateToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send(req.body.payload)
    } catch (error) {
        res.status(400).json(error)
    }
}