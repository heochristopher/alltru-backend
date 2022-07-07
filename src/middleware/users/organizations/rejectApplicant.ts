import { Request, Response, NextFunction } from 'express'
import { Role } from '../../../models/enums/Role'

export const rejectApplicant = async(req: Request, res: Response, next: NextFunction) => {
    if(req.body.payload.role !== Role.Org) {return res.status(400).json('You cannot access this resource')}
    try {
        const user = req.body.payload
        await User.findByIdAndUpdate(user._id, {$push: {appliedListings: req.params.id}})
        await Listing.findByIdAndUpdate(req.params.id, {$push: {applicants: user._id}})
        res.status(200).send("Application Submitted")
    } catch (error) {
        res.status(400).send(error)
    }
}
