import express from 'express'
const router = express.Router()

//* IMPORTS

//? services
import { login } from '../middleware/services/login'
import { requiresAuth } from '../middleware/services/requiresAuth'
import { logout } from '../middleware/services/logout'
import { validateToken } from '../middleware/services/validateToken'
import { authorizeUser } from '../middleware/services/authorizeUser'

//? users
import { Role } from '../models/enums/Role'
import { sendUser } from '../middleware/users/sendUser'
import { sendOther } from '../middleware/users/sendOther'
import { profilePic } from '../middleware/users/profilePic'

//students
import { studentRegister } from '../middleware/users/students/register'

//organizations
import { orgRegister } from '../middleware/users/organizations/register'

//admins
import { adminRegister } from '../middleware/users/admins/register'

//? listings
import { createListing } from '../middleware/listings/createListing'
import {saveListing} from '../middleware/listings/saveListing'
import {apply} from '../middleware/listings/apply'

//* ROUTES

//? GET REQUESTS
//auth
router.get('/validateToken', requiresAuth, validateToken)

//users
router.get('/sendUser', requiresAuth, sendUser)
router.get('/sendOther/:id',  sendOther)

//student
//TODO figure out how to send in param of Role.Student
// router.get('/dashboard', requiresAuth, authorizeUser(Role.Student), sendUserStudent)

//organization
//TODO figure out how to send in param of Role.Org
// router.get('/dashboard/org', requiresAuth, authorizeUser(Role.Org), sendUserOrg)

//? POST REQUESTS
//logout
router.post('/logout', logout)

//login
router.post('/login', login)

//register
router.post('/studentRegister', studentRegister)
router.post('/orgRegister', orgRegister)
router.post('/adminRegister', adminRegister)

//listings
router.post('/listing', requiresAuth, createListing)
router.post('/saveListing/:id', requiresAuth, saveListing)
router.post('/apply/:id', requiresAuth, apply)

//? PATCH REQUESTS
router.patch('/user/profilePic', requiresAuth, profilePic)

export {router}