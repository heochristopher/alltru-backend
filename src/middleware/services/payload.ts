import { AdminData } from "../../models/Admin"
import { Role } from "../../models/enums/Role"
import { OrgData } from "../../models/Organization"
import { StudentData } from "../../models/Student"

export function payloadType(user: any) {
    if(user.role === Role.Student) {
        const payload: StudentData = {
            _id: user._id,
            email: user.email,
            grade: user.grade,
            firstName: user.firstName,
            lastName: user.lastName,
            role: Role.Student,
            avatar: user.avatar
        }
        return payload
    }

    else if(user.role === Role.Org) {
        const payload: OrgData = {
            _id: user._id,
            email: user.email,
            name: user.name,
            role: Role.Org,
            avatar: user.avatar,
            biography: user.biography
        }
        return payload
    }

    else if(user.role === Role.Admin) {
        const payload: AdminData = {
            _id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: Role.Admin,
            avatar: user.avatar,
        }
        return payload
    }
}