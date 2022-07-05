"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.router = router;
//* IMPORTS
//? services
const login_1 = require("../middleware/services/login");
const requiresAuth_1 = require("../middleware/services/requiresAuth");
const logout_1 = require("../middleware/services/logout");
const validateToken_1 = require("../middleware/services/validateToken");
const sendUser_1 = require("../middleware/users/sendUser");
const sendOther_1 = require("../middleware/users/sendOther");
const profilePic_1 = require("../middleware/users/profilePic");
const editProfile_1 = require("../middleware/users/editProfile");
const multer_1 = require("../middleware/users/multer");
//students
const register_1 = require("../middleware/users/students/register");
const search_1 = require("../middleware/users/students/search");
const sendSaved_1 = require("../middleware/users/students/sendSaved");
const sendApplied_1 = require("../middleware/users/students/sendApplied");
const uploadResume_1 = require("../middleware/users/students/uploadResume");
//organizations
const register_2 = require("../middleware/users/organizations/register");
const orgListings_1 = require("../middleware/users/organizations/orgListings");
const sendListings_1 = require("../middleware/users/organizations/sendListings");
const queryApplicants_1 = require("../middleware/users/organizations/queryApplicants");
const accept_1 = require("../middleware/users/organizations/accept");
//admins
const register_3 = require("../middleware/users/admins/register");
//? listings
const createListing_1 = require("../middleware/listings/createListing");
const saveListing_1 = require("../middleware/listings/saveListing");
const apply_1 = require("../middleware/listings/apply");
const queryListings_1 = require("../middleware/listings/queryListings");
const filterListings_1 = require("../middleware/listings/filterListings");
const findListing_1 = require("../middleware/listings/findListing");
const unsaveListing_1 = require("../middleware/listings/unsaveListing");
//* ROUTES
//? GET REQUESTS
//listings
router.get('/queryListings', queryListings_1.queryListings);
router.get('/filterListings/:q', filterListings_1.filterListings);
router.get('/findListing/:q', findListing_1.findListing);
//auth
router.get('/validateToken', requiresAuth_1.requiresAuth, validateToken_1.validateToken);
//users
router.get('/sendUser', requiresAuth_1.requiresAuth, sendUser_1.sendUser);
router.get('/sendOther/:id', sendOther_1.sendOther);
router.get('/queryApplicants/:id', requiresAuth_1.requiresAuth, queryApplicants_1.queryApplicants);
//student
router.get('/searchStudent/:q', search_1.searchStudent);
router.get('/sendSaved', requiresAuth_1.requiresAuth, sendSaved_1.sendSaved);
router.get('/sendApplied', requiresAuth_1.requiresAuth, sendApplied_1.sendApplied);
//organization
router.get('/orgListings/:q', orgListings_1.orgListings);
router.get('/sendListings', requiresAuth_1.requiresAuth, sendListings_1.sendListings);
//? POST REQUESTS
//logout
router.post('/logout', logout_1.logout);
//login
router.post('/login', login_1.login);
//register
router.post('/studentRegister', register_1.studentRegister);
router.post('/orgRegister', register_2.orgRegister);
router.post('/adminRegister', register_3.adminRegister);
//listings
router.post('/listing', requiresAuth_1.requiresAuth, createListing_1.createListing);
router.post('/saveListing/:id', requiresAuth_1.requiresAuth, saveListing_1.saveListing);
router.post('/apply/:id', requiresAuth_1.requiresAuth, apply_1.apply);
router.post('/accept/:id', requiresAuth_1.requiresAuth, accept_1.accept);
//? PATCH REQUESTS
router.patch('/profilePic', multer_1.upload.single('image'), requiresAuth_1.requiresAuth, profilePic_1.profilePic);
router.patch('/uploadResume', multer_1.upload.single('image'), requiresAuth_1.requiresAuth, uploadResume_1.uploadResume);
router.patch('/editProfile', requiresAuth_1.requiresAuth, editProfile_1.editProfile);
//? DELETE REQUESTS
router.delete('/unsaveListing/:id', requiresAuth_1.requiresAuth, unsaveListing_1.unsaveListing);
