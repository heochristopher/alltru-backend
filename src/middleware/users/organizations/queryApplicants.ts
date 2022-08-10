import mongoose from 'mongoose'
import { Request, Response, NextFunction } from 'express'
import { Role } from '../../../models/enums/Role'
import { Listing } from '../../../models/Listing'
import { User } from '../../../models/User'

export const queryApplicants = async(req: Request, res: Response, next: NextFunction) => {
    try {
        if(req.body.payload.role !== Role.Org) {return res.status(400).json('Access denied.')}
        const listing = await Listing.findById(req.params.id)
        if(listing!.org !== req.body.payload._id) {return res.status(400).json('Access denied.')}
        let applicants: mongoose.Types.ObjectId[] = []
        listing!.applicants.forEach((listing) => {
            applicants.push(listing.student)
        })
        const users = await User.find({
            '_id': {
                $in: applicants
            }
        })
        res.json(users)
    } catch (error) {
        res.status(400).json(error)
    }
}