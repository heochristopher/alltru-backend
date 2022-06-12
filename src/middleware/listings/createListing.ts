import { Request, Response, NextFunction } from 'express'
import { Org } from '../../models/Organization'
import { Role } from '../../models/enums/Role'
import { Listing, ListingAttributes } from '../../models/Listing'

export const createListing = async(req: Request, res: Response, next: NextFunction) => {
    if(req.body.payload.role === Role.Student) {return res.status(400).json('Students cannot create events')}
    console.log(req.body)
    if(req.body.remote){
        req.body.location = null
        req.body.zip = null
    }
    if(req.body.zip != null) {
        if(req.body.zip.toString().length != 5) return res.status(200).json(`${req.body.zip} is not a valid zip code.`)
    }
    try {
        const listing = new Listing({
            org: req.body.payload,
            position: req.body.position,
            type: req.body.type,
            date: Date.now(),
            remote: req.body.remote,
            location: req.body.location,
            zip: req.body.zip,
            description: req.body.description,
            tags: req.body.tags
            });
        await listing.save()
        await Org.findOneAndUpdate({
            _id: req.body.payload._id
        }, {$push: {listings: listing}})
        
        res.status(200).send(listing)
    } catch (error) {
        res.status(400).send(error)
    }
}
