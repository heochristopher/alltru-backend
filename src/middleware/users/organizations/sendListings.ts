 import { Request, Response, NextFunction } from 'express'
import { Role } from '../../../models/enums/Role'
import { Listing, OrgListing } from '../../../models/Listing'
import { OrgInterface, User, UserAttributes } from '../../../models/User'

export const sendListings = async(req: Request, res: Response, next: NextFunction) => {
    try {
        if(req.body.payload.role !== Role.Org) {return res.status(400).json('You are not authorized to view this resource')}
        const org = await User.findById(req.body.payload._id)
        const listings = await Listing.find({
            '_id': {
                $in: org!.createdListings
            }
        }).sort({_id:-1})
        const data: OrgListing[] = await Promise.all(listings.map( async(listing) => {
            const {_id, position, type, date, remote, location, tags, description, status, applicants, notifications} = listing
            const userData: UserAttributes = {
                _id: org!._id,
                email: org!.email,
                firstName: org!.firstName,
                lastName: org!.lastName,
                affiliation: org!.affiliation,
                avatar: org!.avatar,
                role: org!.role,
            }
            return {_id, org: userData, position, type, date, remote, location, tags, description, status, applicants, notifications}
        }))
        res.json(data)
    } catch (error) {
        res.status(400).json(error)
    }
}