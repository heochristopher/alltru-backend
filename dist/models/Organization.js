"use strict";
// import mongoose, { Schema, model, connect } from 'mongoose'
// import { Role } from './enums/Role'
// import { ListingAttributes, OrgListing } from './Listing'
// //* held on the token, sent to orgs on apply, held on frontend user object
// export interface OrgData {
//     _id: mongoose.Types.ObjectId,
//     firstName: string,
//     lastName: string,
//     orgName: string,
//     role: Role.Org
//     avatar: string,
//     email: string,
//     biography: string,
// }
// //* retrieved on profile visit, public to all
// export interface OrgAttributes extends OrgData {
//     listings: ListingAttributes[]
// }
// //* private information, visible to only org on dashboard
// export interface OrgInterface extends OrgData {
//    listings: OrgListing[]
// }
// //* never gets sent
// export interface OrgCredentials extends OrgInterface {
//     password: string,
// }
// const orgSchema = new Schema({
//     firstName: {type: String, trim: true, required: true},
//     lastName: {type: String, trim: true, required: true},
//     orgName: {type: String, trim: true, required: true},
//     email: { type: String, required: true},
//     password: { type: String, required: true},
//     role: {type: String, default: Role.Org},
//     avatar: {type: String, default: 'https://res.cloudinary.com/lupusawareness/image/upload/v1650405593/wugaaghxaiqoiidbitdi.jpg'},
//     biography: {type: String, default: null},
//     listings: {type: Array, default: []}
// })
// export const Org = mongoose.model<OrgCredentials>
// ('Organization', orgSchema)
