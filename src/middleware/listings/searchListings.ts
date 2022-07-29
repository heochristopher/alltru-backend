import { Request, Response, NextFunction } from 'express'
import { Listing, ListingAttributes } from '../../models/Listing'
import { User, UserAttributes } from '../../models/User'

export const searchListings = async (req: Request, res: Response) => {
    try {
        const params = req.params.query
        const listings  = await Listing.aggregate([
            {
              '$search': {
                'index': 'listings',
                'text': {
                  'query': params,
                  'path': {
                    'wildcard': '*'
                  }
                }
              }
            }
          ])
          const data: ListingAttributes[] = await Promise.all(listings.map( async(listing) => {
            const {_id, position, type, date, remote, location, tags, description, status} = listing
            const user = await User.findById(listing.org)
            const userData: UserAttributes = {
                _id: user!._id,
                email: user!.email,
                firstName: user!.firstName,
                lastName: user!.lastName,
                affiliation: user!.affiliation,
                avatar: user!.avatar,
                role: user!.role,
            }
            return {_id, org: userData, position, type, date, remote, location, tags, description, status}
        }))
        res.json(data)
    } catch (error) {
        res.status(400).json(error)
    }
}
 