import mongoose, { Schema, model, connect } from 'mongoose'
import { Role } from './enums/Role'

//* held on the token, 
export interface UserToken {
    _id: mongoose.Types.ObjectId
    role: Role,
}

//* sent to orgs on apply, held on frontend user object
export interface UserAttributes extends UserToken {
    firstName: string,
    lastName: string,
    affiliation: string,
    email: string,
    avatar: string,
    birthday?: Date,
}

//* retrieved on profile visit, public to all
export interface UserProfile extends UserAttributes {
    contact: {
        github: string,
        linkedIn: string
    },
    website: string,
    biography: string,
    resume: string,
    //for organizations, displays the listings that the org posted with public info
    createdListings?: mongoose.Types.ObjectId[]
}

//* private information, visible to only student on dashboard
export interface StudentInterface extends UserProfile {
    //array of listings that orgs post with public info that the student saved
    savedListings: mongoose.Types.ObjectId[],
    //array of listings that the student applied for, carries listing id + the student's application
    appliedListings: mongoose.Types.ObjectId[],
}

//* private information, visible to only org on dashboard
export interface OrgInterface extends UserProfile {
    //array of listings that the org posted, carries public info + every student's application
    listings: mongoose.Types.ObjectId[],
}

//* combines student and org data to be saved as one user in the database
export interface UserInterface extends StudentInterface, OrgInterface {}

//* never gets sent
export interface UserCredentials extends UserInterface {
    password: string,
}

const userSchema = new Schema({
    firstName: {type: String, trim: true, required: true},
    lastName: {type: String, trim: true, required: true},
    email: { type: String, required: true},
    password: { type: String, required: true},
    role: {type: String, required: true},
    avatar: {type: String, default: 'https://res.cloudinary.com/heo-christopher/image/upload/v1657001211/profiles/ozdupx4edlzpsrszwvpi.jpg'},
    affiliation: {type: String, required: true},
    birthday: {type: Date},
    contact: {
        github: {type: String, default: null},
        linkedIn: {type: String, default: null}
    },
    website: {type: String, default: null},
    biography: {type: String, default: null},
    //? host resume on Cloudinary?
    resume: {type: String, default: null},
    savedListings: {type: Array, default: []},
    appliedListings: {type: Array, default: []},
    createdListings: {type: Array, default: []},
    listings: {type: Array, default: []}
})

export const User = mongoose.model<UserCredentials>
('User', userSchema)
