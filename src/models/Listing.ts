import mongoose, { Schema, model, connect } from 'mongoose'
import { StudentData } from './Student'
import { OrgAttributes } from './Organization'
import {ListingType} from './enums/ListingType'
// import { Status } from './enums/Status'

//* public to all
export interface ListingAttributes {
    org: OrgAttributes,
    position: string,
    type: ListingType
    //? should listings be deleted after they are filled
    // status: Status.Vacant,
    date: Date,
    remote: boolean,
    location: string,
    zip: number,
    tags: string[],
    description: string
}

//* sent when students apply, private to org and student only
export interface Application extends StudentData {
    note: string
}

export interface StudentListing extends ListingAttributes {
    application: Application
}

//* private, only org can see
export interface OrgListing extends ListingAttributes {
    applicants: Application[]
}

const listingSchema = new Schema({
    org: {type: Object, required: true},
    position: {type: String, required: true},
    type: {type: String, required: true},
    date: {type: Date, required: true},
    remote: {type: Boolean, required: true},
    location: {type: String, required: true},
    zip: {type: Number, required: true},
    tags: {type: Array},
    description: {type: String, required: true},
    applicants: {type: Array, default: []}
})

export const Listing = mongoose.model<OrgListing>
('Listing', listingSchema)