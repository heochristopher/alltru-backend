import express from 'express'
const router = express.Router()

//* IMPORTS

//? services
import { requiresAuth } from '../middleware/services/requiresAuth'
import { logout } from '../middleware/services/logout'
import { sendUser } from '../middleware/services/sendUser'
import { authorizeUser } from '../middleware/services/authorizeUser'

//? users
//admins

//organizations

//students

//* ROUTES

//? GET REQUESTS
router.get('/sendUser', requiresAuth, sendUser)

//? POST REQUESTS
router.post('logout', logout)

export {router}