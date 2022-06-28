import { Request, Response, NextFunction } from 'express'
import { Role } from '../../models/enums/Role'
import {User} from '../../models/User'
import { Application, Listing, ListingAttributes } from '../../models/Listing'

export const apply = async(req: Request, res: Response, next: NextFunction) => {
    if(req.body.payload.role !== Role.Student) {return res.status(400).json('You cannot apply to listings')}
    try {
        const user = req.body.payload
        const applicant: Application = {
            _id: user._id,
            note: req.body.note
        }
        await User.findByIdAndUpdate(user._id, {$push: {appliedListings: {_id: req.params.id, note: req.body.note}}})
        await Listing.findByIdAndUpdate(req.params.id, {$push: {applicants: applicant}})
        res.status(200).send("Application Submitted")
    } catch (error) {
        res.status(400).send(error)
    }
}
