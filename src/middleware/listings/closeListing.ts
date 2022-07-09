import { Request, Response, NextFunction } from 'express'
import { Role } from '../../models/enums/Role'
import { Status } from '../../models/enums/Status'
import { Listing, ListingAttributes } from '../../models/Listing'
import { User } from '../../models/User'

export const closeListing = async(req: Request, res: Response, next: NextFunction) => {
    if(req.body.payload.role === Role.Student) {return res.status(400).json('Students cannot close listings')}
    try {
        await Listing.findByIdAndUpdate(req.body.id, { $set: { status: Status.Closed }})
        res.status(200).json('Successfully closed listing')
    } catch (error) {
        res.status(400).json(error)
    }
}
