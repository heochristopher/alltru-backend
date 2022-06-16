import Joi from "joi"

const studentJoi = Joi.object(
    {
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().required().email(),
        affiliation: Joi.string().required(),
        grade: Joi.string().required(),
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