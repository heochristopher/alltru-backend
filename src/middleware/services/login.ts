import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import {payloadType} from './payload'
import {User} from '../../models/User'
import { Role } from '../../models/enums/Role'
import { Student } from '../../models/Student'
import { Admin } from '../../models/Admin'
import { Org } from '../../models/Organization'
dotenv.config()


export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email })
        if (!existingUser) { return res.status(400).json('There is no user registered under this email. Meant to register?')}
        const validPassword = bcrypt.compareSync(password, existingUser!.password)
        if (!validPassword) { return res.status(400).json('Invalid Password')}
        const payload = await Promise.resolve(payloadType(existingUser)!)
        console.log(payload)
        const userToken = jwt.sign(payload, process.env.PRIVATEKEY as string)
        if(req.cookies['auth-token']) {res.clearCookie('auth-token')}
        res.cookie('auth-token', userToken, {
            expires: new Date(new Date().getTime() + 60 * 60 * 24 * 7 * 1000),
            secure: true,
            sameSite: 'none',
            httpOnly: true
        }).json('You have successfully logged in.')
    } catch (error) {
        res.status(400).json(error)
    }
}

