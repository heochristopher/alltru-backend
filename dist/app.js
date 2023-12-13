"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const index_1 = require("./routes/index");
require("./DB/mongoose");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cloudinary_1 = require("cloudinary");
const app = (0, express_1.default)();
const port = process.env.PORT;
// Enable the use of request body parsing middleware
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: true
}));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    // origin: process.env.NODE_ENV === 'production' ? 'https://www.alltru.app' : 'http://localhost:8080',
    origin: 'https://www.alltru.app',
    credentials: true
}));
//raw requests are now usable properties on req.body
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: true
}));
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});
app.use('/', index_1.router);
app.listen(port, () => {
    console.log(`server is up on port ${port}`);
});
