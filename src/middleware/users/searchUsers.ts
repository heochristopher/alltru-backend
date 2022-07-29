import { Request, Response, NextFunction } from 'express'
import { Listing } from '../../models/Listing'

export const searchUsers = async (req: Request, res: Response) => {
    try {
        const params = req.params.query
        const users  = await Listing.aggregate([
            {
              $search: {
                index: 'users',
                text: {
                  query: params,
                  path: "affiliation"
                }
              }
            }
          ])
        res.json(users)
    } catch (error) {
        res.status(400).json(error)
    }
}
 