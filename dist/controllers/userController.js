"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const User_1 = require("../models/User");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userValidator_1 = require("../validators/userValidator");
const zod_validation_error_1 = require("zod-validation-error");
//
const createToken = (_id) => {
    return jsonwebtoken_1.default.sign({ _id: _id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });
};
//
// Controller function to register a new user
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { /*username*/ email, password, userType, cvUrl } = req.body;
        // Create a new user
        const newUser = new User_1.User({
            //   username: username,
            email: email,
            password: password,
            userType: userType,
            cvUrl: cvUrl,
        });
        //
        const validatedTask = userValidator_1.UserSchema.safeParse({
            email: email,
            password: password,
        });
        //
        if (!validatedTask.success) {
            //zod messa in a string showing
            return res
                .status(401)
                .json({ error: (0, zod_validation_error_1.fromZodError)(validatedTask.error).message });
        }
        // Save the user to the database
        const savedUser = yield newUser.save();
        if (savedUser) {
            const token = createToken(savedUser._id.toString());
            res.status(201).json({ userType: savedUser.userType, token: token });
        }
    }
    catch (error) {
        res.status(400).json(error); // Handle any validation or database errors
    }
});
exports.registerUser = registerUser;
//
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Find the user by username
        const user = yield User_1.User.findOne({ email: email });
        // Check if the user exists and compare passwords
        if (user && user.password === password) {
            // creating token
            const token = createToken(user._id.toString());
            res.status(200).json({ token: token, userType: user.userType });
            //
            //
        }
        else {
            res.status(401).json({ error: "Invalid username or password" });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.loginUser = loginUser;
