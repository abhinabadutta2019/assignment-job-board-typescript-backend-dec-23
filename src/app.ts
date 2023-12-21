import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors"; // Import the cors package

//
import { userRouter } from "./routers/user";
import { jobRouter } from "./routers/job";
//
const app = express();
app.use(express.json()); // Middleware to parse JSON requests
dotenv.config(); //dotenv
//
// Configure CORS to allow requests from your frontend URL
const corsOptions = {
  origin: [
    "https://new-assignment-job-board-react-frontend.onrender.com",
    "http://localhost:3052",
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // If your API supports cookies or authentication headers
};
// app.use(cors()); // Enable CORS for all routes
app.use(cors(corsOptions));

//
///////mongoDB cloud//////////////////
let uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.te788iv.mongodb.net/assign-job-board-typesc-dec-23?retryWrites=true&w=majority`;
//
async function connectToMongoDB() {
  try {
    //if mongoDB uri is correct
    //if it is connected
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    //if error in connection or - in mongoDB uri
    console.error("MongoDB connection error:", error);
  }
}
// Call the async function to connect to MongoDB
connectToMongoDB();
////////////////////////////////////////////
console.log("Hi1");
//
// routes
app.use("/users", userRouter);
app.use("/jobs", jobRouter);
//
const PORT = process.env.PORT || 3008;

app.listen(PORT, () => console.log(`server running at ${PORT}`));
//
