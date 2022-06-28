import { Request, Response, NextFunction } from 'express'
import { Role } from '../../../models/enums/Role'
import { Listing } from '../../../models/Listing'
import { OrgInterface, User } from '../../../models/User'

export const sendListings = async(req: Request, res: Response, next: NextFunction) => {
    try {
        if(req.body.payload.role !== Role.Org) {return res.status(400).json('You are not authorized to view this resource')}
        const org = await User.findById(req.body.payload._id)
        const listings = await Listing.find({
            '_id': {
                $in: org!.createdListings
            }
        }).sort({_id:-1})
        res.json(listings)
    } catch (error) {
        res.status(400).json(error)
    }
}