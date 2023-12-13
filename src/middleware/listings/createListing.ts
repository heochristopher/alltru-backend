import { Request, Response, NextFunction } from 'express'
import { Role } from '../../models/enums/Role'
import { Listing, ListingAttributes } from '../../models/Listing'
import { User } from '../../models/User'

export const createListing = async(req: Request, res: Response, next: NextFunction) => {
    if(req.body.payload.role === Role.Student) {return res.status(400).json('Students cannot create listings')}
    if(req.body.remote){
        req.body.location = null
    }
    if(req.body.location !== null) {
        if(req.body.location.zip.length !== 5) return res.status(200).json(`${req.body.location.zip} is not a valid zip code.`)
    }
    try {
        const listing = new Listing({
            org: req.body.payload._id,
            position: req.body.position,
            type: req.body.type,
            date: Date.now(),
            remote: req.body.remote,
            location: req.body.location,
            description: req.body.description,
            tags: req.body.tags,
            notifications: 0,
            supplementals: req.body.supplementals
            });
        await listing.save()
        await User.findOneAndUpdate({
            _id: req.body.payload._id
        }, {$push: {createdListings: listing._id}})
        res.status(200).send(listing)
    } catch (error) {
        res.status(400).send(error)
    }
}
