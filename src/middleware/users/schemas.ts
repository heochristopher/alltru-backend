import Joi from "joi"

const minAge = new Date(new Date().setFullYear(new Date().getFullYear() - 14))
const maxAge = new Date(new Date().setFullYear(new Date().getFullYear() - 18))

const studentJoi = Joi.object(
    {
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().required().email(),
        affiliation: Joi.string().required(),
        birthday: Joi.date().max(minAge).min(maxAge).required(),
        password: Joi.string().min(6).required()
    }
)
const orgJoi = Joi.object(
    {
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().min(6).required(),
        affiliation: Joi.string().required(),
    }
)
const adminJoi = Joi.object(
    {
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().min(6).required()
    }
)

export {studentJoi, orgJoi, adminJoi}