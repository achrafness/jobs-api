# Job API

This project is a Job API built using Node.js and Express.js, providing endpoints for user registration, login, and job management. It incorporates security measures such as helmet, cors, xss-clean, and rate limiting. Additionally, Swagger is utilized for API documentation.

## Getting Started

Follow the steps below to set up and run the project:

1. Create a `.env` file in the project root directory.

2. In the `.env` file, set the required variables such as `MONGO_URI` for MongoDB connection and other environment-specific variables.

    ```env
    MONGO_URI=your_mongodb_connection_string
    JWT_KEY = your_jwt_secret
    JWT_LIFETIME=your-lifetime-jwt
    ```

3. Open your terminal and run the following commands:

    ```bash
    npm install
    npm start
    ```

This will install the required dependencies and start the server.

## Project Structure

The project is organized into the following directories:

- **controllers:** Contains the logic for handling HTTP requests.
- **db:** Manages the database connection and schema.
- **errors:** Handles custom error classes.
- **middleware:** Includes security middleware functions (helmet, cors, xss-clean) and rate limiting.
- **models:** Defines the data models for users and jobs.
- **routes:** Defines the API routes.
- **swagger:** Utilizes Swagger for API documentation.

## Security Measures

- **helmet:** Helps secure the application by setting various HTTP headers.
- **cors:** Enables Cross-Origin Resource Sharing.
- **xss-clean:** Sanitizes user input to prevent Cross-Site Scripting (XSS) attacks.
- **rate limiting:** Implements rate limiting to protect against brute force and DDoS attacks.

## API Endpoints

- **POST /register:** Register a new user.
- **POST /login:** Log in as an existing user.
- **GET /jobs:** Get all jobs.
- **GET /jobs/:id:** Get a specific job by ID.
- **POST /jobs:** Create a new job.
- **PUT /jobs/:id:** Update a job by ID.
- **DELETE /jobs/:id:** Delete a job by ID.

## API Documentation (Swagger)

Access Swagger documentation at [http://localhost:your_port/api-docs](http://localhost:your_port/api-docs).

## Contributing

Feel free to contribute by opening issues or submitting pull requests. Make sure to follow the existing code style and conventions.

## License

This project is from jhon smilga

