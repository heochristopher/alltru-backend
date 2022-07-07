import { Request, Response, NextFunction } from 'express'
import { Role } from '../../../models/enums/Role'
import { Listing, ListingAttributes } from '../../../models/Listing'
import { User, UserAttributes } from '../../../models/User'

export const sendApplied = async(req: Request, res: Response, next: NextFunction) => {
    try {
        if(req.body.payload.role !== Role.Student) {return res.status(400).json('Only students can have applied listings.')}
        const user = await User.findById(req.body.payload._id)
        const listings = await Listing.find({
            '_id': {
                $in: user!.appliedListings
            }
        }).sort({_id:-1})
        const data: ListingAttributes[] = await Promise.all(listings.map( async(listing) => {
            const {_id, position, type, date, remote, location, tags, description} = listing
            const user = await User.findById(listing.org)
            const userData: UserAttributes = {
                _id: user!._id,
                email: user!.email,
                firstName: user!.firstName,
                lastName: user!.lastName,
                affiliation: user!.affiliation,
                avatar: user!.avatar,
                role: user!.role,
            }
            return {_id, org: userData, position, type, date, remote, location, tags, description}
        }))
        res.json(data)
    } catch (error) {
        res.status(400).json(error)
    }
}