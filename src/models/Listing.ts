import mongoose, { Schema, model, connect } from 'mongoose'
import { StudentData } from './Student'
import { OrgAttributes } from './Organization'
import {ListingType} from './enums/ListingType'
// import { Status } from './enums/Status'

//* public to all
export interface ListingAttributes {
    org: OrgAttributes,
    name: String,
    title: String,
    type: ListingType
    //? should listings be deleted after they are filled
    // status: Status.Vacant,
    date: Date,
    remote: Boolean,
    location: String,
    tags: String[],
    description: String
}

//* sent when students apply, private to org and student only
export interface Application extends StudentData {
    note: String
}

//* private, only org can see
export interface OrgListing extends ListingAttributes {
    applicants: Application[]
}

const listingSchema = new Schema({
    org: {type: Object, required: true},
    name: {type: String, required: true},
    title: {type: String, required: true},
    type: {type: ListingType, required: true},
    date: {type: Date, required: true},
    remote: {type: Boolean, required: true},
    location: {type: String, default: null},
    tags: {type: Array},
    description: {type: String, required: true}
})

export const Listing = mongoose.model<OrgListing>
('Listing', listingSchema)