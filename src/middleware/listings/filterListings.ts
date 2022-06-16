import { Request, Response, NextFunction } from 'express'
import { Listing } from '../../models/Listing'

export const filterListings = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const params = req.params.q.split('&')
        const searchQuery: any = []
        params.forEach((param) => {
            const arg: any[] = param.split('=')
            if(arg[1] === 'true') {arg[1] = true}
            if(arg[1] === 'false') {arg[1] = false}
            const option:any = {}
            option[arg[0]] = arg[1]
            searchQuery.push(option)
        })
        const listings = await Listing.find({
            $and: searchQuery
        })
        if(listings.length === 0) return res.status(400).json('We could not find any listings matching your options')
        res.json(listings)
    } catch (error) {
        res.status(400).json(error)
    }
}