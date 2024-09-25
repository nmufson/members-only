## Overview

**Members Only** is a messaging app that allows users to create an account, send messages, and view messages posted by other users. However, to see the usernames and timestamps associated with messages, users must be members of the site, which requires entering a special passcode. This app was developed as a portfolio project to demonstrate skills in user authentication and database management.

## Tech Stack

The app is built with the following technologies:

- **Node.js**: Server-side JavaScript runtime environment.
- **Express.js**: Web application framework for handling routing and middleware.
- **PostgreSQL**: Relational database used to store user data and messages.
- **Passport.js**: Authentication middleware for handling user logins.
- **bcrypt.js**: For password hashing to securely store user credentials.
- **express-session**: For managing user sessions.
- **connect-pg-simple**: For storing sessions in the PostgreSQL database.
- **EJS (Embedded JavaScript Templates)**: Templating engine for rendering dynamic HTML.

## Features

- **User Authentication**: Secure login using email and password with hashed credentials.
- **Password Protection**: Passwords are hashed using bcrypt.js before being stored.
- **Message Posting**: Users can post and view messages.
- **User Roles**:
    - **Regular Users**: Can see messages but not usernames or message timestamp unless they become members.
    - **Members**: Can view messages with usernames and timestamp visible by entering a special passcode.
    - **Admins**: Can remove messages from other users. 
- **Stored User Profiles**: User information and roles are stored in the PostgreSQL database.

## Live Demo

The app is deployed and available for viewing at: https://members-only-production-c726.up.railway.app/

### How to Use the App

1. **Sign Up**: Create a new account using your email and password, with option to enter Admin passcode for higher credentials. 
2. **Post Messages**: Send messages to other users from the home page.
3. **Become a Member**: Enter the special passcode to become a member and see both usernames and timestamps associated with messages.

## Authentication and Authorization

- **Authentication**: Managed using Passport.js with the Local Strategy. Users log in with their email and password, which are verified against the database.
- **Authorization**: User roles (Regular, Member, Admin) are managed in the database. Membership status is determined by entering a special passcode, which is checked during the sign-up or update process.

## Database Structure

- **Users Table**: Stores user credentials, roles, and membership status.
- **Messages Table**: Stores messages posted by users.
- **Session Table**: Manages user sessions, using `connect-pg-simple` to store sessions in PostgreSQL.

## API Endpoints

### Home Page

- **`GET /`**  
    Displays the home page with all messages.
  
### Authentication Routes

- **`GET /sign-up`**  
    Displays the sign-up page for new users.
- **`POST /sign-up`**  
    Handles user registration and validation.
- **`POST /check-email`**  
    Checks if an email is already in use during sign-up.
- **`GET /log-in`**  
    Displays the login page for existing users.
- **`POST /log-in`**  
    Handles user login.
- **`POST /log-out`**  
    Logs out the current user.
  
### Member Routes

- **`GET /member-join`**  
    Displays the member join page where users can become a member by entering the passcode.
- **`POST /member-join`**  
    Processes the membership request. Only authenticated users can join.
  
### Messaging Routes

- **`POST /send-message`**  
    Allows authenticated users to send a new message.
- **`POST /delete-message`**  
    Allows admins to delete messages.
  
## Error Handling

**Server-Side Error Handling**

-  **Database Query Errors**
    - All database queries are wrapped using the `catchQuery` function. This function handles errors that occur during database operations, logs them for debugging purposes, and rethrows them for further handling. This ensures that database-related issues are captured and managed effectively.
    
- **Controller Errors**:
    - Asynchronous controller functions are wrapped with the `catchAsync` function. This middleware catches any errors thrown during asynchronous operations within the controllers and forwards them to the global error handler. This approach ensures that unhandled errors are properly passed through the middleware stack.

- **Global Error Handler**:
	- The global error handler middleware captures all unhandled errors propagated through the middleware stack. It logs detailed error information, including stack trace and message, and renders an error page for the user. This ensures that errors are handled gracefully and user-friendly messages are displayed.

**Client-Side Error Handling**

- **Input Validation Errors**:
    - Perform client-side validation to ensure all required fields and constraints are met before sending data to the server. Provide immediate feedback to users to correct any issues before submission.
- **Server Response Handling**:
    - Handle and display server responses and errors on the client side. Ensure that users receive appropriate messages based on the server’s response, and take necessary actions to address any issues.
  
## Contact Information

For questions, suggestions, or feedback, please contact Nick Mufson at nickmufson1@gmail.com.
