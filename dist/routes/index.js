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
const sendUser_1 = require("../middleware/services/sendUser");
//students
const register_1 = require("../middleware/users/students/register");
const sendUser_2 = require("../middleware/users/students/sendUser");
const sendOther_1 = require("../middleware/users/students/sendOther");
//organizations
const register_2 = require("../middleware/users/organizations/register");
const sendUser_3 = require("../middleware/users/organizations/sendUser");
const sendOther_2 = require("../middleware/users/organizations/sendOther");
//admins
const register_3 = require("../middleware/users/admins/register");
//? listings
const createListing_1 = require("../middleware/listings/createListing");
//* ROUTES
//? GET REQUESTS
//auth
router.get('/sendUser', requiresAuth_1.requiresAuth, sendUser_1.sendUser);
//student
//TODO figure out how to send in param of Role.Student
// router.get('/dashboard', requiresAuth, authorizeUser(Role.Student), sendUserStudent)
router.get('/dashboard/student', requiresAuth_1.requiresAuth, sendUser_2.sendUserStudent);
router.get('/profile/:id', sendOther_1.sendOtherStudent);
//organization
//TODO figure out how to send in param of Role.Org
// router.get('/dashboard/org', requiresAuth, authorizeUser(Role.Org), sendUserOrg)
router.get('/dashboard/org', requiresAuth_1.requiresAuth, sendUser_3.sendUserOrg);
router.get('/org/:id', sendOther_2.sendOtherOrg);
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
