import express from 'express'
const router = express.Router()

//* IMPORTS

//? services
import { login } from '../middleware/services/login'
import { requiresAuth } from '../middleware/services/requiresAuth'
import { logout } from '../middleware/services/logout'
import { sendUser } from '../middleware/services/sendUser'
import { authorizeUser } from '../middleware/services/authorizeUser'

//? users
import { Role } from '../models/enums/Role'

//students
import { studentRegister } from '../middleware/users/students/register'
import { sendUserStudent } from '../middleware/users/students/sendUser'
import { sendOtherStudent } from '../middleware/users/students/sendOther'

//organizations
import { orgRegister } from '../middleware/users/organizations/register'
import { sendUserOrg } from '../middleware/users/organizations/sendUser'
import { sendOtherOrg } from '../middleware/users/organizations/sendOther'

//admins
import { adminRegister } from '../middleware/users/admins/register'

//? listings
import { createListing } from '../middleware/listings/createListing'

//* ROUTES

//? GET REQUESTS
//auth
router.get('/sendUser', requiresAuth, sendUser)

//student
//TODO figure out how to send in param of Role.Student
// router.get('/dashboard', requiresAuth, authorizeUser(Role.Student), sendUserStudent)
router.get('/dashboard/student', requiresAuth, sendUserStudent)
router.get('/profile/:id', sendOtherStudent)

//organization
//TODO figure out how to send in param of Role.Org
// router.get('/dashboard/org', requiresAuth, authorizeUser(Role.Org), sendUserOrg)
router.get('/dashboard/org', requiresAuth, sendUserOrg)
router.get('/org/:id', sendOtherOrg)

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

export {router}