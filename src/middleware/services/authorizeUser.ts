import { Request, Response, NextFunction } from 'express'

export const authorizeUser = async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body.payload
    //get middleware param from
}