import { Request, Response, NextFunction } from 'express'
import { User } from '../../models/User'
import dotenv from 'dotenv'
dotenv.config()
import { v2 as cloudinary } from 'cloudinary'

export const profilePic = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const fileTypes = ['jpg', 'jpeg', 'png', 'heic', 'pdf']
        if(!fileTypes.includes(req.file!.mimetype.split('/')[1])) {
            return res.status(400).json('Please upload a .jpg, .jpeg, .heic, .pdf or .png file only')
        }
        cloudinary.uploader.upload_stream({
            folder: 'profiles',
            format: 'jpg',
            quality: 'auto',
            fetch_format: 'auto',
            width: 150,
            height: 150,
            radius: 'max',
            crop: 'fill',
            gravity: 'face'
        }, upload).end(req.file!.buffer)

        async function upload(error: any, result: any) {
            if(error) {
                return res.status(400).json('Server Error')
            }
            const image = result.secure_url
            await User.findByIdAndUpdate( req.body.payload._id,
                { $set: { avatar: image }})
            res.status(200).json('Successfully updated profile picture')
        }
    } catch (error) {
        res.status(400).json(error)
    }
} 