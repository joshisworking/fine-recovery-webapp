# Simulated Fine Recovery Project (Work in Progress)

## Overview

This project is a work in progress, aiming to create a Simulated Fine Recovery System for managing court fines and payments. It simulates the process of tracking and recovering fines for different subjects (individuals or entities) within various courthouses.

**Note**: The frontend part of the application has not yet been completed.

## Express Routes

### Courthouse

- `GET /courthouse`: Retrieve all courthouses.
- `GET /courthouse/:id`: Get a specific courthouse by courthouseId.
- `POST /courthouse`: Add a new courthouse.
- `DELETE /courthouse/:id`: Delete a courthouse.
- `PUT /courthouse/:id`: Update a courthouse.

### Subject

- `GET /subject`: Retrieve all subjects.
- `GET /subject/:id`: Get a specific subject by subjectId.
- `POST /subject`: Add a new subject.
- `DELETE /subject/:id`: Delete a subject.
- `PUT /subject/:id`: Update a subject.

### Fine

- `GET /fine`: Retrieve all fines.
- `GET /fine/:id`: Get a specific fine by fineId.
- `GET /fine/overdue`: Get all fines that are overdue (more than 1 year old).
- `GET /fine/courthouse/:id`: Get all fines associated with a specific courthouseId.
- `GET /fine/subject/:id`: Get all fines associated with a specific subjectId.
- `POST /fine`: Add a new fine.
- `PUT /fine/:id`: Update a fine.
- `DELETE /fine/:id`: Delete a fine.

## Technologies Used

- Backend: Node.js, Express.js
- Frontend: React with TypeScript

## Database Setup

This project includes a `database` folder that contains the necessary files for setting up the database:

- `create_tables.sql`: This file contains SQL queries to create the required tables for the fine recovery system.
- `add_sample_data.sql`: For testing purposes, the `add_sample_data.sql` file provides sample data to populate the database with initial records.

**Note**: The names and details used in the `add_sample_data.sql` file were generated programmatically and are fictional. They do not represent real individuals or entities.

## Getting Started

1. Clone this repository.
2. Install the required dependencies using `npm install`.
3. Start the backend server using `npm start` in the '/express-backend' directory.

## License

MIT License
