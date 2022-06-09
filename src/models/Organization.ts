import mongoose, { Schema, model, connect } from 'mongoose'
import { Role } from './enums/Role'

//* held on the token, sent to orgs on apply, held on frontend user object
export interface OrgData {
    _id: mongoose.Types.ObjectId
    name: String,
    role: Role.Org
    avatar: String,
    email: String,
    biography: String,
}

//* retrieved on profile visit, public to all
export interface OrgAttributes extends OrgData {
    // listings: Listing[] 
}

//* private information, visible to only org on dashboard
export interface OrgInterface extends OrgData {
    // listings with studentData
}

//* never gets sent
export interface OrgCredentials extends OrgInterface {
    password: String,
}

const orgSchema = new Schema({
    name: {type: String, trim: true, required: true},
    email: { type: String, required: true},
    password: { type: String, required: true},
    role: Role.Org,
    avatar: {type: String, default: 'https://res.cloudinary.com/lupusawareness/image/upload/v1650405593/wugaaghxaiqoiidbitdi.jpg'},
    biography: {type: String, default: null},
    listings: {type: Array, default: []}
})

export const Org = mongoose.model<OrgCredentials>
('Organization', orgSchema)