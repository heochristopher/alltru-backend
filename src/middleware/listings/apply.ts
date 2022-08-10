import { Request, Response, NextFunction } from 'express'
import { Role } from '../../models/enums/Role'
import {User} from '../../models/User'
import { Listing, ListingAttributes } from '../../models/Listing'

import { Status } from '../../models/enums/Status'

export const apply = async(req: Request, res: Response, next: NextFunction) => {
    if(req.body.payload.role !== Role.Student) {return res.status(400).json('You cannot apply to listings')}
    try {
        const user = req.body.payload
        const listing = await Listing.findById(req.params.id)
        if(listing!.status === Status.Closed) {return res.status(400).json('This listing is already closed')}
        await User.findByIdAndUpdate(user._id, {$push: {appliedListings: req.params.id}})
        await Listing.findByIdAndUpdate(req.params.id, {$inc: {notifications: 1}, $push: {applicants: {
            student: req.body.payload._id,
            supplementals: req.body.supplementals
        }}})
        res.status(200).send("Application Submitted")
    } catch (error) {
        res.status(400).send(error)
    }
}
