import mongoose, { Schema, model, connect } from 'mongoose'
import { Role } from './enums/Role'

export interface AdminData {
    firstName: String,
    lastName: String,
    role: Role.Admin,
    avatar: String
}

export interface AdminAttributes extends AdminData {
    _id: mongoose.Types.ObjectId
}

export interface AdminInterface extends AdminData {
    email: String,
    password: String,
}