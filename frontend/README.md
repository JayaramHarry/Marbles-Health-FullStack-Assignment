# User Management System

This is a simple User Management System built with React and Express.js. The system allows you to create, view, edit, and delete users.


## Prerequisites

- Node.js (v12 or higher)
- npm (v6 or higher) or yarn

## Getting Started

### Backend Setup

1. Navigate to the `backend` directory:
    ```bash
    cd backend
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the `backend` directory with the following content:
    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    ```

4. Start the backend server:
    ```bash
    node server.js
    ```

### Frontend Setup

1. Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Start the frontend development server:
    ```bash
    npm start
    ```

## Usage

1. Open your browser and go to `http://localhost:3000`.
2. You will see the User Management System homepage with a list of users.
3. You can create a new user by clicking on the "New User" button.
4. You can view user details by clicking on a user's name.
5. You can edit or delete a user from the user details page.

## API Endpoints

- **GET** `/api/users`: Get a paginated list of users. Query parameters: `page`, `limit`, `search`.
- **GET** `/api/users/:id`: Get a user by ID.
- **POST** `/api/users`: Create a new user.
- **PUT** `/api/users/:id`: Update a user by ID.
- **DELETE** `/api/users/:id`: Delete a user by ID.

## CSS and Responsiveness

The CSS for this project is located in `frontend/src/styles.css`. The application is designed to be responsive with specific media queries for different screen sizes.

### Dependencies
    Backend
    Express
    Mongoose
    dotenv
### Frontend
    React
    Axios
    React Router DOM
    react-hook-form
    yup
    date-fns