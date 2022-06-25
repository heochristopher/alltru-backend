import { Request, Response, NextFunction } from 'express'
import { Listing } from '../../models/Listing'

export const findListing = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const param = req.params.q
        const listing = await Listing.findById(param)
        res.json(listing)
    } catch (error) {
        res.status(400).json(error)
    }
}