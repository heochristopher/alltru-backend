import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { Role } from '../../models/enums/Role'
import { Application, Listing, ListingAttributes, OrgListing, StudentListing } from '../../models/Listing'
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
                status: listing!.status,
                supplementals: listing!.supplementals
            }
            return res.json(data)
        }
        const user: any = jwt.verify(req.cookies['auth-token'], process.env.PRIVATEKEY as string)
        if(user.role === Role.Student) {
            const application: Application | undefined = listing!.applicants.find((e) => e.student === user._id)
            const data: StudentListing = {
                _id: listing!._id,
                org: orgData,
                position: listing!.position,
                type: listing!.type,
                date: listing!.date,
                remote: listing!.remote,
                tags: listing!.tags,
                description: listing!.description,
                location: listing!.location,
                status: listing!.status,
                supplementals: listing!.supplementals,
                application: application
            }
            return res.json(data)
        }
        else if(user._id !== org!._id.toString()) {
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
                status: listing!.status,
                supplementals: listing!.supplementals
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
                notifications: listing!.notifications,
                supplementals: listing!.supplementals

            }
            return res.json(data)
        }
        res.json(listing)
    } catch (error) {
        res.status(400).json(error)
    }
}