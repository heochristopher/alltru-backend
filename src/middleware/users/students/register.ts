import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcryptjs'
import { studentJoi } from '../schemas'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { User, UserAttributes, UserToken,  } from '../../../models/User'
import { Role } from '../../../models/enums/Role'
import { transport } from '../../services/mail'
dotenv.config()

export const studentRegister = async (req: Request, res: Response) => {
    try {
        await studentJoi.validateAsync(req.body)
        //find an existing user
        let doesExist = await User.findOne({ email: req.body.email });
        if (doesExist) return res.status(400).send("Student already registered.");
        const student = new User(req.body)
        student.password = await bcrypt.hash(req.body.password, 10);
        student.role = Role.Student
        await student.save();
        const payload: UserToken = {
            _id: student!._id,
            role: student!.role,
        }
        const userToken = jwt.sign(payload, process.env.PRIVATEKEY as string)
        if(req.cookies['auth-token']) {res.clearCookie('auth-token')}
        res.cookie('auth-token', userToken, {
            //lasts 2 weeks
            expires: new Date(new Date().getTime() + 60 * 60 * 24 * 7 * 1000 * 2),
            secure: true,
            sameSite: 'strict',
            httpOnly: true
        }).status(200).json(`Welcome to Alltru, ${student.firstName}`)
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: student!.email,
            subject: `Welcome to Alltru, ${student!.firstName}!`,
            html: `We're so excited to have you on board, ${student!.firstName}. Opportunities await <a href="www.alltru.app/listings">here</a>`
        }
        transport.sendMail(mailOptions)
    } catch (error) {
        res.status(400).json(error)
    }
}