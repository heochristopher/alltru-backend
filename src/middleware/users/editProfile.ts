import { Request, Response, NextFunction } from 'express'
import { User } from '../../models/User'

export const editProfile = async(req: Request, res: Response, next: NextFunction) => {
    try {
        if(req.body.biography) {
            await User.findByIdAndUpdate(req.body.payload._id, {biography: req.body.biography})
        }
        if(req.body.website) {
            await User.findByIdAndUpdate(req.body.payload._id, {website: req.body.website})
        }
        if(req.body.linkedIn || req.body.github) {
            const user = await User.findById(req.body.payload._id)
            if(req.body.linkedIn && !req.body.github) {
                await User.findByIdAndUpdate(req.body.payload._id, {contact: {linkedIn: req.body.linkedIn, github: user!.contact.github}})
            } else if(req.body.github && !req.body.linkedIn) {
                await User.findByIdAndUpdate(req.body.payload._id, {contact: {github: req.body.github, linkedIn: user!.contact.linkedIn}})
            } else if(req.body.github && req.body.linkedIn) {
                await User.findByIdAndUpdate(req.body.payload._id, {contact: {github: req.body.github, linkedIn: req.body.linkedIn}})
            }
        }
        res.status(200).json('Successfully updated profile')
    } catch (error) {
        res.status(400).json(error)
    }
}