import { Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose'
import { User, UserProfile } from '../../models/User'

export const sendOther = async (req: Request, res: Response) => {
    try {
        const existingUser = await User.findById(req.params.id)
        const user: UserProfile = {
            _id: existingUser!._id,
            email: existingUser!.email,
            birthday: existingUser!.birthday,
            firstName: existingUser!.firstName,
            lastName: existingUser!.lastName,
            role: existingUser!.role,
            avatar: existingUser!.avatar,
            affiliation: existingUser!.affiliation,
            contact: existingUser!.contact,
            biography: existingUser!.biography,
            resume: existingUser!.resume,
            createdListings: existingUser!.createdListings,
        }
        res.json(user)
    } catch (error) {
        res.status(400).json(error)
    }
}