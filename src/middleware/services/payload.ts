import { Admin, AdminData } from "../../models/Admin"
import { Role } from "../../models/enums/Role"
import { Org, OrgData } from "../../models/Organization"
import { Student, StudentData } from "../../models/Student"

export async function payloadType(existingUser: any) {
    try {
        if(existingUser.role === Role.Student) {
            const user = await Student.findOne({email: existingUser.email})
            const payload: StudentData = {
                _id: user!._id,
                email: user!.email,
                grade: user!.grade,
                firstName: user!.firstName,
                lastName: user!.lastName,
                role: Role.Student,
                avatar: user!.avatar
            }
            return payload
        }
    
        else if(existingUser.role === Role.Org) {
            const user = await Org.findOne({email: existingUser.email})
            const payload: OrgData = {
                _id: user!._id,
                email: user!.email,
                name: user!.name,
                role: Role.Org,
                avatar: user!.avatar,
                biography: user!.biography
            }
            return payload
        }
    
        else if(existingUser.role === Role.Admin) {
            const user = await Admin.findOne({email: existingUser.email})
            const payload: AdminData = {
                _id: user!._id,
                email: user!.email,
                firstName: user!.firstName,
                lastName: user!.lastName,
                role: Role.Admin,
                avatar: user!.avatar,
            }
            return payload
        }
    } catch (error) {
        return error
    }
}