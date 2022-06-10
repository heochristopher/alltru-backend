import { Request, Response, NextFunction } from 'express'
import { Role } from '../../../models/enums/Role'
import { Org, OrgInterface } from '../../../models/Organization'


export const sendUserOrg = async (req: Request, res: Response) => {
    try {
        const payload = req.body.payload
        const user = await Org.findById(payload._id)
        const org: OrgInterface = {
            _id: user!._id,
            email: user!.email,
            name: user!.name,
            role: Role.Org,
            avatar: user!.avatar,
            biography: user!.biography,
            listings: user!.listings
        }
        res.json(org)
    } catch (error) {
        res.status(400).json(error)
    }
}