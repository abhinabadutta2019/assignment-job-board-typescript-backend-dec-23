"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobRouter = void 0;
// import { Job } from "../models/Job";
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.jobRouter = router;
//
const verifyJobCreator_1 = require("../middleware/verifyJobCreator");
//
const verifyJWT_1 = require("../middleware/verifyJWT");
//
const jobController_1 = require("../controllers/jobController");
// for jobcreator only
router.post("/", verifyJobCreator_1.verifyJobCreator, jobController_1.createJob);
// for jobcreator only
router.get("/appliedUsers/:jobId", verifyJobCreator_1.verifyJobCreator, jobController_1.allAppliedUserDetail);
//
// for jobcreator only
router.get("/yourCreatedJobs/:jobId", verifyJobCreator_1.verifyJobCreator, jobController_1.getYourCreatedJobs);
//for all auth user
router.get("/", verifyJWT_1.verifyJWT, jobController_1.getAllJobs);
// for applicant only
router.post("/apply/:jobId", verifyJWT_1.verifyJWT, jobController_1.applyJob);
// for applicant only
router.get("/appliedJobs", verifyJWT_1.verifyJWT, jobController_1.allAppliedJobs);
