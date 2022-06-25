import { Request, Response, NextFunction } from 'express'
import { Listing } from '../../../models/Listing'
import { User } from '../../../models/User'

export const orgListings = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        const org = await User.findById(id)
        const listings = await Listing.find({
            '_id': {
                $in: org!.createdListings
            }
        })
        // console.log(listings)
        res.json(listings)
    } catch (error) {
        res.status(400).json(error)
    }
}