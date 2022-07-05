import mongoose, { Schema, model, connect } from 'mongoose'
import {ListingType} from './enums/ListingType'
import { UserProfile, UserToken } from './User'
// import { Status } from './enums/Status'

//* public to all
export interface ListingAttributes {
    org: UserProfile,
    position: string,
    type: ListingType
    //? should listings be deleted after they are filled
    // status: Status.Vacant,
    date: Date,
    remote: boolean,
    location?: {
        borough: string,
        zip: string
    },
    tags: string[],
    description: string,
}


//* private, only org can see
export interface OrgListing extends ListingAttributes {
    applicants: mongoose.Types.ObjectId[],
    accepted: UserProfile[]
}

const listingSchema = new Schema({
    org: {type: Object, required: true},
    position: {type: String, required: true},
    type: {type: String, required: true},
    date: {type: Date, required: true},
    remote: {type: Boolean, required: true},
    location: {
        borough: {type: String},
        zip: {type: String}
    },
    tags: {type: Array, required: true},
    description: {type: String, required: true},
    applicants: {type: Array, default: []},
    accepted: {type: Array, default: []}
})

export const Listing = mongoose.model<OrgListing>
('Listing', listingSchema)