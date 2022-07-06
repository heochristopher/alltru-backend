import mongoose, { Schema, model, connect } from 'mongoose'
import {ListingType} from './enums/ListingType'
import { UserAttributes, UserProfile, UserToken, } from './User'

//* public to all
export interface ListingAttributes {
    _id: mongoose.Types.ObjectId,
    org: UserAttributes | mongoose.Types.ObjectId,
    position: string,
    type: ListingType
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
    accepted: mongoose.Types.ObjectId[]
}

const listingSchema = new Schema({
    org: {type: String, required: true},
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