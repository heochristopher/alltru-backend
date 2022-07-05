// import mongoose, { Schema, model, connect } from 'mongoose'
// import { Grade } from './enums/Grade'
// import { Role } from './enums/Role'
// import { ListingAttributes } from './Listing'

// //* held on the token, sent to orgs on apply, held on frontend user object
// export interface StudentToken {
//     _id: mongoose.Types.ObjectId
//     firstName: string,
//     lastName: string,
//     email: string,
//     role: Role.Student,
//     avatar: string,
//     grade: Grade
// }

// //* retrieved on profile visit, public to all
// export interface StudentProfile extends StudentToken {
//     school: string,
//     contact: {
//         github: string,
//         linkedIn: string
//     },
//     biography: string,
//     resume: string,
// }

// //* private information, visible to only user on dashboard
// export interface StudentInterface extends StudentProfile {
//     saved: ListingAttributes[],
//     applied: StudentListing[],
// }

// //* never gets sent
// export interface StudentCredentials extends StudentInterface {
//     password: string,
// }

// const studentSchema = new Schema({
//     firstName: {type: String, trim: true, required: true},
//     lastName: {type: String, trim: true, required: true},
//     email: { type: String, required: true},
//     password: { type: String, required: true},
//     role: {type: String, default: Role.Student},
//     avatar: {type: String, default: 'https://res.cloudinary.com/lupusawareness/image/upload/v1650405593/wugaaghxaiqoiidbitdi.jpg'},
//     school: {type: String, required: true},
//     grade: {type: String, required: true},
//     contact: {
//         github: {type: String, default: null},
//         linkedIn: {type: String, default: null}
//     },
//     biography: {type: String, default: null},
//     //? host resume on Cloudinary?
//     resume: {type: String, default: null},
//     saved: {type: Array, default: []},
//     applied: {type: Array, default: []}
// })

// export const Student = mongoose.model<StudentCredentials>
// ('Student', studentSchema)
