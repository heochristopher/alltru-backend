import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { User, UserAttributes, UserToken,  } from '../../../models/User'
import { Role } from '../../../models/enums/Role'
import { orgJoi } from '../schemas'
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
        const payload: UserToken = {
            _id: org!._id,
            role: org!.role,
        }
        const userToken = jwt.sign(payload, process.env.PRIVATEKEY as string)
        if(req.cookies['auth-token']) {res.clearCookie('auth-token')}
        res.cookie('auth-token', userToken, {
            //lasts 2 weeks
            expires: new Date(new Date().getTime() + 60 * 60 * 24 * 7 * 1000 * 2),
            secure: true,
            sameSite: 'none',
            httpOnly: true
        }).status(200).json(`Welcome to Alltru, ${org.firstName}`)
    } catch (error) {
        res.status(400).json(error)
    }
}