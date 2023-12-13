import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { User, UserCredentials } from '../../models/User'
import { Role } from '../../models/enums/Role'
import { transport } from './mail'
dotenv.config()

//route must be protected — can only be accessed if verification code matches

//? route for password change request
// once user requests password change, send them an email with random 6-digit verification code
// this verification code should create a new object in the user model that is stored like {code: 123456, verified: false}
// this may be called again if user didn't receive their verification code — in this case, update the reset password object instead of creating a new one, with a new verification code

//? route for verification
// user inputs the code — if it matches, change verified to true

//? route for resetting password
// can only be accessed if reset password object exists & verified is true
// takes in new password with requirements (6 character minimum)
//update user's password
//set verification code to null and verified to false

export const requestNewPassword = async (req: Request, res: Response) => {
    try {
        const verificationCode = Math.floor(100000 + Math.random() * 900000)
        const hashedCode = await bcrypt.hash(verificationCode.toString(), 10);
        const user = await User.findOneAndUpdate({email: req.body.email}, {
            $set: {
                resetPassword: {
                    code: hashedCode,
                    verified: false
                }
            }
        }, { new: true })

        if(!user) {return res.status(400).json("We couldn't find an account registered under that email. Meant to register?")}
        res.status(200).json('You have received an email with a verification code')
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: req.body.email,
            subject: `${verificationCode} is your Alltru password reset code`,
            html:
            `We've received a request to reset your password.

            Enter the following password reset code:

            ${verificationCode}

            Don't know where to enter the code? Click <a href="www.alltru.app/recover/verify">here</a>

            If you didn't make this request, just ignore this message.

            Thanks,
            The Alltru team
            `
        }
        transport.sendMail(mailOptions)
    } catch (error) {
        res.status(400).json(error)
    }
}
export const verifyResetCode = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({email: req.body.email})
        const validCode: Boolean = bcrypt.compareSync(req.body.code.toString(), user!.resetPassword.code)
        if (!validCode) { return res.status(400).json('Invalid code') }
        await User.findOneAndUpdate({email: req.body.email}, {
            $set: {
                resetPassword: {
                    code: user!.resetPassword.code,
                    verified: true
                }
            }
        })
        res.status(200).json('Your code has been successfully verified.')
    } catch (error) {
        res.status(400).json(error)
    }
}
export const resetPassword = async (req: Request, res: Response) => {
    try {
        if (req.body.password1 !== req.body.password2) { return res.status(400).json('Passwords do not match.') }
        
        if (req.body.password1.length < 6) { return res.status(400).json('Your password must be at least 6 characters long.') }

        const user = await User.findOne({email: req.body.email})
        if (!user!.resetPassword.verified) { return res.status(400).json('You do not have access to this service.') }

        const hashedPassword = await bcrypt.hash(req.body.password1, 10);
        await User.findOneAndUpdate({email: req.body.email}, {
            $set: {
                password: hashedPassword,
                resetPassword: {
                    code: null,
                    verified: false
                }
            }
        })
        res.status(200).json('Your password has successfully been reset.')
    } catch (error) {
        res.status(400).json(error)
    }
}