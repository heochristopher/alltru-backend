import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcryptjs'
import { orgJoi } from '../../schemas'
import dotenv from 'dotenv'
import { Org } from '../../../models/Organization'
import { User } from '../../../models/User'
dotenv.config()

export const orgRegister = async (req: Request, res: Response) => {
    try {
        await orgJoi.validateAsync(req.body)
        //find an existing user
        let doesExist = await Org.findOne({ email: req.body.email });
        if (doesExist) return res.status(400).send("Organization already registered.");
        const org = new Org(req.body)
        org.password = await bcrypt.hash(req.body.password, 10);
        await org.save();
        //save in shared collection
        const user = new User({email: req.body.email,password: org.password, role: req.body.role})
        await user.save()
        res.status(200).json(`Welcome, ${org.name}`)
    } catch (error) {
        res.status(400).json(error)
    }
}