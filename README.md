# she-can-foundation
She Can Foundation is a responsive NGO website built with HTML, CSS, JavaScript, and Supabase. It features user authentication, contact form integration, dark mode, and a modern UI designed to empower and support women through community initiatives.

# She Can Foundation Website

## Overview

She Can Foundation is a modern and responsive NGO website developed to support and empower women through community initiatives, awareness programs, volunteer opportunities, and social engagement. The website provides a clean user experience with secure authentication and database integration.

## Features

### User Authentication

* User Registration (Sign Up)
* User Login
* Secure Authentication using Supabase
* Session Management
* Logout Functionality
* Forgot Password Support

### Contact System

* Contact Form Integration
* Messages Stored in Supabase Database
* Real-time Form Validation
* Success and Error Handling

### User Experience

* Fully Responsive Design
* Mobile-Friendly Navigation
* Dark Mode / Light Mode
* Modern UI Design
* Smooth Animations
* Loading Indicators

### Security Features

* Route Protection for Restricted Pages
* Session Verification
* Secure User Authentication
* Protected Contact Access

## Technologies Used

### Frontend

* HTML5
* CSS3
* JavaScript (Vanilla JS)

### Backend & Database

* Supabase Authentication
* Supabase Database

### Hosting

* Netlify

## Project Structure

```text
assets/
css/
database/
js/

index.html
contact.html
login.html
reset-password.html
admin.html
```

## Pages

### Home Page

Introduces the She Can Foundation, its mission, vision, and community initiatives.

### Contact Page

Allows users to contact the organization through a secure form connected to Supabase.

### Login / Signup Page

Provides authentication features including account creation, login, and password recovery.

### Reset Password Page

Allows users to securely update their password after receiving a reset link.

## Database

### contact_messages

Stores all contact form submissions.

Fields:

* id
* full_name
* email
* message
* created_at

## Authentication Flow

1. User creates an account.
2. User logs in securely.
3. Session is maintained.
4. Protected pages require authentication.
5. Users can log out securely.
6. Password recovery is supported through email.

## Future Enhancements

* Google Authentication
* User Profile Page
* Admin Dashboard
* Event Registration System
* Volunteer Management System
* Blog and News Section
* Donation Integration

## Author

Ravi

B.Sc. Information Technology Student

## License

This project is developed for educational and portfolio purposes.
