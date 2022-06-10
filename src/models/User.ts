import mongoose, { Schema, model, connect } from 'mongoose'
import { Role } from './enums/Role'


//* used for login
export interface UserInterface {
    email: string,
    password: string,
    role: Role
}

const userSchema = new Schema({
    email: { type: String, required: true},
    password: { type: String, required: true},
    role: {type: String, default: Role.Student},
})

export const User = mongoose.model<UserInterface>
('User', userSchema)
