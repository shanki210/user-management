# User Management System

This is a simple User Management System built with React, Firebase Authentication, and Firebase Firestore.

## Features

- User authentication (Sign up, Log in, Log out)
- User profile management (Update password, Update user data)
- Protected routes
- Google sign-in
- Responsive design using React Bootstrap

## Installation

1. Clone the repository to your local machine:

```bash
git clone https://github.com/shanki210/user-management.git
```



2.Navigate to the project directory:
```bash
cd user-details
```
3.Install dependencies:
```bash
npm install
```
4.Create a Firebase project and configure authentication and Firestore.

Add your Firebase configuration to firebase.js file in the src directory:

```javascript

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  // Your Firebase configuration object
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
```
Run the application:
```bash
npm start
```
The application should now be running on http://localhost:3000.

## Usage
- Navigate to http://localhost:3000 to access the login page.
- If you don't have an account, click on the "Sign up" link to create a new account.
- After signing up or logging in, you will be redirected to the home page where you can update your profile information and password.
- You can also log out using the "Logout" button.

## Dependencies
- react
- react-dom
- react-bootstrap
- react-router-dom
- firebase
## Author
Suryansh Singh
