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
import { editProfile } from '../middleware/users/editProfile'
import {upload} from '../middleware/users/multer'

//students
import { studentRegister } from '../middleware/users/students/register'
import { searchStudent } from '../middleware/users/students/search'
import { sendSaved } from '../middleware/users/students/sendSaved'
import { sendApplied } from '../middleware/users/students/sendApplied'
import { uploadResume } from '../middleware/users/students/uploadResume'

//organizations
import { orgRegister } from '../middleware/users/organizations/register'
import { orgListings } from '../middleware/users/organizations/orgListings'
import { sendListings } from '../middleware/users/organizations/sendListings'
import { queryApplicants } from '../middleware/users/organizations/queryApplicants'
import { accept } from '../middleware/users/organizations/accept'

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
router.get('/queryApplicants/:id', requiresAuth, queryApplicants)

//student
router.get('/searchStudent/:q', searchStudent)
router.get('/sendSaved', requiresAuth, sendSaved)
router.get('/sendApplied', requiresAuth, sendApplied)

//organization
router.get('/orgListings/:q', orgListings)
router.get('/sendListings', requiresAuth, sendListings)

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
router.post('/accept/:id', requiresAuth, accept)

//? PATCH REQUESTS
router.patch('/profilePic', upload.single('image'), requiresAuth, profilePic)
router.patch('/uploadResume', upload.single('image'), requiresAuth, uploadResume)
router.patch('/editProfile', requiresAuth, editProfile)

//? DELETE REQUESTS
router.delete('/unsaveListing/:id', requiresAuth, unsaveListing)

export {router}