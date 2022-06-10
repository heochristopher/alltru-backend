"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Listing = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const ListingType_1 = require("./enums/ListingType");
const listingSchema = new mongoose_1.Schema({
    org: { type: Object, required: true },
    name: { type: String, required: true },
    position: { type: String, required: true },
    type: { type: ListingType_1.ListingType, required: true },
    date: { type: Date, required: true },
    remote: { type: Boolean, required: true },
    location: { type: String, required: true },
    zip: { type: Number, required: true },
    tags: { type: Array },
    description: { type: String, required: true },
    applicants: { type: Array, default: [] }
});
exports.Listing = mongoose_1.default.model('Listing', listingSchema);
