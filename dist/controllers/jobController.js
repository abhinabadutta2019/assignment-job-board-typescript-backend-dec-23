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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getYourCreatedJobs = exports.allAppliedUserDetail = exports.allAppliedJobs = exports.applyJob = exports.getAllJobs = exports.createJob = void 0;
const Job_1 = require("../models/Job");
const User_1 = require("../models/User");
//
// for all auth type
const getAllJobs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Use Mongoose to find all jobs and populate the 'createdBy' field to get user details
        const jobs = yield Job_1.Job.find()
            .populate("createdBy", "username email")
            .sort({ createdAt: -1 }); // Replace 'username' and 'email' with the fields you want to include
        res.status(200).json(jobs);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getAllJobs = getAllJobs;
// for jobcreator only
const createJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const middlewareUser = req.user;
        console.log(middlewareUser);
        const { title, description } = req.body;
        // Create a new user
        const newJob = new Job_1.Job({
            //   createdBy: createdBy,
            createdBy: middlewareUser,
            title: title,
            description: description,
        });
        //
        // Save the user to the database
        const savedJob = yield newJob.save();
        res.status(201).json({ job: savedJob });
    }
    catch (error) {
        if (error && error.code == 11000) {
            return res.status(403).json();
        }
        res.status(500).json(error);
    }
});
exports.createJob = createJob;
// for jobcreator only
const allAppliedUserDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jobId = req.params.jobId; // Get the job ID from the route parameters
        // Find the job by ID and populate the appliedBy array with only cvUrl and email
        const job = yield Job_1.Job.findOne({ _id: jobId }).populate({
            path: "appliedBy",
            select: "cvUrl email -_id", // Include only 'cvUrl' and 'email' fields and exclude the '_id' field
        });
        if (!job) {
            return res.status(404).json({ error: "Job not found" });
        }
        res.json(job.appliedBy);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.allAppliedUserDetail = allAppliedUserDetail;
//
const getYourCreatedJobs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user._id;
        const jobs = yield Job_1.Job.find({ createdBy: userId });
        res.status(200).json(jobs);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getYourCreatedJobs = getYourCreatedJobs;
// for applicant only
const applyJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jobId = req.params.jobId; // Get the job ID from the route parameters
        const userId = req.user._id; // Get the user ID from the middleware
        // Check if the user is an 'applicant'
        const user = yield User_1.User.findOne({ _id: userId, userType: "applicant" });
        if (!user) {
            return res.status(403).json({ error: "Permission denied" });
        }
        // Check if the job has already been applied by the user
        const job = yield Job_1.Job.findOne({ _id: jobId, appliedBy: userId });
        if (job) {
            return res.status(400).json({ error: "Job already applied" });
        }
        // Find the job and add the user to the appliedBy array
        const updatedJob = yield Job_1.Job.findOneAndUpdate({ _id: jobId }, { $addToSet: { appliedBy: userId } }, // Use $addToSet to prevent duplicates
        { new: true });
        if (!updatedJob) {
            return res.status(404).json({ error: "Job not found" });
        }
        // Add the job ID to the user's appliedJobs array
        user.appliedJobs.push(updatedJob._id);
        yield user.save();
        res
            .status(201)
            .json({ message: "Job application successful" /*job: updatedJob*/ });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.applyJob = applyJob;
// for applicant only
const allAppliedJobs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user._id; // Get the user ID from the middleware
        // Find the user by ID and populate the appliedJobs array with job titles
        const user = yield User_1.User.findOne({ _id: userId }).populate({
            path: "appliedJobs",
            select: "title description",
            populate: {
                path: "createdBy",
                select: "email -_id", // Include only the 'email' field of createdBy and exclude the '_id' field
            },
        });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(user.appliedJobs);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.allAppliedJobs = allAppliedJobs;
