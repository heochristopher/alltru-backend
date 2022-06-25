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
//students
const register_1 = require("../middleware/users/students/register");
const search_1 = require("../middleware/users/students/search");
//organizations
const register_2 = require("../middleware/users/organizations/register");
const findOrg_1 = require("../middleware/users/organizations/findOrg");
//admins
const register_3 = require("../middleware/users/admins/register");
//? listings
const createListing_1 = require("../middleware/listings/createListing");
const saveListing_1 = require("../middleware/listings/saveListing");
const apply_1 = require("../middleware/listings/apply");
const queryListings_1 = require("../middleware/listings/queryListings");
const filterListings_1 = require("../middleware/listings/filterListings");
const findListing_1 = require("../middleware/listings/findListing");
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
//student
// router.get('/dashboard', requiresAuth, sendUserStudent)
router.get('/searchStudent/:q', search_1.searchStudent);
//organization
router.get('/findOrg/:q', findOrg_1.findOrg);
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
//? PATCH REQUESTS
router.patch('/user/profilePic', requiresAuth_1.requiresAuth, profilePic_1.profilePic);
