# companyassignment
# Fullstack car App

A full-stack blog application built using Node.js, Express, MongoDB, and Cloudinary for file storage. This app allows users to create, read, update, and delete blog posts, while also supporting file uploads like images. Authentication is handled using `bcrypt` and `express-session`.

## Features

- **User Authentication**: Users can sign up and log in to manage their blog posts.
- **CRUD Operations**: Create, Read, Update, and Delete blog posts.
- **Image Upload**: Upload blog images using Cloudinary.
- **Responsive UI**: The blog app provides a simple, responsive user interface.
- **Data Storage**: MongoDB is used for storing user data and blog posts.
  
## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: bcrypt, bcryptjs, express-session
- **File Storage**: Cloudinary, multer
- **Template Engine**: EJS
- **Development Tools**: Webpack, Nodemon

## Installation

Follow these steps to set up the project locally:

## Clone this repository:

   ## bash
   git clone https://github.com/tropnicates/companyassignment.git


## Navigate into the project directory:

cd companyassignment

## Install dependencies:

npm install

## Set up environment variables by creating a .env file in the root directory with the following keys:

CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
MONGO_URI=your-mongodb-uri
SESSION_SECRET=your-session-secret


## Run the application in development mode:

npm start

## The app should now be running at 

http://localhost:9000




