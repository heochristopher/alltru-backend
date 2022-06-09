import mongoose, { Schema, model, connect } from 'mongoose'
import { Role } from './enums/Role'

//* held on the token, sent to orgs on apply, held on frontend user object
export interface StudentData {
    _id: mongoose.Types.ObjectId
    firstName: String,
    lastName: String,
    email: String,
    role: Role.Student,
    avatar: String,
    gradYear: Number,
}

//* retrieved on profile visit, public to all
export interface StudentAttributes extends StudentData {
    school: String,
    contact: {
        github: String,
        linkedIn: String
    },
    biography: String,
    resume: String,
}

//* private information, visible to only user on dashboard
export interface StudentInterface extends StudentAttributes {
    // saved: Listing[],
    //applied: Listing[],
}

//* never gets sent
export interface StudentCredentials extends StudentInterface {
    password: String,
}

const studentSchema = new Schema({
    firstName: {type: String, trim: true, required: true},
    lastName: {type: String, trim: true, required: true},
    email: { type: String, required: true},
    password: { type: String, required: true},
    role: Role.Student,
    avatar: {type: String, default: 'https://res.cloudinary.com/lupusawareness/image/upload/v1650405593/wugaaghxaiqoiidbitdi.jpg'},
    school: {type: String, required: true},
    gradYear: {type: Number, required: true},
    contact: {
        github: {type: String, default: null},
        linkedIn: {type: String, default: null}
    },
    biography: {type: String, default: null},
    //? host resume on Cloudinary?
    resume: {type: String, default: null},
    saved: {type: Array, default: []},
    applied: {type: Array, default: []}
})

export const Student = mongoose.model<StudentCredentials>
('Student', studentSchema)
