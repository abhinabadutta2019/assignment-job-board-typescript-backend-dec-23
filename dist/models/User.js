"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    //   username: { type: String, unique: true, required: true },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    userType: {
        type: String,
        enum: ["jobcreator", "applicant"],
        required: true,
    },
    cvUrl: {
        type: String,
        default: "https://www.google.com",
    },
    // Array to store job IDs that the user has applied to (only useful in 'applicant' type)
    appliedJobs: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "job",
        },
    ],
});
const User = mongoose_1.default.model("user", userSchema);
exports.User = User;
