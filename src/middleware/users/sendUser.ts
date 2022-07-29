import { Request, Response, NextFunction } from 'express'
import { Role } from '../../models/enums/Role'
import { OrgInterface, StudentInterface, User, UserInterface } from '../../models/User'

export const sendUser = async (req: Request, res: Response) => {
    try {
        const payload = req.body.payload
        const user = await User.findById(payload._id)
        if(user!.role === Role.Student) {
            const student: StudentInterface = {
                _id: user!._id,
                email: user!.email,
                birthday: user!.birthday,
                firstName: user!.firstName,
                lastName: user!.lastName,
                role: user!.role,
                avatar: user!.avatar,
                affiliation: user!.affiliation,
                contact: user!.contact,
                website: user!.website,
                biography: user!.biography,
                resume: user!.resume,
                savedListings: user!.savedListings,
                appliedListings: user!.appliedListings
            }
            return res.json(student)
        } else if (user!.role === Role.Org) {
            const org: OrgInterface = {
                _id: user!._id,
                email: user!.email,
                firstName: user!.firstName,
                lastName: user!.lastName,
                role: user!.role,
                avatar: user!.avatar,
                affiliation: user!.affiliation,
                contact: user!.contact,
                website: user!.website,
                biography: user!.biography,
                resume: user!.resume,
                listings: user!.listings
            }
            return res.json(org)
        }
    } catch (error) {
        res.status(400).json(error)
    }
}