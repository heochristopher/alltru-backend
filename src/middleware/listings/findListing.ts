import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { Listing, ListingAttributes, OrgListing } from '../../models/Listing'
import { User, UserAttributes, UserToken } from '../../models/User'

export const findListing = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const param = req.params.q
        const listing = await Listing.findById(param)
        const org = await User.findById(listing!.org)
        const orgData: UserAttributes = {
            _id: org!._id,
            email: org!.email,
            firstName: org!.firstName,
            lastName: org!.lastName,
            affiliation: org!.affiliation,
            avatar: org!.avatar,
            role: org!.role,
        }
        if(!req.cookies['auth-token'] ) {
            const data: ListingAttributes = {
                _id: listing!._id,
                org: orgData,
                position: listing!.position,
                type: listing!.type,
                date: listing!.date,
                remote: listing!.remote,
                tags: listing!.tags,
                description: listing!.description,
                location: listing!.location,
                status: listing!.status
            }
            return res.json(data)
        }
        const user = jwt.verify(req.cookies['auth-token'], process.env.PRIVATEKEY as string)
        if(user._id !== org!._id.toString()) {
            const data: ListingAttributes = {
                _id: listing!._id,
                org: orgData,
                position: listing!.position,
                type: listing!.type,
                date: listing!.date,
                remote: listing!.remote,
                tags: listing!.tags,
                description: listing!.description,
                location: listing!.location,
                status: listing!.status
            }
            return res.json(data)
        } else if(user._id === org!._id.toString()) {
            const data: OrgListing = {
                _id: listing!._id,
                org: org!,
                position: listing!.position,
                type: listing!.type,
                date: listing!.date,
                remote: listing!.remote,
                tags: listing!.tags,
                description: listing!.description,
                location: listing!.location,
                status: listing!.status,
                applicants: listing!.applicants,
            }
            return res.json(data)
        }
        res.json(listing)
    } catch (error) {
        res.status(400).json(error)
    }
}