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
//students
const register_1 = require("../middleware/users/students/register");
//organizations
const register_2 = require("../middleware/users/organizations/register");
//admins
const register_3 = require("../middleware/users/admins/register");
//? listings
const createListing_1 = require("../middleware/listings/createListing");
//* ROUTES
//? GET REQUESTS
//auth
router.get('/validateToken', requiresAuth_1.requiresAuth, validateToken_1.validateToken);
//users
router.get('/sendUser', requiresAuth_1.requiresAuth, sendUser_1.sendUser);
router.get('/sendOther/:id', sendOther_1.sendOther);
//student
//TODO figure out how to send in param of Role.Student
// router.get('/dashboard', requiresAuth, authorizeUser(Role.Student), sendUserStudent)
//organization
//TODO figure out how to send in param of Role.Org
// router.get('/dashboard/org', requiresAuth, authorizeUser(Role.Org), sendUserOrg)
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
