import { Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose'
import { Role } from '../../../models/enums/Role'
import { Org, OrgAttributes } from '../../../models/Organization'
export const sendOtherOrg = async (req: Request, res: Response) => {
    try {
        const user = await Org.findById(req.params.id)
        const org: OrgAttributes = {
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