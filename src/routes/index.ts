import express from 'express'
const router = express.Router()

//* IMPORTS

//? services
import { login } from '../middleware/services/login'
import { requiresAuth } from '../middleware/services/requiresAuth'
import { logout } from '../middleware/services/logout'
import { validateToken } from '../middleware/services/validateToken'

//? users
import { Role } from '../models/enums/Role'
import { sendUser } from '../middleware/users/sendUser'
import { sendOther } from '../middleware/users/sendOther'
import { profilePic } from '../middleware/users/profilePic'

//students
import { studentRegister } from '../middleware/users/students/register'
import { searchStudent } from '../middleware/users/students/search'

//organizations
import { orgRegister } from '../middleware/users/organizations/register'
import { orgListings } from '../middleware/users/organizations/orgListings'

//admins
import { adminRegister } from '../middleware/users/admins/register'

//? listings
import { createListing } from '../middleware/listings/createListing'
import {saveListing} from '../middleware/listings/saveListing'
import {apply} from '../middleware/listings/apply'
import { queryListings } from '../middleware/listings/queryListings'
import {filterListings} from '../middleware/listings/filterListings'
import {findListing} from '../middleware/listings/findListing'
import { unsaveListing } from '../middleware/listings/unsaveListing'

//* ROUTES

//? GET REQUESTS
//listings
router.get('/queryListings', queryListings)
router.get('/filterListings/:q', filterListings)
router.get('/findListing/:q', findListing)

//auth
router.get('/validateToken', requiresAuth, validateToken)

//users
router.get('/sendUser', requiresAuth, sendUser)
router.get('/sendOther/:id',  sendOther)

//student
// router.get('/dashboard', requiresAuth, sendUserStudent)
router.get('/searchStudent/:q', searchStudent)

//organization
router.get('/orgListings/:id', orgListings)

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

//? DELETE REQUESTS
router.delete('/unsaveListing/:id', requiresAuth, unsaveListing)

export {router}