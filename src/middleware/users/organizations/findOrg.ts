import { Request, Response, NextFunction } from 'express'
import { Org } from '../../../models/Organization'

export const findOrg = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const param = req.params.q
        const org = await Org.findById(param)
        res.json(org)
    } catch (error) {
        res.status(400).json(error)
    }
}