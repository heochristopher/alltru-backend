// import mongoose, { Schema, model, connect } from 'mongoose'
// import { Role } from './enums/Role'

// export interface AdminData {
//     _id: mongoose.Types.ObjectId
//     email: string,
//     firstName: string,
//     lastName: string,
//     role: Role.Admin,
//     avatar: string
// }

// export interface AdminInterface extends AdminData {
//     password: string,
// }

// const adminSchema = new Schema({
//     firstName: {type: String, trim: true, required: true},
//     lastName: {type: String, trim: true, required: true},
//     email: { type: String, required: true},
//     password: { type: String, required: true},
//     role: {type: String, default: Role.Admin},
//     avatar: {type: String, default: 'https://res.cloudinary.com/lupusawareness/image/upload/v1650405593/wugaaghxaiqoiidbitdi.jpg'},
// })

// export const Admin = mongoose.model<AdminInterface>
// ('Admin', adminSchema)
