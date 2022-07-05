import { Request, Response, NextFunction } from 'express'
import { Role } from '../../../models/enums/Role'
import { Listing } from '../../../models/Listing'
import { User } from '../../../models/User'

export const sendApplied = async(req: Request, res: Response, next: NextFunction) => {
    try {
        if(req.body.payload.role !== Role.Student) {return res.status(400).json('Only students can have applied listings.')}
        const user = await User.findById(req.body.payload._id)
        const listings = await Listing.find({
            '_id': {
                $in: user!.appliedListings
            }
        }).sort({_id:-1})
        res.json(listings)
    } catch (error) {
        res.status(400).json(error)
    }
}