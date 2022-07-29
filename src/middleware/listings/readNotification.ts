import { Request, Response, NextFunction } from 'express'
import { Role } from '../../models/enums/Role'
import { Listing } from '../../models/Listing'

export const readNotification = async(req: Request, res: Response, next: NextFunction) => {
    if(req.body.payload.role !== Role.Org) {return res.status(400).json('You do not have access to this resource')}
    try {
        await Listing.findByIdAndUpdate(req.params.id, {$set: {notifications: 0}})
        res.status(200).json()
    } catch (error) {
        res.status(400).send(error)
    }
}
