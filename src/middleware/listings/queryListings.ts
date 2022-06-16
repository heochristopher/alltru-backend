import { Request, Response, NextFunction } from 'express'
import { Listing } from '../../models/Listing'

export const queryListings = async(req: Request, res: Response, next: NextFunction) => {
    try {
        let listings = await Listing.find()
        res.status(200).json(listings)
    } catch (error) {
        res.status(400).json(error)
    }
}