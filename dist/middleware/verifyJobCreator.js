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
exports.verifyJobCreator = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
//
const verifyJobCreator = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.headers.authorization) {
            return res.status(400).json({ message: "no token found" });
        }
        // //
        // console.log(
        //   req.headers.authorization,
        //   "req.headers.authorization from verifyJobCreator"
        // );
        //
        //
        const authHeader = req.headers.authorization;
        const token = authHeader.split(" ")[1];
        //
        const result = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        // console.log(result, "result");
        const userID = result._id;
        //
        const user = yield User_1.User.findOne({ _id: userID }).select("_id, userType ");
        //
        //sending the user._id in the routes
        if (user && user.userType === "jobcreator") {
            req.user = user._id; // Store user ID in the request
            next();
        }
        else {
            res.status(403).json({ error: "Permission denied" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(401).json({ error: "Request is not authorized" });
    }
});
exports.verifyJobCreator = verifyJobCreator;
