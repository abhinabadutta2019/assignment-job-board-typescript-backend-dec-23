# Job Board Web Application

## Overview

The Job Board Web Application is a platform that connects job creators and applicants, providing a seamless and efficient way for users to post and apply for job positions.

## Backend

### Routes

- **Job Routes**

  - `POST /api/jobs`: Create a job listing (for job creators only).
  - `GET /api/jobs/appliedUsers/:jobId`: Get details of applicants for a specific job (for job creators only).
  - `GET /api/jobs/yourCreatedJobs/:jobId`: Get job details created by the current user (for job creators only).
  - `GET /api/jobs`: Get all job listings.
  - `POST /api/jobs/apply/:jobId`: Apply for a job (for applicants only).
  - `GET /api/jobs/appliedJobs`: Get a list of jobs applied to by the current user.

- **User Routes**
  - `POST /api/users`: Register a new user.
  - `POST /api/users/login`: User login.

### Backend Technologies

- **Node.js:** Server-side runtime environment.
- **Express.js:** Web application framework simplifying routing and middleware.
- **MongoDB:** NoSQL database to store user data, job listings, and applications.
- **Mongoose:** ODM library for MongoDB, providing an elegant interface for database interactions.
- **JWT (JSON Web Tokens):** Used for user authentication and authorization.

## Frontend

### Components

- **App.js:** Main component managing routing using React Router.
- **Auth.js:** Component handling user registration and login.
- **CreateJob.js:** Component for job creation (accessible to job creators only).
- **YourCreatedJobs.js:** Component to display jobs created by the current user (for job creators only).
- **ApplicantsDetails.js:** Component to view details of applicants for a specific job (for job creators only).
- **YourAppliedJobs.js:** Component to display jobs applied to by the current user (for applicants only).
- **Navbar.js:** Navigation bar component.

### Frontend Technologies

- **React:** JavaScript library for building user interfaces.
- **React Router:** Used for client-side routing.
- **React Bootstrap:** Library for responsive and visually appealing UI components.

## Security

- User data and passwords are securely stored in the database.
- JSON Web Tokens (JWT) are used for user authentication and authorization.

## Responsive Design

- The application is designed to be responsive, ensuring a consistent user experience across different devices and screen sizes.

## Links

- **Deployed Frontend Link:** [Job Board Frontend](https://assignment-job-board-react-frontend.onrender.com)
- **Frontend Repository Link:** [GitHub Repository - Frontend](https://github.com/abhinabadutta2019/assignment-job-board-react-frontend-07-nov-23)
- **Backend Repository Link:** [GitHub Repository - Backend](https://github.com/abhinabadutta2019/assignment-job-board-typescript-backend-07-nov-23)

## Screenshots

### Login page

![image](https://github.com/abhinabadutta2019/assignment-job-board-typescript-backend-dec-23/assets/118996650/42aa8edb-2a7f-481d-b42d-4ad123e9b550)

### Registration page

![image](https://github.com/abhinabadutta2019/assignment-job-board-typescript-backend-dec-23/assets/118996650/bc9bbaa7-79eb-42f5-926b-7ad0300a37b1)

### Home page (For job poster)

![image](https://github.com/abhinabadutta2019/assignment-job-board-typescript-backend-dec-23/assets/118996650/e0ba4246-5f1f-46ea-b4b9-5e67bb87e6b3)

### Home page (For applicants)

![image](https://github.com/abhinabadutta2019/assignment-job-board-typescript-backend-dec-23/assets/118996650/0497fa69-210f-47ed-b472-489bf1ddb806)

### Yourapplied-jobs page (For Applicants)

![image](https://github.com/abhinabadutta2019/assignment-job-board-typescript-backend-dec-23/assets/118996650/b1fb3d93-141f-4ed0-a19f-6b5438fdd7de)

### Your-Created-Jobs page (For job poster)

![image](https://github.com/abhinabadutta2019/assignment-job-board-typescript-backend-dec-23/assets/118996650/731886b1-b2e1-47fa-9956-21cc68fac74d)

### Applicants-details page (For job poster)

![image](https://github.com/abhinabadutta2019/assignment-job-board-typescript-backend-dec-23/assets/118996650/f0e54558-43ab-45ee-aef9-099c55bda14d)

## Conclusion

The Job Board Web Application provides an effective platform for job creators and applicants to connect, facilitating the job posting and application process.
