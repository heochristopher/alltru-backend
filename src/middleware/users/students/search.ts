// import { Request, Response, NextFunction } from 'express'
// import { User } from '../../../models/User'

// export const searchStudent = async (req: Request, res: Response) => {
//     try {
//         const params = req.params.query.split(' ')
//         if(params.length === 0) {return res.status(400).json('Invalid search')}
//         if(params.length === 1) {
//             let users = await User.find({
//                 firstName: params[0]
//             })
//             return res.json(users)
//         }
//         let users = await User.find({
//             $and: [
//                 {firstName: params[0]},
//                 {lastName: params[1]}
//             ]
//          });
//          return res.json(users)
//     } catch (error) {
//         res.status(400).json(error)
//     }
// }
 