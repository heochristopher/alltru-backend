import { Request, Response, NextFunction } from 'express'
import { User } from '../../../models/User'
import dotenv from 'dotenv'
dotenv.config()
import { v2 as cloudinary } from 'cloudinary'
import { Role } from '../../../models/enums/Role'

export const uploadResume = async(req: Request, res: Response, next: NextFunction) => {
    if(req.body.payload.role !== Role.Student) {return res.status(400).json('Only students can upload resumes')}
    try {
        if(req.file!.mimetype.split('/')[1] !== 'pdf') {
            return res.status(400).json('Please upload a .pdf file only')
        }
        cloudinary.uploader.upload_stream({
            folder: 'resumes',
            format: 'pdf',
            quality: 'auto',
            fetch_format: 'auto',
        }, upload)
            .end(req.file!.buffer);

        async function upload(error: any, result: any) {
            if(error) {
                return res.status(400).json('Server Error')
            }
            const image = result.secure_url
            await User.findByIdAndUpdate( req.body.payload._id,
                { $set: { resume: image }})
            res.status(200).json('Successfully updated resume')

        }
    } catch (error) {
        res.status(400).json(error)
    }
} 