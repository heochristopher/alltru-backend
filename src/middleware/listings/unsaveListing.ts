import { Request, Response, NextFunction } from 'express'
import { Role } from '../../models/enums/Role'
import {User} from '../../models/User'
import { Listing, ListingAttributes } from '../../models/Listing'

export const unsaveListing = async(req: Request, res: Response, next: NextFunction) => {
    if(req.body.payload.role !== Role.Student) {return res.status(400).json('Access denied')}
    try {
        await User.findByIdAndUpdate(req.body.payload._id, {$pull: {savedListings: req.params.id}})
        res.status(200).send("Unsaved listing.")
    } catch (error) {
        res.status(400).send(error)
    }
}
