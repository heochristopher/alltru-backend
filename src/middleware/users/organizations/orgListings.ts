import { Request, Response, NextFunction } from 'express'
import { Listing, ListingAttributes } from '../../../models/Listing'
import { User, UserAttributes } from '../../../models/User'

export const orgListings = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        const org = await User.findById(id)
        const listings = await Listing.find({
            '_id': {
                $in: org!.createdListings
            }
        }).sort({_id:-1})
        const data: ListingAttributes[] = await Promise.all(listings.map( async(listing) => {
            const {_id, position, type, date, remote, location, tags, description} = listing
            const userData: UserAttributes = {
                _id: org!._id,
                email: org!.email,
                firstName: org!.firstName,
                lastName: org!.lastName,
                affiliation: org!.affiliation,
                avatar: org!.avatar,
                role: org!.role,
            }
            return {_id, org: userData, position, type, date, remote, location, tags, description}
        }))
        console.log(data)
        res.json(data)
    } catch (error) {
        res.status(400).json(error)
    }
}