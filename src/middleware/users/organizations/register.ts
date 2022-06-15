import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import { User } from '../../../models/User'
import { Role } from '../../../models/enums/Role'
import { orgJoi } from '../../services/schema'
dotenv.config()

export const orgRegister = async (req: Request, res: Response) => {
    try {
        await orgJoi.validateAsync(req.body)
        //find an existing user
        let doesExist = await User.findOne({ email: req.body.email });
        if (doesExist) return res.status(400).send("Organization already registered.");
        const org = new User(req.body)
        org.password = await bcrypt.hash(req.body.password, 10);
        org.role = Role.Org
        await org.save();
        //save in shared collection
        res.status(200).json(`Welcome, ${org.firstName}`)
    } catch (error) {
        res.status(400).json(error)
    }
}