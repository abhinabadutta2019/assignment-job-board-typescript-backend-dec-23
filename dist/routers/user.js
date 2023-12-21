"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
// import { User } from "../models/User";
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.userRouter = router;
//
const userController_1 = require("../controllers/userController");
//
router.post("/", userController_1.registerUser);
router.post("/login", userController_1.loginUser);
