import nodemailer from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'
import dotenv from 'dotenv'
dotenv.config()

export const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 465, 
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})