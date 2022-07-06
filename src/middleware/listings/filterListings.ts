import { Request, Response, NextFunction } from 'express'
import { Listing, ListingAttributes } from '../../models/Listing'
import { User, UserAttributes } from '../../models/User'

export const filterListings = async(req: Request, res: Response, next: NextFunction) => {
    try {
        if(req.params.q === 'all') {
            const listings = await Listing.find().sort({_id:-1})
            return res.json(listings)
        }
        const params = req.params.q.split('&')
        const searchQuery: any = []
        params.forEach((param) => {
            const arg: any[] = param.split('=')
            if(arg[1] === 'true') {arg[1] = true}
            if(arg[1] === 'false') {arg[1] = false}
            const option:any = {}
            option[arg[0]] = arg[1]
            searchQuery.push(option)
        })
        const listings = await Listing.find({
            $and: searchQuery
        }).sort({_id:-1})
        if(listings.length === 0) return res.status(400).json('We could not find any listings matching your options')
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