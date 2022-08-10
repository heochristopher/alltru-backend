import { Request, Response, NextFunction } from 'express'
import { Role } from '../../models/enums/Role'
import {User} from '../../models/User'
import { Listing, ListingAttributes } from '../../models/Listing'
import { v2 as cloudinary } from 'cloudinary'
import { Status } from '../../models/enums/Status'

export const uploadSupplemental = async(req: Request, res: Response, next: NextFunction) => {
    if(req.body.payload.role !== Role.Student) {return res.status(400).json('You cannot apply to listings')}
    try {
        const query = req.params.query.split('-')
        const listing = await Listing.findById(query[0])
        if(listing!.status === Status.Closed) {return res.status(400).json('This listing is already closed')}
        cloudinary.uploader.upload_stream({
            folder: 'documents',
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

            await Listing.findOneAndUpdate({'_id': query[0], 'applicants': {$elemMatch: {'student': req.body.payload._id}}},
            {$push: {'applicants.$.supplementals': {
                answer: image,
                identifier: parseInt(query[1])
            }}})
            res.status(200).json('uploaded')
        }
    } catch (error) {
        res.status(400).send(error)
    }
}
