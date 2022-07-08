"use strict";
// import { Request, Response, NextFunction } from 'express'
// import { Role } from '../../../models/enums/Role'
// import { Listing } from '../../../models/Listing'
// import { User,  } from '../../../models/User'
// export const accept = async(req: Request, res: Response, next: NextFunction) => {
//     if(req.body.payload.role !== Role.Student) {return res.status(400).json('You cannot access this resource')}
//     try {
//         // const user = User.findById(req.body.payload._id)
//         const params = req.params.q.split('&')
//         const student = await User.findById(params[1])
//         await Listing.findByIdAndUpdate(params[0], {
//             $push: {accepted: student!._id}
//         })
//         res.status(200).send(`Accepted student ${student!.firstName} ${student!.lastName}`)
//     } catch (error) {
//         res.status(400).send(error)
//     }
// }
