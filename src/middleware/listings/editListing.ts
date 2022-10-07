import { Request, Response, NextFunction } from 'express'
import { Role } from '../../models/enums/Role'
import { Status } from '../../models/enums/Status'
import { Listing, ListingAttributes } from '../../models/Listing'
import { User } from '../../models/User'

export const editListing = async(req: Request, res: Response, next: NextFunction) => {
    if(req.body.payload.role === Role.Student) {return res.status(400).json('Students cannot close listings')}
    try {
        if(req.body.description) {
            await Listing.findByIdAndUpdate(req.body.id, { $set: { description: req.body.description }})
        }
        if(req.body.supplementals.length) {
            // req.body.supplementals.forEach(async(e: any) => {
            //     await Listing.findOneAndUpdate({'_id': req.body.id, 'supplementals': {$elemMatch: {'identifier': e.identifier}}},
            //     {$set: {'supplementals.$.prompt': {
            //         answer: e.prompt,
            //         identifier: e.identifier
            //     }}})
            // });
            await Promise.all(req.body.supplementals.map(async(change: any) => {
                    await Listing.findOneAndUpdate({'_id': req.body.id, 'supplementals': {$elemMatch: {'identifier': change.identifier}}},
                {$set: {'supplementals.$.prompt': {
                    answer: change.prompt,
                    identifier: change.identifier
                }}})
            }))
        }
        res.status(200).json('Successfully edited listing')
    } catch (error) {
        res.status(400).json(error)
    }
}
