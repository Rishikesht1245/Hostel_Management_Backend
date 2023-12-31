# Hostel Management Backend

Welcome to the backend repository of the Hostel Management Project. This MERN (MongoDB, Express.js, ReactJS, Node.js) project efficiently manages multiple blocks of rooms in a hostel, providing functionalities for chief wardens, staff (wardens, chefs, maintenance), and students.

## Features

### Technologies Used

- **TypeScript**: A typed superset of JavaScript, bringing static types to the language.
- **NodeJS with Express.js**: A backend framework for building scalable and performant server-side applications.
- **MongoDB with Mongoose**: A MongoDB object modeling tool designed to work in an asynchronous environment.
- **Socket.io**: Enables real-time bidirectional event-based communication.
- **Repository Design Pattern**:
  - Extensive use of OOPS programming paradigm.
  - Access to the database is through the repository only.
  - Generic CRUD Repository.
- **Backend Validation**:
  - MongoDB Schema: Validator module and in-built validator.
  - Request Body: Yup module and custom RegEx.
  - Request Params: Validator module.
- **Error Handling**:
  - Errors handled globally.
  - Errors handled through OOPS programming paradigm.
  - Separation of operational and unexpected errors.

### Users

There are three types of users in the system:

1. **Chief Warden (Admin)**
2. **Staffs**:
   - Warden
   - Chef
   - Maintenance
3. **Student**

## Getting Started

### Prerequisites

- Node.js: Ensure that Node.js is installed on your machine. You can download it from [https://nodejs.org/](https://nodejs.org/).
- MongoDB: Install MongoDB and set up a database for the project.

### Installation

1. Clone the repository:

```bash
       git clone https://github.com/Rishikesht1245/Hostel_Management_Backend.git
```

2. Navigate to the project directory:

```bash
       cd Hostel_Management_Backend
```

3. Install dependencies

```bash
       npm install
```

4. Run the development server

```bash
       npm start
```

5. View the application:
   **_http://localhost:5173_**
